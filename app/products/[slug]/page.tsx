import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bolt, Check, Cog, Cpu, Layers } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageHero from "@/components/PageHero";
import { getCategory, productCategories } from "@/lib/products";
import { getCategoryImage, getSubProductImage } from "@/lib/productImages";

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
        title={
          <span className="flex items-center gap-4 md:gap-6 flex-wrap">
            <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-brand-orange text-white shrink-0">
              <Icon className="w-7 h-7 md:w-8 md:h-8" />
            </span>
            <span>{category.title}</span>
          </span>
        }
        subtitle={category.heroDescription}
        variant="dark"
      />

      {/* Sub-products */}
      <section className="section bg-white">
        <div className="container-x">
          <h2 className="heading-2 text-brand-black mb-10 md:mb-14">Product Range</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.subProducts.map((p) => {
              const img = getSubProductImage(p.title);
              return (
              <div key={p.title} className="card flex flex-col h-full">
                {img ? (
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${p.title} product`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder
                    alt={`${p.title} product`}
                    aspect="4/3"
                    rounded="rounded-none"
                    label={p.title}
                  />
                )}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Features + Applications */}
      <section className="section bg-neutral-50">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="heading-2 text-brand-black">Key Features</h2>
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

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="heading-2 text-brand-black">Typical Applications</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {category.typicalApplications.map((a) => (
                  <span key={a} className="app-pill">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-brand-black text-white p-6 md:p-8">
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
          <h2 className="heading-2 text-brand-black mb-10 md:mb-14">Related Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productCategories.map((c) => {
              const CIcon = iconMap[c.icon];
              const isCurrent = c.slug === category.slug;
              const cImg = getCategoryImage(c.slug);
              return (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-4 h-full ${
                    isCurrent
                      ? "border-brand-orange bg-brand-orange-tint"
                      : "border-neutral-200 bg-white hover:border-brand-orange hover:shadow-card-hover"
                  }`}
                >
                  {cImg ? (
                    <span className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-900 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cImg}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-orange-tint text-brand-orange shrink-0">
                      <CIcon className="w-5 h-5" />
                    </span>
                  )}
                  <h3 className="text-sm md:text-base text-brand-black leading-tight">
                    {c.title}
                  </h3>
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
