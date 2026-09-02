# NORD Catalogue, Generated Documentation and SEO/GEO Provisioning

Date: 2026-09-02
Status: Approved

## Problem

Three requests, one codebase:

1. Turn the client-supplied NORD brochure into a documented product catalogue,
   presented on the site as a paginated, searchable table with images and
   tooltips on technical detail.
2. Publish that same catalogue as a Markdown document.
3. Provision SEO metadata, GEO (local search) signals, an `llms.txt` for LLM
   crawlers, and Google Analytics.

## The finding that shaped this design

The supplied PDF is NORD flyer **F1300 (Mat.-Nr. 6021602 / 1118)**.
`content/products.json` already contains all 24 products transcribed from
exactly that flyer — `lib/products.ts` and `content/README.md` both cite it by
name and material number.

The PDF was extracted independently and compared field by field against the
JSON. Every size, power, torque, ratio and voltage figure matches verbatim.
Nothing in the brochure is missing from the repository.

**Therefore this is not a transcription task.** The data layer exists. The gaps
are presentation, documentation and discoverability. Re-transcribing the flyer
would create a second source of truth that drifts from the first the moment
either is corrected.

## What the brochure contains

20 real catalogue products plus 4 synthesized "complete drive systems" entries:

| Group | Count | Specs present in flyer |
| --- | --- | --- |
| Gear units (G1000 / G1014 / G1035 / G1050) | 9 | Sizes, Power, Torque, Ratio |
| Drive electronics (F3015 – F3050) | 5 | Sizes, Voltage, Power |
| Electric motors (M7000 – M7010) | 6 | none — catalogue reference only |
| Complete drive systems | 4 | none — solution concepts, not SKUs |

**10 of 24 rows carry no numeric specification at all.** This asymmetry is the
central design constraint on any unified table.

## Competitive reference

Reviewed under explicit authorisation, as reference only — no design taken.

- **Dynapar** (`dynapar.co.in/nord`) — long descriptive sections, side-nav jump
  links. No table, no search, no pagination, no catalogue references.
- **Orient Enterprise** (Sarkhej, Ahmedabad — an actual NORD distributor) —
  descriptive sections with per-product photos. Strong local-SEO signals
  (Ahmedabad/Gujarat mentions, full address, Maps embed, GST number) but **no
  structured schema markup**.
- **Indian Electric** — bare card grid, no specifications shown at all.

Two conclusions: a searchable, paginated, spec-comparable table is a genuine
differentiator in this niche; and `LocalBusiness` JSON-LD is an unclaimed edge
against the nearest local competitor.

## Decisions

| # | Decision | Rationale |
| --- | --- | --- |
| 1 | `content/products.json` remains the single source of truth | Avoids a second transcription of the same flyer |
| 2 | The Markdown catalogue is **generated** from that JSON, with a `--check` drift gate in `npm run check:content` | Makes divergence structurally impossible, not merely discouraged |
| 3 | New `/catalogue` route | Leaves the existing category cards and portfolio grid intact; gives a clean URL to rank for "NORD catalogue Ahmedabad" |
| 4 | Adaptive columns | Core columns always visible; Torque/Ratio/Voltage appear only when the active filter makes them meaningful. Avoids rendering a wall of dashes for the motor range |
| 5 | Canonical domain from `NEXT_PUBLIC_SITE_URL`, defaulting to `https://www.jkmotiondrive.com` | Inferred from `sales@jkmotiondrive.com`; env-driven so a wrong guess is a Vercel setting, not a code change |
| 6 | GA4 env-gated on `NEXT_PUBLIC_GA_ID` | Renders nothing when unset, so dev and preview stay clean |
| 7 | Latitude/longitude deliberately omitted | Wrong coordinates in `LocalBusiness` schema actively misdirect. Exact postal address ships; coordinates left as a marked TODO for client confirmation |

## Architecture

```
content/products.json ......... single source of truth (unchanged shape + nsdTupH)
content/glossary.json ......... NEW - tooltip definitions for technical terms
        |
        +--> lib/catalogue.ts ......... flattens 4 categories -> 24 rows, column-set logic
        |         +--> app/catalogue/page.tsx ....... server component
        |                  +--> components/CatalogueTable.tsx .. client: search/filter/paginate
        |                           +--> components/SpecTooltip.tsx .. accessible tooltip
        |
        +--> scripts/gen-catalogue.mjs
                  +--> docs/nord-product-catalogue.md  (generated; drift-checked)
```

### Client-component boundary

`CLAUDE.md` states that only `Header`, `ContactForm` and `StatCounter` are
client components and that this should stay so. Search and pagination need
state, so this design breaks that rule exactly once and narrowly:
`app/catalogue/page.tsx` remains a server component; only `CatalogueTable` and
`SpecTooltip` are `"use client"`. `CLAUDE.md` is amended so the stated
convention continues to match the code.

### Accessibility

`SpecTooltip` is a focusable `<button>` with `aria-describedby`, dismissible on
`Escape`, not a CSS-hover affordance. `Header.tsx` already carries a documented
mouse-only keyboard trap; this design does not add a second one.

## Data additions

Only two, both small:

1. **`content/glossary.json`** — technical term to definition, sourced from the
   flyer. Covers: Sizes, Power, Torque, Ratio, Voltage, UNICASE, NORDBLOC.1,
   MAXXDRIVE, nsd tupH, POSICON, ISD control, integrated PLC, IE1–IE4.
2. **`nsdTupH: boolean`** on each product — flyer page 10 lists which products
   are available with the nsd tupH surface treatment.

**Provenance note on nsd tupH.** Page 10 lists six items. Five map cleanly onto
existing product titles: NORDBLOC.1 2-Stage Bevel, UNIVERSAL SMI Worm, Smooth
Motors, SK 180E, SK 135E. The sixth — "NORDBLOC.1 Helical bevel gear units (up
to size 6)" — is a distinct NORD family that has no separate row in
`products.json`; the nearest title, "NORDBLOC.1 Helical Gear Units", is a
different product. It is therefore left `false` and documented rather than
mis-tagged, consistent with the repository's existing provenance discipline.

## SEO / GEO / LLM / Analytics

| Concern | Implementation |
| --- | --- |
| Shared config | `lib/seo.ts` — site URL, `buildMetadata()`, JSON-LD builders |
| Root metadata | `metadataBase`, OpenGraph, Twitter, robots, icons, canonical |
| Per-route metadata | 8 routes currently inheriting the root title get their own |
| Crawl | `app/sitemap.ts`, `app/robots.ts` |
| Structured data | `Organization` + `LocalBusiness` JSON-LD from `lib/site.ts` |
| GEO | `geo.region` (IN-GJ), `geo.placename` (Ahmedabad), `areaServed` |
| LLM | `public/llms.txt` — company summary plus full catalogue |
| Analytics | `components/Analytics.tsx`, GA4 via `next/script` `afterInteractive`, env-gated |

## Out of scope

- Correcting the stale `README.md` imagery claim and duplicate `.gitignore`
  entries (unrelated pre-existing issues).
- Fixing the `Header.tsx` keyboard trap or the hardcoded `0` stats — real bugs,
  but not touched by this work.
- Wiring the enquiry form to a real endpoint.

## Verification

1. `npm run check:content` — extended with the Markdown drift gate
2. `npx --no-install next build` — type-checks and prerenders every route
3. Route smoke test against the dev server on port 3210
4. Results recorded in `docs/tasks/2026-09-02-nord-catalogue-seo/validation-report.md`
