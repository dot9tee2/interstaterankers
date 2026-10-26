"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type StoryStageProps = {
  width: number;
  height: number;
  /** What the scene shows, for screen readers; the drawing itself is hidden from them */
  label: string;
  children: ReactNode;
};

// Draws a scene at a fixed design size and scales it to the available width, so the composition and the
// relative text sizes hold from a phone to a desktop. Children position themselves in design pixels.
export function StoryStage({ width, height, label, children }: StoryStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} role="img" aria-label={label} className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
      <div aria-hidden="true" className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
