"use client";

import type { ReactNode } from "react";
import { House, Lock, ShieldCheck, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardReveal, useCountUp, useStorySteps, type StoryProps } from "./hooks";
import { StoryStage } from "./StoryStage";

// The story: a roofer's new site builds itself section by section, its mobile speed score fills,
// then quote requests start climbing.
// Places along the scroll, in milliseconds of a notional run: the browser window, then nav, hero, buttons, image and
// service tiles build in, the speed card appears and its score fills, then the requests card appears and climbs.
const STEP_TIMES = [100, 400, 750, 1100, 1450, 1800, 2200, 2500, 3000, 3300];
const BROWSER_STEP = 1;
const NAV_STEP = 2;
const HERO_STEP = 3;
const BUTTONS_STEP = 4;
const IMAGE_STEP = 5;
const TILES_STEP = 6;
const SPEED_CARD_STEP = 7;
const SPEED_STEP = 8;
const REQUESTS_CARD_STEP = 9;
const REQUESTS_STEP = 10;

const SPEED_SCORE = 98;
const RING_LENGTH = 2 * Math.PI * 27;

const TILES = [
  { icon: Wrench, label: "Repairs" },
  { icon: House, label: "New roofs" },
  { icon: ShieldCheck, label: "Inspections" },
];

// One block of the page: a grey placeholder until its step, then the real content fades in over it
function Build({ done, className, children }: { done: boolean; className?: string; children: ReactNode }) {
  return (
    <div className="relative">
      <span className={cn("absolute inset-0 rounded-md bg-muted transition-opacity duration-500 motion-reduce:transition-none", done && "opacity-0")} />
      <div className={cn("transition-opacity duration-500 motion-reduce:transition-none", done ? "opacity-100" : "opacity-0", className)}>{children}</div>
    </div>
  );
}

export default function WebsiteStory({ progress }: StoryProps) {
  const step = useStorySteps(STEP_TIMES, progress);
  const speedUp = step >= SPEED_STEP;
  const requestsUp = step >= REQUESTS_STEP;
  const score = useCountUp(0, SPEED_SCORE, speedUp, 1200);
  const requests = useCountUp(9, 26, requestsUp, 1200);

  return (
    <StoryStage
      width={400}
      height={320}
      label="Example with sample data: a new website for Acme Roofing builds section by section, scores 98 for mobile speed and starts bringing in more quote requests"
    >
      {/* The new site in a browser window */}
      <div className={cn("absolute left-4 top-4 h-[288px] w-[224px] overflow-hidden rounded-xl border border-border bg-card", cardReveal(step >= BROWSER_STEP))}>
        <div className="flex h-7 items-center gap-1.5 border-b border-border px-2.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          ))}
          <span className="ml-2 flex h-4 flex-1 items-center gap-1 rounded-full bg-muted px-2 text-[9px] text-muted-foreground">
            <Lock className="h-2 w-2" />
            acmeroofing
          </span>
        </div>

        <div className="p-3">
          <Build done={step >= NAV_STEP} className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground">
              <span className="h-3 w-3 rounded bg-accent-cyan" />
              Acme Roofing
            </span>
            <span className="rounded-full bg-accent-cyan/15 px-2 py-0.5 text-[9px] font-semibold text-accent-cyan">Call now</span>
          </Build>

          <div className="mt-3">
            <Build done={step >= HERO_STEP}>
              <p className="text-[15px] font-semibold leading-tight text-foreground">Roof repairs done right the first time</p>
              <p className="mt-1.5 text-[10px] text-muted-foreground">Free inspections across Houston</p>
            </Build>
          </div>

          <div className="mt-2.5">
            <Build done={step >= BUTTONS_STEP} className="flex gap-1.5">
              <span className="rounded-md bg-accent-cyan px-2 py-1 text-[9px] font-semibold text-background">Free inspection</span>
              <span className="rounded-md border border-border px-2 py-1 text-[9px] font-semibold text-foreground">Our services</span>
            </Build>
          </div>

          <div className="mt-3">
            <Build done={step >= IMAGE_STEP} className="flex h-12 items-center justify-center rounded-lg border border-border bg-background">
              <House className="h-5 w-5 text-accent-cyan" />
            </Build>
          </div>

          <div className="mt-2.5">
            <Build done={step >= TILES_STEP} className="grid grid-cols-3 gap-1.5">
              {TILES.map(({ icon: Icon, label }) => (
                <span key={label} className="flex flex-col items-center gap-1 rounded-md border border-border py-1.5 text-[9px] text-muted-foreground">
                  <Icon className="h-3 w-3 text-accent-cyan" />
                  {label}
                </span>
              ))}
            </Build>
          </div>
        </div>
      </div>

      {/* Mobile speed score */}
      <div className={cn("absolute left-[252px] top-4 w-[132px] rounded-xl border border-border bg-card p-3", cardReveal(step >= SPEED_CARD_STEP))}>
        <p className="text-[11px] text-muted-foreground">Mobile speed</p>
        <div className="relative mx-auto mt-2 h-16 w-16">
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
            <circle cx="32" cy="32" r="27" fill="none" strokeWidth="6" className="stroke-muted" />
            <circle
              cx="32"
              cy="32"
              r="27"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={speedUp ? RING_LENGTH * (1 - SPEED_SCORE / 100) : RING_LENGTH}
              className="stroke-accent-cyan transition-[stroke-dashoffset] duration-1200 ease-out motion-reduce:transition-none"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[18px] font-semibold tabular-nums text-foreground">{score}</span>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">Built with Next.js</p>
      </div>

      {/* The payoff: quote requests */}
      <div className={cn("absolute bottom-4 left-[252px] w-[132px] rounded-xl border border-border bg-card p-3", cardReveal(step >= REQUESTS_CARD_STEP))}>
        <p className="text-[11px] text-muted-foreground">Quote requests</p>
        <p className="mt-1.5 text-[28px] font-semibold leading-none tabular-nums text-foreground">{requests}</p>
        <p className="mt-1 text-[10px] text-muted-foreground">this month</p>
        <svg viewBox="0 0 108 32" className="mt-2 h-8 w-full overflow-visible">
          <polyline
            points="0,28 18,26 36,27 54,20 72,16 90,10 108,4"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={requestsUp ? 0 : 1}
            className="stroke-accent-cyan transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none"
          />
        </svg>
      </div>
    </StoryStage>
  );
}
