"use strict";

var fs = require("fs");
var cheerio = require("../cheerio-loader");

var complexStructures = require("./complex-structures");
var markoutStats = require("./markout-stats");

module.exports = finalReport;

function finalReport(htmlArray, markoutMapPath) {
	var $ = cheerio.load("<temp>" + htmlArray.join("") + "<temp>");
	var jsonContent = fs.readFileSync(markoutMapPath, "utf8");
	var markoutMap = JSON.parse(jsonContent);
	complexStructures($);
	markoutStats($, markoutMap);

	return;
}
