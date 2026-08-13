import type { CheerioAPI } from "cheerio";
import { wrapAllHtml } from "./helpers.js";

/**
 * Construct image sliders from `.slider` wrapper elements.
 *
 * Groups children into slides at H2 or img boundaries. Each slide is
 * wrapped in a `<figure>` element. H2s without a following img get a
 * placeholder img inserted.
 */
export function constructSliders($: CheerioAPI) {
	$(".slider").each(function () {
		const $children = $(this).children();
		const slides: { start: number; end: number }[] = [];
		let slideStart = -1;

		$children.each(function (i) {
			const isHeader = $(this).is("h2");
			const isImage = $(this).is("img");

			if (isHeader) {
				if (slideStart >= 0) {
					slides.push({ start: slideStart, end: i });
				}
				slideStart = i;
				if (!$(this).next().is("img")) {
					$(this).after($("<img>"));
				}
			} else if (isImage && slideStart === -1) {
				slideStart = i;
			}
		});

		if (slideStart >= 0) {
			slides.push({ start: slideStart, end: $children.length });
		}

		for (let i = slides.length - 1; i >= 0; i--) {
			wrapAllHtml($, $(this).children().slice(slides[i].start, slides[i].end), "<figure>");
		}
		$(this).children("figure").addClass("img");
	});
}
