"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
};

export default function StatCounter({ value, suffix = "", label, duration = 1600 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.round(eased * value));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl text-brand-orange leading-none">
        {display}
        <span>{suffix}</span>
      </div>
      <div className="mt-3 text-sm md:text-base font-medium text-neutral-300 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
