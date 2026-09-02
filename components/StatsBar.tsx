import StatCounter from "./StatCounter";
import { stats } from "@/lib/site";

// Client-supplied industrial background. Source: /product-images/stats-bg.jpg
// Set to null to fall back to the plain dark industrial texture below.
const STATS_BG: string | null = "/images/stats-bg.webp";

export default function StatsBar() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-black text-white">
      {STATS_BG ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={STATS_BG}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/70 to-black/60" />
        </>
      ) : (
        <div
          className="absolute inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 20%, rgba(242,101,34,0.18), transparent 55%)," +
              "radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.06), transparent 55%)," +
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.035) 0 2px, transparent 2px 9px)",
          }}
        />
      )}

      <div className="container-x py-16 md:py-24 grid grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Was a hardcoded "0" with the suffix dropped, so the whole bar read
            zero. StatCounter was written for exactly this and imported nowhere;
            it counts up when the section scrolls into view. */}
        {stats.map((s) => (
          <StatCounter
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            valueClassName="font-display text-5xl md:text-7xl text-brand-orange leading-none"
          />
        ))}
      </div>
    </section>
  );
}
