import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";
import CtaBanner from "@/components/CtaBanner";
import NordMark from "@/components/NordMark";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { productCategories } from "@/lib/products";
import { portfolio } from "@/lib/portfolio";

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
            subtitle="Individual products across all four categories — from single geared motors to fully packaged drive systems."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.map((item) => (
              <div key={item.id} className="card flex flex-col h-full">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={`${item.title} — NORD DRIVESYSTEMS`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <NordMark />
                  {item.catalogue && (
                    <span className="absolute top-3 right-3 inline-flex items-center rounded-md bg-brand-orange px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                      {item.catalogue}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg text-brand-black leading-tight">{item.title}</h3>
                  <p className="text-sm text-neutral-500 -mt-1">{item.blurb}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link href="/contact" className="link-arrow mt-auto pt-2">
                    Request pricing / datasheet <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
