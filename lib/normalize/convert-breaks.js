export default function ($) {
	// Normalize breaks
	$("br").replaceWith("<br>");

	// If list items contain breaks, wrap selections of content with paragraphs
	$("li").each(function () {
		if ($(this).children("br").length) {
			const $contents = $(this).contents();
			let selection = [];
			$contents.each(function () {
				if (this.nodeType === 3 || !$(this).is("img, br, ol, ul, table, figure")) {
                    if($(this)[0] === $contents.last()[0] && $(this).text().trim().startsWith("/")) {
                        $(this).wrap("<p></p>"); // wrap the last content with <p> if its start with an "/" (ex: "/image")
                    }
					selection.push($(this));
				} else {
					if ($(this).is("br")) {
						$(this).remove();
					}

					if (selection.length) {
						const $p = $("<p>");
						selection[0].before($p);
						selection.forEach(function ($item) {
							$p.append($item);
						});
						selection = [];
					}
				}
			});
		}
	});

	// Turn paragraph breaks into new paragraphs
	$("p > br").each(function () {
		const thisString = $(this).parent().html().toString();
		const stringSegments = thisString.split("<br>");
		for (const index in stringSegments) {
			stringSegments[index] = "<p>" + stringSegments[index] + "</p>";
		}
		const newString = stringSegments.join("");
		$(this).parent().replaceWith(newString);
	});
};
