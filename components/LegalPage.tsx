import type { ReactNode } from "react";
import PageHero from "./PageHero";

/**
 * Shared shell for the Privacy Policy and Terms of Use.
 *
 * Both are long-form prose, which nothing else on this site is — the rest is
 * cards, tables and short blocks. Rather than adding a global `prose` treatment
 * that would only ever apply to two pages, the typography is scoped here.
 */
export default function LegalPage({
  title,
  intro,
  lastUpdated,
  children,
}: {
  title: string;
  intro: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        badge="Legal"
        title={title}
        subtitle={intro}
        variant="dark"
      />

      <section className="section bg-white">
        <div className="container-x">
          <p className="mb-10 text-sm text-neutral-500">
            Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
          </p>

          <div
            className="
              max-w-3xl
              [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:text-brand-black
              [&_h2:first-child]:mt-0
              [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:md:text-lg [&_h3]:text-brand-black
              [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-neutral-600
              [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-brand-orange
              [&_li]:leading-relaxed [&_li]:text-neutral-600
              [&_a]:text-brand-orange [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-orange-hover
              [&_strong]:text-brand-black [&_strong]:font-semibold
              [&_table]:w-full [&_table]:my-6 [&_table]:text-sm [&_table]:border-collapse
              [&_th]:border-b [&_th]:border-neutral-200 [&_th]:bg-neutral-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-brand-black
              [&_td]:border-b [&_td]:border-neutral-100 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:text-neutral-600
            "
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
