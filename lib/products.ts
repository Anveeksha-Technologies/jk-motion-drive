import data from "@/content/products.json";

// Product content now lives in content/products.json so it can be edited
// without touching code — see content/README.md for the editing rules.
//
// This module is the typed boundary around that file. It does two jobs and
// nothing else: it gives the JSON real types, and it normalises the shapes the
// site expects (JSON has no tuples and no `undefined`, so `tags` is widened to
// string[] and optional fields are written as null).
//
// The exported names and shapes are unchanged from when this data was inline,
// so pages and components did not have to change.
//
// SPEC PROVENANCE: every size, power, torque, ratio and voltage figure comes
// from the client-supplied NORD flyer F1300 (Mat.-Nr. 6021602 / 1118), and each
// product carries the NORD catalogue reference it was drawn from.
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
  /**
   * Available with the nsd tupH sealed surface conversion (flyer page 10).
   *
   * Page 10 lists six items; five map onto product titles here. The sixth,
   * "NORDBLOC.1 Helical bevel gear units (up to size 6)", is a distinct NORD
   * family with no row of its own — the nearest title, "NORDBLOC.1 Helical
   * Gear Units", is a different product — so it is left false rather than
   * mis-tagged.
   */
  nsdTupH: boolean;
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

/** Shape of one product as written in content/products.json. */
type RawProduct = {
  title: string;
  subtitle: string | null;
  image: string | null;
  catalogue: string | null;
  tags: string[];
  specs: Spec[];
  features: string[];
  nsdTupH: boolean;
};

type RawCategory = {
  slug: string;
  title: string;
  icon: string;
  image: string | null;
  shortDescription: string;
  dropdownBlurb: string;
  heroDescription: string;
  keyFeatures: string[];
  typicalApplications: string[];
  products: RawProduct[];
};

type RawFile = { imageBasePath: string; categories: RawCategory[] };

const file = data as RawFile;

/** Base path the `image` filenames in the JSON are relative to. */
export const imageBasePath = file.imageBasePath;

/** Raw categories, for modules that need the JSON's own field names. */
export const rawCategories = file.categories;

/**
 * A JSON array cannot express a two-element tuple, so the pair is asserted
 * here. Anything other than exactly two tags is a content error — see the
 * `npm run check:content` validator, which fails on it rather than letting a
 * card render a stray third pill.
 */
function asTagPair(tags: string[]): [string, string] {
  return [tags[0], tags[1]];
}

export const productCategories: ProductCategory[] = file.categories.map((c) => ({
  slug: c.slug,
  title: c.title,
  icon: c.icon as ProductCategory["icon"],
  shortDescription: c.shortDescription,
  dropdownBlurb: c.dropdownBlurb,
  heroDescription: c.heroDescription,
  keyFeatures: c.keyFeatures,
  typicalApplications: c.typicalApplications,
  subProducts: c.products.map((p) => ({
    title: p.title,
    subtitle: p.subtitle ?? undefined,
    tags: asTagPair(p.tags),
    catalogue: p.catalogue ?? undefined,
    specs: p.specs.length ? p.specs : undefined,
    features: p.features.length ? p.features : undefined,
    nsdTupH: p.nsdTupH,
  })),
}));

export function getCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}
