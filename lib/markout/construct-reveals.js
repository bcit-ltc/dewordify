export default constructReveals;

function constructReveals($) {
	$(".reveal").each(function () {
		const button = $(this).markoutPropertyValue("button");
		const minText = $(this).markoutPropertyValue("min-text");
		const placeholder = $(this).markoutPropertyValue("placeholder");
		const rows = $(this).markoutPropertyValue("rows");

		if (button.length >= 1) {
			$(this).attr("data-button", button);
		}

		if (minText.length >= 1) {
			$(this).attr("data-min-text", minText);
		}

		if (placeholder.length >= 1) {
			$(this).attr("data-placeholder", placeholder);
		}

		if (rows.length >= 1) {
			$(this).attr("data-rows", rows);
		}
	});

};