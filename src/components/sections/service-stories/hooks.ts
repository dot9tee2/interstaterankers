"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

// Helpers for the animated service stories in ServicesShowcase.
// Each story is a short "action, then result" scene drawn as plain HTML, so it stays sharp, uses the site's
// tokens and costs a few KB instead of a video file. The visitor's scroll drives it: ServicesShowcase reports how far
// the journey line has travelled through a stop, and that stop's story steps forward or back to match.

/** How far the journey line has travelled through one stop, from 0 (not reached yet) to 1 (story complete) */
export type StoryProgress = {
  get: () => number;
  subscribe: (listener: () => void) => () => void;
};

export type StoryProps = {
  progress: StoryProgress;
};

/** A progress value the scroll code writes and one story reads, without re-rendering anything else */
export function createStoryProgress() {
  let value = 0;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set(next: number) {
      if (next === value) return;
      value = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
}

/**
 * Counts how many of a story's steps the scroll has reached. `times` place the steps along a notional run in
 * milliseconds, so the pacing reads like a short clip, and must be a module-level constant. The story re-renders only
 * when the count changes. Visitors who prefer reduced motion get the last step right away, so they see the result.
 */
export function useStorySteps(times: readonly number[], progress: StoryProgress) {
  const reduced = usePrefersReducedMotion();
  const total = times[times.length - 1];
  const step = useSyncExternalStore(
    progress.subscribe,
    () => times.filter((time) => time / total <= progress.get()).length,
    () => 0,
  );
  return reduced ? times.length : step;
}

/** Eases a number to `to` while `active` is true, and back to `from` when the visitor scrolls back up */
export function useCountUp(from: number, to: number, active: boolean, duration = 1200) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(from);
  const current = useRef(from);

  useEffect(() => {
    const start = current.current;
    const target = active ? to : from;
    if (reduced || start === target) return;
    let frame = 0;
    const began = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - began) / duration);
      current.current = Math.round(start + (target - start) * (1 - (1 - progress) ** 3));
      setValue(current.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, from, to, duration]);

  return reduced ? to : value;
}

/** Classes for a story card that rises into place once the scroll reaches its step */
export function cardReveal(shown: boolean) {
  return cn(
    "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
    shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
  );
}
