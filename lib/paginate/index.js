import cheerioLoader from "../cheerio-loader/index.js";

export default function (html) {
	console.log("PAGINATE DEBUG: Input HTML length:", html.length);
	const $ = cheerioLoader.load(html);
	console.log("PAGINATE DEBUG: H1 count in input:", $('h1').length);

	$.prototype.wrapAll = function (wrapper) {
		const $container = $(wrapper).clone();
		$(this).eq(0).before($container);

		for (let i = 0; i < this.length; i++) {
			const clone = $(this).eq(i).clone();
			const html = $("<div>" + clone + "</div>").html();
			$container.append(html);
			$(this).eq(i).remove();
		}
	};



	$("h1").first().prevAll().remove();

	$("h1").each(function () {
		// Note: addBack changes the document order and should not be used
		// @see https://github.com/cheeriojs/cheerio/issues/829
		$(this).nextUntil("h1").wrapAll("<page>");
	});

	$("page").each(function () {
		$(this).prev().prependTo($(this)); //console.log($(this).html());
	});

	$("h1").each(function() {
		if($(this).closest("page").length === 0) {
			$(this).wrap("<page>");
		}
	});

	const pages = [];
	$("page").each(function (index) {
		const pageContent = $(this).html();
		if (index < 3) {
			console.log("PAGINATE DEBUG: Page", index + 1, "content length:", pageContent ? pageContent.length : 0);
			const $page = cheerioLoader.load(pageContent);
			console.log("PAGINATE DEBUG: Page", index + 1, "H1 count:", $page('h1').length);
			console.log("PAGINATE DEBUG: Page", index + 1, "p count:", $page('p').length);
		}
		pages.push(pageContent);
	});

	console.log("PAGINATE DEBUG: Pages created:", pages.length);
	return pages;
};
