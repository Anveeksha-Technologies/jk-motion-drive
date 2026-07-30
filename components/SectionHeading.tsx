import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  actions?: ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  actions,
}: Props) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignClass} gap-3 mb-10 md:mb-14`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <div
        className={`flex ${
          align === "center" ? "flex-col items-center" : "flex-col md:flex-row md:items-end md:justify-between"
        } gap-4 w-full`}
      >
        <h2 className={`heading-2 text-brand-black ${align === "center" ? "" : "max-w-3xl"}`}>
          {title}
        </h2>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      {subtitle && (
        <p className={`body-lg ${align === "center" ? "max-w-3xl" : "max-w-3xl"}`}>{subtitle}</p>
      )}
    </div>
  );
}
