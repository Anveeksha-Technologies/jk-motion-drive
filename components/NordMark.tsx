/**
 * NORD DRIVESYSTEMS lockup, stamped in the bottom-right corner of every piece
 * of product artwork — the placement the client asked for, matching NORD's own
 * product photography.
 *
 * The asset is an auto-trace carrying an opaque #FDFDFD panel plus a scatter of
 * off-white noise shapes. Those only disappear against white — which is now the
 * case, since the NORD renders are contained on white. No backing chip is
 * needed any more; do not place this over a dark surface without one.
 */
export default function NordMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute bottom-3 right-3 z-10 inline-flex items-center ${className}`}
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
