# Validation Report — NORD Catalogue + SEO/GEO/GA

Date: 2026-09-02
Branch: `feat/nord-catalogue-seo`
Spec: `docs/superpowers/specs/2026-09-02-nord-catalogue-seo-design.md`

## Summary

All five phases complete. 32 files changed. Content check, production build and
a 15-endpoint smoke test all pass. Nothing committed — changes are staged for
the user to review and commit.

## 1. Source verification

The supplied PDF was extracted independently with `pypdf` (12 pages) and
compared field by field against `content/products.json`.

| Check | Result |
| --- | --- |
| PDF identified | NORD flyer F1300, Mat.-Nr. 6021602 / 1118, dated 11/2018 |
| Products in flyer | 20 catalogue products + 4 solution concepts |
| Products in JSON | 24 |
| Spec figures matching | **All** — sizes, power, torque, ratio, voltage verbatim |
| Missing from repo | None |

Conclusion: the brochure was already fully transcribed. No re-transcription was
performed, and `content/products.json` remains the single source of truth.

## 2. Content validation

```
$ npm run check:content
Content OK — 4 categories, 24 products, 8 portfolio tiles
Catalogue docs up to date — docs/nord-product-catalogue.md, public/llms.txt
```

Zero errors, zero warnings. The zero warnings matter: the validator warns when a
spec label has no glossary entry, so it confirms every column on the catalogue
table resolves to a tooltip.

**Drift gate proven, not assumed.** A stray line was appended to
`docs/nord-product-catalogue.md` and the check was re-run:

```
$ node scripts/gen-catalogue.mjs --check
ERROR    docs/nord-product-catalogue.md is out of date — run `npm run gen:catalogue`
exit=1
```

Regenerating restored exit 0. The generated documentation cannot silently
diverge from the site data.

## 3. Build

```
$ npx --no-install next build
✓ Compiled successfully
✓ Generating static pages (17/17)
```

17 routes prerendered, up from 13. New: `/catalogue`, `/robots.txt`,
`/sitemap.xml`, `/icon.svg`. Type-checking passes under `strict`.
`/catalogue` first-load JS is 112 kB against a 101 kB site baseline — the
searchable table costs about 11 kB.

## 4. Route smoke test (dev server, port 3210)

All 15 endpoints return 200, each with a distinct title:

| Route | Code | Title |
| --- | --- | --- |
| `/` | 200 | JK Motion Drive — Powering Precision in Motion |
| `/about` | 200 | About Us \| JK Motion Drive |
| `/products` | 200 | Products \| JK Motion Drive |
| `/catalogue` | 200 | NORD Product Catalogue — … \| JK Motion Drive |
| `/industries` | 200 | Industries \| JK Motion Drive |
| `/gallery` | 200 | Gallery & Downloads \| JK Motion Drive |
| `/contact` | 200 | Contact \| JK Motion Drive |
| `/products/gear-units-geared-motors` | 200 | Gear Units & Geared Motors \| … |
| `/products/electric-motors` | 200 | Electric Motors \| … |
| `/products/drive-electronics` | 200 | Drive Electronics \| … |
| `/products/complete-drive-systems` | 200 | Complete Drive Systems \| … |
| `/robots.txt` | 200 | — |
| `/sitemap.xml` | 200 | — |
| `/llms.txt` | 200 | — |
| `/icon.svg` | 200 | — |

Before this work, 8 of these routes shared one inherited title and there was no
canonical on any page. Canonical and `og:title` now verified present on all 11
HTML routes.

## 5. Catalogue table

| Check | Result |
| --- | --- |
| Rows rendered | 24 across 3 pages of 10 |
| Search input | present, labelled, `type="search"` |
| Category filters | 5 pills (All + 4 categories) with counts |
| Pagination | present, `aria-label="Catalogue pagination"` |
| Image column | `next/image`, `object-contain`, 64px `sizes` |
| Column tooltips | resolve for all of Sizes, Power, Torque, Ratio, Voltage |
| nsd tupH badges | 5 products tagged, as per flyer page 10 |

