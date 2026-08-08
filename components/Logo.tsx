import Image from "next/image";
import Link from "next/link";

// Client-supplied brand lockup (gear mark + JK MOTION DRIVE wordmark).
// Source of truth: brand/jk-motion-logo-original.svg
// The dark-background variant is a knockout render of the same lockup.
const LOGO_ASPECT = 353 / 144; // ≈ 2.451

type Props = {
  /** "light" = for light backgrounds (header), "dark" = for dark backgrounds (footer) */
  variant?: "light" | "dark";
  /** Rendered height in px; width is derived from the lockup aspect ratio. */
  height?: number;
  className?: string;
};

export default function Logo({
  variant = "light",
  height = 44,
  className = "",
}: Props) {
  const src = variant === "dark" ? "/images/logo-light.webp" : "/images/logo.webp";
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <Link
      href="/"
      className={`inline-flex ${className}`}
      aria-label="JK Motion Drive — Home"
    >
      {/* The lockup already contains the "Powering Precision" tagline, so no
          separate tagline text is rendered alongside it. */}
      <Image
        src={src}
        alt="JK Motion Drive"
        width={width}
        height={height}
        priority
        sizes={`${width}px`}
        className="object-contain"
        style={{ height, width }}
      />
    </Link>
  );
}
