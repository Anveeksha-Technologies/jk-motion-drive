export type SubProduct = {
  title: string;
  subtitle?: string;
  tags: [string, string];
};

export type ProductCategory = {
  slug: string;
  title: string;
  icon: "gear" | "bolt" | "chip" | "layers";
  shortDescription: string;
  heroDescription: string;
  subProducts: SubProduct[];
  keyFeatures: string[];
  typicalApplications: string[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "gear-units-geared-motors",
    title: "Gear Units & Geared Motors",
    icon: "gear",
    shortDescription:
      "Helical inline, parallel shaft, bevel and worm geared motors, plus heavy-duty industrial gear units.",
    heroDescription:
      "Precision geared motors and industrial gear units engineered for high torque density, long service life and quiet, efficient running across the toughest duty cycles.",
    subProducts: [
      { title: "Helical Inline Geared Motors", tags: ["Inline", "High efficiency"] },
      { title: "Parallel Shaft Geared Motors", tags: ["Space-saving", "Shaft-mount"] },
      { title: "Helical Bevel Geared Motors", tags: ["Right-angle", "Rugged"] },
      {
        title: "Worm Geared Motors",
        subtitle: "Quiet, economical right-angle",
        tags: ["Quiet", "Economical"],
      },
      {
        title: "Industrial Gear Units",
        subtitle: "up to 282,000 Nm",
        tags: ["Heavy-duty", "Modular"],
      },
      {
        title: "Integrated Geared Motor Drive",
        subtitle: "Motor + gear in one unit",
        tags: ["Integrated", "IE5+"],
      },
    ],
    keyFeatures: [
      "Modular design for fast ratio and torque matching",
      "High efficiency across the full load range",
      "Cast, rugged housings for long service life",
      "Wide mounting and output-shaft options",
    ],
    typicalApplications: ["Conveyors", "Mixers & agitators", "Hoists & cranes", "Pumps"],
  },
  {
    slug: "electric-motors",
    title: "Electric Motors",
    icon: "bolt",
    shortDescription:
      "Asynchronous and synchronous AC motors, including high-efficiency IE5+ and explosion-proof options.",
    heroDescription:
      "A complete range of AC motors built for efficiency and reliability — from standard asynchronous machines to synchronous IE5+ drives that cut energy cost across their service life.",
    subProducts: [
      { title: "Asynchronous AC Motors", tags: ["Standard", "Robust"] },
      { title: "Synchronous AC Motors", tags: ["IE5+", "Energy-saving"] },
      { title: "Explosion-Proof Motors", tags: ["ATEX", "Certified"] },
      {
        title: "Brake Motors",
        subtitle: "Fast, precise stopping",
        tags: ["Integrated brake", "Precise"],
      },
    ],
    keyFeatures: [
      "High-efficiency IE3 / IE4 / IE5+ options",
      "Reduced energy cost over the motor lifecycle",
      "Certified variants for hazardous environments",
      "Consistent interfaces across power classes",
    ],
    typicalApplications: ["Fans & blowers", "Pumps", "Compressors", "Machine tools"],
  },
  {
    slug: "drive-electronics",
    title: "Drive Electronics",
    icon: "chip",
    shortDescription:
      "Frequency inverters and control-cabinet or decentralized drive solutions for precise motion control.",
    heroDescription:
      "Variable frequency drives and inverter solutions that deliver precise speed control, energy recovery and seamless integration — for control-cabinet and fully decentralized installation.",
    subProducts: [
      { title: "Control-Cabinet Frequency Inverters", tags: ["Cabinet", "Scalable"] },
      { title: "Decentralized Drive Inverters", tags: ["Decentralized", "IP66"] },
      { title: "Field-Mount Variable Frequency Drives", tags: ["Field-mount", "Plug-in"] },
      {
        title: "Motor-Mounted Starters",
        subtitle: "Direct & reversing",
        tags: ["Compact", "Wiring-lean"],
      },
    ],
    keyFeatures: [
      "Precise speed and torque control",
      "Energy savings through variable-speed operation",
      "Decentralized options reduce cabinet and cabling",
      "Standard fieldbus and networking interfaces",
    ],
    typicalApplications: ["Intralogistics", "Process lines", "HVAC", "Material handling"],
  },
  {
    slug: "complete-drive-systems",
    title: "Complete Drive Systems",
    icon: "layers",
    shortDescription:
      "Packaged motor, gear and drive-electronics solutions optimised end-to-end for your application.",
    heroDescription:
      "Fully engineered drive packages that combine motor, gear unit and electronics into a single optimised solution — reducing variants, simplifying maintenance and maximising uptime.",
    subProducts: [
      { title: "Integrated Motor + Drive Packages", tags: ["Integrated", "Efficient"] },
      { title: "Conveyor Drive Packages", tags: ["Turnkey", "Fast install"] },
      { title: "Overhead & Screw Conveyor Kits", tags: ["Kit", "Matched"] },
      {
        title: "Application Drive Kits",
        subtitle: "Reduced variants",
        tags: ["Standardised", "Serviceable"],
      },
      {
        title: "Endurance Service Package",
        subtitle: "Extended lifecycle care",
        tags: ["Service", "Uptime"],
      },
    ],
    keyFeatures: [
      "Fewer drive variants to stock and maintain",
      "End-to-end efficiency optimisation",
      "Faster installation and commissioning",
      "Lifecycle service and support built in",
    ],
    typicalApplications: ["Airport logistics", "Warehousing", "Bulk handling", "Packaging"],
  },
];

export function getCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}
