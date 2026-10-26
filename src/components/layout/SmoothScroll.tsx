"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Smooths mouse-wheel scrolling site-wide with Lenis and keeps GSAP ScrollTrigger in step with it, so scroll-driven
// sections move with the eased scroll. Lenis keeps the page's native scroll, so sticky and fixed elements still work.
// Touch scrolling stays native, visitors who prefer reduced motion get plain scrolling, and Sanity Studio is left alone
// because it has its own scroll areas.
export default function SmoothScroll() {
  const pathname = usePathname();
  const enabled = !pathname?.startsWith("/studio");

  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // allowNestedScroll lets menus and other scrollable boxes scroll natively under the cursor
    const lenis = new Lenis({ allowNestedScroll: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [enabled]);

  return null;
}
