import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-orange">
      {/* subtle dark industrial pattern overlay */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.6) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.6) 0, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="container-x relative py-14 md:py-20 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
        <div className="text-white">
          <span className="inline-block text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
            Let&apos;s Build It Right
          </span>
          <h2 className="mt-3 heading-2 text-white">
            Ready to Power Your Next Project?
          </h2>
          <p className="mt-3 text-white/90 max-w-2xl text-base md:text-lg">
            Talk to our drive specialists — we&apos;ll size the exact solution for your load, ratio
            and duty.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <Link href="/contact" className="btn-white">
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-white/95 text-sm font-medium hover:text-white"
          >
            <Phone className="w-4 h-4" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