**Adaptive columns confirmed.** The generator applies identical logic and its
output shows it working: Gear Units renders Sizes/Power/Torque/Ratio, Drive
Electronics renders Sizes/Power/Voltage, and Electric Motors and Complete Drive
Systems render no numeric columns at all rather than four empty ones.

## 6. SEO / GEO / structured data

| Check | Result |
| --- | --- |
| `Organization` JSON-LD | present, parses, carries full postal address |
| `LocalBusiness` JSON-LD | present, parses, with `areaServed` and opening hours |
| `geo.region` | `IN-GJ` |
| `geo.placename` | `Ahmedabad` |
| `sitemap.xml` | 11 URLs, all absolute |
| `robots.txt` | allows all, declares host and sitemap |
| `llms.txt` | company summary, contact, 7 page links, all 24 products |

JSON-LD was parsed with a real JSON parser, not grepped, so the blocks are
confirmed syntactically valid.

## 7. Environment wiring

Both gates were tested in both states rather than assumed.

| Condition | Result |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` unset | 0 references to googletagmanager in output |
| `NEXT_PUBLIC_GA_ID=G-TESTONLY123` | tag URL and `gtag('config', …)` both emitted |
| `NEXT_PUBLIC_SITE_URL` unset | canonicals use `https://www.jkmotiondrive.com` |
| `NEXT_PUBLIC_SITE_URL=https://staging.example.com` | canonicals and `robots.txt` host both follow |

The test values were used only for verification; the tree was rebuilt clean
afterwards.

`.gitignore` had `.env*`, which silently excluded `.env.example`. A `!.env.example`
exception was added. Verified that `.env`, `.env.local` and `.env.production`
remain ignored.

## 8. Defects found and fixed during validation

1. **Empty `<title>` on the home page.** Setting `title: undefined` to fall
   through to the layout's `title.default` does not work — Next treats a present
   key as an override regardless of value, so the home page rendered an empty
   title. Fixed by stripping the key instead. Caught by diffing prerendered
   output, not by the build, which passed either way.
2. **Duplicated `og:title` on the home page** — "JK Motion Drive | JK Motion
   Drive", surfaced by fixing (1). `buildMetadata` now appends the company name
   only when the title does not already contain it.
3. **Empty `ICBM` meta tag.** An initial draft emitted `<meta name="ICBM"
   content="">`. An empty meta is worse than none; replaced with a comment
   recording what to fill in.
4. **`llms.txt` contact details hardcoded**, duplicating `lib/site.ts` and
   recreating the exact drift problem this design exists to prevent. The
   generator now reads them from `lib/site.ts` and hard-fails if the shape
   changes.

Two 500s seen on `/about` and `/icon.svg` mid-work were stale `.next` dev cache
after a large structural change, not defects — a clean restart and the
prerendered build output both showed them correct.

## 9. Deliberately not done

- **Latitude/longitude for the works address.** Wrong coordinates in
  `LocalBusiness` schema actively misdirect, and Google will pin whatever is
  given. The exact postal address ships; coordinates are a marked TODO in
  `lib/site.ts` to be read off the client's Google Business Profile.
- **The sixth nsd tupH product.** Flyer page 10 lists "NORDBLOC.1 helical bevel
  gear units (up to size 6)", a distinct family with no row in the JSON. Left
  untagged and documented in the generated catalogue rather than attached to
  "NORDBLOC.1 Helical Gear Units", which is a different product.
- Pre-existing issues untouched, per the spec's out-of-scope list: the
  `Header.tsx` keyboard trap, the hardcoded `0` stats, the stale `README.md`
  imagery claim, the duplicate `.gitignore` entries, and the unwired enquiry
  form.

## 10. Outstanding for the client

1. GA4 Measurement ID → set `NEXT_PUBLIC_GA_ID` in Vercel production.
2. Confirm the production domain; if it is not `www.jkmotiondrive.com`, set
   `NEXT_PUBLIC_SITE_URL` rather than editing code.
3. Works-address coordinates, to complete the GEO block.
4. A dedicated 1200x630 OG image — the brand lockup is currently standing in.

## Addendum — 2026-09-02, review round 2

Four items raised from a browser review.

### 1. Catalogue tooltip was clipped mid-sentence

