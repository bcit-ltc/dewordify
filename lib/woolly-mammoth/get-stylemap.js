import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getStyleMap(styleMapPath) {
	const defaultMapPath = path.join(__dirname, "../../default-files", "styleMap.txt");
	let styleMap = fs.readFileSync(defaultMapPath).toString();

	if (styleMapPath !== defaultMapPath) {
		styleMap += "\n" + fs.readFileSync(styleMapPath).toString();
		styleMap = styleMap.replace("\r\n", "\n").split("\n");
	}

	return styleMap;
}

export default getStyleMap;
