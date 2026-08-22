// Product artwork — official NORD renders lifted from the client-supplied
// flyer (F1300), one per product, on transparent/white backgrounds.
//
// WHY THESE REPLACED THE EARLIER ARTWORK
//
// The first set (public/images/products/*.svg) was 8 auto-traced renders on a
// near-black backdrop, reused across ~24 slots. Two problems the client raised
// could not be fixed in them:
//
//  1. The NORD wordmark was compressed away (their point about image 6).
//  2. The black background could not be removed. The tracer had collapsed the
//     product's own dark faces and the backdrop into a single shape, so both
//     flood-filling the raster and deleting the backdrop path from the vector
//     punch a hole through the product — 63% of the bounding box renders empty.
//     Not a masking job; the faces would have to be repainted.
//
// The flyer carries NORD's own product photography with real alpha, one image
// per product. Native resolution is modest (~200px), so each is trimmed to the
// product, upscaled 2x with Lanczos and saved as WebP with alpha — 6-38 KB
// each. At the ~377px the cards actually render, they read cleanly, and they
// are the correct product rather than a related one.
//
// MAPPING PROVENANCE
//   pages 4-5  by product characteristics (die-cast aluminium = silver,
//              UNICASE cast iron = blue), which disambiguates every entry
//   page 7     by layout position, confirmed by the finless smooth-motor
//              render landing on the "Smooth Motors" slot
//   pages 8-9  by layout position on the page
//
// UNVERIFIED: the SK 250E / SK 200E / SK 180E / SK 135E renders are visually
// similar grey boxes, mapped by page position rather than by recognising the
// unit. Worth a client check before print use.

const P = "/images/products/nord";

export const productImages = {
  // Gear units
  nordblocHelical: `${P}/nordbloc-helical.webp`,
  unicaseHelical: `${P}/unicase-helical.webp`,
  unicaseParallelShaft: `${P}/unicase-parallel-shaft.webp`,
  unicaseBevel: `${P}/unicase-bevel.webp`,
  nordblocBevel2Stage: `${P}/nordbloc-bevel-2stage.webp`,
  unicaseHelicalWorm: `${P}/unicase-helical-worm.webp`,
  universalSiWorm: `${P}/universal-si-worm.webp`,
  universalSmiWorm: `${P}/universal-smi-worm.webp`,
  maxxdrive: `${P}/maxxdrive.webp`,
  maxxdriveComponents: `${P}/maxxdrive-components.webp`,
  // Motors
  motorEnergySaving: `${P}/motor-energy-saving.webp`,
  motorSwitchablePole: `${P}/motor-switchable-pole.webp`,
  motorSinglePhase: `${P}/motor-single-phase.webp`,
  motorSmooth: `${P}/motor-smooth.webp`,
  motorExGas: `${P}/motor-ex-gas.webp`,
  motorExDust: `${P}/motor-ex-dust.webp`,
  // Drive electronics
  nordacPro: `${P}/nordac-pro-sk500e.webp`,
  nordacLink: `${P}/nordac-link-sk250e.webp`,
  nordacFlex: `${P}/nordac-flex-sk200e.webp`,
  nordacBase: `${P}/nordac-base-sk180e.webp`,
  nordacStart: `${P}/nordac-start-sk135e.webp`,
  // Systems
  completeDrivePackage: `${P}/complete-drive-package.webp`,
  nsdTuphGearUnit: `${P}/nsd-tuph-gear-unit.webp`,
  nsdTuphInverter: `${P}/nsd-tuph-inverter.webp`,
} as const;

/** Category slug -> hero/card image */
export const categoryImages: Record<string, string> = {
  "gear-units-geared-motors": productImages.unicaseHelical,
  "electric-motors": productImages.motorEnergySaving,
  "drive-electronics": productImages.nordacPro,
  "complete-drive-systems": productImages.completeDrivePackage,
};

/**
 * Sub-product title -> card image. One render per product now, so nothing is
 * reused inside a category.
 *
 * Keys must match `SubProduct.title` in lib/products.ts exactly; a miss falls
 * through to `<ImagePlaceholder />`, so renames fail visibly rather than
 * silently serving the wrong product.
 */
export const subProductImages: Record<string, string> = {
  // Gear Units & Geared Motors
  "NORDBLOC.1 Helical Gear Units": productImages.nordblocHelical,
  "UNICASE Helical Gear Units": productImages.unicaseHelical,
  "UNICASE Parallel Shaft Gear Units": productImages.unicaseParallelShaft,
  "UNICASE Bevel Gear Units": productImages.unicaseBevel,
  "NORDBLOC.1 2-Stage Bevel Gear Units": productImages.nordblocBevel2Stage,
  "UNICASE Helical Worm Gear Units": productImages.unicaseHelicalWorm,
  "UNIVERSAL SI Worm Gear Units": productImages.universalSiWorm,
  "UNIVERSAL SMI Worm Gear Units": productImages.universalSmiWorm,
  "MAXXDRIVE Industrial Gear Units": productImages.maxxdrive,

  // Electric Motors
  "Energy-Saving Motors": productImages.motorEnergySaving,
  "Switchable Pole Motors": productImages.motorSwitchablePole,
  "Single Phase Motors": productImages.motorSinglePhase,
  "Smooth Motors": productImages.motorSmooth,
  "Explosion Protected Motors — Gas Atmospheres": productImages.motorExGas,
  "Explosion Protected Motors — Dust Atmospheres": productImages.motorExDust,

  // Drive Electronics
  "NORDAC PRO SK 500E": productImages.nordacPro,
  "NORDAC LINK SK 250E": productImages.nordacLink,
  "NORDAC FLEX SK 200E": productImages.nordacFlex,
  "NORDAC BASE SK 180E": productImages.nordacBase,
  "NORDAC START SK 135E": productImages.nordacStart,

  // Complete Drive Systems
  "Complete Drive Solutions from a Single Source": productImages.completeDrivePackage,
  "NORD 4.0 READY Intelligent Drive Units": productImages.nordacFlex,
  "nsd tupH Surface-Treated Drives": productImages.nsdTuphGearUnit,
  "Plug-and-Play Connection Systems": productImages.nordacLink,
};

export function getCategoryImage(slug: string): string | undefined {
  return categoryImages[slug];
}

export function getSubProductImage(title: string): string | undefined {
  return subProductImages[title];
}
