import * as cheerio from "cheerio";

const cheerioOptions = {
	normalizeWhitespace: true,
	xmlMode: false,
	decodeEntities: false
};

function load(html) {
	return cheerio.load(html, cheerioOptions);
}

export default { load };
