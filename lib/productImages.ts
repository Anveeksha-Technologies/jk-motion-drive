// Client-supplied product renders, delivered as SVG.
// Source files live in /product-images; the versions served from
// /public/images/products are the same artwork optimised for the web.
//
// NOTE: the client supplied 8 images for ~23 product slots, so some images are
// reused across related products. Swap the paths below as more photography
// arrives — nothing else needs to change.

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

/** Sub-product title -> card image */
export const subProductImages: Record<string, string> = {
  // Gear Units & Geared Motors
  "Helical Inline Geared Motors": productImages.helicalInline,
  "Parallel Shaft Geared Motors": productImages.parallelShaft,
  "Helical Bevel Geared Motors": productImages.helicalBevel,
  "Worm Geared Motors": productImages.gearedMotorsRange,
  "Industrial Gear Units": productImages.industrialGearUnit,
  "Integrated Geared Motor Drive": productImages.integratedDrive,

  // Electric Motors
  "Asynchronous AC Motors": productImages.helicalInline,
  "Synchronous AC Motors": productImages.parallelShaft,
  "Explosion-Proof Motors": productImages.helicalBevel,
  "Brake Motors": productImages.industrialGearUnitMotor,

  // Drive Electronics
  "Control-Cabinet Frequency Inverters": productImages.groupInverter,
  "Decentralized Drive Inverters": productImages.integratedDrive,
  "Field-Mount Variable Frequency Drives": productImages.groupInverter,
  "Motor-Mounted Starters": productImages.integratedDrive,

  // Complete Drive Systems
  "Integrated Motor + Drive Packages": productImages.integratedDrive,
  "Conveyor Drive Packages": productImages.industrialGearUnitMotor,
  "Overhead & Screw Conveyor Kits": productImages.gearedMotorsRange,
  "Application Drive Kits": productImages.parallelShaft,
  "Endurance Service Package": productImages.industrialGearUnit,
};

export function getCategoryImage(slug: string): string | undefined {
  return categoryImages[slug];
}

export function getSubProductImage(title: string): string | undefined {
  return subProductImages[title];
}
