"use client";

import { Check, MapPin, Search, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardReveal, useCountUp, useStorySteps, type StoryProps } from "./hooks";
import { StoryStage } from "./StoryStage";

// The story: a profile tune-up ticks off, Acme Roofing climbs from fourth to first in the Maps results, then its calls go up.
// Places along the scroll, in milliseconds of a notional run: the results card, the tune-up card, four checklist ticks,
// the climb, the calls card, then the calls counter.
const STEP_TIMES = [100, 450, 800, 1100, 1400, 1700, 2300, 2800, 3200];
const RESULTS_STEP = 1;
const TUNE_UP_STEP = 2;
const FIRST_TICK_STEP = 3;
const CLIMB_STEP = 7;
const CALLS_CARD_STEP = 8;
const CALLS_STEP = 9;

const TASKS = ["Categories", "Photos", "Posts", "Review replies"];

// Result slots before and after the climb. Competitors are drawn as placeholder bars rather than names,
// so the example never shows a real business losing its spot.
const PLACES = [
  { id: "acme", before: 3, after: 0 },
  { id: "first", before: 0, after: 1, nameWidth: 92 },
  { id: "second", before: 1, after: 2, nameWidth: 108 },
  { id: "third", before: 2, after: 3, nameWidth: 80 },
];
const ROW_HEIGHT = 40;

const COMPETITOR_PINS = [
  { left: 30, top: 16 },
  { left: 92, top: 34 },
  { left: 146, top: 12 },
];

// Weekly bars in the calls card, as [before, after] heights
const BARS = [
  [6, 10],
  [8, 13],
  [5, 12],
  [9, 17],
  [7, 20],
  [8, 24],
  [6, 28],
];

function Stars({ dim }: { dim?: boolean }) {
  return (
    <span className={cn("flex gap-px text-accent-amber", dim && "opacity-50")}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="h-2.5 w-2.5 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

export default function MapsStory({ progress }: StoryProps) {
  const step = useStorySteps(STEP_TIMES, progress);
  const climbed = step >= CLIMB_STEP;
  const callsUp = step >= CALLS_STEP;
  const calls = useCountUp(4, 31, callsUp, 1400);

  return (
    <StoryStage
      width={400}
      height={320}
      label="Example with sample data: after a Google Business Profile tune-up, Acme Roofing climbs from fourth to first in Google Maps results and gets more calls from Maps"
    >
      {/* Google Maps results for a local search */}
      <div className={cn("absolute left-4 top-4 h-[288px] w-[224px] rounded-xl border border-border bg-card", cardReveal(step >= RESULTS_STEP))}>
        <div className="mx-3 mt-3 flex h-8 items-center gap-2 rounded-full bg-muted px-3 text-[12px] text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          roofer near me
        </div>

        <div className="relative mx-3 mt-2 h-16 overflow-hidden rounded-lg bg-muted">
          <span className="absolute -left-4 top-6 h-[5px] w-[240px] -rotate-6 bg-border" />
          <span className="absolute -top-4 left-[104px] h-24 w-[5px] rotate-12 bg-border" />
          {COMPETITOR_PINS.map((pin) => (
            <MapPin key={pin.left} className="absolute h-3.5 w-3.5 text-muted-foreground/60" style={pin} />
          ))}
          <MapPin
            className={cn(
              "absolute h-4 w-4 transition-[transform,color] duration-500 ease-pop motion-reduce:transition-none",
              climbed ? "-translate-y-1 scale-125 text-accent-cyan" : "text-muted-foreground",
            )}
            style={{ left: 168, top: 30 }}
          />
        </div>

        {/* Rank numbers stay put while the businesses slide past them */}
        <div className="relative mx-3 mt-2 h-40">
          {[1, 2, 3, 4].map((rank) => (
            <span
              key={rank}
              className="absolute left-0 flex h-10 w-4 items-center text-[11px] font-semibold text-muted-foreground"
              style={{ top: (rank - 1) * ROW_HEIGHT }}
            >
              {rank}
            </span>
          ))}
          {/* Below the line is outside the three results Google Maps shows first */}
          <span className="absolute left-5 right-0 top-[120px] border-t border-dashed border-border" />
          {PLACES.map((place) => {
            const slot = climbed ? place.after : place.before;
            const isAcme = place.id === "acme";
            return (
              <div
                key={place.id}
                className={cn(
                  "absolute left-5 right-0 top-0 flex h-10 flex-col justify-center rounded-lg px-2 transition-[transform,opacity,background-color] duration-700 ease-in-out motion-reduce:transition-none",
                  slot === 3 && "opacity-50",
                  isAcme && "z-10",
                  isAcme && climbed && "bg-accent-cyan/10",
                )}
                style={{ transform: `translateY(${slot * ROW_HEIGHT}px)` }}
              >
                {isAcme ? (
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold leading-none text-foreground">
                    Acme Roofing
                    <span
                      className={cn(
                        "rounded-full bg-accent-cyan/15 px-1.5 py-0.5 text-[9px] font-semibold text-accent-cyan transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                        climbed ? "scale-100 opacity-100 delay-500" : "scale-75 opacity-0",
                      )}
                    >
                      Top 3
                    </span>
                  </p>
                ) : (
                  <span className="block h-2 rounded-full bg-muted-foreground/25" style={{ width: place.nameWidth }} />
                )}
                <span className="mt-1.5 flex items-center gap-1.5">
                  <Stars dim={!isAcme} />
                  {isAcme ? (
                    <span className="text-[10px] leading-none text-muted-foreground">4.9 (212)</span>
                  ) : (
                    <span className="h-1.5 w-7 rounded-full bg-muted-foreground/20" />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* The profile tune-up, ticking off one item at a time */}
      <div className={cn("absolute left-[252px] top-4 w-[132px] rounded-xl border border-border bg-card p-3", cardReveal(step >= TUNE_UP_STEP))}>
        <p className="text-[12px] font-semibold text-foreground">Profile tune-up</p>
        <ul className="mt-3 space-y-2">
          {TASKS.map((task, index) => {
            const done = step >= FIRST_TICK_STEP + index;
            return (
              <li key={task} className="flex items-center gap-2 text-[11px]">
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 motion-reduce:transition-none",
                    done ? "border-accent-cyan bg-accent-cyan text-background" : "border-border",
                  )}
                >
                  <Check
                    className={cn(
                      "h-2.5 w-2.5 transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                      done ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                    strokeWidth={3}
                  />
                </span>
                <span className={cn("transition-colors duration-300", done ? "text-foreground" : "text-muted-foreground")}>{task}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The payoff: calls from Maps */}
      <div className={cn("absolute bottom-4 left-[252px] w-[132px] rounded-xl border border-border bg-card p-3", cardReveal(step >= CALLS_CARD_STEP))}>
        <p className="text-[11px] text-muted-foreground">Calls from Maps</p>
        <p className="mt-1.5 text-[28px] font-semibold leading-none tabular-nums text-foreground">{calls}</p>
        <p className="mt-1 text-[10px] text-muted-foreground">this month</p>
        <div className="mt-3 flex h-7 items-end gap-1">
          {BARS.map(([before, after], index) => (
            <span
              key={index}
              className="flex-1 rounded-sm bg-accent-cyan/70 transition-[height] duration-700 ease-out motion-reduce:transition-none"
              style={{ height: callsUp ? after : before, transitionDelay: callsUp ? `${index * 60}ms` : "0ms" }}
            />
          ))}
        </div>
      </div>
    </StoryStage>
  );
}
