#!/usr/bin/env node
/**
 * Validates content/products.json and content/portfolio.json.
 *
 * The point of moving content to JSON is that someone can edit it without
 * reading the code — which also means the usual safety net of the type checker
 * is gone. This script is that net. It catches the mistakes that would
 * otherwise ship silently: a typo'd image filename that renders an empty slot,
 * a third tag that spills out of a card, a duplicate slug that makes one
 * category unreachable.
 *
 * Run with `npm run check:content`. Exits non-zero on any error.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

function load(rel) {
  const p = path.join(ROOT, rel);
  if (!existsSync(p)) {
    fail(`${rel} is missing`);
    return null;
  }
  let text = readFileSync(p, "utf8");
  // Some Windows editors (and PowerShell's Set-Content -Encoding utf8) prepend
  // a byte-order mark, which JSON.parse rejects with a cryptic message. Strip
  // it so the real validation still runs, but say so — the file should be saved
  // as UTF-8 without BOM.
  if (text.charCodeAt(0) === 0xfeff) {
    warn(`${rel}: file starts with a UTF-8 BOM — re-save it as UTF-8 without BOM`);
    text = text.slice(1);
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    fail(`${rel} is not valid JSON — ${e.message}`);
    return null;
  }
}

const ICONS = ["gear", "bolt", "chip", "layers"];

function checkImage(basePath, file, where) {
  if (file === null || file === undefined) return;
  if (typeof file !== "string" || !file.trim()) {
    fail(`${where}: image must be a filename or null`);
    return;
  }
  if (file.includes("/")) {
    fail(`${where}: image should be a bare filename, not a path (got "${file}")`);
    return;
  }
  const onDisk = path.join(ROOT, "public", basePath.replace(/^\//, ""), file);
  if (!existsSync(onDisk)) {
    fail(`${where}: image "${file}" does not exist in public${basePath}`);
  }
}

function checkTags(tags, where) {
  if (!Array.isArray(tags) || tags.length !== 2) {
    fail(`${where}: tags must be exactly 2 entries (got ${Array.isArray(tags) ? tags.length : typeof tags})`);
    return;
  }
  tags.forEach((t, i) => {
    if (typeof t !== "string" || !t.trim()) fail(`${where}: tag ${i + 1} is empty`);
    else if (t.length > 22) warn(`${where}: tag "${t}" is long and may wrap on a card`);
  });
}

function requireText(obj, key, where, { max } = {}) {
  const v = obj[key];
  if (typeof v !== "string" || !v.trim()) {
    fail(`${where}: "${key}" is required`);
    return;
  }
  if (max && v.length > max) warn(`${where}: "${key}" is ${v.length} chars, over the ${max} guideline`);
}

// ---------------------------------------------------------------- products
const products = load("content/products.json");
if (products) {
  const base = products.imageBasePath;
  if (typeof base !== "string" || !base.startsWith("/")) {
    fail(`products.json: "imageBasePath" must be an absolute path under public/`);
  }
  if (!Array.isArray(products.categories) || products.categories.length === 0) {
    fail("products.json: \"categories\" must be a non-empty array");
  } else {
    const slugs = new Set();
    const titles = new Set();
    for (const c of products.categories) {
      const where = `products.json category "${c.slug ?? "?"}"`;
      requireText(c, "slug", where);
      requireText(c, "title", where);
      requireText(c, "shortDescription", where);
      requireText(c, "dropdownBlurb", where, { max: 90 });
      requireText(c, "heroDescription", where);

      if (c.slug) {
        if (slugs.has(c.slug)) fail(`${where}: duplicate slug — one category would be unreachable`);
        slugs.add(c.slug);
        if (!/^[a-z0-9-]+$/.test(c.slug)) {
          fail(`${where}: slug must be lowercase letters, numbers and hyphens (it becomes the URL)`);
        }
      }
      if (!ICONS.includes(c.icon)) {
        fail(`${where}: icon "${c.icon}" is not one of ${ICONS.join(", ")}`);
      }
      checkImage(base, c.image, where);

      for (const key of ["keyFeatures", "typicalApplications"]) {
        if (!Array.isArray(c[key]) || c[key].length === 0) {
          fail(`${where}: "${key}" must be a non-empty array`);
        }
      }

      if (!Array.isArray(c.products) || c.products.length === 0) {
        fail(`${where}: "products" must be a non-empty array`);
        continue;
      }
      for (const p of c.products) {
        const pw = `products.json product "${p.title ?? "?"}"`;
        requireText(p, "title", pw);
        if (p.title) {
          // Images are keyed by title, so a duplicate would collide.
          if (titles.has(p.title)) fail(`${pw}: duplicate product title — image lookup is keyed by title`);
          titles.add(p.title);
        }
        checkTags(p.tags, pw);
        checkImage(base, p.image, pw);
        if (!Array.isArray(p.specs)) fail(`${pw}: "specs" must be an array (use [] for none)`);
        else
          for (const s of p.specs) {
            if (!s || typeof s.label !== "string" || typeof s.value !== "string") {
              fail(`${pw}: every spec needs a string "label" and "value"`);
            }
          }
        if (!Array.isArray(p.features)) fail(`${pw}: "features" must be an array (use [] for none)`);
        // Drives the nsd tupH badge in the catalogue table. It must be a real
        // boolean rather than merely truthy — a missing field would silently
        // read as "not available" on a product that is.
        if (typeof p.nsdTupH !== "boolean") {
          fail(`${pw}: "nsdTupH" must be true or false (flyer page 10 lists which products offer it)`);
        }
      }
    }
  }
}

// --------------------------------------------------------------- glossary
const glossary = load("content/glossary.json");
if (glossary) {
  if (!Array.isArray(glossary.terms) || glossary.terms.length === 0) {
    fail('glossary.json: "terms" must be a non-empty array');
  } else {
    const seenTerms = new Set();
    for (const t of glossary.terms) {
      const where = `glossary.json term "${t?.term ?? "?"}"`;
      requireText(t, "term", where);
      requireText(t, "short", where, { max: 90 });
      requireText(t, "long", where);
      if (t?.term) {
        const key = t.term.toLowerCase();
        if (seenTerms.has(key)) fail(`${where}: duplicate term — lookup is keyed by lowercased term`);
        seenTerms.add(key);
      }
    }

    // Every spec label in products.json should resolve to a glossary entry,
    // otherwise that column renders without a tooltip. Same prefix fallback as
    // lib/glossary.ts, so the two agree on what counts as resolvable.
    const termKeys = [...seenTerms].sort((a, b) => b.length - a.length);
    const resolves = (label) => {
      const key = label.trim().toLowerCase();
      return termKeys.some((k) => key === k || key.startsWith(k));
    };
    const unresolved = new Set();
    for (const c of products?.categories ?? []) {
      for (const p of c.products ?? []) {
        for (const s of p.specs ?? []) {
          if (typeof s?.label === "string" && !resolves(s.label)) unresolved.add(s.label);
        }
      }
    }
    for (const label of unresolved) {
      warn(`glossary.json: no entry matches spec label "${label}" — that column will render without a tooltip`);
    }
  }
}

// --------------------------------------------------------------- portfolio
const portfolio = load("content/portfolio.json");
if (portfolio) {
  const base = portfolio.imageBasePath;
  if (!Array.isArray(portfolio.items) || portfolio.items.length === 0) {
    fail("portfolio.json: \"items\" must be a non-empty array");
  } else {
    const ids = new Set();
    const categoryTitles = new Set((products?.categories ?? []).map((c) => c.title));
    for (const i of portfolio.items) {
      const where = `portfolio.json item "${i.id ?? "?"}"`;
      requireText(i, "id", where);
      requireText(i, "title", where);
      requireText(i, "blurb", where, { max: 110 });
      if (i.id) {
        if (ids.has(i.id)) fail(`${where}: duplicate id`);
        ids.add(i.id);
      }
      checkTags(i.tags, where);
      if (!i.image) fail(`${where}: "image" is required for a portfolio tile`);
      checkImage(base, i.image, where);
      if (i.category && categoryTitles.size && !categoryTitles.has(i.category)) {
        warn(`${where}: category "${i.category}" does not match any category title in products.json`);
      }
    }
  }
}

// ------------------------------------------------------- contact details
//
// The phone number exists three times in lib/site.ts: once formatted for
// people (`phone`), once as a tel: URI (`phoneHref`) and once inside a wa.me
// URL (`whatsapp`). Nothing forces them to agree, so a corrected number that
// only lands in one of them would leave the site displaying one number and
// dialling another — the kind of fault nobody notices until a customer cannot
// reach the company. This compares the digits of all three.
{
  const src = existsSync(path.join(ROOT, "lib/site.ts"))
    ? readFileSync(path.join(ROOT, "lib/site.ts"), "utf8")
    : null;

  if (!src) {
    fail("lib/site.ts is missing");
  } else {
    const field = (name) => src.match(new RegExp(`\\n\\s*${name}:\\s*"([^"]+)"`))?.[1];
    const digits = (v) => (v ?? "").replace(/\D/g, "");

    const phone = field("phone");
    const phoneHref = field("phoneHref");
    const whatsapp = field("whatsapp");

    if (!phone || !phoneHref || !whatsapp) {
      fail('lib/site.ts: could not read "phone", "phoneHref" and "whatsapp" — update this check if the shape changed');
    } else {
      const shown = digits(phone);
      if (digits(phoneHref) !== shown) {
        fail(`lib/site.ts: phoneHref (${phoneHref}) does not dial the number shown on the site (${phone})`);
      }
      if (digits(whatsapp) !== shown) {
        fail(`lib/site.ts: whatsapp URL (${whatsapp}) does not match the number shown on the site (${phone})`);
      }
      if (!phoneHref.startsWith("tel:+")) {
        fail(`lib/site.ts: phoneHref should start with "tel:+" so it dials internationally (got "${phoneHref}")`);
      }
      if (!/^https:\/\/wa\.me\/\d{10,15}(\?|$)/.test(whatsapp)) {
        fail(`lib/site.ts: whatsapp should be https://wa.me/<country code><number>, digits only (got "${whatsapp}")`);
      }
      // wa.me wants the country code with no + and no separators.
      if (whatsapp.includes("+") && !whatsapp.includes("?")) {
        fail("lib/site.ts: the wa.me URL must not contain a + — WhatsApp expects bare digits");
      }
    }
  }
}

// ------------------------------------------------------------------ report
for (const w of warnings) console.log(`warning  ${w}`);
for (const e of errors) console.error(`ERROR    ${e}`);

if (errors.length) {
  console.error(`\n${errors.length} error(s), ${warnings.length} warning(s) — content not valid.`);
  process.exit(1);
}

const cats = products?.categories?.length ?? 0;
const prods = (products?.categories ?? []).reduce((a, c) => a + (c.products?.length ?? 0), 0);
console.log(
  `\nContent OK — ${cats} categories, ${prods} products, ${portfolio?.items?.length ?? 0} portfolio tiles` +
    (warnings.length ? `, ${warnings.length} warning(s)` : "")
);
