import type { CheerioAPI } from "cheerio";

/**
 * Apply an HTML template to a page fragment.
 *
 * The template uses `{{title}}` and `{{content}}` string placeholders.
 * If the template does not contain `{{content}}`, the page HTML is
 * returned without any template wrapping.
 *
 * @param $page - The page CheerioAPI fragment (wrapped in `<temp>`)
 * @param template - The HTML template string with placeholders
 * @param fallbackTitle - Title to use if the page has no H1 heading
 * @returns The templated HTML string
 */
export function templatize($page: CheerioAPI, template: string, fallbackTitle = "") {
	const title = $page("h1").text().trim() || fallbackTitle;
	const pageHtml = $page("temp").html() ?? "";

	if (template.includes("{{content}}")) {
		return template
			.replace("{{title}}", title)
			.replace("{{content}}", pageHtml);
	}

	return pageHtml;
}
