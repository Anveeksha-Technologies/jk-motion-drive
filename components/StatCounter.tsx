"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  label?: string;
  duration?: number;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  align?: "left" | "center";
};

export default function StatCounter({
  value,
  suffix = "",
  label,
  duration = 1600,
  className,
  valueClassName,
  labelClassName,
  align = "center",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startAnim = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * value));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // If the element is already in view on mount (e.g. above-the-fold hero
    // stats), start immediately instead of waiting for the observer.
    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    if (alreadyVisible) {
      startAnim();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAnim();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const alignClass = align === "left" ? "text-left" : "text-center";
  const wrapperClass = className ?? alignClass;
  const valueClass =
    valueClassName ??
    "font-display text-5xl md:text-6xl text-brand-orange leading-none";
  const labelClass =
    labelClassName ??
    "mt-3 text-sm md:text-base font-medium text-neutral-300 uppercase tracking-wider";

  return (
    <div ref={ref} className={wrapperClass}>
      <div className={valueClass}>
        {display}
        <span>{suffix}</span>
      </div>
      {label && <div className={labelClass}>{label}</div>}
    </div>
  );
}
