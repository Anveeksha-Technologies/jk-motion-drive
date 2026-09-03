#!/usr/bin/env node
/**
 * Generates docs/nord-product-catalogue.md and public/llms.txt from
 * content/products.json and content/glossary.json.
 *
 * WHY THIS IS GENERATED
 *
 * The product figures already live in products.json, transcribed from NORD
 * flyer F1300. A hand-written Markdown catalogue would be a second copy of the
 * same numbers, and the two would disagree the first time a spec was corrected
 * — silently, because nothing checks prose against data.
 *
 * So the Markdown is derived, and `--check` re-derives it and fails if the
 * committed file differs. That check runs inside `npm run check:content`, which
 * means the catalogue cannot drift from the site: either they agree, or the
 * content check goes red.
 *
 *   node scripts/gen-catalogue.mjs            write the files
 *   node scripts/gen-catalogue.mjs --check    verify they are current
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");

const read = (rel) => JSON.parse(readFileSync(path.join(ROOT, rel), "utf8"));

const products = read("content/products.json");
const glossary = read("content/glossary.json");
// TWO URLS, DELIBERATELY.
//
// A file that is committed to git cannot depend on a runtime environment
// variable, or its drift check becomes environment-dependent — which is exactly
// what broke the Vercel build: `--check` regenerated the committed files using
// the deployment's NEXT_PUBLIC_SITE_URL, they no longer matched what was in the
// repository, and the build failed the moment that variable was set.
//
// So the two outputs are split by whether they are committed:
//
//   docs/nord-product-catalogue.md   committed  -> CANONICAL_URL, a constant.
//                                    Deterministic, so --check is meaningful.
//   public/llms.txt                  generated  -> SITE_URL, from the env.
//                                    Regenerated every build, gitignored, and
//                                    not drift-checked, because its URLs must
//                                    match the deployment serving it.
const CANONICAL_URL = "https://www.jkmotiondrive.com";

const SITE_URL = (() => {
  // Same guards as resolveSiteUrl() in lib/seo.ts: an empty value or a bare
  // domain must not produce a broken llms.txt.
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return CANONICAL_URL;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    const looksReal =
      url.hostname === "localhost" || /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(url.hostname);
    return looksReal ? url.origin : CANONICAL_URL;
  } catch {
    return CANONICAL_URL;
  }
})();

/**
 * Pull the contact details out of lib/site.ts.
 *
 * llms.txt states the address, phone and email, and lib/site.ts is where those
 * live for the rest of the site. Retyping them here would recreate exactly the
 * duplication this generator exists to prevent, so they are read from the
 * source instead. lib/site.ts is TypeScript and cannot be imported into a .mjs
 * script, hence the regex — and hence the hard failure below if the shape
 * changes, so a rename can never silently emit stale contact details.
 */
function siteField(name) {
  const src = readFileSync(path.join(ROOT, "lib/site.ts"), "utf8");
  const match = src.match(new RegExp(`\\n\\s*${name}:\\s*\\n?\\s*"([^"]+)"`));
  if (!match) {
    console.error(
      `ERROR    could not read "${name}" from lib/site.ts — the shape changed; update siteField() in scripts/gen-catalogue.mjs`
    );
    process.exit(1);
  }
  return match[1];
}

const contact = {
  address: siteField("address"),
  phone: siteField("phone"),
  email: siteField("email"),
  hours: siteField("hoursLong"),
  partner: siteField("partner"),
};

const SOURCE = "NORD flyer F1300 (Mat.-Nr. 6021602 / 1118), dated 11/2018";
const SPEC_COLUMNS = ["Sizes", "Power", "Torque", "Ratio", "Voltage"];

/** Same prefix fallback as lib/catalogue.ts — "Power — inverter" fills Power. */
function specValue(product, column) {
  const exact = product.specs.find((s) => s.label === column);
  if (exact) return exact.value;
  const prefixed = product.specs.find((s) =>
    s.label.toLowerCase().startsWith(column.toLowerCase())
  );
  return prefixed?.value;
}

/** Only the columns some product in this set can actually fill. */
function columnsFor(items) {
  return SPEC_COLUMNS.filter((c) => items.some((p) => specValue(p, c)));
}

/** Escape pipes so a value containing one cannot break the table. */
const cell = (v) => (v ?? "On request").replace(/\|/g, "\\|");

