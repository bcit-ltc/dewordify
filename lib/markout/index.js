import cheerioLoader from "../cheerio-loader/index.js";
import cheerioMarkoutMethods from "./cheerio-markout-methods.js";
import normalizeMarkers from "./normalize-markers.js";
import convertMarkers from "./convert-markers.js";
import constructSliders from "./construct-sliders.js";
import constructImages from "./construct-images.js";
import constructMath from "./construct-math.js";
import constructAudio from "./construct-audio.js";
import constructVideos from "./construct-videos.js";
import constructTables from "./construct-tables/index.js";
import constructReveals from "./construct-reveals.js";
import constructComments from "./construct-comments.js";
import invalidMarkers from "./report-invalid-markers.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

let markoutMap = null;

export default function (htmlArray, markoutMapPath) {
	if (markoutMap === null) {
		markoutMap = require(markoutMapPath);
	}
	htmlArray = htmlArray.map(function (item) {
		return markout(item, markoutMap);
	});

	return htmlArray;
};

function markout(html, markoutMap) {
	const $ = cheerioLoader.load("<temp>" + html + "</temp>");

	cheerioMarkoutMethods($);
	normalizeMarkers($, markoutMap);
	invalidMarkers($, markoutMap);
    convertMarkers($, markoutMap);
    constructSliders($, markoutMap);
	constructImages($, markoutMap);
	constructMath($, markoutMap);
	constructAudio($);
	constructVideos($);
	constructTables($, markoutMap);
	constructReveals($);
	constructComments($);

	// Get all content - both inside and outside temp (some H1s may be moved outside)
	const siblings = $("temp").prevAll().map(function() {
		return $.html(this);
	}).get().reverse().join("");
	const tempContent = $("temp").html() || "";
	const result = siblings + tempContent;
	return result;
}