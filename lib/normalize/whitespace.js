export default function ($) {
	// Replace all &nbsp; with spaces.
	$("*").each(function () {
		const $this = $(this);
		$this.html($this.html().replace(/&nbsp;/g, ' '));
	});

	// Replace a series of any whitespace characters with a single space.
	$("*").each(function () {
		const $this = $(this);
		$this.html($this.html().replace(/\s{2,}/g, ' '));
	});
};
