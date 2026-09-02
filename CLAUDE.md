# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Marketing website for **JK Motion Drive** — an Indian supplier of industrial
drive technology (gear units, geared motors, electric motors, drive
electronics). It is a brochure site: no database, no backend, no auth, no
tests. Every route is statically rendered at build time.

Stack: **Next.js 14 (App Router)** · TypeScript (strict) · Tailwind CSS 3 ·
`lucide-react` icons. Deployed on **Vercel**.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build — the real check before committing
npm run start   # serve the built output

npm run check:content   # validates the JSON *and* checks the generated docs are current
npm run gen:catalogue   # regenerates docs/nord-product-catalogue.md and public/llms.txt
```

On some macOS machines the dev-server file watcher dies with a flood of
`Watchpack Error ... EMFILE`, after which every route 404s because Next never
builds its route map. It is FSEvents stream exhaustion, not a descriptor limit —
raising `ulimit -n` does not help. Run `WATCHPACK_POLLING=1000 npm run dev`
instead.

There is no test suite. There is also no ESLint installed despite
`npm run lint` existing in `package.json`, so `next lint` will offer to
install it interactively — **do not run it**. Verify work with
`npx --no-install next build`, which type-checks and prerenders every route.

`.claude/launch.json` defines a single `jk-motion-drive` dev-server config for
the preview tooling; prefer that over launching `npm run dev` by hand.

## Architecture

**Content lives in `lib/`, never in components.** Pages are thin layouts that
map over exported arrays. To change copy, products, industries or contact
details, edit `lib/` — not JSX.

| File | Owns |
| --- | --- |
| `lib/site.ts` | Company name/tagline, contact details, nav items, headline stats, "why choose us" and core-values cards |
| `lib/products.ts` | The four product categories, each with sub-products, key features, applications; `getCategory(slug)` |
| `lib/portfolio.ts` | Flat list of individual products for the Products-page portfolio grid |
| `lib/productImages.ts` | All product-artwork path mapping (category → image, sub-product title → image) |
| `lib/industries.ts` | The 13 industry cards |
| `lib/catalogue.ts` | Flat view of all 24 products for the `/catalogue` table, plus the adaptive-column rule |
| `lib/glossary.ts` | Typed boundary over `content/glossary.json` — tooltip copy for technical terms |
| `lib/seo.ts` | Canonical origin, `buildMetadata()`, and the Organization / LocalBusiness JSON-LD builders |

**Routes** (`app/`): `/`, `/about`, `/products`, `/products/[slug]`,
`/catalogue`, `/industries`, `/gallery`, `/contact`, `/privacy`, `/terms`, plus
the generated `robots.txt`, `sitemap.xml` and `icon.svg`.

The four product pages are one dynamic template — `app/products/[slug]/page.tsx`
with `generateStaticParams()` from `productCategories`. Adding a fifth category
means adding one object to `lib/products.ts`; the route, the header dropdown,
the footer column and the contact-form dropdown all pick it up automatically.

`app/layout.tsx` wraps everything in `Header` / `Footer` / `FloatingWidgets` and
loads Inter + Anton via `next/font/google`.

Client components are `Header`, `ContactForm`, `StatCounter`, `ProductBrowser`
and `SpecTooltip`; everything else is a server component, and every *page* is.
`ProductCard` and `EnquireButton` carry no `"use client"` of their own but are
rendered by `ProductBrowser`, so they end up in the client bundle too — that is
intentional, not an oversight. Keep new work on the server side unless it
genuinely needs state.

## Styling conventions

Semantic utility classes are defined once in `app/globals.css` under
`@layer components` — `container-x`, `section`, `eyebrow`, `btn-primary`,
`btn-dark`, `btn-outline-white`, `btn-white`, `btn-whatsapp`, `card`,
`chip-icon`, `pill-badge`, `tag-pill`, `app-pill`, `link-arrow`,
`heading-1/2/3`, `body-lg`. **Use these instead of re-spelling the same Tailwind
chains.** New recurring patterns belong in `globals.css`, not copy-pasted.

Design tokens are in `tailwind.config.ts`: `brand.orange` `#F26522` (primary),
`brand.orange-hover`, `brand.orange-tint` (icon chips), `brand.black` `#111111`
(dark bands), `whatsapp` `#25D366`. All `h1`–`h4` are globally Anton, uppercase.

Section rhythm alternates `bg-white` → `bg-neutral-50` → `bg-brand-black`, and
most pages close with `<CtaBanner />`. Contact deliberately does not — the form
is its own CTA.

