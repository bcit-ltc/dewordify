import path from "path";
import fs from "fs";
import htmlWriter from "../html-writer/index.js";

export default function () {
	const thisFolder = process.cwd();
	let htmlFiles = fs.readdirSync(thisFolder);

	htmlFiles = htmlFiles.filter(filterHTML);
	htmlFiles = htmlFiles.map(function (fileName) {
		return path.join(thisFolder, fileName);
	});

	htmlFiles.forEach(function (filePath) {
		fs.readFile(filePath, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				const stripped = stripComments(data.toString());
				htmlWriter(filePath, stripped);
			}
		});
	});
};

function filterHTML(item) {
	if (path.extname(item) === ".html") {
		return true;
	}
	return false;
}

function stripComments(string) {
	return string.replace(/\s*?<!--NOTE:(.|\n)*?-->\s*?/g,"");
}