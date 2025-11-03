export default applyMarkoutMap;

function replaceMarkout($, $start, $end, wrapper) {
	$end.each(function() {
		const $contents = $(this).prevUntil($start);
		$contents.prev().remove();
		$contents.next().remove();
		$contents.wrapAllReversed(wrapper);
	});
}

function applyMarkoutMap($, markoutMap) {
	const expectedMarkerTags = "p, h1, h2, h3, h4, h5, h6";
	const markerNames = Object.keys(markoutMap.wrappers);

	for (const markerName of markerNames) {
		const markerStart = markoutMap.start + markerName;
		const markerEnd = markoutMap.end + markerName;
		const $start = $(expectedMarkerTags).filterMarkers(markerStart);
		const $end = $(expectedMarkerTags).filterMarkers(markerEnd);
		const wrapper = markoutMap.wrappers[markerName];

		if($start.length) {
			replaceMarkout($, $start, $end, wrapper);
		}
	}
}
