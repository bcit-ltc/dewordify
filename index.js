"use strict";

var munch = require("./lib/munch");
var strip = require("./lib/strip");
var fileFinder = require("./lib/fileFinder");
var docxChooser = require("./lib/docxChooser");
var woolly = require("./lib/woolly-mammoth");
var normalize = require("./lib/normalize");
var paginate = require("./lib/paginate");
var markout = require("./lib/markout");
var statsTracker = require("./lib/statsTracker");
var pageGenerator = require("./lib/pageGenerator");

var styleMapPath = fileFinder("styleMap.txt");
var markoutMapPath = fileFinder("markoutMap.json");
var templatePath = fileFinder("template.html");

var writeFiles = true;

module.exports = function (commandOrFilename) {
	// If it's a known command, handle it
	if (commandOrFilename === "munch") {
			munch();
		return Promise.resolve();
	}
	if (commandOrFilename === "estimate") {
			writeFiles = false;
		return dewordify(); // estimate uses default behavior (most recent docx)
	}
	if (commandOrFilename === "strip") {
			strip();
		return Promise.resolve();
	}
	
	// Otherwise, treat it as a filename (or undefined for default behavior)
	return dewordify(commandOrFilename);
};

function dewordify(filename) {
	var docx;
	
	if (filename) {
		// Use the provided filename
		var path = require("path");
		docx = path.isAbsolute(filename) ? filename : path.join(process.cwd(), filename);
	} else {
		// Find the most recently modified docx file
		docx = docxChooser(process.cwd());
	}

	return woolly.readFile(docx, styleMapPath)
		.then(woolly.displayWarnings)
		.then(woolly.getHTML)
		.then(processHTML)
		.catch(function(err) {
			console.error("\nError processing document:", err.message);
			if (err.stack) {
				console.error(err.stack);
			}
			throw err;
		});
}

function processHTML(html) {
	var normalizedHTML;
	var htmlArray;

	normalizedHTML = normalize(html);
	htmlArray = paginate(normalizedHTML);
	htmlArray = markout(htmlArray, markoutMapPath);
	statsTracker(htmlArray, markoutMapPath);

	if (writeFiles) {
		// write files
		pageGenerator(htmlArray, templatePath);
	}
	
	return Promise.resolve();
}
