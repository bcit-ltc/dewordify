import cheerioLoader from "../cheerio-loader/index.js";
import normalizeHeadings from "./normalize-headings.js";
import normalizeImages from "./normalize-images.js";
import normalizeLists from "./normalize-lists.js";
import convertBreaks from "./convert-breaks.js";
import whitespace from "./whitespace.js";
import combineAdjacents from "./combine-adjacents.js";
import trimInline from "./trim-inline.js";
import trimBlock from "./trim-block.js";
import links from "./links.js";
import removeEmptyTags from "./remove-empty-tags.js";
import normalizeComments from "./normalize-comments.js";

export default function (html) {
	// wrapped in temp tags to workaround cheerio adjacent selector bug #890
	const $ = cheerioLoader.load("<temp>" + html + "</temp>");
	
	console.log("NORMALIZE START DEBUG: H1 count in input HTML:", cheerioLoader.load(html)('h1').length);
	console.log("NORMALIZE START DEBUG: H1 count after wrapping in temp:", $('h1').length);

	// Consider the order of operations
	normalizeHeadings($);
	normalizeImages($);
	normalizeLists($);
	convertBreaks($);
	whitespace($);
	combineAdjacents($);
	trimInline($);
	trimBlock($);
	links($);
	removeEmptyTags($);
	normalizeComments($);

	// Get all content - both inside and outside temp (in case anything is moved outside)
	// H1s are now kept inside temp, but other elements might be moved outside by other functions
	// So we get siblings before/after temp as well, just like markout does
	const prevSiblings = $("temp").prevAll().map(function() {
		return $.html(this);
	}).get().reverse().join("");
	const tempContent = $("temp").html() || "";
	const nextSiblings = $("temp").nextAll().map(function() {
		return $.html(this);
	}).get().join("");
	const result = prevSiblings + tempContent + nextSiblings;
	console.log("NORMALIZE DEBUG: result H1 count:", cheerioLoader.load(result)('h1').length);
	console.log("NORMALIZE DEBUG: result p count:", cheerioLoader.load(result)('p').length);
	return result;
}
