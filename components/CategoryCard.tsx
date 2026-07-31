import Link from "next/link";
import { ArrowRight, Bolt, Cog, Cpu, Layers } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

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

  const wrapperClass = isDark
    ? "group flex flex-col h-full rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-colors"
    : "card group flex flex-col h-full";
  const titleClass = isDark
    ? "text-lg md:text-xl text-white"
    : "text-lg md:text-xl text-brand-black";
  const descClass = isDark
    ? "text-sm text-neutral-300 leading-relaxed"
    : "text-sm text-neutral-600 leading-relaxed flex-1";

  const imageWrapClass = featured
    ? "relative flex-1 min-h-[280px]"
    : "relative";

  return (
    <Link href={`/products/${slug}`} className={wrapperClass}>
      <div className={imageWrapClass}>
        {featured ? (
          <div
            role="img"
            aria-label={`${title} product photograph`}
            className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02]"
          />
        ) : (
          <ImagePlaceholder
            alt={`${title} product photograph`}
            aspect="16/9"
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
      <div className="p-6 flex flex-col gap-3">
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
        <span className="link-arrow mt-2">
          {cta} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