The table scrolls sideways inside `overflow-x-auto`. Per spec, an element with
`overflow-x` other than `visible` computes `overflow-y` to `auto` as well, so
that wrapper clipped in **both** axes and sliced the tooltip off.

Fixed by rendering the bubble through `createPortal` into `document.body` with
fixed positioning derived from the trigger's bounding rect, plus a horizontal
clamp so the last column's tooltip cannot hang off the right edge.

Verified over the Chrome DevTools Protocol against the live page — the last
column (Voltage, the worst case) reports:

```
parent: BODY          <- escaped the clipping context
left: 1012, right: 1272, viewport: 1280   <- fully on screen, clamped
text: "VoltageSupply voltage. 1~ is single-phase, 3~ is three-phase"
aria-expanded: true
```

### 2. Products mega-menu was clipped on the left

The 720px panel was `absolute right-0` against the *Products nav item*, so it
began 720px to the left of that item and ran off the viewport on narrower
desktops — the reported case showed "UNITS & GEARED MOTORS" and "ELECTRONICS".

Fixed by moving the positioning context to the header's `container-x` and
right-aligning the panel to the container's content edge. Geometry now holds at
every width where the desktop nav is shown: at 768px the panel spans 24–744, at
841px 97–817, at 1440px 600–1320.

Verified by screenshot with the menu hovered open over CDP — all four headings
render in full.

### 3. Gallery hidden

Hidden in five places rather than deleted, so it can be restored: header nav
(`lib/site.ts`), footer, `sitemap.ts`, `llms.txt` generator, and the page now
sets `robots: { index: false, follow: false }`.

Confirmed in the built output: `<meta name="robots" content="noindex, nofollow">`
on the page, sitemap down from 11 URLs to 10, zero `gallery` references in
`llms.txt`, and absent from the rendered nav.

### 4. Home page images now name the product pictured

Every category card image is an exact filename match to one product render, so
the cross-reference is unambiguous:

| Card heading | Image actually shows |
| --- | --- |
| Gear Units & Geared Motors | UNICASE Helical Gear Units |
| Electric Motors | Energy-Saving Motors |
| Drive Electronics | NORDAC PRO SK 500E |
| Complete Drive Systems | Complete Drive Solutions from a Single Source |

`getCategoryImageProduct()` in `lib/productImages.ts` recovers this by filename.
Each card now carries a "Pictured: …" line and the `alt` text names the actual
product instead of the whole category — which also helps image search.

The heading itself stays the category name, because the card links to a
category listing of 9 products; renaming it would misdescribe the destination.

First attempt overlaid the caption on the image, which truncated on the narrow
cards and collided with the NORD lockup in the bottom-right corner. Moved into
the card body, where it neither truncates nor collides.

### Correction to section 8 of this report

The two mid-work 500s were attributed to "stale .next dev cache". The actual
cause, identified this round from `MODULE_NOT_FOUND` in
`.next/server/webpack-runtime.js`, is that **running `next build` while
`next dev` is running corrupts the dev server** — both write the same `.next`
directory. Restarting dev after any build clears it. Worth knowing; it produced
three separate false alarms across this work.

### Still outstanding, not fixed

**The home page stats render as `0`** — "0 INDUSTRIES SERVED", "0 DRIVE
CONFIGURATIONS", "0 YEARS OF EXPERTISE" — visible in the hero. This is the
pre-existing bug documented in `CLAUDE.md`: `StatsBar.tsx` and the home hero
hardcode `0` instead of reading `stats` from `lib/site.ts`, and
`components/StatCounter.tsx`, the animated counter written for exactly this, is
imported nowhere. It was listed as out of scope in the approved spec, so it has
been left alone — but it is the most visible defect remaining on the home page
and is roughly a 15-minute fix.

## Addendum — 2026-09-02, review round 3

### 1. Products mega-menu closed before the pointer could reach it

**A regression I introduced in round 2.** Moving the panel's positioning context
to `container-x` meant `top-full` resolved to the bottom of the 80px header bar,
while the hover target — the nav item — was only ~40px tall and vertically
centred. That left a ~20px dead band: moving down from "Products" exited the
trigger and fired `onMouseLeave` before the pointer ever reached the panel.

