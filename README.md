# Dewordify v2

Converts MS Word documents (.docx) into HTML pages. Runs entirely in the
browser as a web app, or locally as a command-line tool. Both use the same
conversion pipeline in `src/core`.

## Web App

```
npm install
npm run dev
```

Open the printed URL, drop a `.docx` file, convert, and download a zip
containing the HTML pages and `assets/` folder.

The web build is fully static — `npm run build` outputs to `dist-web/`,
which can be hosted on any static file server.

### Known limitations (web)

- Files referenced by `File:`/`Source:` markout properties or linked-file
  page titles must live in an `assets/` folder next to the document. The
  CLI reads that folder automatically; the web app does not (yet) support
  supplying extra asset files.
- Images embedded in the docx are extracted into the zip automatically.

## CLI

**Requirements:** [Node.js](https://nodejs.org) 24 or later (includes npm).

```
npm install
npm run build:cli
npm install -g .
```

Then, from the folder containing your Word document:

```
dewordify              # convert the most recently modified .docx
dewordify file.docx    # convert a specific file
estimate file.docx     # report stats without writing files
munch                  # sanitize html/asset filenames in place
strip                  # remove <!--NOTE: comments from html files
```

During development you can run the CLI without building:

```
npm run cli -- path/to/file.docx
```

### Customization

The CLI searches the working directory and up to 3 parent folders for:

- `template.html` — page template
- `styleMap.txt` — additional mammoth style mappings (appended to defaults)
- `markoutMap.json` — markout marker definitions (replaces defaults)

Defaults for all three are bundled in `src/core/defaults.ts`.

## Project Layout

```
src/core/    environment-agnostic conversion pipeline (no Node/browser APIs)
src/cli/     Node adapter: filesystem IO, mammoth (Node), commands
src/web/     browser adapter: mammoth browser build, React UI, zip download
bin/         CLI entry points (import from dist/)
tests/       vitest suite with sample .docx fixtures
```

## Development

```
npm test             # run vitest suite
npm run build        # web build -> dist-web/
npm run build:cli    # CLI build -> dist/
```

## Docker

### Development

Runs Vite dev server with HMR on port 9000, with the source directory mounted
into the container:

```
docker compose up --build
```

Open http://localhost:9000

### Production

Builds the static web app and serves it via nginx on port 8080:

```
docker compose -f docker-compose.prod.yml up --build
```

Open http://localhost:8080

The production image includes a `/healthz` endpoint for container health
checks.
