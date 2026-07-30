import Link from "next/link";
import { Cog } from "lucide-react";

type Props = {
  variant?: "light" | "dark";
  withTagline?: boolean;
};

export default function Logo({ variant = "light", withTagline = false }: Props) {
  const wordTop = variant === "light" ? "text-brand-black" : "text-white";
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="JK Motion Drive — Home">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-brand-orange text-white">
        <Cog className="w-6 h-6" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl md:text-2xl tracking-wide">
          <span className="text-brand-orange">JK</span>{" "}
          <span className={wordTop}>MOTION DRIVE</span>
        </span>
        {withTagline && (
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.22em] mt-1 ${
              variant === "light" ? "text-neutral-500" : "text-neutral-400"
            }`}
          >
            Powering Precision
          </span>
        )}
      </span>
    </Link>
  );
}
