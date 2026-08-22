/**
 * NORD DRIVESYSTEMS lockup, stamped in the bottom-right corner of every piece
 * of product artwork — the placement the client asked for, matching NORD's own
 * product photography.
 *
 * It sits on a white chip rather than directly on the artwork. Two reasons:
 * the supplied asset is an auto-trace of a bitmap and carries an opaque
 * #FDFDFD background plus a scatter of off-white noise shapes, which only
 * disappear against white; and the current renders have a near-black backdrop,
 * so an unbacked lockup would read as a grey smear. When white-background
 * renders replace the current artwork the chip becomes invisible against them
 * and the mark simply sits on the photo, as in the reference.
 */
export default function NordMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute bottom-3 right-3 inline-flex items-center rounded bg-white px-1.5 py-1 shadow-sm ${className}`}
    >
      {/* Traced SVG, so served directly rather than through next/image.
          Sized by width, not height: the lockup is wider than it is tall
          (1443x1090) and its ink fills only ~75% of that box, so a width of
          80px lands the visible mark at roughly 60px — about a fifth of the
          artwork width, matching NORD's own product photography. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/nord-logo.svg"
        alt="NORD DRIVESYSTEMS"
        loading="lazy"
        className="w-16 md:w-20 h-auto"
      />
    </span>
  );
}
