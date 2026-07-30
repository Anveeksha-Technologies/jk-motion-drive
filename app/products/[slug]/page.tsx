import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bolt, Check, Cog, Cpu, Layers } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { getCategory, productCategories } from "@/lib/products";

const iconMap = {
  gear: Cog,
  bolt: Bolt,
  chip: Cpu,
  layers: Layers,
} as const;

export function generateStaticParams() {
  return productCategories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) return {};
  return {
    title: `${cat.title} — JK Motion Drive`,
    description: cat.heroDescription,
  };
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const Icon = iconMap[category.icon];

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.title },
        ]}
        badge="Products"
        title={category.title}
        subtitle={category.heroDescription}
      >
        <span className="chip-icon w-14 h-14 !rounded-xl">
          <Icon className="w-7 h-7" />
        </span>
      </PageHero>

      {/* Sub-products */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Product Range"
            title={`${category.title} Line-Up`}
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subProducts.map((p) => (
              <div key={p.title} className="card flex flex-col h-full">
                <ImagePlaceholder
                  alt={`${p.title} product`}
                  aspect="4/3"
                  rounded="rounded-none"
                  label={p.title}
                />
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg text-brand-black">{p.title}</h3>
                  {p.subtitle && (
                    <p className="text-sm text-neutral-500 -mt-2">{p.subtitle}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
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

      {/* Features + Applications */}
      <section className="section bg-neutral-50">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <span className="eyebrow">Key Features</span>
            <h2 className="mt-3 heading-2 text-brand-black">Engineered to Perform</h2>
            <ul className="mt-8 space-y-4">
              {category.keyFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-neutral-700 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="eyebrow">Typical Applications</span>
              <h2 className="mt-3 heading-2 text-brand-black">Where It Runs</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {category.typicalApplications.map((a) => (
                  <span key={a} className="app-pill">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-brand-black text-white p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-display uppercase text-white">
                Need Help Selecting?
              </h3>
              <p className="mt-3 text-neutral-300 leading-relaxed">
                Send us your load, ratio and duty — our engineers will size the right drive.
              </p>
              <Link href="/contact" className="btn-primary mt-6">
                Talk to an engineer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related categories */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Explore More"
            title="Related Categories"
            align="center"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {productCategories.map((c) => {
              const CIcon = iconMap[c.icon];
              const isCurrent = c.slug === category.slug;
              return (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className={`p-5 rounded-xl border transition-all flex flex-col items-start gap-3 h-full ${
                    isCurrent
                      ? "border-brand-orange bg-brand-orange-tint"
                      : "border-neutral-200 bg-white hover:border-brand-orange hover:shadow-card-hover"
                  }`}
                >
                  <span className="chip-icon">
                    <CIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base md:text-lg text-brand-black">{c.title}</h3>
                  <span className="link-arrow mt-auto">
                    {isCurrent ? "Current" : "Explore"} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
