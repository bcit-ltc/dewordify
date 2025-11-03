export default function ($) {
	// Combines adjacent lists into one list
	$("ol + ol, ul + ul").each(function () {
		const html = $(this).prev().html();
		$(this).prepend(html);
		$(this).prev().remove();
	});
};
