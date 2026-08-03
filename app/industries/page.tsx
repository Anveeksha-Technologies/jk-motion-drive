import CtaBanner from "@/components/CtaBanner";
import IndustryCard from "@/components/IndustryCard";
import PageHero from "@/components/PageHero";
import { industries } from "@/lib/industries";

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        badge="Industries"
        title="Industries We Serve"
        subtitle="Our drive technology powers more than 100 industries — here's where we deliver value."
        variant="dark"
      />

      <section className="section bg-white">
        <div className="container-x">
          <p className="body-lg text-center max-w-3xl mx-auto mb-12 md:mb-16">
            Our drive technology powers more than 100 industries — here&apos;s where we deliver
            measurable value in efficiency, reliability and uptime.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <IndustryCard key={ind.title} {...ind} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
