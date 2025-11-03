import mammoth from "mammoth";
import imageConversion from "./image-conversion.js";
import getStyleMap from "./get-stylemap.js";

export default readFile;

function readFile(docxPath, styleMapPath) {
	const options = {
		styleMap: getStyleMap(styleMapPath),
		convertImage: imageConversion()
	};

	const result = mammoth.convertToHtml({
		path: docxPath
	}, options);

	return result;
}