Icons are referenced by **string key**, not imported per page. `FeatureIconCard`
and `IndustryCard` each hold a `Record<string, LucideIcon>` map with a fallback.
Adding an icon means adding it to that map, so `lib/` data stays plain and
serialisable.

## Images

Two directories, deliberately:

- `product-images/` — client-supplied originals (large JPEGs, source SVGs).
  Kept in the repo as the source of truth; never referenced by the site.
- `public/images/` — the web-serving copies. Photography is re-encoded to
  **WebP at ~1000px wide** (tiles render around 320px); typical file is
  30–110 KB. Product renders stay SVG.

Rules that matter:

- **Raster photos** go through `next/image`, with `fill` + `sizes` inside a
  `relative` aspect-ratio wrapper.
- **SVG product artwork** is served with a plain `<img>` and an
  `{/* eslint-disable-next-line @next/next/no-img-element */}` comment above it,
  because `next/image` does not optimise SVG. This is intentional — do not
  "fix" it into `<Image>`.
- `components/ImagePlaceholder.tsx` is the fallback for slots without
  photography yet. Several call sites still branch on an optional `image` field
  so new captions can land ahead of their imagery; keep that branch.
- The client supplied 8 product renders for ~23 product slots, so
  `lib/productImages.ts` reuses artwork across related products. Swapping in
  real photography means changing paths in that one file.

Brand lockup: `brand/jk-motion-logo-original.svg` is the source;
`public/images/logo.webp` (light bg) and `logo-light.webp` (dark bg) are what
render. `components/Logo.tsx` derives width from a fixed `353/144` aspect ratio
— pass `height`, never both.

## Placeholder content awaiting the client

Grep `TODO:` and bracketed values like `[+91 00000 00000]` / `[Client Name]` —
both are intentional markers, not bugs. Outstanding:

- ~~Real contact details and WhatsApp number~~ — supplied and in `lib/site.ts`.
  The number lives there three times (`phone` for display, `phoneHref` as a
  `tel:` URI, `whatsapp` inside a `wa.me` URL) and every call/WhatsApp CTA reads
  from it — never hard-code a number in a component. `npm run check:content`
  fails if the three ever disagree, or if the `wa.me` URL is malformed.
- Map tile on `app/contact/page.tsx` is **hidden** — `SHOW_MAP = false` at the
  top of that file. It is a facility photo standing in for a real map; when a
  Google Maps embed for the works address is ready it should replace the tile
  rather than the flag simply being flipped back on
- Real testimonials (`app/page.tsx`)
- Catalogue PDFs and file sizes (`app/gallery/page.tsx`)
- Enquiry-form endpoint — `components/ContactForm.tsx` posts to
  `NEXT_PUBLIC_FORMSUBMIT_ENDPOINT` when that is set, and falls back to the old
  local-state success message when it is not. The endpoint itself is still to be
  supplied by the client
- Final product names/specs for the portfolio grid (`lib/portfolio.ts`)

## Known rough edges

Real issues, not placeholders — fix if the task touches them:

- ~~Stats render as `0`~~ — fixed. Both `StatsBar.tsx` and the home hero now
  render `components/StatCounter.tsx` off the `stats` array in `lib/site.ts`.
  The hero's `heroStats` used to be label-only stubs with no `value` field at
  all, which is why it showed zero; it now selects from `lib/site.ts` **by
  label**, so reordering that array cannot silently swap the figures.
- ~~The Products mega-dropdown is mouse-only~~ — fixed. `Header.tsx` now opens
  on focus as well as hover, closes on Escape and on focus leaving the menu, and
  carries `aria-expanded` / `aria-haspopup`. The trigger fills the header bar's
  full height and the close is delayed 220ms, so the pointer can travel from
  "Products" to the panel without it shutting.
- **Dead `href="#"` links**: the footer social "Website" button, plus every
  gallery catalogue download button. (Footer Privacy/Terms now point at
  `/privacy` and `/terms`.)
- ~~No page-level metadata~~ — fixed. Every route now exports metadata built by
  `lib/seo.ts`, and `sitemap.ts` / `robots.ts` / `icon.svg` exist.
- `README.md` still says all site imagery is placeholder — that stopped being
  true once the client photography landed.
- `.gitignore` lists `.vercel` and `.env*` twice.

## Catalogue, generated docs and SEO

`/catalogue` renders all 24 products as one searchable, paginated table.
`lib/catalogue.ts` flattens the four categories and decides which spec columns
to show: a column appears only when a row in the current view can fill it, so
filtering to Electric Motors drops the numeric columns entirely rather than
showing a grid of dashes. 10 of the 24 products carry no figures in the flyer
(all six motors, all four drive-system concepts) and read "On request".

