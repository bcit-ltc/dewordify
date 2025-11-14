"use strict";

var htmlWriter = require("../html-writer");
var getFileName = require("./get-file-name");
var templatize = require("./templatize");
var cheerio = require("../cheerio-loader");
var fs = require("fs");
var path = require("path");
var chalk = require("chalk");


module.exports = fileWriter;

function fileWriter(htmlArray, templatePath) {
	try {
		console.log("\n[INFO] Writing " + htmlArray.length + " HTML file(s)...");
		htmlArray.forEach(function (html, index) {
			createRegularPage(html, templatePath, index + 1);
		});
		console.log("[INFO] HTML files written successfully.");
	} catch (err) {
		console.error("\n[ERROR] Error writing HTML files:", err.message);
		if (err.stack) {
			console.error(err.stack);
		}
		throw err;
	}
}

function createRegularPage(html, templatePath, pageNumber) {
	var $ = cheerio.load(html);
	
	var h1Text = $("h1").text();
	var LinkedFilePattern = /(\(|\[).+?\..+?(\)|\])/g;
	var matches = h1Text.match(LinkedFilePattern);

	// If the page title doesn't contain the linked file pattern
	if(!matches) {
		var htmlfilename = getFileName(pageNumber, h1Text, ".html");
		
		// Validate filename to prevent Windows reserved names
		if (!htmlfilename || htmlfilename.trim().length === 0 || /^(nul|con|prn|aux|com[1-9]|lpt[1-9])(\.|$)/i.test(htmlfilename)) {
			console.log("\n" + chalk.bgYellow(" [WARNING] Invalid filename generated, using fallback"));
			htmlfilename = getFileName(pageNumber, "page", ".html");
		}
		
		var page = templatize($.html(), templatePath);
		try {
			htmlWriter.sync(htmlfilename, page);
			console.log("[INFO] Created: " + htmlfilename);
		} catch (err) {
			console.error("[ERROR] Failed to write " + htmlfilename + ":", err.message);
			throw err;
		}
		return true;
	}

	if(matches.length > 1) {
		console.log("\n" + chalk.bgRed(" [ERROR] Linked files need to be separated "));
		console.log("\t" + h1Text);
	}

	var match = matches[0];
	var startIndex = h1Text.indexOf(match);
	var endIndex = startIndex + match.length;
	var start = h1Text.slice(0,startIndex);
	var end = h1Text.slice(endIndex);
	var title = (start + end).trim();
	var linkedFileName = match.slice(1,-1).trim();
	var linkedFilePath = path.join(process.cwd(),"assets",linkedFileName);
	var ext = path.extname(linkedFileName);
	var newFileName = getFileName(pageNumber, title, ext);
	var newFilePath = path.join(process.cwd(), newFileName);
	var dataFileName = path.basename(newFileName, ext) + "._toc.json";
	
	// Validate filename to prevent Windows reserved names like "nul", "con", etc.
	if (!newFileName || newFileName.trim().length === 0 || /^(nul|con|prn|aux|com[1-9]|lpt[1-9])(\.|$)/i.test(newFileName)) {
		console.log("\n" + chalk.bgRed(" [ERROR] Invalid filename generated: " + newFileName));
		console.log("\tUsing fallback filename");
		newFileName = getFileName(pageNumber, "page", ext);
		newFilePath = path.join(process.cwd(), newFileName);
		dataFileName = path.basename(newFileName, ext) + "._toc.json";
	}
	
	if(fs.existsSync(linkedFilePath)) {
		fs.copyFileSync(linkedFilePath, newFilePath);
	} else {
		console.log("\n" + chalk.bgRed(" [ERROR] Linked File is Not in the Assets Folder "));
		console.log("\t" + h1Text);
	}
	
	$("h1").remove();
	var description = $.html();


	var fileData = {
		title: title,
		linkedFileName: newFileName,
		sourceFileName: "assets/" + linkedFileName,
		description: description.trim()
	};
	
	fs.writeFile(dataFileName,JSON.stringify(fileData ,null,"	"), function(err) {
		if(err) {
			console.log("\n" + chalk.bgRed(" [ERROR] Encountered a Problem Writing Data File"));
			console.log("\t", dataFileName);
		}
	});
}

function createPreviewPage(htmlArray, templatePath) {
	var previewPageName = "_preview.html";
	var combined = templatize(htmlArray.join(""), templatePath);
	var $ = cheerio.load(combined);
	
	labelFileNames($);
	$("title").text(previewPageName);

	htmlWriter.sync(previewPageName, $.html());
}

function labelFileNames($) {
	$("h1").each(function(index) {
		var fileName = getFileName(index + 1, $(this).text(), ".html");
		var label = `<hr style="border: none; height: 2px; background: none; background-image: linear-gradient(to right, navy 50%, transparent 50%); background-size: 10px 10px; border-radius: 5px; max-width: 95%;"><p class='file-name'><strong>File Name:</strong> <a href="./${fileName}">${fileName}</a></p>`;
		$(this).before(label);
	});
}