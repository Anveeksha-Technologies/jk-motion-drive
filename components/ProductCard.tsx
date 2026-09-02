import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import EnquireButton from "./EnquireButton";
import ImagePlaceholder from "./ImagePlaceholder";
import NordMark from "./NordMark";
import type { CatalogueRow } from "@/lib/catalogue";

/**
 * One product as a card: artwork, catalogue reference, the headline figures
 * from the NORD flyer, the feature bullets as the flyer words them, and the
 * enquiry action.
 *
 * Takes a `CatalogueRow` rather than a `SubProduct` so that the category pages,
 * the products page and the catalogue's grid view all render the *same* card
 * from the *same* shape. Before this it was a category-page-only component and
 * the products page hand-rolled a near-identical tile beside it.
 *
 * The NORD DRIVESYSTEMS badge over the artwork is deliberate. The client asked
 * for the NORD name to be visible on the product imagery, and the supplied
 * renders have the wordmark compressed away (see lib/productImages.ts). Naming
 * the brand in markup rather than relying on the photograph means it reads at
 * every size, stays legible when the artwork is eventually replaced, and is
 * selectable text for search engines.
 */
export default function ProductCard({
  product,
  compact = false,
}: {
  product: CatalogueRow;
  /** Drop the spec table and feature bullets — for denser grids. */
  compact?: boolean;
}) {
  const img = product.image;

  return (
    <article className="card flex flex-col h-full">
      <div className="relative">
        {img ? (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-white">
            {/* WebP with alpha, so it goes through next/image. object-contain,
                not cover: these are product shots on transparent ground and
                cropping would slice the casing. */}
            <Image
              src={img}
              alt={`${product.title} — NORD DRIVESYSTEMS`}
              fill
              sizes="(min-width: 1280px) 380px, (min-width: 640px) 45vw, 90vw"
              className="object-contain p-4"
            />
          </div>
        ) : (
          <ImagePlaceholder
            alt={`${product.title} product`}
            aspect="4/3"
            rounded="rounded-none"
            label={product.title}
          />
        )}

        {/* Only over real artwork — a brand mark on an empty placeholder slot
            would imply photography that has not arrived yet. */}
        {img && <NordMark />}

        {product.catalogue && (
          <span
            className="absolute top-3 right-3 inline-flex items-center rounded-md bg-brand-orange px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white"
            title={`NORD catalogue ${product.catalogue}`}
          >
            {product.catalogue}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-lg text-brand-black">{product.title}</h3>
        {product.subtitle && (
          <p className="text-sm text-neutral-500 -mt-2">{product.subtitle}</p>
        )}

        <div className="flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
          {product.nsdTupH && (
            <span
              title="Also available with the nsd tupH sealed surface conversion — a corrosion-resistant alternative to stainless steel."
              className="inline-flex items-center gap-1 rounded-full bg-brand-orange-tint px-2.5 py-1 text-[11px] font-medium text-brand-orange-hover"
            >
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              nsd tupH
            </span>
          )}
        </div>

        {!compact && product.specList.length > 0 && (
          <dl className="mt-1 divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
            {product.specList.map((s) => (
              <div key={s.label} className="flex gap-3 py-2">
                <dt className="w-28 shrink-0 text-neutral-500">{s.label}</dt>
                <dd className="font-semibold text-brand-black">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {!compact && product.features.length > 0 && (
          <ul className="mt-1 space-y-1.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                <Check
                  className="w-3.5 h-3.5 mt-1 shrink-0 text-brand-orange"
                  strokeWidth={3}
                />
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3">
          <EnquireButton product={product.title} size="sm" />
        </div>
      </div>
    </article>
  );
}
