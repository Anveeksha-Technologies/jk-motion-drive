import { Check, Eye, Target } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import FeatureIconCard from "@/components/FeatureIconCard";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { coreValues, stats } from "@/lib/site";

const partnerChecklist = [
  "Authorised sourcing with full warranty and product traceability",
  "In-house engineering to size the exact drive for your duty",
  "Core ranges held in local stock for fast delivery",
  "Installation, commissioning and on-site support",
  "Genuine spares and lifecycle service to protect uptime",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        badge="About Us"
        title="About JK Motion Drive"
        subtitle="A specialist supplier of engineered drive solutions — powering precision across Indian industry."
        variant="dark"
      />

      {/* Company overview */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="eyebrow">Company Overview</span>
            <h2 className="mt-3 heading-2 text-brand-black">Precision is our Standard</h2>
            <div className="mt-6 space-y-5 body-lg">
              <p>
                JK Motion Drive is a specialist supplier of industrial power-transmission and
                motion-control products. We bring together gear units, geared motors, electric
                motors and drive electronics into engineered solutions that keep our customers
                running.
              </p>
              <p>
                &ldquo;Powering Precision&rdquo; isn&apos;t just our tagline — it&apos;s how we
                work. Every drive we supply is selected for its exact duty, delivered on time from
                stock, and backed by hands-on engineering support long after the sale.
              </p>
            </div>
          </div>
          <ImagePlaceholder
            alt="Precision tools and technical drawings on a workbench"
            aspect="4/3"
            label="Company overview"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section bg-neutral-50">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl bg-white border border-neutral-200 shadow-card p-8 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-orange" aria-hidden />
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-brand-orange-tint text-brand-orange">
                <Eye className="w-5 h-5" />
              </span>
              <h3 className="mt-5 heading-3 text-brand-black">Our Vision</h3>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                To be India&apos;s most trusted partner for engineered drive solutions — the first
                name industry thinks of when precision, efficiency and uptime matter.
              </p>
            </div>
            <div className="relative rounded-2xl bg-white border border-neutral-200 shadow-card p-8 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-orange" aria-hidden />
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-brand-orange-tint text-brand-orange">
                <Target className="w-5 h-5" />
              </span>
              <h3 className="mt-5 heading-3 text-brand-black">Our Mission</h3>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                To deliver the right drive for every application — genuine, efficient and
                well-supported — through deep engineering knowledge, ready stock and dependable
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Core Values"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v) => (
              <FeatureIconCard key={v.title} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us — dark section */}
      <section className="relative isolate overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 -z-10 opacity-30">
          <ImagePlaceholder
            alt="Industrial plant background"
            aspect="21/9"
            rounded="rounded-none"
            className="h-full !border-0"
            label="Industrial background"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
        <div className="container-x py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
              Why Partner With Us
            </span>
            <h2 className="mt-3 heading-2 text-white">
              The Advantage of Working With Specialists
            </h2>
            <ul className="mt-8 space-y-4">
              {partnerChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/90">
                  <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 text-center"
              >
                <div className="font-display text-4xl md:text-5xl text-brand-orange leading-none">
                  {s.value}
                  <span>{s.suffix}</span>
                </div>
                <div className="mt-3 text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-300">
                  {s.label}
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
