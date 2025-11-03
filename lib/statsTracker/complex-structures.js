import chalk from "chalk";

export default reportComplexStructures;

function reportComplexStructures($) {
	let structures = [];

	const pageCount = $("h1").length;
	let pageHint = "";
	if (pageCount > 0) {
		pageHint = " (~" + getWordsPerPage($) + " words/page)";
	}
	structures.push({
		name: "Pages",
		count: pageCount,
		hint: pageHint
	});

	structures.push({
		name: "Images",
		count: $("img").length
	});
	structures.push({
		name: "Audio",
		count: $("figure.audio").length
	});
	structures.push({
		name: "Videos",
		count: $("figure.video").length
	});
	const tableCount = $("table").length;
	let tableHint = "";
	if (tableCount > 0) {
		tableHint = " (~" + parseInt($("td").length / tableCount) + " cells/table)";
	}
	structures.push({
		name: "Tables",
		count: tableCount,
		hint: tableHint
	});

	let adjacentListCounter = 0;
	$("ol,ul").each(function () {
		let tagName = null;
		if (this.next) {
			tagName = this.next.name;
		}
		if (tagName === "ol" || tagName === "ul") {
			adjacentListCounter++;
		}
	});

	const listCount = $("ol, ul").length;
	let listHint = "";
	if (listCount > 0) {
		listHint = " (~" + parseInt($("li").length / listCount) + " items/list) ";
	}
	listHint += adjacentListCounter + " adjacent lists";
	structures.push({
		name: "Lists",
		count: listCount,
		hint: listHint
	});

	// Remove structures with 0 count
	structures = structures.filter(function (item) {
		if (item.count === 0) {
			return false;
		}
		return true;
	});


	console.log("\n" + chalk.bgGreen(" [INFO] Summary "));

	structures.forEach(function (structure) {
		if (structure.name === "Tables") {
			console.log();
		}
		let text = "	";
		text += structure.name;
		text += ":	";
		text += structure.count;
		if (structure.hint) {
			text += chalk.gray(structure.hint);
		}
		console.log(text);
	});
}

function getWordsPerPage($) {
	const $html = $("<div>" + $.html() + "</div>");
	$html.find("*").each(function () {
		$(this).append(" ");
	});
	const text = $html.text();
	text.replace(/\s*/, " ");
	const words = text.split(" ").length;
	const pageCount = $("h1").length;

	return pageCount > 0 ? parseInt(words / pageCount) : 0;
}
