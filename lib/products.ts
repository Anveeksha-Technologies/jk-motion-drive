// Product data transcribed from the client-supplied NORD flyer:
// "Complete Drive Systems From A Single Source — Geared Motors and Frequency
// Inverters", NORD DRIVESYSTEMS document F1300, Mat.-Nr. 6021602 / 1118.
//
// Every size, power, torque, ratio and voltage figure below is taken verbatim
// from that document, and each product carries the NORD catalogue reference it
// was drawn from, so a buyer (or the client) can check it against the source.
//
// NOTE ON SPEC VINTAGE: F1300 is dated 11/2018. It caps MAXXDRIVE at
// 250,000 Nm and rates motors IE1–IE4. The current NORD range goes further
// (282,000 Nm, IE5+), and an earlier draft of this site quoted those newer
// figures. The client asked us to follow the supplied flyer exactly, so the
// flyer wins throughout. If a newer catalogue arrives, the figures to revisit
// are MAXXDRIVE torque and the motor efficiency classes.

export type Spec = { label: string; value: string };

export type SubProduct = {
  title: string;
  subtitle?: string;
  tags: [string, string];
  /** NORD catalogue reference this product is specified in, e.g. "G1000". */
  catalogue?: string;
  /** Headline figures, rendered as a spec table on the category page. */
  specs?: Spec[];
  /** Feature bullets, as worded in the flyer. */
  features?: string[];
};

