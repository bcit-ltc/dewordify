import mediaType from "./media-types.js";

export default constructVideo;

function constructVideo($) {

	$("figure.video").each(function () {
        let src = $(this).markoutPropertyValue("source") || $(this).markoutPropertyValue("file");
        const license = $(this).markoutPropertyValue("licence") || $(this).markoutPropertyValue("license");

        let $video, $source;
        const type = mediaType("video", src);

        if (type) {
            if(type === "link") {
                const regex = RegExp("(youtube.com|youtu.be)");
                if (regex.test(src)){ // Check if it's youtube link
                    let start_index = src.indexOf("v=");
                    let youtubeId = "";
                    if(start_index === -1){
                        youtubeId = src.split("&")[0];
                        youtubeId = youtubeId.substr(youtubeId.length - 11);
                    } else {
                        start_index += 2;
                        const end_index = start_index + 11;
                        youtubeId = src.substring(start_index, end_index);
                    }
                    src = "https://www.youtube.com/embed/" + youtubeId;
                }
                $video = $("<iframe>").attr({"src": src, "frameborder": "0", "allowfullscreen": ""});
            } else {
                $video = $("<video controls></video>");
                $source = $("<source>").attr({"src": "assets/" + src, "type": type });
                $video.append($source);
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

        $(this).append($video);

		if (license && license.trim().length > 0) {
			$figcaption.append("<footer><small class='license'>" + license + "</small></footer>");
		}

		if ($figcaption.text().trim().length > 0) {
			$(this).append($figcaption);
		}
	});

}
