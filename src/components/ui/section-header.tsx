import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  /** Names the section's step in the page's story ("Sound familiar?", "How it works", "Pricing") */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** id for the h2, so the section can point aria-labelledby at it */
  id?: string;
  className?: string;
};

// One eyebrow, heading and subtitle style for every homepage section, so headings rank by their place in the page
// rather than by whichever style a section happened to pick. Emphasis comes from the hero, the raised proof and
// pricing sections, and the violet final CTA, not from louder headings.
export function SectionHeader({ eyebrow, title, description, align = "center", id, className }: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      <p className={cn("mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan", centered && "justify-center")}>
        <span aria-hidden="true" className="h-px w-8 bg-accent-cyan" />
        {eyebrow}
        {centered && <span aria-hidden="true" className="h-px w-8 bg-accent-cyan" />}
      </p>
      <h2 id={id} className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg", centered ? "mx-auto max-w-2xl" : "max-w-xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
