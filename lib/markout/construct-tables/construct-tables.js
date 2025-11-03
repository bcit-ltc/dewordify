export default function ($) {
	// Convert markout syntax and move content into appropriate places
	$("figure.table").each(function () {
		let title = $(this).markoutPropertyValue("title");
		const license = $(this).markoutPropertyValue("licence") || $(this).markoutPropertyValue("license");

		if (!title.length) {
			const $title = $(this).children("h1,h2,h3,h4,h5,h6").first();
			title = $title.text();
			$title.remove();
		}

		const $table = $(this).find("table").clone();
		$(this).find("table").remove();


		// Remaining Contents are Caption
		const $figcaption = $("<figcaption>");
		const $remains = $(this).children();
		$remains.each(function () {
			if ($(this).text().length === 0) {
				$(this).remove();
			}
		});
		$figcaption.append($remains);

		$(this).append($table);

		if (title.length) {
			$table.prepend("<caption>" + title + "</caption>");
		}

		if (license && license.trim().length > 0) {
			$figcaption.append("<footer><small class='license'>" + license + "</small></footer>");
		}

		if ($figcaption.text().trim().length > 0) {
			$(this).append($figcaption);
		}
	});
};
