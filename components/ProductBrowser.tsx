"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Rows3,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import EnquireButton from "./EnquireButton";
import ProductCard from "./ProductCard";
import SpecTooltip from "./SpecTooltip";
import {
  catalogueCategories,
  specColumnsFor,
  specValue,
  type CatalogueRow,
} from "@/lib/catalogue";

// The one product listing used across the site.
//
// /catalogue, /products and each /products/[slug] previously listed products
// three different ways — a table, a hand-rolled tile grid, and a card grid —
// with three different enquiry treatments and search on only one of them. This
// component is all three of those, so a visitor gets the same controls, the
// same empty state and the same primary enquiry action wherever they land.
//
// Pages differ only by props: which rows, whether the category filter is
// useful, and which view opens first (the catalogue leads with the table
// because comparing figures is the point; category pages lead with the grid
// because the artwork is).

const ON_REQUEST_HINT =
  "The F1300 flyer does not publish this figure for this range — ask us for the selection data.";

type View = "grid" | "table";

export default function ProductBrowser({
  rows,
  defaultView = "grid",
  showCategoryFilter = false,
  pageSize = 9,
  compactCards = false,
  idPrefix = "browser",
}: {
  rows: CatalogueRow[];
  defaultView?: View;
  showCategoryFilter?: boolean;
  pageSize?: number;
  compactCards?: boolean;
  /** Distinguishes the search input when two browsers share a page. */
  idPrefix?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState<View>(defaultView);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (category !== "all" && row.categorySlug !== category) return false;
      if (!q) return true;
      // Every term must appear somewhere in the row, so "worm 4 kW" narrows
      // rather than widening the way a plain OR would.
      return q.split(/\s+/).every((token) => row.searchText.includes(token));
    });
  }, [rows, query, category]);

  const columns = useMemo(() => specColumnsFor(filtered), [filtered]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [query, category, view]);

  const current = page > pageCount ? 1 : page;
  const pageRows = filtered.slice((current - 1) * pageSize, current * pageSize);
  const searchId = `${idPrefix}-search`;

  // Only offer categories that this browser's rows actually contain, so a
  // category page does not show three pills that all return nothing.
  const availableCategories = useMemo(() => {
    const present = new Set(rows.map((r) => r.categorySlug));
    return catalogueCategories
      .filter((c) => present.has(c.slug))
      .map((c) => ({ ...c, count: rows.filter((r) => r.categorySlug === c.slug).length }));
  }, [rows]);

  const filterUseful = showCategoryFilter && availableCategories.length > 1;

  return (
    <div>
      {/* ------------------------------------------------------- controls */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <label htmlFor={searchId} className="sr-only">
              Search products
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, catalogue, torque, kW…"
              className="search-input"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-brand-orange"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="view-toggle self-start lg:self-auto" role="group" aria-label="View as">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              className={`view-toggle-btn ${
                view === "grid" ? "view-toggle-btn-active" : "view-toggle-btn-idle"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
              Grid
            </button>
            <button
              type="button"
              onClick={() => setView("table")}
              aria-pressed={view === "table"}
              className={`view-toggle-btn ${
                view === "table" ? "view-toggle-btn-active" : "view-toggle-btn-idle"
              }`}
            >
              <Rows3 className="h-3.5 w-3.5" aria-hidden="true" />
              Table
            </button>
          </div>
        </div>

        {filterUseful && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <FilterPill
              active={category === "all"}
              onClick={() => setCategory("all")}
              label="All"
              count={rows.length}
            />
            {availableCategories.map((c) => (
              <FilterPill
                key={c.slug}
                active={category === c.slug}
                onClick={() => setCategory(c.slug)}
                label={c.title}
                count={c.count}
              />
            ))}
          </div>
        )}
      </div>

      <p className="mb-4 text-sm text-neutral-500" aria-live="polite">
        {filtered.length === 0
          ? "No matching products found."
          : `Showing ${(current - 1) * pageSize + 1}–${Math.min(
              current * pageSize,
              filtered.length
            )} of ${filtered.length} product${filtered.length === 1 ? "" : "s"}`}
      </p>

      {/* ------------------------------------------------------ empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
          <p className="font-semibold text-brand-black">No matching products found.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
            Nothing in the range matches{" "}
            {query.trim() ? (
              <span className="font-medium text-neutral-700">&ldquo;{query.trim()}&rdquo;</span>
            ) : (
              "that filter"
            )}
            . Try a catalogue reference (G1000, F3050), a product family (MAXXDRIVE, NORDAC) or a
            figure such as &ldquo;250,000 Nm&rdquo;.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="btn-outline-dark btn-sm"
            >
              Reset filters
            </button>
            <EnquireButton size="sm" label="Ask us about it" />
          </div>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {pageRows.map((row) => (
            <ProductCard key={row.id} product={row} compact={compactCards} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 shadow-card">
          <table className="w-full min-w-[1240px] border-collapse bg-white text-left text-sm">
            <caption className="sr-only">
              NORD products — specifications from flyer F1300
            </caption>
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th scope="col" className="w-24 px-4 py-3 font-semibold text-brand-black">
                  Image
                </th>
                <th scope="col" className="min-w-[210px] px-4 py-3 font-semibold text-brand-black">
                  Product
                </th>
                <th scope="col" className="min-w-[130px] px-4 py-3 font-semibold text-brand-black">
                  Category
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-brand-black">
                  Catalogue
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 font-semibold text-brand-black"
                  >
                    {col}
                    <SpecTooltip term={col} />
                  </th>
                ))}
                <th
                  scope="col"
                  className="sticky right-0 z-20 w-[132px] border-l border-neutral-200 bg-neutral-50 px-4 py-3 text-right font-semibold text-brand-black"
                >
                  Enquiry
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <TableRow key={row.id} row={row} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "table" && filtered.length > 0 && (
        <p className="mt-3 text-xs text-neutral-500">
          <strong className="font-semibold text-neutral-600">On request</strong> — flyer F1300 does
          not publish that figure for the range in question. Every other value is transcribed from
          it verbatim; ask us for full selection data.
        </p>
      )}

      {pageCount > 1 && filtered.length > 0 && (
        <Pagination page={current} pageCount={pageCount} onChange={setPage} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------- table row */

function TableRow({ row, columns }: { row: CatalogueRow; columns: readonly string[] }) {
  return (
    <tr className="group border-b border-neutral-100 last:border-0 transition-colors hover:bg-neutral-50/70">
      <td className="px-4 py-3">
        <div className="relative h-14 w-16 overflow-hidden rounded-md bg-white">
          {row.image ? (
            <Image src={row.image} alt={row.title} fill sizes="64px" className="object-contain" />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-neutral-200 text-[10px] text-neutral-400">
              No image
            </div>
          )}
        </div>
      </td>

      <td className="px-4 py-3 align-top">
        <span className="block font-semibold leading-snug text-brand-black">{row.title}</span>
        {row.subtitle && (
          <span className="mt-0.5 block text-xs text-neutral-500">{row.subtitle}</span>
        )}
        <span className="mt-1.5 flex flex-wrap items-center gap-1">
          {row.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600"
            >
              {t}
            </span>
          ))}
          {row.nsdTupH && (
            <span
              title="Also available with the nsd tupH sealed surface conversion — a corrosion-resistant alternative to stainless steel."
              className="inline-flex items-center gap-1 rounded-full bg-brand-orange-tint px-2 py-0.5 text-[11px] font-medium text-brand-orange-hover"
            >
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              nsd tupH
            </span>
          )}
        </span>
      </td>

      <td className="px-4 py-3 align-top">
        <Link
          href={`/products/${row.categorySlug}`}
          className="text-sm leading-snug text-neutral-600 underline-offset-2 transition-colors hover:text-brand-orange hover:underline"
        >
          {row.categoryTitle}
        </Link>
      </td>

      <td className="px-4 py-3 align-top">
        {row.catalogue ? (
          <span className="inline-block whitespace-nowrap rounded bg-brand-orange px-2 py-0.5 text-xs font-semibold text-white">
            {row.catalogue}
          </span>
        ) : (
          <span className="text-neutral-300">—</span>
        )}
      </td>

      {columns.map((col) => {
        const value = specValue(row, col);
        return (
          <td key={col} className="whitespace-nowrap px-4 py-3 align-top text-neutral-700">
            {value ?? (
              <span className="text-neutral-400" title={ON_REQUEST_HINT}>
                On request
              </span>
            )}
          </td>
        );
      })}

      {/* Its own column, as a primary button — the action per row, not an
          afterthought tucked under the product name.
          Pinned right: with ten columns the table is wider than the container,
          and an enquiry button that only appears after scrolling sideways is
          not really the primary action. It needs an opaque background of its
          own, and to track the row hover, because the cells scroll under it. */}
      <td className="sticky right-0 z-10 whitespace-nowrap border-l border-neutral-200 bg-white px-4 py-3 align-top text-right transition-colors group-hover:bg-neutral-50">
        <EnquireButton product={row.title} size="sm" />
      </td>
    </tr>
  );
}

/* --------------------------------------------------------------- controls */

function FilterPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`filter-pill ${
        active
          ? "border-brand-orange bg-brand-orange text-white"
          : "border-neutral-300 bg-white text-neutral-600 hover:border-brand-orange hover:text-brand-orange"
      }`}
    >
      {label}
      <span className={active ? "ml-1.5 text-white/70" : "ml-1.5 text-neutral-400"}>{count}</span>
    </button>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}) {
  return (
    <nav className="mt-8 flex items-center justify-center gap-1" aria-label="Product pagination">
      <PageButton onClick={() => onChange(page - 1)} disabled={page === 1} label="Previous page">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </PageButton>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          aria-label={`Page ${n}`}
          className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-1 ${
            n === page
              ? "bg-brand-orange text-white"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-brand-orange"
          }`}
        >
          {n}
        </button>
      ))}

      <PageButton
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        label="Next page"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </PageButton>
    </nav>
  );
}

function PageButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-brand-orange disabled:pointer-events-none disabled:opacity-35 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-1"
    >
      {children}
    </button>
  );
}
