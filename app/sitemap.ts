import type { MetadataRoute } from "next";
import { productCategories } from "@/lib/products";
import { siteUrl } from "@/lib/seo";

// Built from the same data as the routes themselves, so adding a fifth product
// category to content/products.json puts it in the sitemap automatically —
// consistent with how the header dropdown, footer and contact form already
// pick up new categories.

// Static routes are given a fixed build date rather than a per-request one:
// this file is prerendered, and a lastModified that changes on every deploy
// teaches crawlers to distrust the field.
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number; frequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, frequency: "monthly" },
    { path: "/products", priority: 0.9, frequency: "monthly" },
    { path: "/catalogue", priority: 0.9, frequency: "monthly" },
    { path: "/industries", priority: 0.8, frequency: "yearly" },
    { path: "/about", priority: 0.7, frequency: "yearly" },
    { path: "/contact", priority: 0.7, frequency: "yearly" },
    { path: "/privacy", priority: 0.3, frequency: "yearly" },
    { path: "/terms", priority: 0.3, frequency: "yearly" },
    // { path: "/gallery", ... } — hidden for now, see lib/site.ts
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${siteUrl}${r.path}`,
      lastModified: BUILD_DATE,
      changeFrequency: r.frequency,
      priority: r.priority,
    })),
    ...productCategories.map((c) => ({
      url: `${siteUrl}/products/${c.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
