import Image from "next/image";
import { Download, FileText } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

// TODO: client to supply the remaining gallery photographs. Add the path to
// `image` as each one arrives — tiles without an image fall back to a
// placeholder, so the grid stays intact in the meantime.
const galleryItems: { caption: string; image?: string }[] = [
  { caption: "Precision welding" },
  { caption: "Robotic assembly line", image: "/images/stats-bg.webp" },
  { caption: "Drive commissioning" },
  { caption: "Drive electronics", image: "/images/gallery-drive-electronics.webp" },
  { caption: "Inverter assembly", image: "/images/gallery-inverter-assembly.webp" },
  { caption: "Warehouse logistics", image: "/images/contact-map.webp" },
  { caption: "Plant installation", image: "/images/gallery-plant-installation.webp" },
  { caption: "Machined components", image: "/images/about-overview.webp" },
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
        variant="dark"
      />

      {/* Gallery grid */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title="Products & Installations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {galleryItems.map(({ caption, image }) => (
              <div key={caption} className="relative group overflow-hidden rounded-xl">
                {image ? (
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900">
                    <Image
                      src={image}
                      alt={caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 320px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder
                    alt={caption}
                    aspect="4/3"
                    rounded="rounded-xl"
                    label={caption}
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-semibold uppercase tracking-wide">
                    {caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section bg-neutral-50">
        <div className="container-x">
          <SectionHeading eyebrow="Downloads" title="Catalogues & Brochures" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalogues.map((c) => (
              <div key={c.title} className="card p-6 flex items-start gap-4">
                <span className="chip-icon shrink-0">
                  <FileText className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg text-brand-black leading-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500 uppercase tracking-wider">
                    PDF · {c.size}
                  </p>
                </div>
                <a
                  href="#"
                  aria-label={`Download ${c.title}`}
                  className="w-11 h-11 shrink-0 rounded-lg bg-brand-black text-white hover:bg-brand-orange flex items-center justify-center transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-neutral-500">
            Catalogues are placeholders — client to attach final PDF files.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
