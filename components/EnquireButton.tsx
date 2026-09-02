import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The enquiry call-to-action, used everywhere a product can be asked about.
 *
 * There is one of these rather than a link written out at each call site
 * because the site previously had three different treatments of the same
 * action: a `link-arrow` reading "Request pricing / datasheet" on the category
 * cards, another on the products page, and a small text link in the catalogue
 * table. All three looked secondary, and only the table one carried the product
 * through to the form.
 *
 * Passing `product` puts the exact product title in the query string, which
 * `ContactForm` reads back to prefill itself and to set the email subject — so
 * the enquiry that lands in the inbox names the drive the visitor was looking
 * at. Omit it for a generic "get in touch".
 */
export default function EnquireButton({
  product,
  size = "md",
  label = "Enquire",
  className = "",
}: {
  product?: string;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const href = product ? `/contact?product=${encodeURIComponent(product)}` : "/contact";

  return (
    <Link
      href={href}
      className={`btn-primary ${size === "sm" ? "btn-sm" : ""} ${className}`.trim()}
    >
      {label}
      <ArrowRight className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} aria-hidden="true" />
      {product && <span className="sr-only"> about {product}</span>}
    </Link>
  );
}