Three changes:
- `self-stretch` on the `<nav>` and `h-full` on the trigger, so the hover target
  fills the bar's height and there is no vertical gap at all.
- A 220ms close delay, cancelled on re-entry, so a diagonal path across other
  nav items does not close the menu.
- Focus and Escape handling, plus `aria-expanded` / `aria-haspopup`. This also
  clears the mouse-only keyboard trap that `CLAUDE.md` had listed as a known
  rough edge.

Verified over CDP by walking the pointer in 14 steps from "Products" to the
fourth link:

```
after hovering Products, panel open?              true
after walking pointer to the 4th link, still open? true
hovered element is: /products/complete-drive-systems
```

### 2. Per-row enquiry CTA and prefilled contact form

Each catalogue row now links to `/contact?product=<title>`. The link sits in the
Product cell rather than a trailing column — the table scrolls sideways, and an
action parked past the Voltage column would be off-screen for most visitors.

`ContactForm` resolves the title through `findProductByTitle()` and prefills.
Verified in-browser for MAXXDRIVE:

```
banner          : Enquiring about MAXXDRIVE Industrial Gear Units
                  | Gear Units & Geared Motors · NORD catalogue G1050
category select : gear-units-geared-motors      (auto-selected)
_subject        : Enquiry: MAXXDRIVE Industrial Gear Units (G1050)
Product field   : MAXXDRIVE Industrial Gear Units
message seed    : I would like a quotation for MAXXDRIVE Industrial Gear Units…
```

### 3. FormSubmit wiring

Gated on `NEXT_PUBLIC_FORMSUBMIT_ENDPOINT`, tested in both states:

| Condition | `<form action>` | Behaviour |
| --- | --- | --- |
| unset | absent | validates, shows success banner, sends nothing |
| `https://formsubmit.co/test-token-abc123` | that URL | native POST |

Native POST rather than `fetch()`: FormSubmit's standard endpoint sends no CORS
headers. The test token was used only for verification and is not committed.

**One thing to flag:** the request said *formsubmit.io*. The widely used service
is **formsubmit.co**. Nothing in the code assumes either — the endpoint is a
plain env var and any URL accepting a form POST works — but the address should
be confirmed before go-live. `.env.example` documents the `.co` flow.

### 4. Catalogue PDFs — assessed, deferred

Full assessment in `nord-catalogue-pdfs.md` in this directory. Summary: three
unique catalogues (two were exact duplicates), 172 MB, covering 10 of 24
products, containing selection tables rather than marketing copy. Too large for
the repo, and insufficient to build product pages from. Deferred by decision;
the analysis is recorded so it need not be repeated.

## Addendum — 2026-09-02, review round 4

### Home page stats no longer render `0`

Previously reported here as out of scope; now fixed on request.

**Two separate causes, not one.** `StatsBar.tsx` rendered a literal `0` and
dropped the suffix entirely. The home hero was worse: its `heroStats` array
consisted of label-only stubs —

```js
const heroStats = [{ label: "Industries Served" }, ...];   // no value, no suffix
```

— so there was no number to render in the first place. The figures in
`lib/site.ts` had never been wired to the hero at all.

Both now render `components/StatCounter.tsx`, the scroll-triggered counter that
was written for this and imported nowhere. The hero selects its three figures
from `lib/site.ts` **by label** rather than by index, so reordering that array
cannot silently swap them. "24/7 Support & Service" is deliberately left out of
the hero — a `/7` suffix counting up from zero reads as a glitch.

Verified in a real browser:

| Location | Before | After |
| --- | --- | --- |
| Hero overlay | `0`, `0`, `0` | `100+`, `500+`, `10+` |
| StatsBar | `0`, `0`, `0`, `0` | `100+`, `500+`, `24/7`, `10+` |

StatsBar reads `0` until scrolled into view — that is the IntersectionObserver
in `StatCounter`, working as designed, not a residual bug. It was confirmed by
scrolling the section to centre and re-reading the DOM.

Also tidied: `app/page.tsx` had its import block split in two by the metadata
export I inserted in round 1. All imports are back together, with the metadata
below them.

### FormSubmit provider confirmed

Confirmed as **formsubmit.co**. `.env.example` no longer hedges. No code change
was needed — the endpoint was always a plain env var.

