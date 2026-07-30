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
};

export default function CategoryCard({
  slug,
  title,
  description,
  icon,
  cta = "View range",
}: Props) {
  const Icon = iconMap[icon];
  return (
    <Link
      href={`/products/${slug}`}
      className="card group flex flex-col h-full"
    >
      <ImagePlaceholder
        alt={`${title} product photograph`}
        aspect="16/9"
        rounded="rounded-none"
        label={title}
      />
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3">
          <span className="chip-icon">
            <Icon className="w-5 h-5" />
          </span>
          <h3 className="text-lg md:text-xl text-brand-black">{title}</h3>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed flex-1">{description}</p>
        <span className="link-arrow mt-2">
          {cta} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
