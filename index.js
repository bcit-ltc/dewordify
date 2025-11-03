import munch from "./lib/munch/index.js";
import strip from "./lib/strip/index.js";
import fileFinder from "./lib/fileFinder/index.js";
import docxChooser from "./lib/docxChooser/index.js";
import * as woolly from "./lib/woolly-mammoth/index.js";
import normalize from "./lib/normalize/index.js";
import paginate from "./lib/paginate/index.js";
import markout from "./lib/markout/index.js";
import statsTracker from "./lib/statsTracker/index.js";
import pageGenerator from "./lib/pageGenerator/index.js";
import chalk from "chalk";

const styleMapPath = fileFinder("styleMap.txt");
const markoutMapPath = fileFinder("markoutMap.json");
const templatePath = fileFinder("template.html");

let writeFiles = true;

export default function (command) {
	switch (command) {
		case "munch":
			munch();
			break;
		case "estimate":
			writeFiles = false;
			dewordify();
			break;
		case "strip":
			strip();
			break;
		default:
			dewordify();
	}
}

export { dewordify };

async function dewordify(filename) {
	let docx;
	if (filename) {
		const path = await import('path');
		docx = path.default.join(process.cwd(), filename);
		console.log("DOCX DEBUG: Using filename argument:", filename);
		console.log("DOCX DEBUG: Full path:", docx);
	} else {
		docx = docxChooser(process.cwd());
		console.log("DOCX DEBUG: Using most recent file:", docx);
	}

	woolly.readFile(docx, styleMapPath)
		.then(function(result) {
			console.log("WOOLLY DEBUG: mammoth result value:", result ? 'exists' : 'null');
			console.log("WOOLLY DEBUG: mammoth result keys:", result ? Object.keys(result) : 'none');
			return result;
		})
		.then(woolly.displayWarnings)
		.then(async function(result) {
			const html = woolly.getHTML(result);
			const cheerioLoader = await import('./lib/cheerio-loader/index.js');
			const $ = cheerioLoader.default.load(html);
			console.log("WOOLLY DEBUG: H1 count in getHTML result:", $('h1').length);
			console.log("WOOLLY DEBUG: p count in getHTML result:", $('p').length);
			console.log("WOOLLY DEBUG: HTML length:", html.length);
			console.log("WOOLLY DEBUG: First 500 chars:", html.substring(0, 500));
			return html;
		})
		.then(processHTML);
}

async function processHTML(html) {
	const normalizedHTML = normalize(html);
	const cheerioLoader = await import('./lib/cheerio-loader/index.js');
	const $ = cheerioLoader.default.load(normalizedHTML);
	console.log("DEBUG: H1 count in normalizedHTML:", $('h1').length);
	console.log("DEBUG: p count in normalizedHTML:", $('p').length);
	console.log("DEBUG: First 500 chars of normalizedHTML:", normalizedHTML.substring(0, 500));
	let htmlArray = paginate(normalizedHTML);
	console.log("DEBUG: Pages after paginate:", htmlArray.length);
	htmlArray = markout(htmlArray, markoutMapPath);
	console.log("DEBUG: Pages after markout:", htmlArray.length);
	statsTracker(htmlArray, markoutMapPath);

	if (writeFiles) {
		// write files
		pageGenerator(htmlArray, templatePath);
	}
}
