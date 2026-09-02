"use client";

import { Send, Tag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { productCategories } from "@/lib/products";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/seo";

// The enquiry form.
//
// TWO THINGS IT DOES BEYOND COLLECTING FIELDS
//
// 1. It prefills from the product the visitor clicked: the right category is
//    selected, the message is seeded, and the product travels through to the
//    email as its own field and in the subject line. The point is that the
//    enquiry that lands in the inbox says *which drive* the person was looking
//    at, which a bare "someone submitted the contact form" never does.
//
//    The product arrives as a **prop**, resolved on the server from
//    `?product=`. It used to be read here with `useSearchParams`, which forced
//    a Suspense boundary and meant the prefill only existed after hydration —
//    so a crawler, or anyone with JS blocked, saw an empty form.
//
// 2. It posts to FormSubmit when NEXT_PUBLIC_FORMSUBMIT_ENDPOINT is set, and
//    falls back to the previous local-state behaviour when it is not, so the
//    form still demos before the endpoint exists.
//
// WHY A NATIVE POST RATHER THAN fetch()
//
// FormSubmit's standard endpoint does not send CORS headers, so a fetch() from
// the browser is blocked. A native form POST has no such restriction. `_next`
// brings the visitor back to /contact?sent=1, which is what renders the success
// banner below. (FormSubmit also has an /ajax/ endpoint that does allow CORS,
// but it needs the URL shaped differently, and hard-coding that shape would
// break the moment the endpoint is anything else.)

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSUBMIT_ENDPOINT;

/** The subset of a catalogue row the form needs, resolved server-side. */
export type EnquiryProduct = {
  id: string;
  title: string;
  catalogue: string | null;
  categorySlug: string;
  categoryTitle: string;
};

export default function ContactForm({
  product,
  justSent = false,
}: {
  product: EnquiryProduct | null;
  justSent?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Only intercept while there is nowhere to post to. With an endpoint
    // configured the browser performs a normal submit.
    if (ENDPOINT) return;
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  const subject = product
    ? `Enquiry: ${product.title}${product.catalogue ? ` (${product.catalogue})` : ""}`
    : `Website enquiry — ${site.name}`;

  const seededMessage = product
    ? `I would like a quotation for ${product.title}${
        product.catalogue ? ` (NORD catalogue ${product.catalogue})` : ""
      }.\n\nApplication:\nLoad / torque:\nRatio or output speed:\nDuty cycle:\nQuantity:`
    : "";

  return (
    <form
      onSubmit={onSubmit}
      {...(ENDPOINT ? { action: ENDPOINT, method: "POST" } : {})}
      className="card p-6 md:p-8 flex flex-col gap-5"
    >
      <div>
        <h3 className="heading-3 text-brand-black">Send an Enquiry</h3>
        <p className="text-sm text-neutral-500 mt-1">
          We&apos;ll get back to you within one business day.
        </p>
      </div>

      {/* What the visitor clicked, shown so they can see the form knows — and
          so they can clear it if they arrived on the wrong product. */}
      {product && (
        <div className="flex items-start gap-3 rounded-lg border border-brand-orange/30 bg-brand-orange-tint/60 px-4 py-3">
          <Tag className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
          <div className="min-w-0 flex-1 text-sm">
            <span className="block font-semibold text-brand-black">
              Enquiring about {product.title}
            </span>
            <span className="text-neutral-600">
              {product.categoryTitle}
              {product.catalogue && ` · NORD catalogue ${product.catalogue}`}
            </span>
          </div>
          <Link
            href="/contact"
            aria-label="Clear the selected product"
            className="shrink-0 rounded p-1 text-neutral-500 transition-colors hover:text-brand-orange"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* FormSubmit control fields. Inert when posting nowhere. */}
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      {/* Absolute, because FormSubmit redirects from its own origin. */}
      <input type="hidden" name="_next" value={`${siteUrl}/contact?sent=1`} />
      {/* Honeypot: bots fill every field, humans never see this one. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />
      {product && <input type="hidden" name="Product" value={product.title} />}
      {product?.catalogue && (
        <input type="hidden" name="NORD catalogue" value={product.catalogue} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Name</span>
          <input
            required
            name="name"
            type="text"
            placeholder="Your full name"
            className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Company</span>
          <input
            name="company"
            type="text"
            placeholder="Company name"
            className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Email</span>
          <input
            required
            name="email"
            type="email"
            placeholder="you@company.com"
            className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Phone</span>
          <input
            name="phone"
            type="tel"
            placeholder="+91 00000 00000"
            className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Product Interest
        </span>
        <select
          name="interest"
          // `key` forces React to re-read defaultValue when the visitor arrives
          // from a different product — an uncontrolled select otherwise keeps
          // whatever it mounted with.
          key={product?.categorySlug ?? "none"}
          defaultValue={product?.categorySlug ?? productCategories[0].slug}
          className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
        >
          {productCategories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          key={product?.id ?? "blank"}
          defaultValue={seededMessage}
          placeholder="Tell us about your application, load, ratio and duty..."
          className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
        />
      </label>

      <button type="submit" className="btn-primary self-start">
        Send Enquiry <Send className="w-4 h-4" />
      </button>

      {(submitted || justSent) && (
        <div className="rounded-md bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3">
          Thanks — your enquiry has been received. Our team will be in touch shortly.
        </div>
      )}
    </form>
  );
}
