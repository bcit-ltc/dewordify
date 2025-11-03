import path from "path";

export default function ($) {

	// Removes MS Word bookmarks and TOC targets
	$("a").each(function() {
		if(!$(this).attr("href")) {
			$(this).replaceWith($(this).html());
		}
	});

	// Removes system paths from file links
	$("a[href^='file:']").each(function () {
		const href = $(this).attr("href");
		const newHref = "assets/" + path.basename(href);

		$(this).attr("href", newHref);
	});

	// Point links without protocols to assets folder
	$("a[href]:not([href*=':'])").each(function () {
		const href = $(this).attr("href");
		const newHref = "assets/" + path.basename(href);

		$(this).attr("href", newHref);
	});
};
