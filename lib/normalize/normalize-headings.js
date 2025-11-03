export default function ($) {
	// Required to fix corrupted headings
	// The styleMap can't be used in isolation as the styles are runs, not paragraphs.
	// As a result, they are tagged with an appropriate class and iterated over here
	// @see https://support.microsoft.com/en-us/kb/902064
	for (let i = 1; i < 9; i++) {
		$(".heading" + i).each(function () {
			if ($(this).parents("h" + i).length > 0) {
				$(this).replaceWith($(this).html());
				return;
			}
			const $p = $(this).parents("p").first();
			if (!$p.length) {
				console.log(`ERROR!  Search the output for class="heading${i}" and send it to courseproduction@bcit.ca`);
				return;
			}
			if ($(this).text().length === $p.text().length) {
				$p.replaceWith("<h" + i + ">" + $(this).html() + "</h" + i + ">");
				return;
			}
		});
	}

	// Removes emphasis tags from headings
	$("h1,h2,h3,h4,h5,h6").each(function () {
		while ($(this).find("strong,em,i,b").length > 0) {
			$(this).find("strong,em,i,b").each(function () {
				$(this).replaceWith($(this).html());
			});
		}
	});

	console.log("NORMALIZE_HEADINGS DEBUG: Total H1s found:", $("h1").length);
	// DISABLED: Don't move H1s outside temp - they need to stay with their content
	// The original code moved H1s outside temp, but this breaks pagination
	// because all H1s end up grouped together at the start, separated from their content
	// Instead, keep H1s inside temp so they stay in their original positions with their content
	// $("h1").each(function (index) {
	// 	const $parents = $(this).parents();
	// 	let $eldest;

	// 	if ($parents.length - 1) {
	// 		// Get the eldest parent that isn't the <temp> tag
	// 		$eldest = $parents.eq($parents.length - 2);

	// 		// Move the <h1> before it
	// 		$eldest.before($(this));
	// 	}
	// });
	console.log("NORMALIZE_HEADINGS DEBUG: H1s inside temp:", $("temp h1").length);
};
