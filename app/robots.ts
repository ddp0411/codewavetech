import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/content/site";

/**
 * AI search and assistant crawlers, allowed explicitly so the site can be
 * cited in ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews,
 * Copilot and Apple Intelligence. `*` already allows them; naming them
 * protects against a future catch-all block and tells auditors they are welcome.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: aiCrawlers, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
