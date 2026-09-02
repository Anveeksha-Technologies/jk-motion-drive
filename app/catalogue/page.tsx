import { FileText, Layers, ShieldCheck } from "lucide-react";
import ProductBrowser from "@/components/ProductBrowser";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { catalogueRows, nsdTupHRows } from "@/lib/catalogue";
import { buildMetadata } from "@/lib/seo";

// The full NORD range, browsable as a table or a grid.
//
// This page stays a server component; only <ProductBrowser /> is client-side,
// because search, filtering, the view toggle and pagination are genuinely
// client state. The rows are built at module scope from the JSON and passed in,
// so every listing on the site renders from the same shape.

export const metadata = buildMetadata({
  title: "NORD Product Catalogue — Gear Units, Motors & Drive Electronics",
  description:
    "Searchable catalogue of the full NORD DRIVESYSTEMS range supplied by JK Motion Drive, Ahmedabad — gear units to 250,000 Nm, IE1–IE4 motors and NORDAC drive electronics, with sizes, power, torque and ratio for every range.",
  path: "/catalogue",
});

const stats = [
  { icon: Layers, value: `${catalogueRows.length}`, label: "Products in the range" },
  { icon: FileText, value: "250,000 Nm", label: "Maximum output torque" },
  { icon: ShieldCheck, value: `${nsdTupHRows.length}`, label: "Available with nsd tupH" },
];

export default function CataloguePage() {
  return (
    <>
      <PageHero
        variant="dark"
        badge="NORD DRIVESYSTEMS"
        crumbs={[{ label: "Home", href: "/" }, { label: "Catalogue" }]}
        title="Product Catalogue"
        subtitle="Every gear unit, motor and drive electronic in the NORD range we supply — searchable, with the published figures for each."
      />

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="The Full Range"
            title="Search the NORD Catalogue"
            subtitle="Filter by category or search by product name, catalogue reference, or a figure such as a torque or power rating. Switch between table and grid with the toggle. Specifications are transcribed from NORD flyer F1300."
          />

          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="card flex items-center gap-4 p-5">
                <span className="chip-icon">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-2xl leading-none text-brand-black">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs text-neutral-500">{s.label}</span>
                </span>
              </div>
            ))}
          </div>

          <ProductBrowser
            rows={catalogueRows}
            defaultView="table"
            showCategoryFilter
            pageSize={10}
            idPrefix="catalogue"
          />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
