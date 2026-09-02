# Editing site content

Product content lives in this folder as JSON. Change it here and the site
updates — no code changes needed.

| File | Controls |
| --- | --- |
| `products.json` | The four product categories and all 24 products: names, specs, features, catalogue refs, images |
| `portfolio.json` | The "Every Drive in the Range" tiles on the Products page |
| `glossary.json` | Definitions behind the little (i) tooltips on the catalogue table's column headings |

After **any** edit, run:

```bash
npm run check:content
```

It catches the mistakes that would otherwise ship silently — a typo'd image
filename that renders an empty box, a third tag that spills out of a card, a
duplicate slug that makes a category unreachable. It prints the exact file and
product for each problem. If it says `Content OK`, you're safe to build.

Save as **UTF-8 without BOM**. Windows editors sometimes add a BOM; the
validator warns if it finds one.

## What changing something does

- **Rename a product** → the name updates on its category page, and the image
  lookup follows it automatically. Nothing else to change.
- **Add a product** → add an object to that category's `products` array. It
  appears on the category page immediately.
- **Add a category** → add an object to `categories`. The route, the header
  dropdown, the footer column, the related-categories strip and the contact-form
  dropdown all pick it up on their own. Only four `icon` values exist, so pick
  one of them.
- **Reorder** → products and categories render in array order. Move the object.
- **Change a spec** → edit the `value`. Specs render as the table on each card.

## Field reference — `products.json`

`imageBasePath` is where the image filenames resolve from. Leave it alone unless
the artwork moves.

Each category:

| Field | Notes |
| --- | --- |
| `slug` | Becomes the URL (`/products/<slug>`). Lowercase, numbers, hyphens. **Changing it breaks existing links.** |
| `title` | Shown everywhere the category is named |
| `icon` | One of `gear`, `bolt`, `chip`, `layers` — nothing else works |
| `image` | Bare filename in `public/images/products/nord/`, or `null` |
| `shortDescription` | The category card |
| `dropdownBlurb` | The header Products menu — keep under ~90 characters |
| `heroDescription` | The dark banner at the top of the category page |
| `keyFeatures` | Green-ticked list. Any length |
| `typicalApplications` | Grey pills. Any length |
| `products` | The product cards |

Each product:

| Field | Notes |
| --- | --- |
| `title` | Also the image lookup key, so it must be unique across the whole file |
| `subtitle` | Small grey line under the name, or `null` |
| `image` | Bare filename, or `null` to show an empty placeholder slot |
| `catalogue` | The orange badge, e.g. `G1000`. `null` hides it |
| `tags` | **Exactly two.** They render as the two small pills |
| `specs` | `{ "label", "value" }` pairs — the table. `[]` for none |
| `features` | Orange-ticked bullets. `[]` for none |
| `nsdTupH` | `true` if the product is offered with the nsd tupH surface treatment (flyer page 10). Shows an orange badge on the catalogue table. Must be `true` or `false`, never missing |

## Where the numbers come from

Every size, power, torque, ratio and voltage figure is transcribed verbatim from
the client-supplied NORD flyer **F1300** (Mat.-Nr. 6021602 / 1118), and each
product carries the NORD catalogue reference it was drawn from so any figure can
be checked against the source.

That flyer is dated 11/2018. It caps MAXXDRIVE at 250,000 Nm and rates motors
IE1–IE4, where NORD's current range goes further (282,000 Nm, IE5+). The client
asked us to follow the supplied flyer exactly, so the flyer wins. **If a newer
catalogue arrives, the figures to revisit are MAXXDRIVE torque and the motor
efficiency classes.**

## Replacing artwork

Drop new files into `public/images/products/nord/` and point the `image` field
at them. Notes worth knowing:

- Save on **opaque white**, not transparent. `next/image` handles alpha
  differently depending on whether `sharp` is installed, and baking white makes
  local and Vercel identical.
- Cards use `object-contain`, so nothing gets cropped — any aspect ratio is fine.
- The current renders come from the flyer and are modest resolution (~200px
  native, upscaled 2x). Higher-resolution replacements from NORD's media portal
  would be a straight upgrade.
- **The four NORDAC box renders** (SK 250E / 200E / 180E / 135E) are visually
  near-identical grey enclosures and were matched by their position in the
  flyer, not by recognising the unit. Worth a client check before print use.

## Two files are generated from this folder

`docs/nord-product-catalogue.md` (the written catalogue) and `public/llms.txt`
(the summary that AI assistants read) are **built from `products.json`** — they
are not written by hand and edits to them will be overwritten.

After changing product content, regenerate them:

```bash
npm run gen:catalogue
```

`npm run check:content` also verifies they are current and fails if they are
not, so you cannot forget: if the check goes red saying a file is out of date,
run the command above and commit the result.

This is deliberate. Before it, the product figures would have existed in two
places — the JSON and the written catalogue — and the two would have disagreed
the first time a specification was corrected, silently, because nothing compares
prose against data.

The catalogue table on the website reads `products.json` directly, so it needs
no regeneration; it is always current.

## Glossary — `glossary.json`

Each entry is one technical term:

| Field | Notes |
| --- | --- |
| `term` | The word as it appears in a column heading, e.g. `Torque`. Must be unique |
| `short` | One line, under 90 characters — this is the tooltip |
| `long` | The fuller explanation, used in the generated Markdown glossary |

A spec label with no matching term simply renders without a tooltip rather than
breaking. `npm run check:content` warns when that happens, so a new spec column
does not quietly lose its explanation. Labels match by prefix too, which is why
`Power — inverter` picks up the `Power` entry.

## Not in these files

Contact details, navigation, headline stats and the "why choose us" cards are
still in `lib/site.ts`. Industry cards are in `lib/industries.ts`.
