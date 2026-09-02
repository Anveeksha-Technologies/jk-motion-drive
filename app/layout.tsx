import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import { site } from "@/lib/site";
import { ldJson, localBusinessLd, organizationLd, siteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// `title.template` gives every page the company name without each one having to
// repeat it; `default` covers the home page and anything that sets no title.
// `metadataBase` is what makes the relative image paths below resolve to
// absolute URLs, which OpenGraph requires.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JK Motion Drive — Powering Precision in Motion",
    template: `%s | ${site.name}`,
  },
  description:
    "Engineered drive solutions — gear units, geared motors, electric motors and drive electronics, supplied and supported across India.",
  applicationName: site.name,
  keywords: [
    "NORD DRIVESYSTEMS Ahmedabad",
    "geared motors Gujarat",
    "gear units Ahmedabad",
    "frequency inverters India",
    "NORDAC drive electronics",
    "MAXXDRIVE industrial gear units",
    "industrial drive technology Ahmedabad",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "JK Motion Drive — Powering Precision in Motion",
    description:
      "Authorised Channel Partner of NORD DRIVESYSTEMS. Gear units, geared motors, electric motors and drive electronics, supplied and supported from Ahmedabad.",
    url: siteUrl,
    locale: "en_IN",
    images: [{ url: "/images/logo.webp", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Motion Drive — Powering Precision in Motion",
    description:
      "Authorised Channel Partner of NORD DRIVESYSTEMS, Ahmedabad. Gear units, motors and drive electronics.",
    images: ["/images/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "Industrial Drive Technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${anton.variable}`}>
      <head>
        {/* GEO signals for local search. Next's Metadata API has no field for
            these legacy geo meta tags, so they are written directly. The
            authoritative location data is the LocalBusiness JSON-LD below;
            these remain cheap and are still read by some regional crawlers.
            Coordinates are deliberately omitted — see lib/site.ts. */}
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad" />
        {/* TODO: add <meta name="ICBM"> and `geo` in localBusinessLd() once the
            coordinates are read off the client's Google Business Profile. An
            empty or guessed coordinate is worse than none — Google will pin it. */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(organizationLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(localBusinessLd()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWidgets />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
