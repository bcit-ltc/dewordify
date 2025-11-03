import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Checks a folder for a file.  If it's not found, the scan will move to the parent folder and repeat until the file is found or the limit is reached.
function findClosestFile(fileName, limit = 3) {
	let dir = process.cwd();

	while (!containsFile(fileName, dir) && limit--) {
		dir = path.join(dir, "..");
	}

	return finalPath(fileName, dir);
}

// If a file exists in a directory, return the joined path, otherwise, return a path to a default path in the app root
function finalPath(fileName, dir) {
	if (containsFile(fileName, dir)) {
		return path.join(dir, fileName);
	} else {
		return path.join(__dirname, "../../default-files", fileName);
	}
}

// Checks if a file exists in a given directory
function containsFile(file, dir) {
	const filePath = path.join(dir, file);
	try {
		return fs.existsSync(filePath);
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

export default findClosestFile;
