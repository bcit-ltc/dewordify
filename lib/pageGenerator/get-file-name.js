export default getFileName;

function getFileName(number, string, extension) {
	return doubleDigits(number) + "_" + escape(string) + extension;
}

function escape(string) {
	const charLimit = 60;

	const escaped = JSON.stringify(string);
	// Replace hyphens, underscores, colons, parentheses, and other punctuation with spaces
	// This ensures words separated by punctuation are split properly
	const withSpaces = escaped.replace(/[():;,\-_\s]+/g, " ");
	const dirtyWords = withSpaces.split(" ").filter(function (word) {
		// Remove empty strings from multiple consecutive spaces
		return word.trim().length > 0;
	});
	const cleanWords = dirtyWords.map(function (word) {
		return word.replace(/\W/g, "");
	}).filter(function (word) {
		// Remove empty strings that result after removing all non-word characters
		return word.length > 0;
	});

	const combined = cleanWords.join("-").toLowerCase();
	const reduced = combined.substring(0, charLimit);
	return reduced;
}

function doubleDigits(num) {
	if (num < 10) {
		return "0" + num;
	}
	return "" + num;
}
