import { imageBasePath, rawCategories } from "./products";

// Image paths are derived from content/products.json rather than kept in their
// own map. Each product in that file carries its own `image` filename, so
// changing a product and its artwork is one edit in one place.
//
// WHY THE ARTWORK IS WHAT IT IS
//
// The first set (8 auto-traced renders on a near-black backdrop, reused across
// ~24 slots) could not be salvaged. Two client requests were impossible in it:
//
//  1. The NORD wordmark was compressed away (their point about image 6).
//  2. The black background could not be removed. The tracer had collapsed each
//     product's dark faces and the backdrop into a single shape, so both
//     flood-filling the raster and deleting the backdrop path from the vector
//     punch a hole through the product — 63% of the bounding box renders empty,
//     measured. Not a masking job; the faces would have had to be repainted.
//
// The current set is NORD's own product photography from the client-supplied
// flyer, one render per product, trimmed and saved as WebP on opaque white.
// White is baked in rather than left transparent because next/image treats
// alpha differently depending on whether sharp is installed (Vercel keeps
// WebP, a bare local install falls back to a JPEG encoder), and baking it makes
// both paths identical.
//
// MAPPING PROVENANCE
//   pages 4-5  by product characteristics — die-cast aluminium reads silver,
//              UNICASE cast iron reads blue, which disambiguates every entry
//   page 7     by layout position, confirmed by the finless smooth-motor
//              render landing on the "Smooth Motors" slot
//   pages 8-9  by layout position on the page
//
// UNVERIFIED: the SK 250E / SK 200E / SK 180E / SK 135E renders are visually
// near-identical grey enclosures, mapped by page position rather than by
// recognising the unit. Worth a client check before print use.

const resolve = (file: string | null): string | undefined =>
  file ? `${imageBasePath}/${file}` : undefined;

/** Category slug -> hero/card image */
export const categoryImages: Record<string, string> = Object.fromEntries(
  rawCategories
    .map((c) => [c.slug, resolve(c.image)])
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
);

/**
 * Sub-product title -> card image.
 *
 * Keyed by title because that is what the card components have to hand. A
 * product whose `image` is null falls through to `<ImagePlaceholder />`, so a
 * missing render shows up as an obvious empty slot rather than silently
 * borrowing another product's photograph.
 */
export const subProductImages: Record<string, string> = Object.fromEntries(
  rawCategories
    .flatMap((c) => c.products)
    .map((p) => [p.title, resolve(p.image)])
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
);

export function getCategoryImage(slug: string): string | undefined {
  return categoryImages[slug];
}

export function getSubProductImage(title: string): string | undefined {
  return subProductImages[title];
}
