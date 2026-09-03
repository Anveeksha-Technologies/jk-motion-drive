import type { Metadata } from "next";
import { site } from "./site";

// One place for everything a crawler or a model reads about this site.
//
// Before this module the site shipped a single root title and no canonical, no
// OpenGraph, no sitemap and no structured data, so every route presented itself
// to search as the home page. The helpers here are deliberately small: a
// metadata builder that fills in the repetitive parts, and JSON-LD builders fed
// from lib/site.ts so the address a crawler reads can never drift from the
// address on the Contact page.

/**
 * Canonical origin, no trailing slash.
 *
 * Env-driven so that moving the site — or building a preview on a Vercel
 * URL — does not require a code change. The default is the production domain
 * implied by the company's own email address.
 */
const FALLBACK_ORIGIN = "https://www.jkmotiondrive.com";

/**
 * Resolve the canonical origin from the environment, defensively.
 *
 * Two ways this used to break a build, both easy to do in a hosting dashboard:
 *
 *  - **An empty value.** `??` falls back only on null/undefined, so an empty
 *    string passed straight through and `new URL("")` threw during metadata
 *    collection — the build failed with "Failed to collect page data", which
 *    names a page and says nothing about the real cause.
 *  - **A bare domain.** Vercel shows deployment URLs without a scheme, so
 *    pasting one gives "example.vercel.app", which is not a valid URL either.
 *
 * Anything unusable falls back to the production origin rather than failing the
 * build: a wrong canonical is a fixable SEO problem, a broken build is an
 * outage.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_ORIGIN;

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    // `new URL("https://!!!")` parses happily, so check the hostname actually
    // looks like one — a dotted name, or localhost.
    const looksReal = url.hostname === "localhost" || /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(url.hostname);
    return looksReal ? url.origin : FALLBACK_ORIGIN;
  } catch {
    return FALLBACK_ORIGIN;
  }
}

export const siteUrl = resolveSiteUrl();

const absolute = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

const OG_IMAGE = "/images/logo.webp";

type BuildArgs = {
  title: string;
  description: string;
  /** Route path, e.g. "/catalogue". Used for the canonical URL. */
  path: string;
  /** Override the social preview image. Defaults to the brand lockup. */
  image?: string;
};

/**
 * Build a page's metadata.
 *
 * `title` is the page's own title; the company name is appended here rather
 * than repeated at every call site. The canonical URL is always absolute,
 * because a relative canonical on a site served from both apex and www is worse
 * than none at all.
 */
export function buildMetadata({ title, description, path, image = OG_IMAGE }: BuildArgs): Metadata {
  const url = absolute(path);
  // The layout's title template appends the company name for the <title> tag,
  // but OpenGraph and Twitter titles bypass templates and need it inline. Skip
  // the suffix when the title already names the company, so the home page reads
  // "JK Motion Drive" rather than "JK Motion Drive | JK Motion Drive".
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      locale: "en_IN",
      images: [{ url: absolute(image), width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absolute(image)],
    },
  };
}

/* ----------------------------------------------------------- structured data */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.addressParts.street,
  addressLocality: site.addressParts.locality,
  addressRegion: site.addressParts.region,
  postalCode: site.addressParts.postalCode,
  addressCountry: site.addressParts.country,
};

/** The company itself — used site-wide from the root layout. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: siteUrl,
    logo: absolute("/images/logo.webp"),
    description: site.partner,
    email: site.email,
    telephone: site.phone,
    address: postalAddress,
  };
}

/**
 * The Ahmedabad premises, for local search.
 *
 * This is the signal the nearest local competitor does not publish. `geo` is
 * intentionally absent — see the TODO on site.addressParts; an approximate
 * coordinate is worse than none, because Google will happily pin it.
 */
export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: site.name,
    image: absolute("/images/logo.webp"),
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    description: `${site.partner} — gear units, geared motors, electric motors and drive electronics supplied and supported from Ahmedabad, Gujarat.`,
    address: postalAddress,
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "18:30",
      },
    ],
    parentOrganization: { "@id": `${siteUrl}/#organization` },
  };
}

/** Breadcrumb trail for an interior page. */
export function breadcrumbLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absolute(c.path),
    })),
  };
}

/** Serialise JSON-LD for a <script> tag, escaping the sequence that ends it. */
export function ldJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
