import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

type Props = {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  variant?: "light" | "dark";
};

export default function PageHero({
  badge,
  title,
  subtitle,
  crumbs,
  children,
  variant = "light",
}: Props) {
  const isDark = variant === "dark";

  if (isDark) {
    return (
      <section className="relative isolate overflow-hidden bg-brand-black text-white border-b border-white/5">
        {/* Orange glow at the top */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[380px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(242,101,34,0.55), rgba(242,101,34,0) 60%)",
          }}
          aria-hidden
        />
        <div className="container-x relative pt-14 md:pt-20 pb-16 md:pb-24">
          {crumbs && crumbs.length > 0 && (
            <nav className="mb-6 flex items-center gap-1 text-xs md:text-sm text-neutral-400">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brand-orange">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
                </span>
              ))}
            </nav>
          )}
          {badge && (
            <span className="inline-block rounded-full border border-brand-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange mb-5">
              {badge}
            </span>
          )}
          <h1 className="heading-1 text-white max-w-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-5 text-base md:text-lg text-neutral-300 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-neutral-50 to-white border-b border-neutral-200">
      <div className="container-x pt-10 md:pt-14 pb-14 md:pb-20">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-1 text-xs md:text-sm text-neutral-500">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="hover:text-brand-orange">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-neutral-700">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
              </span>
            ))}
          </nav>
        )}
        {badge && <span className="pill-badge mb-5">{badge}</span>}
        <h1 className="heading-1 text-brand-black max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-5 body-lg max-w-3xl">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
