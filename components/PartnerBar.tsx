import { productCategories } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Slim strip under the header carrying the two things the client asked to sit
 * "below our logo": the NORD channel-partner status and the product range.
 *
 * The range is derived from `productCategories` rather than written out, so a
 * new category appears here automatically — same rule as the header dropdown
 * and footer column.
 *
 * The bar is white on purpose. The supplied NORD asset is an auto-trace of a
 * bitmap and carries an opaque near-white background plus a scatter of
 * off-white noise shapes; on white those vanish, on any tinted or dark surface
 * they show as a pale block. That is also why the footer states the
 * partnership as text instead of repeating the lockup.
 */
export default function PartnerBar() {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="container-x py-2 md:py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
        <p className="flex items-center gap-2.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-brand-black">
          {/* Traced SVG, so served directly rather than through next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/nord-logo.svg"
            alt="NORD DRIVESYSTEMS"
            className="h-6 md:h-7 w-auto shrink-0"
          />
          {site.partner}
        </p>
        <p className="text-[11px] md:text-xs text-neutral-600 truncate">
          {productCategories.map((c) => c.title).join(" · ")}
        </p>
      </div>
    </div>
  );
}
