import normalizeTables from "./normalize-tables.js";
import constructTables from "./construct-tables.js";
import parseHeadings from "./parse-headings.js";
import finishTables from "./finish-tables.js";

export default function ($, markoutMap) {
	normalizeTables($);
	constructTables($);
	parseHeadings($);
	finishTables($, markoutMap);
}
