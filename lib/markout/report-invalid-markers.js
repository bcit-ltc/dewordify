import chalk from "chalk";

export default reportInvalidMarkout;

function reportInvalidMarkout($, markoutMap) {
	const counter = new InvalidMarkerCounter($, markoutMap);

	counter.scan();
	counter.display();
}

function InvalidMarkerCounter($, markoutMap) {
	const expectedMarkerTags = "p, h1, h2, h3, h4, h5, h6";
	const markerNames = Object.keys(markoutMap.wrappers);
	const unknownMarkers = {};
	const missingMarkers = {};

	function scan() {
		$(expectedMarkerTags).each(function () {
			registerUnknownMarker($(this).text());
		});

		for (const markerName of markerNames) {
			const markerStart = markoutMap.start + markerName;
			const markerEnd = markoutMap.end + markerName;
			const $start = $(expectedMarkerTags).filterMarkers(markerStart);
			const $end = $(expectedMarkerTags).filterMarkers(markerEnd);

			registerMissingMarker($start, $end, markerName);
		}
	}

	function registerUnknownMarker(text) {
		if (isMarker(text) && isUnknown(text)) {
			addToUnknownMarkers(text);
		}
	}
	function registerMissingMarker($start, $end, markerName) {
		if ($start.length !== $end.length) {
			missingMarkers["#" + markerName] = $start.length;
			missingMarkers["/" + markerName] = $end.length;
		}
	}
	function isMarker(text) {
		const firstChar = text.charAt(0);
		return firstChar === markoutMap.start || firstChar === markoutMap.end;
	}

	function isUnknown(text) {
		const slice = text.slice(1);
		return markerNames.indexOf(slice) === -1;
	}

	function addToUnknownMarkers(text) {
		if (!unknownMarkers[text]) {
			unknownMarkers[text] = 0;
		}
		unknownMarkers[text]++;
	}

	function display() {
		const sortedUnknownMarkers = getSortedKeys(unknownMarkers);
		const sortedMissingMarkers = getSortedKeys(missingMarkers);

		if (sortedUnknownMarkers.length || sortedMissingMarkers.length) {

			console.log("\n", chalk.blue(`### ${$("h1").text()}`));
			if (sortedUnknownMarkers.length) {
				console.log("\n" + chalk.red("**Unknown Markers**"));
				console.log("Marker | Count");
				console.log(":-----:|:-----:");
				sortedUnknownMarkers.forEach((key) => console.log(`${key} | ${unknownMarkers[key]}`));
			}
			if (sortedMissingMarkers.length) {
				console.log("\n" + chalk.red("**Missing Markers**"));
				console.log("Marker | Count");
				console.log(":-----:|:-----:");
				sortedMissingMarkers.forEach((key) => console.log(`${key} | ${missingMarkers[key]}`));
			}

		}
	}

	function getSortedKeys(problemMarkers) {
		return Object.keys(problemMarkers).sort(function (a, b) {
			const sliceA = a.slice(1);
			const sliceB = b.slice(1);

			if (sliceA.toLowerCase() < sliceB.toLocaleLowerCase()) {
				return -1;
			}

			if (sliceA.toLowerCase() > sliceB.toLocaleLowerCase()) {
				return 1;
			}

			return 0;
		});

	}

	return {
		scan,
		display
	};
}
