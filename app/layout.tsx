import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PartnerBar from "@/components/PartnerBar";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";

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

export const metadata: Metadata = {
  title: "JK Motion Drive — Powering Precision in Motion",
  description:
    "Engineered drive solutions — gear units, geared motors, electric motors and drive electronics, supplied and supported across India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <PartnerBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
