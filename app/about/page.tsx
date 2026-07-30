import { Check, Eye, Target } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import FeatureIconCard from "@/components/FeatureIconCard";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import { stats, whyChooseUs } from "@/lib/site";

const partnerChecklist = [
  "Authorised sourcing with full warranty and product traceability",
  "In-house engineering to size the exact drive for your duty",
  "Core ranges held in local stock for fast delivery",
  "Installation, commissioning and on-site support",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        badge="About Us"
        title="About JK Motion Drive"
        subtitle="A specialist supplier of engineered drive solutions — powering precision across Indian industry."
      />

      {/* Company overview */}
      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="eyebrow">Company Overview</span>
            <h2 className="mt-3 heading-2 text-brand-black">Precision is our Standard</h2>
            <div className="mt-6 space-y-4 body-lg">
              <p>
                JK Motion Drive is a specialist supplier of industrial power-transmission and
                drive-control products — helping plants, OEMs and system integrators across India
                get the right drive for every application.
              </p>
              <p>
                We combine deep application engineering with ready stock of core ranges, so our
                customers get accurate selection, quick delivery and dependable service — from
                first enquiry through commissioning and lifecycle support.
              </p>
              <p>
                Whether it is a single geared motor for a conveyor or a complete drive package for
                a new production line, our team stands behind every drive we supply.
              </p>
            </div>
          </div>
          <ImagePlaceholder
            alt="Precision tools and drive components on a workbench"
            aspect="4/3"
            label="Company overview"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section bg-neutral-50">
        <div className="container-x">
          <SectionHeading eyebrow="Direction" title="Vision & Mission" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-8 flex flex-col gap-4">
              <span className="chip-icon">
                <Eye className="w-5 h-5" />
              </span>
              <h3 className="heading-3 text-brand-black">Our Vision</h3>
              <p className="text-neutral-600 leading-relaxed">
                To be India&apos;s most trusted partner for engineered drive solutions — the first
                name industry thinks of when precision, efficiency and uptime matter.
              </p>
            </div>
            <div className="card p-8 flex flex-col gap-4">
              <span className="chip-icon">
                <Target className="w-5 h-5" />
              </span>
              <h3 className="heading-3 text-brand-black">Our Mission</h3>
              <p className="text-neutral-600 leading-relaxed">
                To deliver the right drive for every application — genuine, efficient and
                well-supported — through deep engineering knowledge, ready stock and dependable
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-icon feature row */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The Principles Behind Every Drive"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((f) => (
              <FeatureIconCard key={f.title} {...f} />
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
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8"
              >
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
