import { stats } from "@/lib/site";

// TODO: client to supply the industrial background photograph.
// Drop it at public/images/stats-bg.jpg and set STATS_BG to its path —
// until then the band falls back to a clean dark industrial texture.
const STATS_BG: string | null = null;

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
