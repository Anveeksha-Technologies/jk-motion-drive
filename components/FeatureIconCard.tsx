import {
  Heart,
  Headset,
  ShieldCheck,
  Target,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  target: Target,
  wrench: Wrench,
  heart: Heart,
  headset: Headset,
};

type Props = {
  icon: string;
  title: string;
  body: string;
};

export default function FeatureIconCard({ icon, title, body }: Props) {
  const Icon = iconMap[icon] ?? ShieldCheck;
  return (
    <div className="card p-6 flex flex-col gap-3 h-full">
      <span className="chip-icon">
        <Icon className="w-5 h-5" />
      </span>
      <h3 className="text-lg md:text-xl text-brand-black">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
    </div>
  );
}
