export default constructMath;

function constructMath($) {

	$("figure.math").each(function () {
		// Remaining Contents are Caption
		const $figcaption = $("<figcaption>");
		const $captions = $(this).children().not($(this).children().first());
		$captions.each(function () {
			if ($(this).text().length === 0) {
				$(this).remove();
			}
		});
		$figcaption.append($captions);

		if ($figcaption.text().trim().length > 0) {
			$(this).append($figcaption);
		}
	});

}
