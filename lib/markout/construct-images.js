import fs from "fs";
import path from "path";
import chalk from "chalk";

const previewImageTag = "_dewordify_";
export default constructImages;

function constructImages($, markoutMap) {

	$("p img").each(function () {
		const $p = $(this).closest("p");
		const $img = $p.find("img");
		$p.before($img.clone());
		$img.remove();
		if ($p.text().trim() === "") {
			$p.remove();
		}
	});

	$("figure.img").each(function () {
        const title = $(this).markoutPropertyValue("title");
        const alt = $(this).markoutPropertyValue("alt");
		const src = $(this).markoutPropertyValue("source") || $(this).markoutPropertyValue("file");
		const license = $(this).markoutPropertyValue("licence") || $(this).markoutPropertyValue("license");

		let $image = $(this).find("img");
		if ($image.length === 0) {
			$image = $("<img/>");
		}
		if ($image.length > 1) {
			console.log("\n" + chalk.bgRed(" [MARKOUT ERROR] Multiple images embedded inside #image "));
			console.log("	See: " + $("h1").text());
			const temp = $image.first().clone();
			$image.remove();
			$image = temp;
		}
		const $img = $image.clone();
		$image.remove();

		// Remaining Contents are Caption
		const $figcaption = $("<figcaption>");
		const $remains = $(this).children();
		$remains.each(function () {
			if ($(this).text().length === 0) {
				$(this).remove();
			}
		});
		$figcaption.append($remains);

		$img.attr("alt", alt);
		if (src && src.trim().length > 0) {
			const assetsPath = path.join(process.cwd(), "assets");
			let dir = [];
			if (fs.existsSync(assetsPath)) {
				dir = fs.readdirSync(assetsPath);
			}
			if (dir.indexOf(src) === -1 && $img.attr("src")) {
				const previewImageName = previewImageTag + src;
				const oldPath = path.join(process.cwd(), $img.attr("src"));
				const newPath = path.join(process.cwd(), "assets", previewImageName);

				fs.rename(oldPath, newPath, function (err) {
					if (err) {
						console.log("Error renaming file");
						console.log("	" + path.relative(process.cwd(),oldPath));
						console.log("	" + path.relative(process.cwd(),newPath));
					}
				});
				$img.addClass("preview");
				$img.attr("src", "assets/" + previewImageName);
			} else {
                const regex = RegExp("^((http|https|ftp):)");
                if (regex.test(src)){
                    $img.attr("src", src);
                } else {
                    $img.attr("src", "assets/" + src);
                }
			}
        }
        if(title) {
            const $title = $("<h2>").text(title);
            $(this).append($title);
        }

		$(this).append($img);

		if (license && license.trim().length > 0) {
			$figcaption.append("<footer><small class='license'>" + license + "</small></footer>");
		}

		if ($figcaption.text().trim().length > 0) {
			$(this).append($figcaption);
		}

	});

	// Wrap images that lack figures
	$("img").each(function () {
		if ($(this).parents("figure.img").length === 0) {
			$(this).wrap(markoutMap.wrappers.image);
		}
	});


}
