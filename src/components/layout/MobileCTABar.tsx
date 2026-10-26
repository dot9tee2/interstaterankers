"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryCta } from "@/data/cta";

// Phones only: from md up the navbar shows the labeled CTA (and BackToTop takes the bottom-right corner).
// The bar appears once the hero's buttons (#hero-cta) have scrolled off the top and hides again while the
// final CTA (#final-cta) is on screen, because both already show the same two actions.
export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    const finalCta = document.getElementById("final-cta");
    if (!heroCta || !finalCta) return;

    let pastHero = false;
    let onFinal = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroCta) pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        if (entry.target === finalCta) onFinal = entry.isIntersecting;
      }
      setVisible(pastHero && !onFinal);
    });
    observer.observe(heroCta);
    observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        // invisible keeps the hidden bar out of the tab order
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-4 py-3 transition-[transform,visibility] duration-300 motion-reduce:transition-none md:hidden",
        visible ? "visible translate-y-0" : "invisible translate-y-full"
      )}
    >
      <div className="flex gap-3">
        <a
          href="tel:+12816195295"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          Call us
        </a>
        <Link
          href={primaryCta.href}
          className="inline-flex h-12 flex-[2] items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {primaryCta.label}
        </Link>
      </div>
    </div>
  );
}
