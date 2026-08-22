import Image from "next/image";
import Link from "next/link";

// Client-supplied brand lockup (gear mark + JK MOTION DRIVE wordmark).
// Source of truth: brand/jk-motion-logo-original.svg
// The dark-background variant is a knockout render of the same lockup.
const LOGO_ASPECT = 353 / 144; // ≈ 2.451

/**
 * Rendered sizes, as static class strings so Tailwind's scanner sees them.
 *
 * The client asked for a larger lockup (Aug 2026). The header bar is
 * h-16 (64px) on mobile and h-20 (80px) from md up, so the logo scales with it
 * rather than taking one fixed height: 48px on mobile and 56px on desktop, up
 * from a flat 44px. `intrinsic` is the height handed to next/image for the
 * aspect-ratio box; CSS then drives the displayed size.
 */
const SIZES = {
  header: { className: "h-12 md:h-14 w-auto", intrinsic: 56 },
  footer: { className: "h-14 md:h-16 w-auto", intrinsic: 64 },
} as const;

type Props = {
  /** "light" = for light backgrounds (header), "dark" = for dark backgrounds (footer) */
  variant?: "light" | "dark";
  /** Which call site this is — picks the responsive height pair above. */
  size?: keyof typeof SIZES;
  className?: string;
};

export default function Logo({
  variant = "light",
  size = "header",
  className = "",
}: Props) {
  const src = variant === "dark" ? "/images/logo-light.webp" : "/images/logo.webp";
  const { className: sizeClass, intrinsic } = SIZES[size];
  const width = Math.round(intrinsic * LOGO_ASPECT);

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
        height={intrinsic}
        priority
        sizes={`${width}px`}
        className={`object-contain ${sizeClass}`}
      />
    </Link>
  );
}
