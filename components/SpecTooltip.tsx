"use client";

import { Info } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { lookupTerm } from "@/lib/glossary";

// Tooltip for the technical column headings in the catalogue table.
//
// Deliberately a real <button> with aria-describedby rather than a CSS :hover
// affordance. Header.tsx already had a mouse-only dropdown that keyboard users
// could not reach; adding a second keyboard trap to fix a readability problem
// would trade one accessibility bug for another. This opens on click or
// Enter/Space, closes on Escape, outside click or scroll, and is in tab order.
//
// WHY IT PORTALS TO document.body
//
// The table scrolls sideways inside `overflow-x-auto`. Per spec, an element
// with overflow-x other than visible computes overflow-y to auto as well, so
// that wrapper clips in BOTH axes — an absolutely positioned bubble inside it
// was being sliced off mid-sentence. Rendering into document.body with fixed
// positioning escapes the clip entirely, at the cost of having to place it by
// hand from the trigger's bounding rect.
//
// Copy comes from content/glossary.json via lib/glossary.ts. A term with no
// entry renders nothing, so a new spec label degrades to a plain heading.

const WIDTH = 260;
const GAP = 10;
const EDGE = 8;

export default function SpecTooltip({ term }: { term: string }) {
  const entry = lookupTerm(term);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Centre under the icon, then pull back inside the viewport so a tooltip on
  // the last column (Voltage) does not hang off the right edge.
  const place = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const centred = r.left + r.width / 2 - WIDTH / 2;
    const maxLeft = window.innerWidth - WIDTH - EDGE;
    setPos({ top: r.bottom + GAP, left: Math.min(Math.max(EDGE, centred), Math.max(EDGE, maxLeft)) });
  }, []);

  useEffect(() => {
    if (!open) return;
    place();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!btnRef.current?.contains(t) && !bubbleRef.current?.contains(t)) setOpen(false);
    };
    // Fixed positioning does not follow the page, so close rather than let the
    // bubble drift away from its heading.
    const onScrollOrResize = () => setOpen(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, place]);

  if (!entry) return null;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={`What ${entry.term} means`}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        className="ml-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full align-middle text-neutral-400 transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-1"
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open &&
        pos &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={bubbleRef}
            id={id}
            role="tooltip"
            style={{ position: "fixed", top: pos.top, left: pos.left, width: WIDTH }}
            className="z-[60] rounded-lg bg-brand-black px-3 py-2.5 text-xs font-normal normal-case leading-relaxed tracking-normal text-white shadow-card-hover"
          >
            <span className="mb-1 block font-semibold text-brand-orange">{entry.term}</span>
            {entry.short}
          </div>,
          document.body
        )}
    </>
  );
}
