import { productImages } from "./productImages";

/**
 * Full product portfolio — one entry per piece of client artwork.
 *
 * Names, blurbs and catalogue references now come from the client-supplied
 * NORD flyer F1300 (see lib/products.ts for the full transcription), so each
 * tile names the family the render actually shows rather than a provisional
 * description. Where a render shows a group of products, the entry names the
 * range rather than pretending to be a single model.
 */
export type PortfolioItem = {
  id: string;
  title: string;
  blurb: string;
  tags: [string, string];
  image: string;
  /** NORD catalogue reference, shown as a badge on the tile. */
  catalogue?: string;
  /** Product category this item belongs to, for grouping/filtering later. */
  category: string;
};

export const portfolio: PortfolioItem[] = [
  {
    id: "unicase-helical-gear-units",
    title: "UNICASE Helical Gear Units",
    blurb: "Inline output to 26,000 Nm, long life and optimum sealing.",
    tags: ["Inline", "UNICASE"],
    image: productImages.unicaseHelical,
    catalogue: "G1000",
    category: "Gear Units & Geared Motors",
  },
  {
    id: "unicase-parallel-shaft-gear-units",
    title: "UNICASE Parallel Shaft Gear Units",
    blurb: "Compact hollow- or solid-shaft design to 100,000 Nm.",
    tags: ["Parallel shaft", "Compact"],
    image: productImages.unicaseParallelShaft,
    catalogue: "G1000",
    category: "Gear Units & Geared Motors",
  },
  {
    id: "unicase-bevel-gear-units",
    title: "UNICASE Bevel Gear Units",
    blurb: "Right-angle cast-iron drive to 50,000 Nm and 200 kW.",
    tags: ["Right-angle", "Cast iron"],
    image: productImages.unicaseBevel,
    catalogue: "G1000",
    category: "Gear Units & Geared Motors",
  },
  {
    id: "nordbloc-helical-gear-units",
    title: "NORDBLOC.1 Helical Gear Units",
    blurb: "Die-cast aluminium housing, industry standard dimensions.",
    tags: ["Inline", "Aluminium"],
    image: productImages.nordblocHelical,
    catalogue: "G1000",
    category: "Gear Units & Geared Motors",
  },
  {
    id: "maxxdrive-industrial-gear-units",
    title: "MAXXDRIVE Industrial Gear Units",
    blurb: "One-piece UNICASE housing to 250,000 Nm and 4,000 kW.",
    tags: ["Heavy-duty", "Modular"],
    image: productImages.maxxdrive,
    catalogue: "G1050",
    category: "Gear Units & Geared Motors",
  },
  {
    id: "maxxdrive-drive-package",
    title: "MAXXDRIVE Gear Unit & Motor Package",
    blurb: "Industrial gear unit and motor matched as one drive train.",
    tags: ["Turnkey", "Matched"],
    image: productImages.completeDrivePackage,
    catalogue: "G1050",
    category: "Complete Drive Systems",
  },
  {
    id: "integrated-drive-unit",
    title: "Integrated Geared Motor & Inverter",
    blurb: "Gear unit, motor and drive electronics in a single unit.",
    tags: ["Integrated", "Decentralised"],
    image: productImages.nordacFlex,
    catalogue: "F3020",
    category: "Complete Drive Systems",
  },
  {
    id: "nordac-inverter-range",
    title: "NORDAC Frequency Inverter Range",
    blurb: "NORDAC PRO, LINK, FLEX and BASE inverters plus START starters.",
    tags: ["Inverters", "Scalable"],
    image: productImages.nordacPro,
    catalogue: "F3050",
    category: "Drive Electronics",
  },
];
