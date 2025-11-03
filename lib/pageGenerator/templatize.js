import fs from "fs";
import cheerioLoader from "../cheerio-loader/index.js";
import * as cheerio from "cheerio";

const cheerioOptions = {
	normalizeWhitespace: true,
	xmlMode: false,
	decodeEntities: false
};

let templateHTML = "";

export default putIntoTemplate;

function putIntoTemplate(page, templatePath) {
	if (!templateHTML) {
		templateHTML = loadTemplate(templatePath);
	}

	let $template = cheerio.load(templateHTML, cheerioOptions);
	const $ = cheerioLoader.load(page);
	const title = $("h1").text();
	const $primaryTarget = $template("content");
	const $secondaryTarget = $template(".container");
	const $tertiaryTarget = $template("body");

	$template("title").text(title);

	if ($primaryTarget.length) {
		$primaryTarget.replaceWith(page);
	} else if ($secondaryTarget.length) {
		$secondaryTarget.html(page);
	} else if ($tertiaryTarget.length) {
		$tertiaryTarget.prepend(page);
	} else {
		$template = $;
	}

	return $template.html();

}


function loadTemplate(templatePath) {
	if (!fs.existsSync(templatePath)) {
		throw new Error("Template file not found: " + templatePath);
	}
	return fs.readFileSync(templatePath).toString();
}
