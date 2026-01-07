"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Fullscreen preloader with brand background and staged logo/text animations.
 * Sequence:
 * 1) Logo appears, blinks and glows
 * 2) "InterState" text reveals from left to right behind logo
 * 3) "Rankers" text slides in below
 * Auto-hides after the sequence or when page is interactive.
 */
export default function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sequenceDone, setSequenceDone] = useState(false);

  // Ensure the visual animation sequence fully completes before allowing dismissal
  useEffect(() => {
    const SEQUENCE_MS = 1500; // faster sequence
    const timer = setTimeout(() => setSequenceDone(true), SEQUENCE_MS);
    return () => clearTimeout(timer);
  }, []);

  // Detect when the route/content is fully ready
  useEffect(() => {
    const markReady = () => setIsReady(true);
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        markReady();
      } else {
        window.addEventListener("load", markReady, { once: true });
      }
    }
    return () => window.removeEventListener?.("load", markReady);
  }, []);

  // Safety fallback: never block interaction beyond a few seconds
  useEffect(() => {
    const fallback = setTimeout(() => {
      setIsReady(true);
      setProgress(100);
      const root = document.querySelector(".site-root");
      root?.classList.add("site-visible");
    }, 4000); // reduced fallback
    return () => clearTimeout(fallback);
  }, []);

  // Progress simulation that accelerates to 100% when ready
  useEffect(() => {
    if (isDone) return;
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (isReady && sequenceDone) {
          const next = Math.min(100, prev + 8); // faster completion
          return next;
        }
        // before both are ready and sequence complete, creep up to a stall cap
        const stallCap = 95;
        if (prev < stallCap) {
          const inc = 1 + Math.floor(Math.random() * 3); // 1-3%
          return Math.min(stallCap, prev + inc);
        }
        return prev;
      });
    }, 40); // faster ticks (was 80)
    return () => clearInterval(interval);
  }, [isReady, sequenceDone, isDone]);

  // When both conditions are met and progress finishes, crossfade and remove preloader
  useEffect(() => {
    if (isReady && sequenceDone && progress >= 100 && !isHiding) {
      setIsHiding(true);
      // Reveal the site root (crossfade-in)
      const root = document.querySelector(".site-root");
      root?.classList.add("site-visible");
      const t = setTimeout(() => setIsDone(true), 450);
      return () => clearTimeout(t);
    }
  }, [isReady, sequenceDone, progress, isHiding]);

  if (isDone) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${isHiding ? "opacity-0" : "opacity-100"} ${isHiding || progress > 95 ? "pointer-events-none" : "pointer-events-auto"}`} role="status" aria-live="polite" aria-label="Loading InterState Rankers" aria-hidden={isHiding ? true : false}>
      <div className="absolute inset-0 hero-gradient-animated" />
      <div className="relative z-10 flex items-center select-none gap-6">
        {/* Logo */}
        <div className="animate-logo-pop">
          <Image
            src="/logo-preloader.png"
            alt="InterState Rankers"
            width={220}
            height={80}
            priority
          />
        </div>

        {/* Separator line */}
        <div className="w-px h-16 md:h-20 bg-white/30" />

        {/* Text container to the right */}
        <div className="leading-tight text-left">
          <div className="relative overflow-hidden">
            {/* reveal mask */}
            <span
              className="block text-5xl md:text-6xl font-body font-bold text-white tracking-wide preloader-reveal-initial will-reveal reveal-left"
              style={{ animationDelay: "300ms" }}
            >
              InterState
            </span>
          </div>
          <div className="relative overflow-hidden mt-1">
            <span
              className="block text-5xl md:text-6xl font-body font-bold text-white tracking-wide preloader-slide-initial will-slide slide-up-fade"
              style={{ animationDelay: "700ms" }}
            >
              Rankers
            </span>
          </div>
          {/* Slim progress bar */}
          <div className="preloader-progress mt-4" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}


