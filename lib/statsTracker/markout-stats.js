import chalk from "chalk";

export default reportMarkoutStats;

// Reports the number of items created using the markoutMap
function reportMarkoutStats($, markoutMap) {
	let markers = getmarkers($, markoutMap);

	markers = filterIgnored(markers, markoutMap);
	markers = filterEmpty(markers);
	markers = sortMarkers(markers);

	console.log("\n" + chalk.bgGreen(" [INFO] Learning Blocks "));
	markers.forEach(function (marker) {
		console.log(`	${marker.name}: ${marker.count}`);
	});
}

// Returns an array of marker objects which have name and count properties
function getmarkers($, markoutMap) {
	const markers = Object.keys(markoutMap.wrappers);
	const markerObjects = [];
	// Loop through markers
	for (const marker of markers) {
		const obj = {};

		obj.name = markoutMap.start + marker;
		obj.count = getCount($, markoutMap, marker);

		markerObjects.push(obj);
	}
	return markerObjects;
}

// Reverse engineers the wrapper for a marker to determine the number created
function getCount($, markoutMap, marker) {
	const wrapper = markoutMap.wrappers[marker];
	let selector = "." + $(wrapper).attr("class");

	// if there are multiple classes, join them with dots
	selector = selector.replace(/\s+/g, " ").split(" ").join(".");

	if (selector === ".undefined") {
		// If there isn't a class, use the tag name
		selector = $(wrapper)[0].tagName;
	}
	return $(selector).length;
}

// Remove markers that will be counted as complex structures
// NOTE: This is the hackiest approach, but we wanted log these separately because they tend to cost more time to deal with.  It's definitely BCIT-centric...
function filterIgnored(markers, markoutMap) {
	let filtered = markers;
	let ignored = ["table", "video", "audio", "image"];
	ignored = ignored.map(function (item) {
		return markoutMap.start + item;
	});

	filtered = filtered.filter(function (item) {
		if (ignored.includes(item.name)) {
			return false;
		}
		return true;
	});
	return filtered;
}

// Remove markers with 0 count
function filterEmpty(markers) {
	return markers.filter(function (item) {
		return item.count !== 0;
	});
}

// Sort markers by count decending
function sortMarkers(markers) {
	// Sort descending by count
	return markers.sort(function (a, b) {
		return b.count - a.count;
	});
}