### `CLAUDE.md` rough edges retired

Two entries in "Known rough edges" are now genuinely fixed and marked as such:
the `0` stats, and the mouse-only Products dropdown (round 3 added focus,
Escape and ARIA).

## Addendum — 2026-09-03, review round 5

### One listing component instead of three

`/catalogue`, `/products` and `/products/[slug]` listed products three different
ways: a table, a hand-rolled tile grid, and a card grid — search on only one of
them, and three different enquiry treatments. All three now render
`components/ProductBrowser.tsx`, which provides search, a grid/table toggle, an
optional category filter, pagination and a shared empty state.

`ProductCard` was refactored to take a `CatalogueRow` rather than a
`SubProduct`, so grid and table views are driven by one type.
`components/CatalogueTable.tsx` was deleted — fully superseded.

Verified in-browser on all three pages:

| Page | toggle | search | count | table columns |
| --- | --- | --- | --- | --- |
| `/products` | yes | yes | Showing 1–9 of 24 | …/ Ratio / Voltage / **Enquiry** |
| `/catalogue` | yes | yes | Showing 1–10 of 24 | …/ Ratio / Voltage / **Enquiry** |
| `/products/electric-motors` | yes | yes | Showing 1–6 of 6 | Image / Product / Category / Catalogue / **Enquiry** |

The last row is the adaptive-column rule still working: motors publish no
figures, so the numeric columns drop out entirely rather than rendering six rows
of "On request".

### "Every Drive in the Range" now shows every drive

That section on `/products` was titled "Every Drive in the Range" but rendered
only the **8** tiles in `portfolio.json` — 5 of which duplicated entries in
`products.json` — while `/catalogue` listed all 24. It now renders the same 24
rows as everywhere else, so the heading is true and all three pages share one
data source.

**Consequence to decide on:** `content/portfolio.json` and `lib/portfolio.ts`
are now unreferenced by any page. They were left in place rather than deleted —
removing client content data was not part of the request. They still pass
`check:content`. Delete both plus the portfolio block in
`scripts/check-content.mjs` whenever you want them gone; the three
portfolio-only composite tiles (MAXXDRIVE Gear Unit & Motor Package, Integrated
Geared Motor & Inverter, NORDAC Frequency Inverter Range) overlap the four
Complete Drive Systems entries already in `products.json`, so nothing unique is
lost.

### Enquiry is a real button, in its own column

Was a small `link-arrow` tucked under the product name — secondary-looking, and
easy to miss. Now `components/EnquireButton.tsx`, an orange `btn-primary`, in a
dedicated **Enquiry** column in the table and in the footer of every card.

Two layout problems surfaced and were fixed while verifying:

1. At `min-w-[980px]` the tenth column squeezed the cells until the button
   overflowed the scroll container and was sliced in half. Raised to
   `min-w-[1240px]` with explicit widths on the text columns, which also stopped
   product titles wrapping to four lines.
2. That made the table genuinely wider than the container, which pushed the
   Enquiry column off-screen by default. It is now `sticky right-0` with its own
   opaque background and a `group-hover` rule, so the primary action stays
   visible while the spec columns scroll underneath it.

### CTA hierarchy made coherent

Audited every `/contact` link on the site. The system is now documented in
`CLAUDE.md`: `EnquireButton` / `btn-primary` for conversion, `btn-white` on the
orange band, `btn-outline-white` for secondary on dark, and `link-arrow`
reserved for navigation only — never a conversion action. The two remaining
`link-arrow` uses (About, Industries) and `CategoryCard`'s "View range" are all
navigational, which is correct.

New shared utilities in `globals.css`: `btn-sm`, `view-toggle`,
`view-toggle-btn`, `search-input`, `filter-pill`.

### Empty state

Shared across all three pages. Searching `zzzznotaproduct` renders
**"No matching products found."**, quotes the term back, suggests what to try
(a catalogue reference, a family, a figure), and offers both "Reset filters" and
an "Ask us about it" enquiry button.

## Addendum — 2026-09-03, review round 6

### Phone and WhatsApp CTAs

