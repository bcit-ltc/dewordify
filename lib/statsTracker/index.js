import cheerioLoader from "../cheerio-loader/index.js";
import complexStructures from "./complex-structures.js";
import markoutStats from "./markout-stats.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default function finalReport(htmlArray, markoutMapPath) {
	const $ = cheerioLoader.load("<temp>" + htmlArray.join("") + "<temp>");
	const markoutMap = require(markoutMapPath);
	complexStructures($);
	markoutStats($, markoutMap);

	return;
}