**`docs/nord-product-catalogue.md` and `public/llms.txt` are generated — never
edit them by hand.** `scripts/gen-catalogue.mjs` builds both from
`content/products.json`, and `npm run check:content` runs it with `--check` and
fails if either file is stale. That is what stops the written catalogue drifting
from the site. The generator also reads the contact block out of `lib/site.ts`
by regex and hard-fails if the shape changes, so contact details are never
retyped in two places.

SEO lives in `lib/seo.ts`: canonical origin from `NEXT_PUBLIC_SITE_URL`
(defaulting to the production domain), `buildMetadata()` for per-route title /
description / canonical / OpenGraph, and the `Organization` + `LocalBusiness`
JSON-LD injected from `app/layout.tsx`. GEO signals are `geo.region` /
`geo.placename` meta plus `areaServed` in the LocalBusiness block.

**Deliberately absent: latitude/longitude.** A guessed coordinate gets pinned by
Google, so `geo` in the JSON-LD and the `ICBM` meta tag are left out until
someone reads the real coordinates off the client's Google Business Profile.
See the TODO in `lib/site.ts`.

Analytics is `components/Analytics.tsx`, gated on `NEXT_PUBLIC_GA_ID` — nothing
is emitted when it is unset, so only production carries the tag. See
`.env.example`.

## One product listing, three pages

`components/ProductBrowser.tsx` is the only product listing on the site. It
renders search, a grid/table view toggle, an optional category filter,
pagination and the empty state, and both `/catalogue` and every products page
use it. Before it, the same job was done three different ways — a table on
`/catalogue`, a hand-rolled tile grid on `/products`, and a card grid on the
category pages — with search on only one of them and three different enquiry
treatments.

Pages differ only by props:

| Page | rows | default view | category filter |
| --- | --- | --- | --- |
| `/catalogue` | all 24 | table | yes |
| `/products` | all 24 | grid (compact cards) | yes |
| `/products/[slug]` | that category | grid | no (one category) |

Grid view renders `components/ProductCard.tsx`, which takes a `CatalogueRow` —
the same shape the table rows use — so both views are driven by one type.

The table's **Enquiry column is pinned right** (`sticky right-0`). With ten
columns the table is wider than the container, and a primary action that only
appears after scrolling sideways is not really primary. It needs its own opaque
background and a `group-hover` rule because the other cells scroll under it.

## Cookie consent and analytics

`components/CookieConsent.tsx` shows the notice; `lib/consent.ts` holds the
state; `components/Analytics.tsx` obeys it. All three are client components —
consent changes at runtime, so the tag has to mount and unmount in response.

The banner renders **only when `NEXT_PUBLIC_GA_ID` is set**. No tag means no
cookies, and a notice claiming otherwise would be untrue, so development and
previews never show it.

`REQUIRE_OPT_IN` in `lib/consent.ts` decides what happens before a visitor
chooses. It is `false`: analytics runs, matching the banner's "by continuing you
agree" wording, which is what the client asked for. **Implied consent is not
sufficient under GDPR/ePrivacy for EU or UK visitors** — flip the flag to `true`
and analytics waits for a positive opt-in, and the banner copy changes with it.
Nothing else needs touching.

Declining does three things, because any one alone leaves something behind:

1. sets Google's own `window['ga-disable-<ID>']` kill switch, which gtag.js
   checks before every hit — this is what stops a tag already in memory, since
   unmounting the `<Script>` does **not** unload executed code;
2. sends a Consent Mode v2 `analytics_storage: 'denied'` update;
3. deletes the `_ga` / `_gid` cookies already written, on both the host and the
   registrable parent domain.

On the next page load the script is not injected at all. The choice lives in
`localStorage` under `jkmd-cookie-consent` and syncs across tabs.

## Call-to-action hierarchy

Use these consistently; the site previously had three different treatments of
the same "ask about this product" action.

| Treatment | Meaning | Where |
| --- | --- | --- |
| `EnquireButton` (orange `btn-primary`) | ask about a product | product cards, table rows, empty state |
| `btn-primary` | convert — quote, talk to an engineer | header, category pages |
| `btn-white` | convert, on the orange CTA band | `CtaBanner` |
| `btn-outline-white` | secondary, on dark | home hero |
| `link-arrow` | **navigation only** — never a conversion action | About, Industries, "View range" |

