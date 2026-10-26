import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  /** Trail after Home; the last crumb is the current page and gets no link */
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons or a short meta line under the description */
  children?: ReactNode;
  /** Right-hand visual on large screens; without one the text stays at reading width */
  aside?: ReactNode;
  className?: string;
};

// Opening block of every inner page. Same top room as the homepage hero (the navbar floats over it), the same eyebrow
// and a quieter h1, so moving from the homepage into a page doesn't change the look.
export function PageHero({ breadcrumbs, eyebrow, title, description, children, aside, className }: PageHeroProps) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <section className={cn("bg-background", className)}>
      <div className="container mx-auto px-4 pb-20 pt-32 md:px-6 sm:pb-24 lg:pt-40">
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {trail.map((crumb, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={crumb.label} className="inline-flex items-center gap-1.5">
                  {isLast || !crumb.href ? (
                    <span aria-current={isLast ? "page" : undefined} className={cn(isLast && "text-foreground")}>{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-foreground">{crumb.label}</Link>
                  )}
                  {!isLast && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={cn(aside && "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16")}>
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
              <span aria-hidden="true" className="h-px w-8 bg-accent-cyan" />
              {eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">{description}</p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div className="min-w-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
