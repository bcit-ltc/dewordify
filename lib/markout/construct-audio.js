import mediaType from "./media-types.js";

export default constructAudio;

function constructAudio($) {

	$("figure.audio").each(function () {
        const src = $(this).markoutPropertyValue("source") || $(this).markoutPropertyValue("file");
		const license = $(this).markoutPropertyValue("licence") || $(this).markoutPropertyValue("license");

        let $audio, $source;
        const type = mediaType("audio", src);

        if (type) {
            if(type === "link"){
                $audio = $("<iframe>").attr({"src": src, "frameborder": "0", "allowfullscreen": ""});
            } else {
                $audio = $("<audio controls></audio>");
                $source = $("<source>").attr({"src": "assets/" + src, "type": type });
                $audio.append($source);
            }
        }

		// Remaining Contents are Caption
		const $figcaption = $("<figcaption>");
		const $remains = $(this).children();
		$remains.each(function () {
			if ($(this).text().length === 0) {
				$(this).remove();
			}
		});
		$figcaption.append($remains);


		$(this).append($audio);

		if (license && license.trim().length > 0) {
			$figcaption.append("<footer><small class='license'>" + license + "</small></footer>");
		}

		if ($figcaption.text().trim().length > 0) {
			$(this).append($figcaption);
		}
	});

}
