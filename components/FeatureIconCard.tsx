import {
  BadgeCheck,
  DraftingCompass,
  Gem,
  Handshake,
  Heart,
  Headset,
  LifeBuoy,
  PencilRuler,
  ShieldCheck,
  Target,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "badge-check": BadgeCheck,
  target: Target,
  wrench: Wrench,
  heart: Heart,
  headset: Headset,
  "pencil-ruler": PencilRuler,
  truck: Truck,
  "life-buoy": LifeBuoy,
  gem: Gem,
  "drafting-compass": DraftingCompass,
  handshake: Handshake,
};

type Props = {
  icon: string;
  title: string;
  body: string;
};

export default function FeatureIconCard({ icon, title, body }: Props) {
  const Icon = iconMap[icon] ?? ShieldCheck;
  return (
    <div className="card p-6 flex flex-col gap-4 h-full">
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-black text-white">
        <Icon className="w-5 h-5" />
      </span>
      <h3 className="text-lg md:text-xl text-brand-black">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
    </div>
  );
}
