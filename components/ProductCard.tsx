import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import NordMark from "./NordMark";
import type { SubProduct } from "@/lib/products";
import { getSubProductImage } from "@/lib/productImages";

/**
 * One product on a category page: artwork, catalogue reference, the headline
 * figures from the NORD flyer, and the feature bullets as the flyer words them.
 *
 * The NORD DRIVESYSTEMS badge over the artwork is deliberate. The client asked
 * for the NORD name to be visible on the product imagery, and the supplied
 * renders have the wordmark compressed away (see lib/productImages.ts). Naming
 * the brand in markup rather than relying on the photograph means it reads at
 * every size, stays legible when the artwork is eventually replaced, and is
 * selectable text for search engines.
 */
export default function ProductCard({ product }: { product: SubProduct }) {
  const img = getSubProductImage(product.title);

  return (
    <article className="card flex flex-col h-full">
      <div className="relative">
        {img ? (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
            {/* Traced artwork embedded in SVG, so served directly rather than
                through next/image, which does not optimise SVG. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${product.title} — NORD DRIVESYSTEMS`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
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
        </div>

        {product.specs && (
          <dl className="mt-1 divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
            {product.specs.map((s) => (
              <div key={s.label} className="flex gap-3 py-2">
                <dt className="w-28 shrink-0 text-neutral-500">{s.label}</dt>
                <dd className="font-semibold text-brand-black">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {product.features && (
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

        <Link href="/contact" className="link-arrow mt-auto pt-3">
          Request pricing / datasheet <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
