import type { CheerioAPI } from "cheerio";
import type { ConvertContext, MarkerStat, Stats, StructureStat } from "./types.js";

/**
 * Collect statistics about converted content across all pages.
 *
 * Counts structural elements (pages, images, tables, lists) and
 * learning block markers. All counts are aggregated in a single
 * pass over the page array.
 *
 * @param pages - Array of CheerioAPI page fragments
 * @param ctx - Conversion context (used for markout map in marker counting)
 * @returns Statistics object with structures and learning block counts
 */
export function collectStats(pages: CheerioAPI[], ctx: ConvertContext): Stats {
	return {
		structures: complexStructures(pages),
		learningBlocks: markoutStats(pages, ctx)
	};
}

function complexStructures(pages: CheerioAPI[]): StructureStat[] {
	let h1Count = 0, imgCount = 0, audioCount = 0, videoCount = 0;
	let tableCount = 0, tdCount = 0, listCount = 0, liCount = 0;
	let adjacentListCounter = 0, totalWords = 0;

	for (const $ of pages) {
		h1Count += $("h1").length;
		imgCount += $("img").length;
		audioCount += $("figure.audio").length;
		videoCount += $("figure.video").length;
		tableCount += $("table").length;
		tdCount += $("td").length;
		listCount += $("ol, ul").length;
		liCount += $("li").length;
		totalWords += countWords($);

		$("ol,ul").each(function () {
			const next = (this as { next?: { name?: string } | null }).next;
			if (next && (next.name === "ol" || next.name === "ul")) {
				adjacentListCounter++;
			}
		});
	}

	const structures: StructureStat[] = [
		{
			name: "Pages",
			count: h1Count,
			hint: `(~${Math.floor(totalWords / Math.max(h1Count, 1))} words/page)`
		},
		{ name: "Images", count: imgCount },
		{ name: "Audio", count: audioCount },
		{ name: "Videos", count: videoCount },
		{
			name: "Tables",
			count: tableCount,
			hint: `(~${safeRatio(tdCount, tableCount)} cells/table)`
		},
		{
			name: "Lists",
			count: listCount,
			hint: `(~${safeRatio(liCount, listCount)} items/list) ${adjacentListCounter} adjacent lists`
		}
	];

	return structures.filter((item) => item.count !== 0);
}

function markoutStats(pages: CheerioAPI[], ctx: ConvertContext): MarkerStat[] {
	const markoutMap = ctx.markoutMap;
	const ignored = ["table", "video", "audio", "image"].map((item) => markoutMap.start + item);

	let markers: MarkerStat[] = Object.keys(markoutMap.wrappers).map((marker) => ({
		name: markoutMap.start + marker,
		count: pages.reduce((sum, $) => sum + getCount($, ctx, marker), 0)
	}));

	markers = markers.filter((item) => !ignored.includes(item.name));
	markers = markers.filter((item) => item.count !== 0);
	markers.sort((a, b) => b.count - a.count);
	return markers;
}

function getCount($: CheerioAPI, ctx: ConvertContext, marker: string) {
	const wrapper = ctx.markoutMap.wrappers[marker];
	const $wrapper = $(wrapper);
	const tagName = ($wrapper[0] as unknown as { name: string }).name;
	const className = $wrapper.attr("class");

	let selector: string;
	if (className) {
		selector = "." + className.split(/\s+/).join(".");
	} else {
		selector = tagName;
	}

	// constructInteractions replaces the `pre.interaction` wrapper with the
	// parsed embed (typically an <iframe>), dropping the class so the generic
	// `.interaction` selector always matches zero. Interactions are the only
	// source of iframes in the pipeline, so count those as a proxy.
	if (marker === "interaction") {
		return $("iframe").length;
	}

	return $(selector).length;
}

/** Count words in a page by extracting all text and splitting on whitespace. */
function countWords($: CheerioAPI) {
	const text = ($.text() ?? "").replace(/\s+/g, " ").trim();
	return text ? text.split(" ").length : 0;
}

function safeRatio(a: number, b: number) {
	if (!b) return 0;
	return Math.floor(a / b);
}
