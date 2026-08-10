import { productImages } from "./productImages";

/**
 * Full product portfolio — one entry per piece of client artwork.
 *
 * TODO: client to provide final product names, descriptions and specs.
 * The names below are provisional and describe what each render actually
 * shows, so the page reads correctly in demos. Replace `title`, `blurb`
 * and `tags` once the customer sends the real content — nothing else has
 * to change.
 */
export type PortfolioItem = {
  id: string;
  title: string;
  blurb: string;
  tags: [string, string];
  image: string;
  /** Product category this item belongs to, for grouping/filtering later. */
  category: string;
};

export const portfolio: PortfolioItem[] = [
  {
    id: "helical-inline-geared-motor",
    title: "Helical Inline Geared Motor",
    blurb: "Inline output, high efficiency across the full load range.",
    tags: ["Inline", "High efficiency"],
    image: productImages.helicalInline,
    category: "Gear Units & Geared Motors",
  },
  {
    id: "parallel-shaft-geared-motor",
    title: "Parallel Shaft Geared Motor",
    blurb: "Space-saving shaft-mount design for tight installations.",
    tags: ["Space-saving", "Shaft-mount"],
    image: productImages.parallelShaft,
    category: "Gear Units & Geared Motors",
  },
  {
    id: "helical-bevel-geared-motor",
    title: "Helical Bevel Geared Motor",
    blurb: "Rugged right-angle drive for high ratios and heavy duty.",
    tags: ["Right-angle", "Rugged"],
    image: productImages.helicalBevel,
    category: "Gear Units & Geared Motors",
  },
  {
    id: "geared-motor-range",
    title: "Geared Motor Range",
    blurb: "Complete range of helical, bevel and worm geared motors.",
    tags: ["Modular", "Full range"],
    image: productImages.gearedMotorsRange,
    category: "Gear Units & Geared Motors",
  },
  {
    id: "industrial-gear-unit",
    title: "Industrial Gear Unit",
    blurb: "Heavy-duty cast housing built for continuous high-torque duty.",
    tags: ["Heavy-duty", "Modular"],
    image: productImages.industrialGearUnit,
    category: "Gear Units & Geared Motors",
  },
  {
    id: "industrial-gear-drive-package",
    title: "Industrial Gear Drive Package",
    blurb: "Gear unit, motor and coupling matched on a common baseplate.",
    tags: ["Turnkey", "Baseplate"],
    image: productImages.industrialGearUnitMotor,
    category: "Complete Drive Systems",
  },
  {
    id: "integrated-motor-drive-unit",
    title: "Integrated Motor + Drive Unit",
    blurb: "Motor, gear unit and drive electronics in a single package.",
    tags: ["Integrated", "IE5+"],
    image: productImages.integratedDrive,
    category: "Complete Drive Systems",
  },
  {
    id: "drive-electronics-range",
    title: "Drive Electronics & Inverter Range",
    blurb: "Cabinet, decentralized and field-mount frequency inverters.",
    tags: ["Inverters", "Scalable"],
    image: productImages.groupInverter,
    category: "Drive Electronics",
  },
];
