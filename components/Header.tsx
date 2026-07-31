"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { primaryNav } from "@/lib/site";
import { productCategories } from "@/lib/products";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
      <div className="h-[3px] w-full bg-brand-orange" />
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
                    <div className="absolute left-0 top-full pt-2 w-72">
                      <div className="rounded-xl border border-neutral-200 bg-white shadow-card-hover py-2">
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/products/${cat.slug}`}
                            className="block px-4 py-2.5 text-sm font-medium text-neutral-800 hover:bg-brand-orange-tint hover:text-brand-orange"
                          >
                            {cat.title}
                          </Link>
                        ))}
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
