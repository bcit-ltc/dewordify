import path from "path";
import fs from "fs";
import cheerio from "../cheerio-loader/index.js";
import htmlWriter from "../html-writer/index.js";

export default function () {
	const thisFolder = process.cwd();
	const assetsFolder = path.join(thisFolder, "assets");
	const promises = [];

	let htmlFiles = fs.readdirSync(thisFolder);
	let assetFiles = [];
	if (fs.existsSync(assetsFolder)) {
		assetFiles = fs.readdirSync(assetsFolder);
	}

	htmlFiles = htmlFiles.filter(filterHTML);

	htmlFiles.forEach(function (item) {
		promises.push(promiseToUpdate(item));
	});

	// Create promises for every asset
	assetFiles.forEach(function (item) {
		promises.push(promiseToRename(item));
	});

	Promise.all(promises).then(function (values) {
		const htmlPages = values.filter(function (item) {
			return item instanceof htmlFile;
		});


		const assetFiles = values.filter(function (item) {
			return item instanceof assetFile;
		});

		const htmlChanges = [];
		const assetChanges = [];
		const htmlSkipped = [];
		const assetSkipped = [];

		htmlPages.forEach(function (item) {
			item.assetPaths.forEach(function (assetPath) {
				if (assetPath.path === assetPath.newPath) {
					pushUnique(htmlSkipped, assetPath.newPath);
				} else {
					pushUnique(htmlChanges, assetPath.newPath);
				}
			});
		});

		assetFiles.forEach(function (item) {
			if (item.renamed) {
				pushUnique(assetChanges, path.relative(thisFolder, item.newPath));
			} else {
				pushUnique(assetSkipped, path.relative(thisFolder, item.newPath));
			}
		});

		const allHTML = htmlChanges.concat(htmlSkipped);
		const allAssets = assetChanges.concat(assetSkipped);

		const missingFiles = allHTML.filter(function (item) {
			return allAssets.indexOf(item) === -1;
		});

		const unknownAssets = allAssets.filter(function (item) {
			return allHTML.indexOf(item) === -1;
		});

		console.log("missingFiles", missingFiles);
		console.log("unknownAssets", unknownAssets);

	}).catch(function (err) {
		console.log(err);
	});

	function pushUnique(array, item) {
		if (array.indexOf(item) === -1) {
			array.push(item);
			return true;
		}
		return false;
	}

	function filterHTML(item) {
		if (path.extname(item) === ".html") {
			return true;
		}
		return false;
	}

	function assetFile(item) {
		this.name = item;
		this.error = false;
		this.path = path.join(assetsFolder, item);
		this.newName = getNewFileName(item);
		this.newPath = path.join(assetsFolder, getNewFileName(item));
		this.renamed = false;
	}

	function htmlPath(item) {
		const self = this;
		this.path = item;
		this.newPath = null;
		this.init = function () {
			const ext = path.extname(self.path);
			const dir = path.dirname(self.path);
			const basename = path.basename(self.path, ext);
			const newName = getNewFileName(basename);
			self.newPath = path.join(dir, newName + ext);
		};
	}

	function htmlFile(item) {
		this.error = false;
		this.name = item;
		this.path = path.join(thisFolder, item);
		this.assetPaths = [];
	}

	function getNewFileName(fileName) {
		const ext = path.extname(fileName);
		const basename = path.basename(fileName, ext);
		const escaped = JSON.stringify(basename);
		const dirtyWords = escaped.replace(/(-|_)/g, " ").replace(/\s+/g, " ").split(" ");
		const cleanWords = dirtyWords.map(function (word) {
			return word.replace(/\W/g, "");
		});

		const combined = cleanWords.join("-");
		return combined + ext;
	}

	function promiseToRename(item) {
		return new Promise(function (resolve) {
			const file = new assetFile(item);

			if (file.path === file.newPath) {
				resolve(file);
			} else {
				fs.rename(file.path, file.newPath, function (err) {
					if (err) {
						file.error = true;
						resolve(file);
					} else {
						file.renamed = true;
						resolve(file);
					}
				});
			}
		});
	}

	function promiseToUpdate(item) {
		return new Promise(function (resolve) {
			const file = new htmlFile(item);

			fs.readFile(file.path, function (err, data) {
				if (err) {
					file.error = err;
					resolve(file);
				}
				const $ = cheerio.load(data);

				$("[href],[src]").each(function () {
					let attribute = "href";
					let value = $(this).attr(attribute);
					if (!value) {
						attribute = "src";
						value = $(this).attr(attribute);
					}
					if (!value) {
						return; // Skip if no href or src
					}
					// normalize
					value = decodeURI(value);
					value = path.relative(thisFolder, value);

					if (value.startsWith("assets")) {
						const assetPath = new htmlPath(value);
						assetPath.init();
						$(this).attr(attribute, assetPath.newPath);
						file.assetPaths.push(assetPath); // Only unique!!
					}
				});

				htmlWriter(file.path,$.html(), function(writeErr) {
					if (writeErr) {
						file.error = writeErr;
						resolve(file);
					} else {
						resolve(file);
					}
				});
			});
		});
	}

};
