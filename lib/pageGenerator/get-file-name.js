module.exports = getFileName;

function getFileName(number, string, extension) {
	var escaped = escape(string);
	// Ensure we have a valid filename - if escape returns empty, use a default
	if (!escaped || escaped.length === 0) {
		escaped = "page";
	}
	return doubleDigits(number) + "_" + escaped + extension;
}

function escape(string) {
	var charLimit = 60;
	
	// Handle empty or null strings
	if (!string || string.trim().length === 0) {
		return "";
	}

	var escaped = JSON.stringify(string);
	// Replace various punctuation and separators with spaces before splitting
	// This ensures parentheses, colons, etc. create word boundaries
	escaped = escaped.replace(/[()\[\]:;,!?\.]/g, " ");
	// Replace dashes and underscores with spaces
	escaped = escaped.replace(/(-|_)/g, " ");
	
	var dirtyWords = escaped.split(" ");
	var cleanWords = dirtyWords.map(function (word) {
		return word.replace(/\W/g, "");
	}).filter(function(word) {
		// Filter out empty words
		return word.length > 0;
	});

	var combined = cleanWords.join("-").toLowerCase();
	
	// Replace multiple consecutive dashes with a single dash
	combined = combined.replace(/-+/g, "-");
	
	// Remove leading and trailing dashes
	combined = combined.replace(/^-+|-+$/g, "");
	
	var reduced = combined.substring(0, charLimit);
	
	// Ensure no trailing dash after truncation
	reduced = reduced.replace(/-+$/, "");
	
	return reduced;
}

function doubleDigits(num) {
	if (num < 10) {
		return "0" + num;
	}
	return "" + num;
}
