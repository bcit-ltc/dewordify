export default function ($, markoutMap) {
	const expectedMarkerTags = "p, h1, h2, h3, h4, h5, h6";
	const mappedNames = Object.keys(markoutMap.mappings);

	// Update mapped markers
	for (const mappedName of mappedNames) {
		// Start Marker
		const markerStart = markoutMap.start + mappedName;
		const $start = $(expectedMarkerTags).filterMarkers(markerStart);
		const newMarkerStart = markoutMap.start + markoutMap.mappings[mappedName];
		$start.text(newMarkerStart);

		// End Marker
		const markerEnd = markoutMap.end + mappedName;
		const $end = $(expectedMarkerTags).filterMarkers(markerEnd);
		const newMarkerEnd = markoutMap.end + markoutMap.mappings[mappedName];
		$end.text(newMarkerEnd);
	}
};