Asked to configure +91 9898 464 465 in the WhatsApp and call CTAs. **It was
already configured** — `lib/site.ts` has held it since the client contact
details landed, and every CTA reads from there rather than hard-coding it.
Confirmed in the rendered HTML on both `/` and `/contact`:

```
https://wa.me/919898464465     WhatsApp — floating button, contact page
tel:+919898464465              call — floating button, footer, CTA banner, contact page
```

No placeholder numbers remain anywhere outside the form's input `placeholder`
attributes.

### What was added instead

The number exists as three separate strings — `phone` (display), `phoneHref`
(`tel:`) and `whatsapp` (`wa.me`) — and nothing forced them to agree. A future
correction landing in only one would leave the site showing one number and
dialling another, which nobody notices until a customer cannot get through.

`scripts/check-content.mjs` now compares the digits of all three and validates
the URI shapes. Proven against three real mistakes rather than assumed:

| Injected fault | Caught |
| --- | --- |
| `tel:` off by one digit | "phoneHref … does not dial the number shown on the site" |
| `wa.me` missing the country code | "whatsapp URL … does not match the number shown" |
| `wa.me` written with a `+` | "must not contain a + — WhatsApp expects bare digits" |

`lib/site.ts` was restored after each injection; `git diff` confirms no residue.

## Addendum — 2026-09-03, review round 7

### Contact map tile hidden

`SHOW_MAP = false` at the top of `app/contact/page.tsx`. Kept behind a flag
rather than deleted or commented out, so the JSX stays type-checked and
restoring it is one line — the same approach used for the hidden Gallery.

The original TODO on that block said the client still had to supply an address.
That was stale: the works address is in `lib/site.ts` and renders above the
tile. What actually remains is embedding a real map, at which point the tile
should be *replaced* rather than switched back on. `CLAUDE.md` now says so.

### GDPR cookie notice, functional

`components/CookieConsent.tsx` (banner), `lib/consent.ts` (state),
`components/Analytics.tsx` (obeys it). `Analytics` changed from a server to a
client component: consent moves at runtime, so the tag has to mount and unmount
in response.

The banner renders **only when `NEXT_PUBLIC_GA_ID` is set** — no tag means no
cookies, and a notice claiming otherwise would be false. Development and
previews therefore never show it.

Verified against a live gtag.js with `NEXT_PUBLIC_GA_ID=G-CONSENTTEST`:

| Step | banner | GA script | `ga-disable` | stored |
| --- | --- | --- | --- | --- |
| First visit, no choice | shown | loaded | `false` | – |
| Click **Decline** | hidden | still in DOM | **`true`** | `denied` |
| Reload | hidden | **not loaded** | `true` | `denied` |
| Re-accept | hidden | loaded | `false` | `granted` |

Row 2 is the important one and the reason the implementation is not just an
unmount: React removed the `<Script>` component, but next/script's injected tag
stays in the DOM and its code has already executed. Google's own
`window['ga-disable-<ID>']` kill switch is what actually stops the hits. From
the next page load the script is never injected at all.

Cookie deletion tested separately — gtag.js had genuinely set `_ga_CONSENTTEST`
during the run:

```
before decline : _ga_CONSENTTEST=GS2.1.…; _ga=GA1.1.…; _ga_TEST=GS1.1.abc
after decline  : (none)
kill switch    : true
```

### The legal caveat, stated plainly

`REQUIRE_OPT_IN` in `lib/consent.ts` is `false`, so analytics runs before a
visitor chooses — which is what "by continuing you agree" means and what was
asked for. **That is not sufficient under GDPR/ePrivacy for visitors in the EU
or UK**, which require a positive opt-in *before* any non-essential cookie is
set. India's DPDP Act does not impose the same prior-consent rule on analytics,
and this site's audience is Indian industry, so the setting is defensible today.

If EU/UK traffic matters later, flip that one flag to `true`: analytics then
waits for an explicit "Okay, understood", and the banner copy switches with it.
No other change is needed.

Also worth knowing: the note calls Google Analytics cookies necessary. They are
not — they are analytics/statistics cookies, and no consent framework treats
them as strictly necessary. That does not affect the implementation, but it
should not go into a privacy policy as written.

## Addendum — 2026-09-03, review round 8

