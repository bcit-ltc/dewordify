import mammoth from "mammoth";
import fs from "fs";
import path from "path";

function imageConversion() {
	const outputDir = process.cwd() + "/assets";
	let imageID = 1;
	ensureDirectory(outputDir);

	return mammoth.images.inline(function (element) {
		const fileName = getFileName(element, imageID);
		imageID++;
		const imageDestination = path.join(outputDir, fileName);
		const srcAttribute = path.relative(process.cwd(), imageDestination).split("\\").join("/");

		return element.read().then(function (imageBuffer) {
			fs.writeFile(imageDestination, imageBuffer, function (err) {
				if (err) {
					console.log("Error Moving Image to ", imageDestination);
				}
			});
			return {
				src: srcAttribute
			};
		});
	});
}

function getFileName(element, imageID) {
	const extension = element.contentType.split("/")[1];
	const fileName = imageID + "." + extension;
	return fileName;
}

function ensureDirectory(dir) {
	try {
		fs.mkdirSync(dir);
	} catch (err) {
		if (err.code !== "EEXIST") {
			throw err;
		}
	}
}


export default imageConversion;
