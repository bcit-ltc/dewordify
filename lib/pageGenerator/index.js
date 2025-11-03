import htmlWriter from "../html-writer/index.js";
import getFileName from "./get-file-name.js";
import templatize from "./templatize.js";
import cheerioLoader from "../cheerio-loader/index.js";
import fs from "fs";
import path from "path";
import chalk from "chalk";

export default fileWriter;

function fileWriter(htmlArray, templatePath) {
	if (htmlArray.length === 0) {
		console.log(chalk.yellow(" [WARNING] No H1 headings found in document. HTML files will not be created."));
		console.log(chalk.yellow(" [INFO] Make sure your Word document has H1 headings to create separate pages."));
		return;
	}
	htmlArray.forEach(function (html, index) {
		createRegularPage(html, templatePath, index + 1);
	});

	// createPreviewPage(htmlArray, templatePath);
}

// eslint-disable-next-line no-unused-vars
function createPreviewPage(htmlArray, templatePath) {
	const previewPageName = "_preview.html";
	const combined = templatize(htmlArray.join(""), templatePath);
	const $ = cheerioLoader.load(combined);

	labelFileNames($);
	$("title").text(previewPageName);

	htmlWriter(previewPageName, $.html());
}

function createRegularPage(html, templatePath, pageNumber) {
	const $ = cheerioLoader.load(html);

	const h1Text = $("h1").text();
	const LinkedFilePattern = /(\(|\[).+?\..+?(\)|\])/g;
	const matches = h1Text.match(LinkedFilePattern);

	// If the page title doesn't contain the linked file pattern
	if(!matches) {
		const htmlfilename = getFileName(pageNumber, h1Text, ".html");
		const page = templatize($.html(), templatePath);
		htmlWriter(htmlfilename, page, function(err) {
			if (err) {
				console.log("\n" + chalk.bgRed(" [ERROR] Encountered a Problem Writing HTML File"));
				console.log("\t", htmlfilename);
				console.log("\t", err.message);
			} else {
				console.log("Created: " + htmlfilename);
			}
		});
		return true;
	}

	if(matches.length > 1) {
		console.log("\n" + chalk.bgRed(" [ERROR] Linked files need to be separated "));
		console.log("\t" + h1Text);
		return false;
	}

	const match = matches[0];
	const startIndex = h1Text.indexOf(match);
	const endIndex = startIndex + match.length;
	const start = h1Text.slice(0,startIndex);
	const end = h1Text.slice(endIndex);
	const title = (start + end).trim();
	const linkedFileName = match.slice(1,-1).trim();
	const linkedFilePath = path.join(process.cwd(),"assets",linkedFileName);
	const ext = path.extname(linkedFileName);
	const newFileName = getFileName(pageNumber, title, ext);
	const newFilePath = path.join(process.cwd(), newFileName);
	const dataFileName =  path.basename(newFileName,ext) + "._toc.json";

	if(fs.existsSync(linkedFilePath)) {
		fs.copyFileSync(linkedFilePath, newFilePath);
	} else {
		console.log("\n" + chalk.bgRed(" [ERROR] Linked File is Not in the Assets Folder "));
		console.log("\t" + h1Text);
	}

	$("h1").remove();
	const description = $.html();


	const fileData = {
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

function labelFileNames($) {
	$("h1").each(function(index) {
		const fileName = getFileName(index + 1, $(this).text(), ".html");
		const label = `<hr style="border: none; height: 2px; background: none; background-image: linear-gradient(to right, navy 50%, transparent 50%); background-size: 10px 10px; border-radius: 5px; max-width: 95%;"><p class='file-name'><strong>File Name:</strong> <a href="./${fileName}">${fileName}</a></p>`;
		$(this).before(label);
	});
}