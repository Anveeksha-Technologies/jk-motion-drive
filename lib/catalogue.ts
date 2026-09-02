import { imageBasePath, rawCategories } from "./products";

// The flat view of the product range that the /catalogue table renders.
//
// content/products.json is organised for the category pages: four categories,
// each owning its products. The catalogue table wants the opposite shape — one
// flat list of every product with its category carried along — so this module
// does that transform and nothing else. It adds no data; every field traces
// back to the JSON.
//
// WHY COLUMNS ARE COMPUTED, NOT FIXED
//
// The flyer specifies gear units fully (Sizes/Power/Torque/Ratio) and drive
// electronics differently (Sizes/Voltage/Power), and gives the six motors and
// the four drive-system concepts no figures at all — 10 of 24 rows. A fixed
// column set therefore renders as a wall of dashes the moment motors are in
// view. Instead `specColumnsFor` asks the rows actually on screen which columns
// carry a value, so the table narrows to what the current filter can fill.

export type CatalogueRow = {
  /** Slug of the title — React key and anchor target. */
  id: string;
  title: string;
  subtitle?: string;
  categorySlug: string;
  categoryTitle: string;
  catalogue?: string;
  tags: [string, string];
  image?: string;
  /** Spec label -> value, e.g. { Torque: "30 – 3,300 Nm" }. Table lookups. */
  specs: Record<string, string>;
  /**
   * The same specs in flyer order.
   *
   * The record above is right for the table, which asks "what is this row's
   * Torque?". The card wants to render every spec in the order NORD prints
   * them, and object key order is not something to lean on for display.
   */
  specList: { label: string; value: string }[];
  features: string[];
  nsdTupH: boolean;
  /** Pre-lowercased haystack, so filtering does not rebuild it per keystroke. */
  searchText: string;
};

/**
 * Spec columns in display order.
 *
 * This is the full vocabulary the flyer uses. Which of these actually render is
 * decided per view by `specColumnsFor`.
 */
export const SPEC_COLUMNS = ["Sizes", "Power", "Torque", "Ratio", "Voltage"] as const;

export type SpecColumn = (typeof SPEC_COLUMNS)[number];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Read a spec column off a row.
 *
 * Labels are not always bare: the SK 250E is specified as "Power — inverter"
 * and "Power — motor starter" because it is both. An exact miss therefore falls
 * back to the first label that starts with the column name, so that unit still
 * populates the Power column instead of reading as unspecified.
 */
export function specValue(row: CatalogueRow, column: string): string | undefined {
  const exact = row.specs[column];
  if (exact) return exact;

  const key = Object.keys(row.specs).find((k) =>
    k.toLowerCase().startsWith(column.toLowerCase())
  );
  return key ? row.specs[key] : undefined;
}

/** Every product in the range, flattened, in file order. */
export const catalogueRows: CatalogueRow[] = rawCategories.flatMap((c) =>
  c.products.map((p) => {
    const specs: Record<string, string> = Object.fromEntries(
      p.specs.map((s) => [s.label, s.value])
    );

    const row: CatalogueRow = {
      id: slugify(p.title),
      title: p.title,
      subtitle: p.subtitle ?? undefined,
      categorySlug: c.slug,
      categoryTitle: c.title,
      catalogue: p.catalogue ?? undefined,
      tags: [p.tags[0], p.tags[1]],
      image: p.image ? `${imageBasePath}/${p.image}` : undefined,
      specs,
      specList: p.specs.map((sp) => ({ label: sp.label, value: sp.value })),
      features: p.features,
      nsdTupH: p.nsdTupH,
      searchText: "",
    };

    // Everything a visitor might reasonably type: product and category names,
    // the catalogue reference, both tags, every spec label and value, the
    // feature bullets, and "nsd tupH" for the treated units.
    row.searchText = [
      p.title,
      p.subtitle ?? "",
      c.title,
      p.catalogue ?? "",
      ...p.tags,
      ...p.specs.flatMap((s) => [s.label, s.value]),
      ...p.features,
      p.nsdTupH ? "nsd tupH" : "",
    ]
      .join(" ")
      .toLowerCase();

    return row;
  })
);

/** Filter options for the category pills, derived from the data. */
export const catalogueCategories = rawCategories.map((c) => ({
  slug: c.slug,
  title: c.title,
  count: c.products.length,
}));

/**
 * Which spec columns to render for a given set of rows.
 *
 * A column appears only when at least one row in view can fill it, so filtering
 * to Electric Motors drops all four numeric columns rather than showing four
 * empty ones, and filtering to Gear Units drops Voltage.
 */
export function specColumnsFor(rows: CatalogueRow[]): SpecColumn[] {
  return SPEC_COLUMNS.filter((col) => rows.some((r) => specValue(r, col)));
}

/** Rows whose product is offered with the nsd tupH surface treatment. */
export const nsdTupHRows = catalogueRows.filter((r) => r.nsdTupH);

/**
 * Find a product by its exact title.
 *
 * The catalogue's "Enquire" links carry the product title in the query string,
 * and the contact form reads it back to prefill itself. Matching is
 * case-insensitive and whitespace-tolerant so a hand-edited or re-encoded URL
 * still resolves rather than silently falling back to a blank form.
 *
 * Titles are unique across the whole file — `npm run check:content` fails on a
 * duplicate, because the image lookup is keyed by title too.
 */
export function findProductByTitle(title: string): CatalogueRow | undefined {
  const key = title.trim().toLowerCase();
  return catalogueRows.find((r) => r.title.toLowerCase() === key);
}
