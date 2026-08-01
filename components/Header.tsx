"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Bolt, ChevronDown, Cog, Cpu, Layers, Menu, X, type LucideIcon } from "lucide-react";
import Logo from "./Logo";
import { primaryNav } from "@/lib/site";
import { productCategories } from "@/lib/products";

const productIconMap: Record<string, LucideIcon> = {
  gear: Cog,
  bolt: Bolt,
  chip: Cpu,
  layers: Layers,
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 4);
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
      setScrollProgress(progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/* Scroll progress bar — fills left-to-right as user scrolls */}
      <div className="h-[3px] w-full bg-brand-orange/15 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-brand-orange"
          style={{ width: `${scrollProgress * 100}%` }}
          aria-hidden
        />
      </div>
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Logo />

        <nav className="hidden md:flex items-center gap-0.5 xl:gap-1">
          {primaryNav.map((item) => {
            if (item.hasDropdown) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-2.5 xl:px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive(item.href)
                        ? "text-brand-orange"
                        : "text-brand-black hover:text-brand-orange"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                  {productsOpen && (
                    <div className="absolute right-0 top-full pt-3 w-[92vw] max-w-[720px]">
                      <div className="rounded-2xl border border-neutral-200 bg-white shadow-card-hover overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                          {productCategories.map((cat) => {
                            const CIcon = productIconMap[cat.icon] ?? Cog;
                            return (
                              <Link
                                key={cat.slug}
                                href={`/products/${cat.slug}`}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                              >
                                <span className="w-14 h-14 shrink-0 rounded-lg bg-brand-orange-tint text-brand-orange flex items-center justify-center">
                                  <CIcon className="w-6 h-6" />
                                </span>
                                <div className="min-w-0">
                                  <div className="font-display uppercase text-sm md:text-[15px] text-brand-black leading-tight tracking-wide">
                                    {cat.title}
                                  </div>
                                  <div className="mt-1 text-xs text-neutral-500 leading-snug">
                                    {cat.dropdownBlurb}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <Link
                          href="/products"
                          className="flex items-center justify-center gap-2 bg-brand-black text-white py-3.5 text-sm font-semibold hover:bg-black transition-colors"
                        >
                          View all products <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 xl:px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-brand-orange"
                    : "text-brand-black hover:text-brand-orange"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center ml-2">
          <Link href="/contact" className="btn-primary">
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-brand-black hover:bg-neutral-100"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="container-x py-4 flex flex-col gap-1">
            {primaryNav.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.href} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`flex-1 py-3 text-base font-semibold ${
                          isActive(item.href) ? "text-brand-orange" : "text-brand-black"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setMobileProductsOpen((v) => !v)}
                        className="p-2 text-brand-black"
                        aria-label="Toggle products"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            mobileProductsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {mobileProductsOpen && (
                      <div className="flex flex-col pl-4 border-l-2 border-brand-orange-tint mb-2">
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/products/${cat.slug}`}
                            className="py-2.5 text-sm text-neutral-700 hover:text-brand-orange"
                          >
                            {cat.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 text-base font-semibold ${
                    isActive(item.href) ? "text-brand-orange" : "text-brand-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-primary mt-3 w-full">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
