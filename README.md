# JK Motion Drive — Website

Marketing website for JK Motion Drive built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and **Lucide React** icons.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script          | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Start local dev server           |
| `npm run build` | Production build                 |
| `npm run start` | Start built production server    |
| `npm run lint`  | Lint the project                 |

## Site map

| Route                                | Page                          |
| ------------------------------------ | ----------------------------- |
| `/`                                  | Home                          |
| `/about`                             | About Us                      |
| `/products`                          | Products index                |
| `/products/gear-units-geared-motors` | Gear Units & Geared Motors    |
| `/products/electric-motors`          | Electric Motors               |
| `/products/drive-electronics`        | Drive Electronics             |
| `/products/complete-drive-systems`   | Complete Drive Systems        |
| `/industries`                        | Industries                    |
| `/gallery`                           | Gallery & Downloads           |
| `/contact`                           | Contact                       |

The four product category pages are rendered by a single dynamic template at `app/products/[slug]/page.tsx`, driven by data in `lib/products.ts`.

## Project structure

```
app/
  layout.tsx           Root layout (Header, Footer, floating widgets)
  globals.css          Tailwind + design tokens
  page.tsx             Home
  about/               About Us
  products/            Products index + [slug] template
  industries/          Industries
  gallery/             Gallery & Downloads
  contact/             Contact
components/
  Header.tsx           Sticky top nav with Products dropdown + mobile menu
  Footer.tsx           4-column footer
  CtaBanner.tsx        Repeating orange CTA banner
  FloatingWidgets.tsx  WhatsApp + phone floating buttons
  StatCounter.tsx      Scroll-triggered animated number
  StatsBar.tsx         Dark 4-up stats section
  PageHero.tsx         Interior page hero with breadcrumbs + badge
  SectionHeading.tsx   Eyebrow + heading + subtitle
  ImagePlaceholder.tsx Placeholder slot for client-supplied imagery
  CategoryCard.tsx     Product category card
  FeatureIconCard.tsx  Icon + title + body card
  IndustryCard.tsx     Industry card
  ContactForm.tsx      Enquiry form
  Logo.tsx             Branded logo (light/dark)
lib/
  site.ts              Site config: nav, contact info, stats, why-choose-us
  products.ts          4 category data objects (sub-products, features, apps)
  industries.ts        13 industry entries
```

## Design tokens

Defined in `tailwind.config.ts`:

- **`brand.orange`** `#F26522` — primary CTAs, links, badges
- **`brand.orange-tint`** `#FDE8DA` — icon chip background
- **`brand.black`** `#111111` — dark sections, headings
- **`whatsapp`** `#25D366` — chat button
- **Display font**: Anton (uppercase headings)
- **Body font**: Inter

## Images

**All images across the site are placeholders.** Each `<ImagePlaceholder />` slot has a descriptive `alt` and label so the client can identify what to supply. When real photography arrives, swap `<ImagePlaceholder ... />` for `<Image ... />` from `next/image` (add the source path under `public/`).

## Content flagged for the client

Search the repo for `TODO:` to find:

- Contact details (address, phone, email, WhatsApp number, map embed) — `lib/site.ts`
- Testimonials (real names + companies) — `app/page.tsx`
- Catalogue PDF files and sizes — `app/gallery/page.tsx`
- Enquiry form endpoint wiring — `components/ContactForm.tsx`

Bracketed values like `[+91 00000 00000]` and `[Client Name]` are intentional placeholders.
