import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
};

export default function PageHero({ badge, title, subtitle, crumbs, children }: Props) {
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
        {subtitle && (
          <p className="mt-5 body-lg max-w-3xl">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
