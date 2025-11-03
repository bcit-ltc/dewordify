import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsBeautify = require('js-beautify');
const htmlBeautify = jsBeautify.html;

function beautify(html) {
	const jsBeautifyOptions = {
		"indent_size": 1,
		"indent_char": "	",
		"wrap_line_length": 0,
		"preserve_newlines": true,
		"max_preserve_newlines": 3
	};
	return htmlBeautify(html, jsBeautifyOptions);
}

function writeFileSync(filename, html) {
	fs.writeFileSync(filename, beautify(html));
}

function writeFile(filename, html, callback) {
	const beautified = beautify(html);

	fs.writeFile(filename, beautified, function (err) {
		if (typeof callback === "function") {
			callback(err);
		} else if (err) {
			console.log("There was an error writing " + filename);
			console.log(beautified);
			throw err;
		}
	});
}

export default writeFile;
export { writeFileSync };
