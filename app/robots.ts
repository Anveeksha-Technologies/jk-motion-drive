import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// A brochure site with nothing private in it, so everything is crawlable —
// including by AI assistants, which is a deliberate choice rather than an
// oversight.
//
// WHY THE AI CRAWLERS ARE LISTED EXPLICITLY
//
// `User-agent: *` already permits them, so these rules change nothing
// technically. They are here because several of these bots are *blocked by
// default* by hosting platforms, CDN bot-management rules and copy-pasted
// robots.txt templates, and because an explicit `Allow` is the only way to state
// the intent in a file that a person or a bot operator might read. If a future
// WAF rule or template starts blocking AI crawlers, this file is the record that
// the site owner wanted them in.
//
// The company's edge here is being findable when an engineer in Gujarat asks an
// assistant "who supplies NORD gear units in Ahmedabad" — so the assistants need
// to be able to read the catalogue. /llms.txt gives them a clean summary of the
// whole range without parsing the rendered table.

/** Crawlers that feed AI assistants and AI-powered search. */
const AI_CRAWLERS = [
  // OpenAI — training, live browsing on a user's behalf, and search indexing
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google's AI products (separate from Googlebot, which indexes for search)
  "Google-Extended",
  // Others in common use
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next's build output and image optimiser endpoint carry no content
        // worth indexing and only waste crawl budget.
        disallow: ["/_next/static/chunks/", "/_next/image"],
      },
      // Explicitly welcome, with the whole site available to them.
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
