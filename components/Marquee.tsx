type Props = {
  items: string[];
};

/**
 * Infinite right-to-left marquee ticker.
 * Duplicates its items once so the CSS translateX(-50%) loop is seamless.
 */
export default function Marquee({ items }: Props) {
  return (
    <div
      className="w-full overflow-hidden bg-brand-black text-white py-5 md:py-6 border-y border-white/10"
      aria-label="Highlights"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((loop) => (
          <ul
            key={loop}
            aria-hidden={loop === 1}
            className="flex items-center shrink-0"
          >
            {items.map((item, i) => (
              <li
                key={`${loop}-${i}`}
                className="flex items-center shrink-0"
              >
                <span className="font-display uppercase tracking-wider text-xl md:text-3xl px-8 md:px-12 whitespace-nowrap">
                  {item}
                </span>
                <span
                  className="w-2 h-2 rounded-full bg-brand-orange shrink-0"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
