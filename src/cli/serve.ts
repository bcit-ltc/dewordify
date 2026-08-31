import http from "node:http";
import { convert, defaultStyleMap, defaultTemplate } from "../core/index.js";
import type { ConvertResult } from "../core/index.js";
import { nodeConverter } from "./converter.js";

/**
 * Start a minimal HTTP API server for pipeline integration.
 *
 * Endpoints:
 *   GET  /health  — health check
 *   POST /convert — convert a .docx file (raw binary body)
 *
 * The /convert response is JSON:
 *   { files: [{ filename, data(base64) }], stats, messages }
 */
export function serve(port: number) {
	const server = http.createServer(async (req, res) => {
		if (req.method === "GET" && req.url === "/health") {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ status: "ok" }));
			return;
		}

		if (req.method === "POST" && req.url === "/convert") {
			const chunks: Buffer[] = [];
			req.on("data", (chunk: Buffer) => chunks.push(chunk));
			req.on("end", async () => {
				try {
					const buffer = Buffer.concat(chunks);
					const result: ConvertResult = await convert(new Uint8Array(buffer), {
						converter: nodeConverter,
						styleMap: defaultStyleMap,
						template: defaultTemplate,
						writePages: true,
						documentName: "document"
					});

					const payload = {
						files: result.files.map((f) => ({
							filename: f.filename,
							data: typeof f.data === "string"
								? f.data
								: Buffer.from(f.data).toString("base64")
						})),
						stats: result.stats,
						messages: result.messages
					};

					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(JSON.stringify(payload));
				} catch (err) {
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: String(err) }));
				}
			});
			return;
		}

		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Not found" }));
	});

	server.listen(port, () => {
		console.log(`Dewordify API server listening on http://localhost:${port}`);
		console.log("  POST /convert  — upload a .docx (raw binary body), get JSON back");
		console.log("  GET  /health   — health check");
		console.log("");
		console.log("Example:");
		console.log(`  curl -X POST http://localhost:${port}/convert \\`);
		console.log("    --data-binary @document.docx \\");
		console.log('    -H "Content-Type: application/octet-stream"');
	});
}
