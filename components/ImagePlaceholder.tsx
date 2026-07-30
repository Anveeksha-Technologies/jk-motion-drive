import { ImageIcon } from "lucide-react";

type Props = {
  alt: string;
  aspect?: "16/9" | "4/3" | "1/1" | "3/2" | "21/9";
  className?: string;
  label?: string;
  rounded?: string;
};

/**
 * Placeholder image slot — client will provide real photography.
 * Renders a subtle gradient block with the alt text visible for wiring.
 */
export default function ImagePlaceholder({
  alt,
  aspect = "16/9",
  className = "",
  label,
  rounded = "rounded-xl",
}: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full ${rounded} overflow-hidden bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 border border-neutral-200 ${className}`}
      style={{ aspectRatio: aspect.replace("/", " / ") }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 gap-2 p-4 text-center">
        <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
        <span className="text-[11px] uppercase tracking-widest font-semibold">
          {label ?? "Image placeholder"}
        </span>
        <span className="text-xs text-neutral-500 max-w-[80%]">{alt}</span>
      </div>
    </div>
  );
}
