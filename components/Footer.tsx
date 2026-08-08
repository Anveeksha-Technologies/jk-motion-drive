import Link from "next/link";
import { Clock, Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/lib/site";
import { productCategories } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-neutral-300">
      <div className="container-x py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo variant="dark" height={52} />
          <p className="mt-5 text-sm leading-relaxed text-neutral-400 max-w-xs">
            Engineered drive solutions — gear units, geared motors, electric motors and drive
            electronics, supplied and supported across India.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={site.emailHref}
              aria-label="Email"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white/5 hover:bg-brand-orange text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Website"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white/5 hover:bg-brand-orange text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href={site.emailHref}
              aria-label="Email us"
              className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white/5 hover:bg-brand-orange text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest">QUICK LINKS</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Products", "/products"],
              ["Industries", "/industries"],
              ["Gallery", "/gallery"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-neutral-400 hover:text-brand-orange transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest">PRODUCTS</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {productCategories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="text-neutral-400 hover:text-brand-orange transition-colors"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-widest">CONTACT</h4>
          <ul className="mt-5 space-y-4 text-sm text-neutral-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
              <a href={site.phoneHref} className="hover:text-brand-orange">{site.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
              <a href={site.emailHref} className="hover:text-brand-orange break-all">{site.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© 2026 JK Motion Drive. All rights reserved. · Powering Precision</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-brand-orange">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-orange">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
