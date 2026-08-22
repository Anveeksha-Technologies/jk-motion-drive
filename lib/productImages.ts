// Client-supplied product renders, delivered as SVG.
// Source files live in /product-images; the versions served from
// /public/images/products are the same artwork optimised for the web.
//
// NOTE: the client supplied 8 images for ~24 product slots, so some images are
// reused across related products. Swap the paths below as more artwork
// arrives — nothing else needs to change.
//
// KNOWN ISSUE (raised by the client, Aug 2026): in 06-geared-motors-range the
// NORD wordmark is illegible. The served file is an SVG wrapping a lossy
// 1200px WebP, and the NORD gear-and-arrow mark survives on the terminal boxes
// but the wordmark next to it is compressed away. The 3.5 MB source in
// /product-images is an auto-trace of the same photograph at only 1.33x, so
// re-exporting cannot recover it — this needs a higher-resolution render from
// the NORD press kit. Until that lands, ProductCard stamps a NORD DRIVESYSTEMS
// badge over the artwork so the brand still reads on every card.

const P = "/images/products";

export const productImages = {
  integratedDrive: `${P}/01-integrated-drive.svg`,
  industrialGearUnitMotor: `${P}/02-industrial-gear-unit-motor.svg`,
  helicalInline: `${P}/03-helical-inline.svg`,
  parallelShaft: `${P}/04-parallel-shaft.svg`,
  groupInverter: `${P}/05-product-group-inverter.svg`,
  gearedMotorsRange: `${P}/06-geared-motors-range.svg`,
  helicalBevel: `${P}/07-helical-bevel.svg`,
  industrialGearUnit: `${P}/08-industrial-gear-unit.svg`,
} as const;

/** Category slug -> hero/card image */
export const categoryImages: Record<string, string> = {
  "gear-units-geared-motors": productImages.gearedMotorsRange,
  "electric-motors": productImages.helicalInline,
  "drive-electronics": productImages.groupInverter,
  "complete-drive-systems": productImages.integratedDrive,
};

/**
 * Sub-product title -> card image.
 *
 * Keys must match `SubProduct.title` in lib/products.ts exactly; a miss just
 * falls through to `<ImagePlaceholder />`, so renames fail visibly rather than
 * silently serving the wrong render.
 */
export const subProductImages: Record<string, string> = {
  // Gear Units & Geared Motors
  "NORDBLOC.1 Helical Gear Units": productImages.helicalInline,
  "UNICASE Helical Gear Units": productImages.helicalInline,
  "UNICASE Parallel Shaft Gear Units": productImages.parallelShaft,
  "UNICASE Bevel Gear Units": productImages.helicalBevel,
  "NORDBLOC.1 2-Stage Bevel Gear Units": productImages.helicalBevel,
  "UNICASE Helical Worm Gear Units": productImages.gearedMotorsRange,
  "UNIVERSAL SI Worm Gear Units": productImages.gearedMotorsRange,
  "UNIVERSAL SMI Worm Gear Units": productImages.gearedMotorsRange,
  "MAXXDRIVE Industrial Gear Units": productImages.industrialGearUnit,

  // Electric Motors
  "Energy-Saving Motors": productImages.industrialGearUnitMotor,
  "Switchable Pole Motors": productImages.helicalInline,
  "Single Phase Motors": productImages.parallelShaft,
  "Smooth Motors": productImages.integratedDrive,
  "Explosion Protected Motors — Gas Atmospheres": productImages.industrialGearUnitMotor,
  "Explosion Protected Motors — Dust Atmospheres": productImages.helicalBevel,

  // Drive Electronics
  "NORDAC PRO SK 500E": productImages.groupInverter,
  "NORDAC LINK SK 250E": productImages.groupInverter,
  "NORDAC FLEX SK 200E": productImages.integratedDrive,
  "NORDAC BASE SK 180E": productImages.groupInverter,
  "NORDAC START SK 135E": productImages.integratedDrive,

  // Complete Drive Systems
  "Complete Drive Solutions from a Single Source": productImages.integratedDrive,
  "NORD 4.0 READY Intelligent Drive Units": productImages.groupInverter,
  "nsd tupH Surface-Treated Drives": productImages.gearedMotorsRange,
  "Plug-and-Play Connection Systems": productImages.integratedDrive,
};

export function getCategoryImage(slug: string): string | undefined {
  return categoryImages[slug];
}

export function getSubProductImage(title: string): string | undefined {
  return subProductImages[title];
}
