import Link from "next/link";
import { ArrowRight, Bolt, Cog, Cpu, Layers } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import NordMark from "./NordMark";
import { getCategoryImage } from "@/lib/productImages";

const iconMap = {
  gear: Cog,
  bolt: Bolt,
  chip: Cpu,
  layers: Layers,
} as const;

type Props = {
  slug: string;
  title: string;
  description: string;
  icon: keyof typeof iconMap;
  cta?: string;
  variant?: "light" | "dark";
  featured?: boolean;
};

export default function CategoryCard({
  slug,
  title,
  description,
  icon,
  cta = "View range",
  variant = "light",
  featured = false,
}: Props) {
  const Icon = iconMap[icon];
  const isDark = variant === "dark";
  const image = getCategoryImage(slug);

  const wrapperClass = isDark
    ? "group flex flex-col h-full rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-colors"
    : "card group flex flex-col h-full";
  const titleClass = isDark
    ? "text-lg md:text-xl text-white"
    : "text-lg md:text-xl text-brand-black";
  const descClass = isDark
    ? "text-sm text-neutral-300 leading-relaxed"
    : "text-sm text-neutral-600 leading-relaxed flex-1";

  return (
    <Link href={`/products/${slug}`} className={wrapperClass}>
      <div className="relative">
        {image ? (
          <div
            className="relative w-full overflow-hidden bg-neutral-900"
            style={{ aspectRatio: featured ? "4 / 3" : "16 / 9" }}
          >
            {/* Product artwork is SVG, so it is served directly rather than
                through next/image (which only optimises raster formats). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${title} — NORD DRIVESYSTEMS`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <NordMark />
          </div>
        ) : (
          <ImagePlaceholder
            alt={`${title} product photograph`}
            aspect={featured ? "4/3" : "16/9"}
            rounded="rounded-none"
            label={title}
          />
        )}
        {isDark && (
          <span className="absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-brand-orange text-white shadow-card">
            <Icon className="w-5 h-5" />
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        {!isDark && (
          <div className="flex items-center gap-3">
            <span className="chip-icon">
              <Icon className="w-5 h-5" />
            </span>
            <h3 className={titleClass}>{title}</h3>
          </div>
        )}
        {isDark && <h3 className={titleClass}>{title}</h3>}
        <p className={descClass}>{description}</p>
        <span className="link-arrow mt-auto pt-2">
          {cta} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
