import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsBeautify = require('js-beautify');
const htmlBeautify = jsBeautify.html;

const beautifyOptions = {
	"indent_size": 1,
	"indent_char": "	",
	"wrap_line_length": 0,
	"preserve_newlines": true,
	"max_preserve_newlines": 3
};

export default constructComments;

function constructComments($) {
	$(".html-comment").each(function () {
		const beautifulData = htmlBeautify($(this).html(), beautifyOptions);
		$(this).replaceWith("<!--\n" + beautifulData + "\n-->");
	});
}