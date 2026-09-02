# State — NORD Catalogue + SEO/GEO/GA

## ▶ RESUME — updated 2026-09-03 02:20 IST

**All five phases complete, plus a review round.** Changes are staged on branch
`feat/nord-catalogue-seo`; nothing is committed — the user commits.

Round 8 added /privacy and /terms (drafts — need the client's lawyer), wired the
dead footer links, made /contact genuinely SSR (the only route that needed it),
listed 18 AI crawlers in robots.ts, and added setup.sh / deploy.sh / vercel.json.
Nothing has been deployed.

Round 7 hid the contact map tile (`SHOW_MAP = false`) and added a functional
GDPR cookie notice — declining genuinely disables GA (kill switch + Consent Mode
+ cookie deletion), verified against live gtag.js. `REQUIRE_OPT_IN` in
`lib/consent.ts` flips it to strict opt-in if EU/UK traffic ever matters.

Round 6 verified the phone/WhatsApp CTAs (already configured) and added a
check:content guard so display and dial numbers cannot diverge.

Round 5 unified every product listing behind `components/ProductBrowser.tsx`
(search + grid/table toggle + filter + pagination + empty state), made the
enquiry CTA a primary button in its own pinned-right table column via
`components/EnquireButton.tsx`, and documented the site-wide CTA hierarchy in
CLAUDE.md. `components/CatalogueTable.tsx` was deleted.

**Open question for the user:** `content/portfolio.json` + `lib/portfolio.ts` are
now unreferenced (the /products section renders all 24 products instead of the 8
portfolio tiles). Left in place deliberately; delete on a word.

Round 4 fixed the home-page `0` stats (hero + StatsBar now use StatCounter off
`lib/site.ts`) and confirmed the enquiry provider as **formsubmit.co**.

Review round 3 fixed: the Products mega-menu closing before the pointer could
reach it (a regression from round 2 — the trigger is now full-bar-height with a
220ms close delay, plus focus/Escape support), a per-row "Enquire" CTA on the
catalogue that prefills the contact form with the product, and FormSubmit wiring
gated on `NEXT_PUBLIC_FORMSUBMIT_ENDPOINT`.

The three supplied NORD catalogue PDFs were assessed and **deferred** — see
`nord-catalogue-pdfs.md` here. 172 MB, covering 10 of 24 products, selection
tables rather than marketing copy. Do not redo that analysis.

Review round 2 fixed: catalogue tooltip clipping (now portals to body), Products
mega-menu clipping (now anchored to the header container), Gallery hidden in
five places, and home-page category images captioned with the product actually
pictured. See the addendum in `validation-report.md`.

Next action: user reviews the staged diff and commits.

**Offered but NOT done:** the home-page stats render as `0` (pre-existing, see
CLAUDE.md "Known rough edges"). Scoped out of this work; awaiting a decision.

See `validation-report.md` in this directory for evidence.

## What shipped

- `/catalogue` — searchable, filterable, paginated table of all 24 products
- `docs/nord-product-catalogue.md` + `public/llms.txt` — generated, drift-gated
- Full SEO/GEO surface: per-route metadata, sitemap, robots, JSON-LD, icon
- GA4 scaffold, env-gated on `NEXT_PUBLIC_GA_ID`

## Key context for a future session

- The supplied PDF **is** flyer F1300, already transcribed into
  `content/products.json`. Do not re-transcribe — JSON is the single source.
- `docs/nord-product-catalogue.md` and `public/llms.txt` are **generated**.
  Edit `content/products.json`, then `npm run gen:catalogue`.
  `npm run check:content` fails if they are stale.
- 10 of 24 products carry no numeric specs (6 motors, 4 drive-system concepts);
  the table's columns adapt rather than showing empty cells.
- Dev server: `WATCHPACK_POLLING=1000 npm run dev -- --port 3210`. Without the
  polling flag the watcher dies on this machine and every route 404s.
- Do not run `npm run lint` — ESLint is not installed and it prompts.
- **Never run `next build` while `next dev` is running** — they share `.next/`
  and the build corrupts the dev server (`MODULE_NOT_FOUND` in
  webpack-runtime.js, every route 500s). Restart dev after any build.
- Coordinates for the works address are still a TODO in `lib/site.ts`.

## Awaiting the client

1. GA4 Measurement ID for `NEXT_PUBLIC_GA_ID`
2. Confirmation of the production domain
3. Works-address latitude/longitude
4. A dedicated 1200x630 OG image
5. The FormSubmit endpoint for `NEXT_PUBLIC_FORMSUBMIT_ENDPOINT` — provider
   confirmed as **formsubmit.co**; the account still needs activating and the
   token pasting in
6. A hosting decision if the catalogue PDFs are ever to be offered as downloads
7. Legal review of /privacy and /terms before go-live — particularly the
   liability and governing-law clauses, and the stated retention periods
8. A Vercel project link (`vercel login` then `npm run deploy`) — the CLI is not
   installed on this machine
