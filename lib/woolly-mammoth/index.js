import readFile from "./read-file.js";
import displayWarnings from "./display-warnings.js";

export { readFile, displayWarnings };
export function getHTML(result) {
	return result.value;
}
