# NORD catalogue PDFs — assessment (2026-09-02)

Three NORD catalogues were supplied for evaluation. **Decision: deferred — not
added to the site.** This note records what they are so the assessment does not
have to be redone.

## What was supplied

Five files, of which two are byte-identical duplicates (verified by md5):

| File | Pages | Size | md5 |
| --- | --- | --- | --- |
| `G1000 CATALOGUE.pdf` | 772 | 107 MB | `0ecd61c6…` |
| `G1050_IGU.pdf` (and ` (1)` copy) | 292 | 45 MB | `aad2e08d…` |
| `M7000_3023.pdf` (and ` (1)` copy) | 112 | 20 MB | `fbee3dfa…` |

Total unique payload: **172 MB**.

Editions: G1050 is Mat.-Nr. 6001103 / 4317 (2017); M7000 is Mat.-Nr.
6000602 / 3421 (2021); G1000 was created 2024-10-28.

**Language note.** `G1000 CATALOGUE.pdf` has an InDesign title of
`Umschlag_G1000_DE.indd` and its first two pages are German marketing inserts,
which makes it look like the German edition. It is not — sampling twelve pages
across the document returns 52 English technical markers against 1 German. The
`_DE` refers to the cover wrapper only. All three catalogues are usable English
documents.

## Coverage against the site's 24 products

Matching on the NORD catalogue reference already stored in
`content/products.json`, these three PDFs back **10 of 24 products**:

| Catalogue | Products covered |
| --- | --- |
| G1000 | NORDBLOC.1 Helical, UNICASE Helical, UNICASE Parallel Shaft, UNICASE Bevel, UNICASE Helical Worm |
| G1050 | MAXXDRIVE Industrial Gear Units |
| M7000 | Energy-Saving, Switchable Pole, Single Phase, Explosion Protected (Dust) |

The remaining 14 have no supplied catalogue: G1014, G1035 (×2), M7003, M7010,
all five NORDAC F30xx inverters, and the four Complete Drive Systems concepts.

## Why they did not become product pages

They are **engineering selection catalogues** — dimension tables, ratio tables,
bearing and mounting data — not marketing copy. There is no descriptive content
in them to fill a product page with, and they cover fewer than half the range.
Generating 24 individual product pages from them would have produced thin,
near-duplicate pages, which rank worse than one strong category page.

Agreed approach instead: keep the four content-rich category pages, and give
every catalogue row an enquiry CTA that carries the product through to the
email. See the addendum in `validation-report.md`.

## Why they were not published as downloads

172 MB cannot go in the repository: every clone pulls it forever, git history is
permanently bloated, and Vercel deploys slow substantially. The realistic
options if this is revisited:

1. **Link out to nord.com** — zero repo weight, and the customer always gets
   NORD's current revision rather than a copy frozen in 2017. NORD's catalogue
   index is at `nord.com/en/documentation/catalogues/`, though the direct PDF
   URLs are behind a dynamic filter and would need to be captured by hand.
2. **Client CDN / S3** — full control of the exact revision, but the client has
   to provision and pay for it.
3. **Commit to the repo** — not recommended, for the reasons above.

If option 1 or 2 is chosen later, the wiring is small: add a `catalogueUrl`
field to each product in `content/products.json`, surface it as a download link
on the category page and in the catalogue table, and extend
`scripts/check-content.mjs` to validate the URL shape.