export type ProductCategory = {
  slug: string;
  title: string;
  icon: "gear" | "bolt" | "chip" | "layers";
  shortDescription: string;
  dropdownBlurb: string;
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
      "NORDBLOC.1 and UNICASE helical, parallel shaft, bevel and worm gear units, plus MAXXDRIVE industrial gear units to 250,000 Nm.",
    dropdownBlurb:
      "NORDBLOC.1, UNICASE & MAXXDRIVE — helical, parallel shaft, bevel & worm",
    heroDescription:
      "NORD developed the UNICASE construction in 1981 — a closed housing manufactured from a single block that integrates every bearing seat in one operation. The result is high output torque, high axial and radial load capacity, quiet running and a long service life.",
    subProducts: [
      {
        title: "NORDBLOC.1 Helical Gear Units",
        subtitle: "Die-cast aluminium · industry standard dimensions",
        tags: ["Inline", "Aluminium"],
        catalogue: "G1000",
        specs: [
          { label: "Sizes", value: "13" },
          { label: "Power", value: "0.12 – 37 kW" },
          { label: "Torque", value: "30 – 3,300 Nm" },
          { label: "Ratio", value: "1.07:1 – 456.77:1" },
        ],
        features: [
          "Foot or flange-mounted",
          "Die-cast aluminium housing",
          "UNICASE housing",
          "Industry standard dimensions",
        ],
      },
      {
        title: "UNICASE Helical Gear Units",
        subtitle: "Long life, low maintenance",
        tags: ["Inline", "UNICASE"],
        catalogue: "G1000",
        specs: [
          { label: "Sizes", value: "11" },
          { label: "Power", value: "0.12 – 160 kW" },
          { label: "Torque", value: "10 – 26,000 Nm" },
          { label: "Ratio", value: "1.35:1 – 14,340.31:1" },
        ],
        features: [
          "Foot or flange-mounted",
          "Long life, low maintenance",
          "Optimum sealing",
          "UNICASE housing",
        ],
      },
      {
        title: "UNICASE Parallel Shaft Gear Units",
        subtitle: "Compact · hollow or solid shaft",
        tags: ["Parallel shaft", "Compact"],
        catalogue: "G1000",
        specs: [
          { label: "Sizes", value: "15" },
          { label: "Power", value: "0.12 – 200 kW" },
          { label: "Torque", value: "110 – 100,000 Nm" },
          { label: "Ratio", value: "4.03:1 – 6,616.79:1" },
        ],
        features: [
          "Foot mounted, flange mounted or hollow shaft mounted",
          "Hollow or solid shaft",
          "Compact design",
          "UNICASE cast-iron housing",
        ],
      },
      {
        title: "UNICASE Bevel Gear Units",
        subtitle: "Right-angle · cast-iron housing",
        tags: ["Right-angle", "Cast iron"],
        catalogue: "G1000",
        specs: [
          { label: "Sizes", value: "11" },
          { label: "Power", value: "0.12 – 200 kW" },
          { label: "Torque", value: "180 – 50,000 Nm" },
          { label: "Ratio", value: "8.04:1 – 13,432.68:1" },
        ],
        features: [
          "Foot mounted, flange mounted or hollow shaft mounted",
          "Hollow or solid shaft",
          "UNICASE cast-iron housing",
        ],
      },
      {
        title: "NORDBLOC.1 2-Stage Bevel Gear Units",
        subtitle: "UNICASE aluminium housing",
        tags: ["2-stage bevel", "Aluminium"],
        catalogue: "G1014",
        specs: [
          { label: "Sizes", value: "6" },
          { label: "Power", value: "0.12 – 9.2 kW" },
          { label: "Torque", value: "50 – 660 Nm" },
          { label: "Ratio", value: "3.03:1 – 70:1" },
        ],
        features: [
          "Foot mounted, flange mounted or hollow shaft mounted",
          "Hollow or solid shaft",
          "UNICASE aluminium housing",
        ],
      },
      {
        title: "UNICASE Helical Worm Gear Units",
        subtitle: "Right-angle · cast-iron housing",
        tags: ["Helical worm", "Right-angle"],
        catalogue: "G1000",
        specs: [
          { label: "Sizes", value: "6" },
          { label: "Power", value: "0.12 – 15 kW" },
          { label: "Torque", value: "94 – 3,058 Nm" },
          { label: "Ratio", value: "4.40:1 – 7,095.12:1" },
        ],
        features: [
          "Foot mounted, flange mounted or hollow shaft mounted",
          "Hollow or solid shaft",
          "UNICASE cast-iron housing",
        ],
      },
      {
        title: "UNIVERSAL SI Worm Gear Units",
        subtitle: "Modular · life-long lubrication",
        tags: ["Worm", "Modular"],
        catalogue: "G1035",
        specs: [
          { label: "Sizes", value: "5" },
          { label: "Power", value: "0.12 – 4.0 kW" },
          { label: "Torque", value: "21 – 427 Nm" },
          { label: "Ratio", value: "5.00:1 – 3,000.00:1" },
        ],
        features: [
          "Modular",
          "Universal attachment",
          "Life-long lubrication",
          "IEC versions",
        ],
      },
      {
        title: "UNIVERSAL SMI Worm Gear Units",
        subtitle: "Modular · available with nsd tupH",
        tags: ["Worm", "nsd tupH"],
        catalogue: "G1035",
        specs: [
          { label: "Sizes", value: "5" },
          { label: "Power", value: "0.12 – 4.0 kW" },
          { label: "Torque", value: "21 – 427 Nm" },
          { label: "Ratio", value: "5.00:1 – 3,000.00:1" },
        ],
        features: [
          "Modular",
          "Universal attachment",
          "Life-long lubrication",
          "IEC versions",
        ],
      },
      {
        title: "MAXXDRIVE Industrial Gear Units",
        subtitle: "up to 250,000 Nm in a one-piece UNICASE housing",
        tags: ["Heavy-duty", "Modular"],
        catalogue: "G1050",
        specs: [
          { label: "Sizes", value: "11" },
          { label: "Power", value: "1.5 – 4,000 kW" },
          { label: "Torque", value: "15,000 – 250,000 Nm" },
          { label: "Ratio", value: "5.60:1 – 30,000:1" },
        ],
        features: [
          "All bearing points and sealing surfaces are machined in a single operation",
          "No separating joints in the housing, no sealing surfaces subject to torque",
          "High-precision axis alignment for quiet running",
          "Long life, low maintenance",
          "Gear ratio range 5.54 to 400:1 with the same foot dimensions",
          "Parallel axis and right-angled gear units",
        ],
      },
    ],
    keyFeatures: [
      "UNICASE single housing which integrates all bearings",
      "Complete machining in one step for precise axis alignment",
      "High output torques with high axial and radial load capacity",
      "Quiet running, high reliability and a long service life",
    ],
    typicalApplications: [
      "Conveyors",
      "Mixers & agitators",
      "Hoists & cranes",
      "Bulk material handling",
    ],
  },
  {
    slug: "electric-motors",
    title: "Electric Motors",
    icon: "bolt",
    shortDescription:
      "NORD-built synchronous and asynchronous motors — energy-saving, switchable pole, single phase, smooth and explosion protected.",
    dropdownBlurb:
      "Energy-saving, smooth, single phase & explosion protected motors",
    heroDescription:
      "NORD develops its own motors and supplies them to all major markets worldwide. That independence from external suppliers is what gives customers short and highly dependable delivery times.",
    subProducts: [
      {
        title: "Energy-Saving Motors",
        subtitle: "IE1 – IE4 as per IEC 60034-30",
        tags: ["Energy-saving", "IE4"],
        catalogue: "M7000 / M7002",
        features: [
          "Designed in compliance with international standards",
          "High overload capacity",
          "Energy-efficient",
        ],
      },
      {
        title: "Switchable Pole Motors",
        subtitle: "Multiple fixed speeds",
        tags: ["Pole-changing", "Multi-speed"],
        catalogue: "M7000 / M7002",
      },
      {
        title: "Single Phase Motors",
        subtitle: "For single-phase supplies",
        tags: ["Single phase", "Compact"],
        catalogue: "M7000 / M7002",
      },
      {
        title: "Smooth Motors",
        subtitle: "Finless housing · available with nsd tupH",
        tags: ["Wash-down", "nsd tupH"],
        catalogue: "M7010",
        features: [
          "Smooth, easy-to-clean surface with no cooling fins",
          "Suited to hygienic and wash-down environments",
          "Available with nsd tupH surface treatment",
        ],
      },
      {
        title: "Explosion Protected Motors — Gas Atmospheres",
        subtitle: "Hazardous-area duty",
        tags: ["Ex protection", "Gas"],
        catalogue: "M7003",
      },
      {
        title: "Explosion Protected Motors — Dust Atmospheres",
        subtitle: "Hazardous-area duty",
        tags: ["Ex protection", "Dust"],
        catalogue: "M7000",
      },
    ],
    keyFeatures: [
      "Powerful motors up to IE4 keep the drive systems moving",
      "Designed in compliance with international standards",
      "High overload capacity",
      "NORD-manufactured, for short and dependable delivery times",
    ],
    typicalApplications: ["Fans & blowers", "Pumps", "Compressors", "Machine tools"],
  },
  {
    slug: "drive-electronics",
    title: "Drive Electronics",
    icon: "chip",
    shortDescription:
      "NORDAC frequency inverters and motor starters for control-cabinet, decentralised and fully-integrated installation.",
    dropdownBlurb:
      "NORDAC PRO, LINK, FLEX, BASE inverters & START motor starters",
    heroDescription:
      "NORD produces the frequency inverters and motor starters for the necessary power electronics. Inverter solutions are available for traditional installation in the control cabinet as well as for decentralised and fully-integrated drive units — with a PLC integrated at no extra cost.",
    subProducts: [
      {
        title: "NORDAC PRO SK 500E",
        subtitle: "Control-cabinet frequency inverter",
        tags: ["Cabinet", "POSICON"],
        catalogue: "F3050",
        specs: [
          { label: "Sizes", value: "11" },
          {
            label: "Voltage",
            value: "1~ 110 – 120 V · 1~ 200 – 240 V · 3~ 200 – 240 V · 3~ 380 – 480 V",
          },
          { label: "Power", value: "0.25 – 160 kW" },
        ],
        features: [
          "Stand-alone operation",
          "Energy-saving function",
          "Integrated POSICON positioning control",
          "Plug-in communication modules (field bus)",
        ],
      },
      {
        title: "NORDAC LINK SK 250E",
        subtitle: "Field distribution system",
        tags: ["Field distribution", "Plug-in"],
        catalogue: "F3025",
        specs: [
          { label: "Sizes", value: "2" },
          { label: "Voltage", value: "3~ 380 – 500 V" },
          { label: "Power — inverter", value: "0.75 – 7.5 kW" },
          { label: "Power — motor starter", value: "0.12 – 3 kW" },
        ],
        features: [
          "Frequency inverter or motor starter",
          "All connections in plug-in version for easy commissioning and maintenance",
          "PLC functionality for drive-integrated functions",
        ],
      },
      {
        title: "NORDAC FLEX SK 200E",
        subtitle: "Decentralised frequency inverter",
        tags: ["Decentralised", "POSICON"],
        catalogue: "F3020",
        specs: [
          { label: "Sizes", value: "4" },
          {
            label: "Voltage",
            value: "1~ 110 – 120 V · 1~ 200 – 240 V · 3~ 200 – 240 V · 3~ 380 – 500 V",
          },
          { label: "Power", value: "0.25 – 22 kW" },
        ],
        features: [
          "Energy-saving function",
          "Integrated POSICON positioning control",
          "Integrated PLC",
        ],
      },
      {
        title: "NORDAC BASE SK 180E",
        subtitle: "Compact inverter · available with nsd tupH",
        tags: ["Compact", "ISD control"],
        catalogue: "F3018",
        specs: [
          { label: "Sizes", value: "2" },
          {
            label: "Voltage",
            value: "1~ 110 – 120 V · 1~ 200 – 240 V · 3~ 200 – 240 V · 3~ 380 – 500 V",
          },
          { label: "Power", value: "0.25 – 2.2 kW" },
        ],
        features: [
          "Stand-alone operation",
          "4 parameter sets",
          "Sensorless current vector control (ISD control)",
          "Integrated PLC",
        ],
      },
      {
        title: "NORDAC START SK 135E",
        subtitle: "Motor starter · available with nsd tupH",
        tags: ["Motor starter", "Soft start"],
        catalogue: "F3015",
        specs: [
          { label: "Sizes", value: "2" },
          { label: "Voltage", value: "3~ 200 – 240 V · 3~ 380 – 500 V" },
          { label: "Power", value: "0.12 – 3 kW, or up to 7.5 kW" },
        ],
        features: [
          "Integrated electronic brake rectifier",
          "Consistent parameter structure",
          "Reversing starter with soft start function",
        ],
      },
    ],
    keyFeatures: [
      "Scalable functions across the full power range",
      "Full field bus connection facilities",
      "PLC integrated at no extra cost",
      "Cabinet, decentralised and fully-integrated mounting options",
    ],
    typicalApplications: ["Intralogistics", "Process lines", "HVAC", "Material handling"],
  },
  {
    slug: "complete-drive-systems",
    title: "Complete Drive Systems",
    icon: "layers",
    shortDescription:
      "Gear unit, motor and drive electronics from a single source — matched, commissioned and supported as one system.",
    dropdownBlurb:
      "Gear unit, motor & electronics matched from a single source",
    heroDescription:
      "From the three components — gear unit, motor and drive electronics — the NORD product package provides an optimal and individual drive solution. Each variant combines the highest product quality, short planning and assembly times, high delivery availability and a good price/performance ratio.",
    subProducts: [
      {
        title: "Complete Drive Solutions from a Single Source",
        subtitle: "Gear unit + motor + electronics, matched",
        tags: ["Single source", "Matched"],
        features: [
          "Reliable gear unit with one-piece UNICASE housing can cater for any load",
          "Powerful motors up to IE4 keep the drive systems moving in any operating situation",
          "Intelligent drive electronics provide exactly the control facilities you need",
          "Short planning and assembly times with high delivery availability",
        ],
      },
      {
        title: "NORD 4.0 READY Intelligent Drive Units",
        subtitle: "Networked · autonomous · scalable",
        tags: ["Industry 4.0", "Integrated PLC"],
        features: [
          "Integrated PLC processes sensor and actuator data and initiates sequence control",
          "Drive units communicate with each other and with the control centre",
          "Inverters monitor themselves, the motor and the load situation in the plant",
          "Hundreds of typical functions and parameters saved and simply adopted",
        ],
      },
      {
        title: "nsd tupH Surface-Treated Drives",
        subtitle: "The alternative to stainless steel",
        tags: ["Wash-down", "FDA-compliant"],
        features: [
          "Easy to clean surfaces, resistant to acids and alkalis across a wide pH range",
          "No blistering even if damaged, and no flaking",
          "Corrosion resistant, prevents contact corrosion",
          "Conforms to FDA Title 21 CFR 175.300 and is free from chromates",
          "Available on NORDBLOC.1 bevel, UNIVERSAL SMI, smooth motors, SK 180E and SK 135E",
        ],
      },
      {
        title: "Plug-and-Play Connection Systems",
        subtitle: "Configured and installed quickly",
        tags: ["Plug-in", "Fast install"],
        features: [
          "Simple plug-and-play with all common quick connection plugs",
          "Plug-in supply cable and motor output",
          "Plug-in sensors and encoders, with pre-assembled cables",
          "Mains switch and local/remote selector directly on the drive unit",
        ],
      },
    ],
    keyFeatures: [
      "One supplier for gear unit, motor and drive electronics",
      "Short planning, assembly and commissioning times",
      "All common bus systems, commissioned via plug-in control box or NORD CON",
      "Fewer drive variants to stock, specify and maintain",
    ],
    typicalApplications: [
      "Intralogistics",
      "Food & beverage",
      "Water & sewage",
      "Packaging",
    ],
  },
];

export function getCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}
