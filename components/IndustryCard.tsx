import {
  Battery,
  Beef,
  Cookie,
  Droplets,
  Factory,
  Milk,
  Mountain,
  Package,
  Plane,
  Truck,
  Utensils,
  Wheat,
  ConstructionIcon,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  utensils: Utensils,
  mountain: Mountain,
  crane: ConstructionIcon,
  factory: Factory,
  package: Package,
  droplets: Droplets,
  battery: Battery,
  cookie: Cookie,
  milk: Milk,
  beef: Beef,
  wheat: Wheat,
  plane: Plane,
};

type Props = {
  title: string;
  icon: string;
  description: string;
};

export default function IndustryCard({ title, icon, description }: Props) {
  const Icon = iconMap[icon] ?? Factory;
  return (
    <div className="card p-6 flex flex-col gap-3 h-full">
      <span className="chip-icon">
        <Icon className="w-5 h-5" />
      </span>
      <h3 className="text-base md:text-lg text-brand-black">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}