`EnquireButton` takes the product title and puts it in the query string, so the
enquiry email names the drive. Never hand-write a `/contact?product=` link —
use the component.

`btn-sm` is the compact size for table rows and card footers. `view-toggle`,
`search-input` and `filter-pill` in `globals.css` back the browser's controls.

## The enquiry flow

Every row in `/catalogue` carries an "Enquire" link to
`/contact?product=<exact product title>`. `ContactForm` reads that back through
`findProductByTitle()` in `lib/catalogue.ts` and prefills itself: it shows which
product is being asked about, selects that product's category, seeds the message
with an application checklist, and passes the product and its NORD catalogue
reference through as their own fields plus the email subject line. The point is
that the enquiry arriving in the inbox names the drive the person was looking
at.

`ContactForm` is inside a `<Suspense>` boundary in `app/contact/page.tsx`
because it calls `useSearchParams()`, which Next requires on a statically
rendered route.

Submission posts natively rather than through `fetch()` — FormSubmit's standard
endpoint sends no CORS headers, so a fetch would be blocked. `_next` returns the
visitor to `/contact?sent=1`, which is what renders the success banner. The
underscore-prefixed hidden fields (`_subject`, `_next`, `_captcha`, `_template`,
`_honey`) are the only FormSubmit-specific thing in the codebase; any endpoint
accepting a normal form POST works.

## Rendering: static vs SSR

Every content route is **statically prerendered**, and that is deliberate. Next
server-renders client components to HTML too, so a crawler with JavaScript
disabled already receives the product names, the spec figures and the entire
catalogue `<tbody>`. For search engines and AI assistants, prerendered output is
indistinguishable from per-request SSR — and it is faster, cacheable at the edge
and cheaper. Do not add `force-dynamic` to these routes; it would only slow them
down.

`/contact` is the exception and is marked `ƒ (Dynamic)`. Its content depends on
`?product=`, and prerendered it was one file for every product, with the enquiry
context appearing only after hydration — a crawler saw a loading pulse. It now
reads `searchParams` on the server and passes the resolved product into
`ContactForm` as a prop, so the prefilled form is in the HTML. That is also why
`ContactForm` no longer needs a Suspense boundary.

The rule: prerender unless the response genuinely varies per request.

## AI crawlers

`app/robots.ts` lists GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot,
PerplexityBot, Google-Extended and others with an explicit `Allow: /`.
`User-agent: *` already permits them, so these rules change nothing technically
— they exist because hosting platforms, WAF bot rules and copy-pasted templates
often block AI crawlers by default, and this file is the record that the site
owner wants them in. `public/llms.txt` (generated) gives them the whole
catalogue without parsing the rendered table.

## Setup and deployment

```bash
npm run setup          # ./scripts/setup.sh   — install, seed .env.local, verify
npm run deploy         # ./scripts/deploy.sh preview
npm run deploy:prod    # ./scripts/deploy.sh production (prompts to confirm)
```

`deploy.sh` runs the gates locally before touching Vercel — content validation,
generated-doc drift, and a full production build that type-checks and prerenders
every route — so a broken tree never reaches a URL. It also checks
`vercel whoami` first, rather than spending a build on a deploy that has nowhere
to go, and warns when the working tree is dirty or production is being deployed
from a branch other than `main`.

`vercel.json` pins the build command, sets the region to `bom1` (Mumbai — the
audience is Indian), and adds security headers plus a `text/plain` content type
for `/llms.txt`.

Environment variables live in the Vercel project settings, never in the repo.
See `.env.example`.

## Repository hygiene

- This working tree holds **only** the website. An unrelated Python/Streamlit
  project (`text-to-sql-rag`) previously sat untracked inside it and has been
  moved out to a sibling directory; if anything like that reappears here, move
  it out rather than committing or gitignoring it.
- `.env.local` holds a `VERCEL_OIDC_TOKEN` and is machine-local. Never commit
  it, never echo its contents.
- `.vercel/` is the local project link — also machine-local.
- `.claude/` is gitignored, so local settings stay out of the repo.

## Commit style

Existing history follows a consistent shape — match it:

```
Area: lowercase-ish summary in sentence case

Why the change was made, and any decision worth recording (image sizes,
why one photo suits a caption better, what was deliberately left alone).
Wrapped at ~72 characters.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

`Area:` is the page or component touched — `Gallery:`, `Header:`,
`Product detail:`, `About:`. Commits are authored as
`Jay Thakar <jay.thakar@cctech.co.in>`. Bodies explain *why*, not *what*.
Work on a branch and open a PR; `main` tracks `origin/main` and deploys.
