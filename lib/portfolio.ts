import data from "@/content/portfolio.json";

// The portfolio grid on /products — one tile per piece of NORD artwork.
// Content lives in content/portfolio.json; this module is the typed boundary
// around it. See content/README.md for the editing rules.
//
// Names, blurbs and catalogue references come from the client-supplied NORD
// flyer F1300, so each tile names the family its render actually shows. Where a
// render shows a group, the tile names the range rather than pretending to be a
// single model.

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

type RawItem = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  image: string;
  catalogue: string | null;
  category: string;
};

type RawFile = { imageBasePath: string; items: RawItem[] };

const file = data as RawFile;

export const portfolio: PortfolioItem[] = file.items.map((i) => ({
  id: i.id,
  title: i.title,
  blurb: i.blurb,
  // JSON cannot express a two-element tuple; `npm run check:content` fails if
  // any entry does not carry exactly two tags.
  tags: [i.tags[0], i.tags[1]],
  image: `${file.imageBasePath}/${i.image}`,
  catalogue: i.catalogue ?? undefined,
  category: i.category,
}));
