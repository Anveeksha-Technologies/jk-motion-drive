import Image from "next/image";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { findProductByTitle } from "@/lib/catalogue";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Talk to JK Motion Drive about a drive selection, a quotation or service support. Works at Sardar Patel Ring Road, Hathijan, Ahmedabad 382445. Phone +91 9898 464 465.",
  path: "/contact",
});


// The map tile is hidden for now at the client's request.
//
// It is a facility photograph standing in for a real map, badged "Map — client
// to embed". Kept behind a flag rather than deleted or commented out: the JSX
// stays type-checked and restoring it is a one-line change.
//
// The original TODO said the client still had to supply an address. That is no
// longer true — the works address is in lib/site.ts and rendered above. What
// remains is embedding an actual map for it, at which point this tile should be
// replaced rather than merely switched back on.
const SHOW_MAP = false;

// Rendered per request, not prerendered.
//
// This is the one route on the site where that matters. Everything else is
// static and already ships complete HTML — Next server-renders client
// components too, so a crawler with no JavaScript still receives the product
// names, the spec figures and the whole catalogue table.
//
// /contact is different because its content depends on `?product=`. Prerendered,
// it was a single file for every product, and the enquiry context only appeared
// after hydration: a crawler, or anyone with JS blocked, saw a loading pulse.
// Reading searchParams on the server fixes that and makes the route dynamic.
export const dynamic = "force-dynamic";

type Props = { searchParams: { product?: string; sent?: string } };

export default function ContactPage({ searchParams }: Props) {
  const requested = searchParams.product;
  const match = requested ? findProductByTitle(requested) : undefined;

  // Only the fields the form needs, so the client boundary stays small.
  const product = match
    ? {
        id: match.id,
        title: match.title,
        catalogue: match.catalogue ?? null,
        categorySlug: match.categorySlug,
        categoryTitle: match.categoryTitle,
      }
    : null;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        badge="Contact"
        title="Let's Talk Drives"
        subtitle="Send us your application and our engineers will size the right drive for you."
        variant="dark"
      />

      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-10 items-start">
          {/* The product is resolved on the server, so the prefilled form is in
              the HTML rather than assembled after hydration. No Suspense
              boundary is needed any more — nothing here reads useSearchParams. */}
          <ContactForm product={product} justSent={searchParams.sent === "1"} />

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-brand-black text-white p-6 md:p-8">
              <h3 className="heading-3 text-white">Get in Touch</h3>

              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-brand-orange text-white shrink-0">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-400">Address</div>
                    <div className="mt-1 text-sm text-white">{site.address}</div>
                    <div className="mt-3 text-xs uppercase tracking-widest text-neutral-400">
                      Registered Office
                    </div>
                    <div className="mt-1 text-sm text-neutral-300">{site.registeredAddress}</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-brand-orange text-white shrink-0">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-400">Phone</div>
                    <a
                      href={site.phoneHref}
                      className="mt-1 block text-sm text-white hover:text-brand-orange"
                    >
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-brand-orange text-white shrink-0">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-400">Email</div>
                    <a
                      href={site.emailHref}
                      className="mt-1 block text-sm text-white hover:text-brand-orange break-all"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-brand-orange text-white shrink-0">
                    <Clock className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-400">
                      Working Hours
                    </div>
                    <div className="mt-1 text-sm text-white">{site.hoursLong}</div>
                  </div>
                </li>
              </ul>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full mt-8"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>

            {/* Hidden for now at the client's request — see SHOW_MAP above. */}
            {SHOW_MAP && (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
              <Image
                src="/images/contact-map.webp"
                alt="JK Motion Drive warehouse and stock facility"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-black shadow-card">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                Map — client to embed
              </div>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* No CTA banner on Contact — form is the CTA */}
    </>
  );
}