const allProducts = products.categories.flatMap((c) => c.products);
const nsdProducts = allProducts.filter((p) => p.nsdTupH);

/** Anchor slug for the contents links. */
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ------------------------------------------------------------- markdown */

function buildMarkdown() {
  const L = [];

  L.push("# NORD Product Catalogue");
  L.push("");
  L.push(
    `The complete NORD DRIVESYSTEMS range supplied by JK Motion Drive, ${products.categories.length} categories and ${allProducts.length} products.`
  );
  L.push("");
  L.push("> **Generated file — do not edit by hand.**");
  L.push("> Produced by `scripts/gen-catalogue.mjs` from `content/products.json`.");
  L.push("> Edit the JSON and run `npm run gen:catalogue`.");
  L.push("> `npm run check:content` fails if this file is out of date.");
  L.push("");
  L.push(
    `Every size, power, torque, ratio and voltage figure below is transcribed verbatim from ${SOURCE}, and each product carries the NORD catalogue reference it was drawn from so any figure can be checked against the source.`
  );
  L.push("");
  L.push(
    "That flyer caps MAXXDRIVE at 250,000 Nm and rates motors IE1–IE4. NORD's current range goes further (282,000 Nm, IE5+), but the client asked us to follow the supplied flyer exactly, so the flyer wins throughout."
  );
  L.push("");
  L.push(`Browse the same catalogue with search and filters at ${CANONICAL_URL}/catalogue.`);
  L.push("");

  // ---- contents
  L.push("## Contents");
  L.push("");
  L.push("| Category | Products | Specifications published |");
  L.push("| --- | --- | --- |");
  for (const c of products.categories) {
    const cols = columnsFor(c.products);
    L.push(
      `| [${c.title}](#${slug(c.title)}) | ${c.products.length} | ${
        cols.length ? cols.join(", ") : "None — catalogue reference only"
      } |`
    );
  }
  L.push("");

  // ---- categories
  for (const c of products.categories) {
    const cols = columnsFor(c.products);

    L.push(`## ${c.title}`);
    L.push("");
    L.push(c.heroDescription);
    L.push("");

    const head = ["Product", "Catalogue", ...cols, "nsd tupH"];
    L.push(`| ${head.join(" | ")} |`);
    L.push(`| ${head.map(() => "---").join(" | ")} |`);

    for (const p of c.products) {
      const name = p.subtitle ? `**${p.title}**<br>${p.subtitle}` : `**${p.title}**`;
      const row = [
        cell(name),
        p.catalogue ? `\`${p.catalogue}\`` : "—",
        ...cols.map((col) => cell(specValue(p, col))),
        p.nsdTupH ? "Yes" : "—",
      ];
      L.push(`| ${row.join(" | ")} |`);
    }
    L.push("");

    if (!cols.length) {
      L.push(
        `_${SOURCE.split(",")[0]} publishes no numeric specifications for this category — it lists the catalogue reference only. Ask us for full selection data._`
      );
      L.push("");
    }

    L.push("**Key features**");
    L.push("");
    for (const f of c.keyFeatures) L.push(`- ${f}`);
    L.push("");
    L.push(`**Typical applications:** ${c.typicalApplications.join(" · ")}`);
    L.push("");
  }

  // ---- nsd tupH
  L.push("## nsd tupH Surface Treatment");
  L.push("");
  L.push(
    "A sealed surface conversion offered as an alternative to stainless steel, for food and beverage, dairies, pharmaceutical, water and sewage, car wash, and offshore or coastal installations."
  );
  L.push("");
  for (const p of nsdProducts) L.push(`- ${p.title}`);
  L.push("");
  L.push(
    "> The flyer also lists NORDBLOC.1 helical bevel gear units (up to size 6) as available with nsd tupH. That is a distinct NORD family with no entry of its own in this catalogue, so it is recorded here rather than tagged onto a different product."
  );
  L.push("");

  // ---- glossary
  L.push("## Glossary");
  L.push("");
  for (const t of glossary.terms) {
    L.push(`**${t.term}** — ${t.long}`);
    L.push("");
  }

  L.push("---");
  L.push("");
  L.push(`Source: ${SOURCE}.`);
  L.push("");

  return L.join("\n");
}

/* -------------------------------------------------------------- llms.txt */

