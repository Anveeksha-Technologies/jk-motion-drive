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
```

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

**Routes** (`app/`): `/`, `/about`, `/products`, `/products/[slug]`,
`/industries`, `/gallery`, `/contact`.

The four product pages are one dynamic template — `app/products/[slug]/page.tsx`
with `generateStaticParams()` from `productCategories`. Adding a fifth category
means adding one object to `lib/products.ts`; the route, the header dropdown,
the footer column and the contact-form dropdown all pick it up automatically.

`app/layout.tsx` wraps everything in `Header` / `Footer` / `FloatingWidgets` and
loads Inter + Anton via `next/font/google`.

Only `Header`, `ContactForm` and `StatCounter` are client components; everything
else is a server component. Keep it that way.

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

- Real contact details, WhatsApp number and map embed (`lib/site.ts`,
  `app/contact/page.tsx`)
- Real testimonials (`app/page.tsx`)
- Catalogue PDFs and file sizes (`app/gallery/page.tsx`)
- Enquiry-form endpoint — `components/ContactForm.tsx` currently only sets local
  state and shows a success message; nothing is sent anywhere
- Final product names/specs for the portfolio grid (`lib/portfolio.ts`)

## Known rough edges

Real issues, not placeholders — fix if the task touches them:

- **Stats render as `0`.** `components/StatsBar.tsx` and the home hero overlay
  in `app/page.tsx` hardcode `0` instead of the values in `lib/site.ts`.
  `components/StatCounter.tsx` — the scroll-triggered animated counter written
  for exactly this — is imported nowhere. The About page is the only place the
  real numbers appear.
- **The Products mega-dropdown is mouse-only.** `Header.tsx` opens it on
  `onMouseEnter`/`onMouseLeave` with no focus or keyboard handling, so keyboard
  users cannot reach the category links from the desktop nav.
- **Dead `href="#"` links**: footer Privacy/Terms and the social "Website"
  button, plus every gallery catalogue download button.
- **No page-level metadata** except `app/products/[slug]/page.tsx`; every other
  route inherits the root title from `app/layout.tsx`. No `sitemap.ts`,
  `robots.ts`, favicon or OG image either.
- `README.md` still says all site imagery is placeholder — that stopped being
  true once the client photography landed.
- `.gitignore` lists `.vercel` and `.env*` twice.

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
