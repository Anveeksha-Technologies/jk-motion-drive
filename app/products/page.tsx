import CategoryCard from "@/components/CategoryCard";
import ProductBrowser from "@/components/ProductBrowser";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { productCategories } from "@/lib/products";
import { catalogueRows } from "@/lib/catalogue";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Products",
  description:
    "The NORD DRIVESYSTEMS range supplied by JK Motion Drive — gear units and geared motors, electric motors, drive electronics and complete drive systems from a single source.",
  path: "/products",
});


export default function ProductsIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        badge="Products"
        title="Our Product Range"
        subtitle="Gear units, geared motors, electric motors and drive electronics — a complete, coordinated portfolio."
        variant="dark"
      />

      {/* Four core categories */}
      <section className="section bg-white">
        <div className="container-x">
          <p className="body-lg text-center max-w-3xl mx-auto mb-12 md:mb-16">
            From a single geared motor to a fully engineered drive package, JK Motion Drive
            supplies a complete, coordinated product range — sized, stocked and supported by our
            own team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                title={cat.title}
                description={cat.shortDescription}
                icon={cat.icon}
                cta="Explore range"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full portfolio — every product in the range */}
      <section className="section bg-neutral-50">
        <div className="container-x">
          <SectionHeading
            eyebrow="Product Portfolio"
            title="Every Drive in the Range"
            subtitle="All 24 products across the four categories. Search by name, catalogue reference or a figure, and switch between grid and table."
          />
          <ProductBrowser
            rows={catalogueRows}
            defaultView="grid"
            showCategoryFilter
            pageSize={9}
            compactCards
            idPrefix="portfolio"
          />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
