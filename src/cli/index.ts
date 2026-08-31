import fs from "node:fs";
import path from "node:path";
import { convert, defaultStyleMap, defaultTemplate } from "../core/index.js";
import type { MarkoutMap, Stats, Message } from "../core/index.js";
import { nodeConverter } from "./converter.js";
import { chooseDocx, findUp, loadAssets, writeOutputFiles } from "./files.js";
import { munch } from "./munch.js";
import { serve } from "./serve.js";
import { strip } from "./strip.js";

const commands = ["dewordify", "munch", "estimate", "strip", "serve"];

/**
 * Main entry point for the CLI.
 * Dispatches to the appropriate sub-command based on the command name.
 */
export async function run(command?: string, fileArg?: string) {
	const cwd = process.cwd();
	const cmd = command && commands.includes(command) ? command : "dewordify";

	switch (cmd) {
		case "munch":
			munch(cwd);
			return;
		case "strip":
			strip(cwd);
			return;
		case "serve":
			serve(fileArg ? parseInt(fileArg, 10) : 3000);
			return;
		case "estimate":
			await dewordify(cwd, fileArg, false);
			return;
		default:
			await dewordify(cwd, fileArg, true);
	}
}

/**
 * Run the dewordify conversion on a DOCX file.
 * Loads custom style maps, markout maps, and templates if found,
 * then runs the conversion pipeline and writes output files.
 */
async function dewordify(cwd: string, fileArg: string | undefined, writePages: boolean) {
	const docxPath = chooseDocx(cwd, fileArg);
	console.log("Converting " + path.basename(docxPath));

	const styleMapPath = findUp("styleMap.txt", cwd);
	const markoutMapPath = findUp("markoutMap.json", cwd);
	const templatePath = findUp("template.html", cwd);

	let styleMap = defaultStyleMap;
	if (styleMapPath) {
		const custom = fs.readFileSync(styleMapPath, "utf8").replace("\r\n", "\n").split("\n");
		styleMap = [...defaultStyleMap, ...custom];
		console.log("Using custom styleMap: " + styleMapPath);
	}

	let markoutMap: MarkoutMap | undefined;
	if (markoutMapPath) {
		markoutMap = JSON.parse(fs.readFileSync(markoutMapPath, "utf8")) as MarkoutMap;
		console.log("Using custom markoutMap: " + markoutMapPath);
	}

	let template: string | undefined;
	if (templatePath) {
		template = fs.readFileSync(templatePath, "utf8");
		console.log("Using custom template: " + templatePath);
	}

	const result = await convert(new Uint8Array(fs.readFileSync(docxPath)), {
		converter: nodeConverter,
		styleMap,
		markoutMap,
		template,
		assets: loadAssets(cwd),
		writePages,
		documentName: path.basename(docxPath).replace(/\.docx$/i, "")
	});

	printMessages(result.messages);
	printStats(result.stats);

	if (writePages) {
		writeOutputFiles(cwd, result.files);
	}
}

/** Print conversion messages to stdout with severity labels. */
function printMessages(messages: Message[]) {
	for (const message of messages) {
		const label = message.level.toUpperCase();
		console.log(`[${label}] (${message.source}) ${message.text}`);
	}
}

/** Print conversion statistics to stdout. */
function printStats(stats: Stats) {
	if (stats.structures.length) {
		console.log("\n[INFO] Summary");
		for (const structure of stats.structures) {
			console.log(`\t${structure.name}:\t${structure.count}${structure.hint ? " " + structure.hint : ""}`);
		}
	}
	if (stats.learningBlocks.length) {
		console.log("\n[INFO] Learning Blocks");
		for (const marker of stats.learningBlocks) {
			console.log(`\t${marker.name}: ${marker.count}`);
		}
	}
}