### Privacy Policy and Terms of Use

New `/privacy` and `/terms`, sharing `components/LegalPage.tsx` for the
long-form typography (nothing else on the site is prose, so the treatment is
scoped there rather than made global). Both pull the company name, addresses,
phone and email from `lib/site.ts`, so they cannot drift from the rest of the
site.

The footer's Privacy/Terms links were `href="#"` — a documented dead link in
`CLAUDE.md`. Both now resolve. Added to the sitemap (12 URLs, up from 10) and to
`llms.txt`.

**These are drafts, not legal advice.** They are written to the shape such
documents normally take and to what this site actually does: every processor
named (FormSubmit, Google Analytics, Vercel) is one the site genuinely uses, and
nothing is claimed that the code does not do. The clauses worth a real lawyer's
eye are the liability limitation and the governing-law clause in Terms, and the
retention periods in Privacy. Both files carry that caveat as a source comment,
deliberately not as visible page text.

Two clauses are load-bearing for this particular business and were written
specifically rather than boilerplated: published figures are transcribed from a
dated flyer and are **not a warranty of performance**, and an enquiry does
**not** form a contract.

### "SSR build" — what was actually needed

The request was to make the deployed build an SSR build. Measured first:

```
JS-less crawler (curl, no JavaScript executed)
  /                                   171 KB, 8 headings,  product names + specs present
  /catalogue                          140 KB, full <tbody> present, 19 spec values
  /products/gear-units-geared-motors  138 KB, 17 spec values
```

**Every content route already server-renders.** Next renders client components
to HTML too; JavaScript is only needed for hydration. For crawlers and AI
assistants, prerendered output is indistinguishable from per-request SSR, and it
is faster, edge-cacheable and cheaper. Forcing those routes dynamic would have
been a straight downgrade.

One route genuinely needed it. `/contact` was prerendered as a single static
file, so `?product=` prefill existed only after hydration — confirmed by
grepping the built artefact:

```
.next/server/app/contact.html : "Enquiring about" -> 0 occurrences
                                "animate-pulse"   -> 1 (the Suspense fallback)
```

It now reads `searchParams` on the server and passes the resolved product into
`ContactForm` as a prop. The build marks it `ƒ (Dynamic)`, the Suspense boundary
is gone, and the prefill is in the HTML:

```
curl "/contact?product=UNICASE%20Helical%20Gear%20Units"
  -> "Enquiring about" present
  -> value="Enquiry: UNICASE Helical Gear Units (G1000)"
  -> animate-pulse: 0
```

### AI crawler support

`app/robots.ts` now lists 18 AI user-agents with explicit `Allow: /` — GPTBot,
ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot,
anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended,
Applebot-Extended, Bytespider, CCBot, cohere-ai, Meta-ExternalAgent, Amazonbot,
DuckAssistBot, YouBot.

`User-agent: *` already permitted them, so this changes nothing technically. It
is there because hosting platforms, WAF bot-management rules and copied
robots.txt templates block AI crawlers by default, and an explicit rule is the
only durable record of intent. `llms.txt` gained the legal pages and a short
note stating that its content may be read, summarised and quoted with
attribution.

### Setup and deploy scripts

| File | Purpose |
| --- | --- |
| `scripts/setup.sh` | node version gate, `npm ci`, seeds `.env.local` (never overwrites), runs checks |
| `scripts/deploy.sh` | `preview` \| `production`; gates then deploys |
| `vercel.json` | build command, `bom1` region, security headers, `text/plain` for llms.txt |

`npm run setup`, `npm run deploy`, `npm run deploy:prod` alias them. Both scripts
pass `bash -n` and are `chmod +x`.

`deploy.sh` checks `vercel whoami` **before** building, so an unauthenticated
run fails in a second rather than after a full build. It runs `check:content`
and a complete production build locally, warns on a dirty tree or a
non-`main` production deploy, and prompts before publishing (`--yes` to skip in
CI). The region is Mumbai because the audience is Gujarat-based.

**Nothing was deployed.** The Vercel CLI is not installed on this machine and
publishing is an outward-facing action that was not authorised — the tooling is
ready to run when you are.

## Status

Ready for review. All changes staged, nothing committed.
