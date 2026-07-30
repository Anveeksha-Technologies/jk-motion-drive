import CategoryCard from "@/components/CategoryCard";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import { productCategories } from "@/lib/products";

export default function ProductsIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        badge="Products"
        title="Our Product Range"
        subtitle="Gear units, geared motors, electric motors and drive electronics — a complete, coordinated portfolio."
      />

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

      <CtaBanner />
    </>
  );
}
