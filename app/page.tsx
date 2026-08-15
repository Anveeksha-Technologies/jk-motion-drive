import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Check,
  ChevronDown,
  Quote,
  Search,
  Sliders,
  Star,
  Wrench,
} from "lucide-react";
import CategoryCard from "@/components/CategoryCard";
import CtaBanner from "@/components/CtaBanner";
import FeatureIconCard from "@/components/FeatureIconCard";
import IndustryCard from "@/components/IndustryCard";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import StatsBar from "@/components/StatsBar";
import { productCategories } from "@/lib/products";
import { industries } from "@/lib/industries";
import { whyChooseUs } from "@/lib/site";

const process = [
  {
    step: "01",
    icon: Search,
    title: "Understand Application",
    body: "Load, ratio, duty cycle and environment.",
  },
  {
    step: "02",
    icon: Sliders,
    title: "Select the Right Drive",
    body: "Engineered selection, not guesswork.",
  },
  {
    step: "03",
    icon: Box,
    title: "Supply & Commission",
    body: "Delivered from stock and installed.",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Support & Spares",
    body: "Service and parts for the long run.",
  },
];

// TODO: client to provide real testimonials
const testimonials = [
  {
    quote:
      "They sized the exact gear ratio our conveyor line needed and delivered from stock in days. Downtime cut to near zero.",
    initials: "PK",
    name: "[Client Name]",
    role: "[Plant Head, Packaging Co.]",
  },
  {
    quote:
      "Genuine products, honest technical advice, and a team that actually understands drives. Our first call for motion control.",
    initials: "MM",
    name: "[Client Name]",
    role: "[Maintenance Manager, Steel Plant]",
  },
  {
    quote:
      "The IE5+ motors they specified paid for themselves in energy savings faster than we expected. Excellent support throughout.",
    initials: "OD",
    name: "[Client Name]",
    role: "[Operations Director, Food Processing]",
  },
];

const homeChecklist = [
  "Genuine products",
  "Application engineering",
  "Fast delivery",
  "After-sales support",
];

const heroStats = [
  { label: "Industries Served" },
  { label: "Drive Configurations" },
  { label: "Years of Expertise" },
];

const marqueeHighlights = [
  "Precision Engineering",
  "ISO-Grade Quality",
  "IE5+ Efficiency",
  "Ready Stock",
  "Application Support",
  "Genuine Products",
  "24/7 Service",
  "Made for Industry",
];

export default function HomePage() {
  const previewIndustries = industries.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero.jpg"
            alt="Industrial welding sparks"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-hero-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        </div>
        <div className="container-x py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Engineered Drive Solutions
            </span>
            <h1 className="mt-6 heading-1 text-white">
              Powering<br />
              Precision<br />
              <span className="text-brand-orange">In Motion.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/85 leading-relaxed">
              Gear units, geared motors and drive electronics — engineered for reliability, backed by
              application expertise and ready stock across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-outline-white">
                Request a Quote
              </Link>
            </div>

            {/* Hero stats overlay */}
            <div className="mt-12 md:mt-16 rounded-xl border border-white/15 bg-black/30 backdrop-blur-sm p-5 md:p-6 grid grid-cols-3 gap-4 md:gap-6 max-w-xl">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="border-l-2 border-brand-orange/60 pl-3 md:pl-4"
                >
                  <div className="font-display text-3xl md:text-5xl text-white leading-none">
                    0
                  </div>
                  <div className="mt-2 text-[11px] md:text-xs font-semibold uppercase tracking-wider text-white/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCROLL indicator */}
        <div className="absolute left-1/2 bottom-6 md:bottom-8 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <Marquee items={marqueeHighlights} />

      {/* ABOUT TEASER */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="mt-3 heading-2 text-brand-black">
              Your Drive<br />Technology Partner
            </h2>
            <div className="mt-6 space-y-5 body-lg">
              <p>
                JK Motion Drive supplies complete power-transmission and motion-control solutions
                to industry across India — gear units, geared motors, electric motors and drive
                electronics, selected, stocked and supported by our own engineering team.
              </p>
              <p>
                We don&apos;t just sell parts. We size the right drive for your load, ratio and
                duty, hold core ranges in local stock, and stay with you through installation,
                commissioning and the life of the drive.
              </p>
            </div>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {homeChecklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-brand-black font-medium">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about" className="link-arrow mt-8">
              More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
              <Image
                src="/images/about-engineer.jpg"
                alt="Engineer working with drive electronics on a production line"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-brand-orange text-white px-5 py-4 rounded-xl shadow-card-hover">
              <div className="font-display text-3xl md:text-4xl leading-none">10+</div>
              <div className="mt-1 text-[11px] md:text-xs font-semibold uppercase tracking-wider">
                Years of Expertise
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE */}
      <section className="section bg-brand-black text-white">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
            <div>
              <span className="eyebrow">Our Range</span>
              <h2 className="mt-3 heading-2 text-white">
                Engineered Drive Products
              </h2>
            </div>
            <p className="text-base md:text-lg text-neutral-300 leading-relaxed lg:pl-8">
              Four core categories, engineered to work together — from a single geared motor to a
              fully packaged drive system.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left column: 1 big featured card */}
            <CategoryCard
              slug={productCategories[0].slug}
              title={productCategories[0].title}
              description={productCategories[0].shortDescription}
              icon={productCategories[0].icon}
              variant="dark"
              featured
            />
            {/* Right column: 1 wide card on top, 2 side-by-side below */}
            <div className="flex flex-col gap-6 md:gap-8">
              <CategoryCard
                slug={productCategories[1].slug}
                title={productCategories[1].title}
                description={productCategories[1].shortDescription}
                icon={productCategories[1].icon}
                variant="dark"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <CategoryCard
                  slug={productCategories[2].slug}
                  title={productCategories[2].title}
                  description={productCategories[2].shortDescription}
                  icon={productCategories[2].icon}
                  variant="dark"
                />
                <CategoryCard
                  slug={productCategories[3].slug}
                  title={productCategories[3].title}
                  description={productCategories[3].shortDescription}
                  icon={productCategories[3].icon}
                  variant="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built Around Your Uptime"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((f) => (
              <FeatureIconCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <StatsBar />

      {/* INDUSTRIES TEASER */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Where We Deliver"
            title="100+ Industries Served"
            actions={
              <Link href="/industries" className="link-arrow">
                See all industries <ArrowRight className="w-4 h-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {previewIndustries.map((ind) => (
              <IndustryCard
                key={ind.title}
                title={ind.title}
                icon={ind.icon}
                compact
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section bg-neutral-50">
        <div className="container-x">
          <SectionHeading
            eyebrow="How We Work"
            title="From Application to Uptime"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.step} className="card p-6 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <span className="chip-icon">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="font-display text-3xl text-neutral-300">{p.step}</span>
                  </div>
                  <h3 className="text-lg md:text-xl text-brand-black">{p.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted on the Plant Floor"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.initials} className="card p-7 flex flex-col gap-5 h-full">
                <Quote className="w-8 h-8 text-brand-orange" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <span className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-semibold">
                    {t.initials}
                  </span>
                  <div className="text-sm">
                    <div className="font-semibold text-brand-black">{t.name}</div>
                    <div className="text-neutral-500 text-xs">{t.role}</div>
                  </div>
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
