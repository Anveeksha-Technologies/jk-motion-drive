import { Download, FileText, MapPin } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

const galleryItems = [
  "Precision welding",
  "Robotic assembly line",
  "Drive commissioning",
  "Drive electronics",
  "Inverter assembly",
  "Warehouse logistics",
  "Plant installation",
  "Machined components",
];

// TODO: client to attach final PDF files and confirm sizes.
const catalogues = [
  { title: "Geared Motor Range — Overview", size: "[0.0 MB]" },
  { title: "Electric Motors Catalogue", size: "[0.0 MB]" },
  { title: "Drive Electronics Selection Guide", size: "[0.0 MB]" },
  { title: "Complete Drive Systems Brochure", size: "[0.0 MB]" },
  { title: "JK Motion Drive — Company Profile", size: "[0.0 MB]" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        badge="Gallery"
        title="Gallery & Downloads"
        subtitle="Product images, installations and downloadable catalogues."
      />

      {/* Gallery grid */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Gallery"
            title="Products & Installations"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {galleryItems.map((caption) => (
              <div key={caption} className="relative group overflow-hidden rounded-xl">
                <ImagePlaceholder
                  alt={caption}
                  aspect="4/3"
                  rounded="rounded-xl"
                  label={caption}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-semibold">{caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section bg-neutral-50">
        <div className="container-x">
          <SectionHeading
            eyebrow="Downloads"
            title="Catalogues & Brochures"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogues.map((c) => (
              <div key={c.title} className="card p-6 flex items-start gap-4">
                <span className="chip-icon shrink-0">
                  <FileText className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg text-brand-black">{c.title}</h3>
                  <p className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
                    PDF · {c.size}
                  </p>
                </div>
                <a
                  href="#"
                  aria-label={`Download ${c.title}`}
                  className="w-10 h-10 shrink-0 rounded-md border border-neutral-200 text-brand-black hover:bg-brand-orange hover:text-white hover:border-brand-orange flex items-center justify-center transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-neutral-500 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 hidden" />
            Catalogues are placeholders — client to attach final PDF files.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