function buildLlmsTxt() {
  const L = [];

  L.push("# JK Motion Drive");
  L.push("");
  L.push(
    `> ${contact.partner}, based in Ahmedabad, Gujarat, India. Supplies and supports industrial drive technology: gear units, geared motors, electric motors and drive electronics.`
  );
  L.push("");
  L.push(
    "JK Motion Drive supplies the full NORD DRIVESYSTEMS range with application engineering, ready stock of core ranges, installation and commissioning support, and spares and service for the life of the drive."
  );
  L.push("");
  L.push("## Contact");
  L.push("");
  L.push(`- Works: ${contact.address}`);
  L.push(`- Phone: ${contact.phone}`);
  L.push(`- Email: ${contact.email}`);
  L.push(`- Hours: ${contact.hours}`);
  L.push("");
  L.push("## Pages");
  L.push("");
  L.push(`- [Home](${SITE_URL}/): Company overview and product categories.`);
  L.push(`- [About](${SITE_URL}/about): Who JK Motion Drive is and how it works.`);
  L.push(`- [Products](${SITE_URL}/products): The four product categories.`);
  L.push(`- [Catalogue](${SITE_URL}/catalogue): Searchable table of all ${allProducts.length} products with specifications.`);
  L.push(`- [Industries](${SITE_URL}/industries): Sectors served.`);
  // Gallery is hidden for now — see lib/site.ts.
  L.push(`- [Contact](${SITE_URL}/contact): Enquiry form, addresses and hours.`);
  L.push(`- [Privacy Policy](${SITE_URL}/privacy): What the site collects and why.`);
  L.push(`- [Terms of Use](${SITE_URL}/terms): Terms the site and its product information are published under.`);
  L.push("");
  L.push("## Product catalogue");
  L.push("");
  L.push(`Specifications transcribed from ${SOURCE}.`);
  L.push("");

  for (const c of products.categories) {
    L.push(`### ${c.title}`);
    L.push("");
    for (const p of c.products) {
      const specs = p.specs.map((s) => `${s.label} ${s.value}`).join("; ");
      const bits = [
        p.catalogue ? `catalogue ${p.catalogue}` : null,
        specs || null,
        p.nsdTupH ? "available with nsd tupH" : null,
      ].filter(Boolean);
      L.push(`- **${p.title}**${bits.length ? ` — ${bits.join(". ")}.` : ""}`);
    }
    L.push("");
  }

  L.push("## Notes");
  L.push("");
  L.push(
    "- This file is published deliberately for AI assistants and AI-powered search. The site owner permits its content to be read, summarised and quoted with attribution to JK Motion Drive."
  );
  L.push(
    "- JK Motion Drive is an authorised NORD DRIVESYSTEMS channel partner based in Ahmedabad, Gujarat, India, supplying industrial drive technology across India."
  );
  L.push(
    `- Figures come from ${SOURCE}. NORD's current range exceeds it (282,000 Nm, IE5+); the supplied flyer is followed deliberately.`
  );
  L.push(
    "- Electric motors and complete drive systems are listed with catalogue references only, because the flyer publishes no numeric specifications for them."
  );
  L.push("");

  return L.join("\n");
}

/* ---------------------------------------------------------------- write */

const outputs = [
  // committed -> deterministic -> drift-checked
  { rel: "docs/nord-product-catalogue.md", content: buildMarkdown(), checked: true },
  // build artefact -> varies by deployment -> written, never compared
  { rel: "public/llms.txt", content: buildLlmsTxt(), checked: false },
];

let stale = 0;
for (const { rel, content, checked } of outputs) {
  const abs = path.join(ROOT, rel);

  // In --check mode the unchecked artefacts are still written, so that a build
  // which runs the check also ends up with a current llms.txt.
  if (CHECK && !checked) {
    mkdirSync(path.dirname(abs), { recursive: true });
    writeFileSync(abs, content, "utf8");
    continue;
  }

  if (CHECK) {
    const existing = existsSync(abs) ? readFileSync(abs, "utf8") : null;
    if (existing !== content) {
      console.error(
        `ERROR    ${rel} is out of date — run \`npm run gen:catalogue\` and commit the result`
      );
      stale++;
    }
    continue;
  }

  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, content, "utf8");
  console.log(`wrote  ${rel}  (${content.split("\n").length} lines)`);
}

if (CHECK) {
  if (stale) process.exit(1);
  console.log(
    `Catalogue docs up to date — ${outputs.filter((o) => o.checked).map((o) => o.rel).join(", ")}` +
      " (public/llms.txt regenerated)"
  );
}
