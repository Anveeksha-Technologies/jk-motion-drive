"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { productCategories } from "@/lib/products";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up to real endpoint / email service
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-8 flex flex-col gap-5">
      <div>
        <h3 className="heading-3 text-brand-black">Send an Enquiry</h3>
        <p className="text-sm text-neutral-500 mt-1">
          We&apos;ll get back to you within one business day.
        </p>
      </div>

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
          defaultValue={productCategories[0].slug}
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
          placeholder="Tell us about your application, load, ratio and duty..."
          className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
        />
      </label>

      <button type="submit" className="btn-primary self-start">
        Send Enquiry <Send className="w-4 h-4" />
      </button>

      {submitted && (
        <div className="rounded-md bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3">
          Thanks — your enquiry has been received. Our team will be in touch shortly.
        </div>
      )}
    </form>
  );
}
