import chalk from "chalk";

export default function ($) {
	const markoutPropertyDelimiter = ":";

	// Reduces a set of cheerio objects to those that match the provided marker
	$.prototype.filterMarkers = function (marker) {
		const $filtered = this.filter(function () {
			const text = $(this).text().toLowerCase().trim();
			if (text === marker) {
				return true;
			}
			return false;
		});
		return $filtered;
	};


	// Returns a set of elements containing a specific markout property.  With <p>File: test.jpg</p>, for example, you could select that element with $(this).findByMarkoutProperty("prop");
	$.prototype.findByMarkoutProperty = function (prop) {
		const $filtered = this.children().filter(function () {
			let text = $(this).text();
			if (text) {
				text = text.toLowerCase().trim();
			}
			if (text.indexOf(prop.toLowerCase() + markoutPropertyDelimiter) === 0) {
				return true;
			}
			return false;
		});
		return $filtered;
	};

	// Returns the value found within a markout property.  The object returned in the findByMarkoutProperty method above <p>File: test.jpg</p>) it would return 'test.jpg'
	// If there are multiple properties declared, an error will be shown.  A reasonable fallback (the first or last in the set) is not currently used.  They will simply be haphazardly combined
	$.prototype.getMarkoutPropertyValue = function () {
		let text = this.text();
		let array = text.split(markoutPropertyDelimiter);
		const prop = array[0].toLowerCase().trim();

		if (prop === "license" || prop === "licence") {
			text = this.html();
			array = text.split(markoutPropertyDelimiter);
		}
		array.shift();
		if (this.length > 1) {
			console.log("\n" + chalk.bgRed("[MARKOUT ERROR] Duplicate markout properties provided"));
			console.log("	See: " + $("h1").text());
			console.log("	 " + text);
		}
		return array.join(":").trim();
	};

	// Returns the value of a markout property and removes the element containing the property.
	$.prototype.markoutPropertyValue = function(prop) {
		const $prop = $(this).findByMarkoutProperty(prop);
		const property = $prop.getMarkoutPropertyValue();
		$prop.remove();
		return property;
	};

	// Simulates the jQuery wrapAll method.
	$.prototype.wrapAll = function (wrapper) {
		const $container = $(wrapper).clone();
		$(this).first().before($container);

		for (let i = 0; i < this.length; i++) {
			const clone = $(this).eq(i).clone();
			$container.append($("<div>" + clone + "</div>").html());
			$(this).eq(i).remove();
		}
	};

	$.prototype.wrapAllReversed = function (wrapper) {
		const $container = $(wrapper).clone();
		$(this).first().before($container);
		for (let i = this.length; i >= 0; i--) {
			const clone = $(this).eq(i).clone();
			$container.append($("<div>" + clone + "</div>").html());
			$(this).eq(i).remove();
		}
	};

	// Used to determine if a table cell is bold
	$.prototype.isCellBold = function () {
		const cellTextLength = $(this).text().trim().length;
		const strongTextLength = $(this).find("strong").text().trim().length;
		if (cellTextLength > strongTextLength) {
			return false;
		}
		return true;
	};

	// Used to determine if a table cell is empty
	$.prototype.isCellEmpty = function () {
		if ($(this).children().length === 0) {
			const cellTextLength = $(this).text().trim().length;
			if (cellTextLength === 0) {
				return true;
			}
		}
		return false;
	};

	// Returns true for non-empty bold cells
	$.prototype.isCellHeader = function () {
		if ($(this).isCellBold() && !$(this).isCellEmpty()) {
			return true;
		}
		return false;
	};

	// Used to change the tag name of a selected item (eg from <td> to <th>)
	$.prototype.changeTagName = function (tagName) {
		this[0].name = tagName;
	};
};
