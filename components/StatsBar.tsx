import ImagePlaceholder from "./ImagePlaceholder";
import { stats } from "@/lib/site";

export default function StatsBar() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-black text-white">
      {/* Industrial background photo — TODO: swap for client-provided image */}
      <div className="absolute inset-0 -z-10 opacity-25">
        <ImagePlaceholder
          alt="Industrial plant background"
          aspect="21/9"
          rounded="rounded-none"
          className="h-full !border-0"
          label="Industrial background"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/70 to-black/60" />

      <div className="container-x py-16 md:py-24 grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-5xl md:text-7xl text-brand-orange leading-none">
              0
            </div>
            <div className="mt-3 text-sm md:text-base font-medium text-neutral-300 uppercase tracking-wider">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
