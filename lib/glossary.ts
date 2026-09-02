import data from "@/content/glossary.json";

// Typed boundary around content/glossary.json — the tooltip copy for technical
// terms in the catalogue table. Same pattern as lib/products.ts: the JSON is
// the editable source, this module gives it types and a lookup shape.
//
// Definitions come from the same NORD flyer F1300 as the product specs, so a
// reader hovering "Torque" gets the manufacturer's meaning, not ours.

export type GlossaryTerm = {
  term: string;
  /** One-line tooltip copy. */
  short: string;
  /** Fuller explanation, used in the generated Markdown glossary. */
  long: string;
};

type RawFile = { terms: GlossaryTerm[] };

const file = data as RawFile;

/** Terms in file order — the order the generated Markdown lists them in. */
export const glossaryTerms: GlossaryTerm[] = file.terms;

/**
 * Lookup keyed by lowercased term.
 *
 * Spec labels in products.json are title-cased ("Torque") while prose uses
 * lowercase, so callers should not have to care which they hold.
 */
const byKey: Record<string, GlossaryTerm> = Object.fromEntries(
  file.terms.map((t) => [t.term.toLowerCase(), t])
);

/**
 * Find the glossary entry for a spec label or term name.
 *
 * Spec labels are sometimes qualified — "Power — inverter" and
 * "Power — motor starter" both describe Power — so an exact miss falls back to
 * the longest term that the label starts with. Returns undefined when nothing
 * matches, which is the signal for callers to render no tooltip at all rather
 * than an empty one.
 */
export function lookupTerm(label: string): GlossaryTerm | undefined {
  const key = label.trim().toLowerCase();
  const exact = byKey[key];
  if (exact) return exact;

  const prefixMatch = file.terms
    .filter((t) => key.startsWith(t.term.toLowerCase()))
    .sort((a, b) => b.term.length - a.term.length)[0];

  return prefixMatch;
}
