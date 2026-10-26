"use client";

import { Check, House, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardReveal, useCountUp, useStorySteps, type StoryProps } from "./hooks";
import { StoryStage } from "./StoryStage";

// The story: the cursor taps an Acme Roofing ad, the quote form fills in and sends, then the lead drops into the CRM
// and the week's count ticks up. The lead matches the first one on the CRM phone in HQShowcase.
// Places along the scroll, in milliseconds of a notional run: the ad appears, the cursor reaches the button, press,
// release with the form opening, two fields, sent, the lead arrives with the week's count, the count goes up.
const STEP_TIMES = [100, 500, 1100, 1350, 1800, 2300, 2800, 3300, 3800];
const AD_STEP = 1;
const CURSOR_STEP = 2;
const PRESS_STEP = 3;
const FORM_STEP = 4;
const SENT_STEP = 7;
const LEAD_STEP = 8;
const COUNT_STEP = 9;

const FIELDS = [
  { placeholder: "Your name", value: "Emily Carter", step: 5 },
  { placeholder: "Phone number", value: "(281) 555-0142", step: 6 },
];

export default function AdsStory({ progress }: StoryProps) {
  const step = useStorySteps(STEP_TIMES, progress);
  const pressed = step === PRESS_STEP;
  const formOpen = step >= FORM_STEP;
  const sent = step >= SENT_STEP;
  const leadIn = step >= LEAD_STEP;
  const counted = step >= COUNT_STEP;
  const leads = useCountUp(11, 12, counted, 300);

  return (
    <StoryStage
      width={400}
      height={320}
      label="Example with sample data: someone taps an Acme Roofing ad and requests a quote, and the lead shows up in the CRM a moment later"
    >
      {/* The ad, about to be tapped */}
      <div className={cn("absolute left-4 top-4 w-[224px] rounded-xl border border-border bg-card p-3", cardReveal(step >= AD_STEP))}>
        <p className="text-[10px] text-muted-foreground">Sponsored · Acme Roofing</p>
        <div className="mt-2 flex h-11 items-center justify-center rounded-lg bg-muted">
          <House className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="mt-2.5 text-[13px] font-semibold leading-snug text-foreground">Free roof inspection this week</p>
        <div className="relative mt-2.5">
          <span
            className={cn(
              "inline-flex h-7 items-center rounded-lg border border-accent-cyan/50 px-3 text-[11px] font-semibold text-accent-cyan transition-[transform,background-color] duration-150 motion-reduce:transition-none",
              pressed ? "scale-95 bg-accent-cyan/25" : "bg-accent-cyan/10",
            )}
          >
            Get my free quote
          </span>
          <MousePointer2
            className="absolute left-[92px] top-3.5 h-4 w-4 fill-foreground text-background transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{ transform: step >= CURSOR_STEP ? (pressed ? "scale(0.85)" : "none") : "translate(72px, -64px)" }}
          />
        </div>
      </div>

      {/* The quote form the ad opens, filling in and sending */}
      <div
        className={cn(
          "absolute bottom-4 left-4 w-[224px] rounded-xl border border-border bg-card p-3 transition-[opacity,transform] duration-500 motion-reduce:transition-none",
          formOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-foreground">Quote request</p>
          <span className={cn("flex items-center gap-1 text-[10px] font-medium text-accent-cyan transition-opacity duration-300 motion-reduce:transition-none", sent ? "opacity-100" : "opacity-0")}>
            <Check className="h-3 w-3" strokeWidth={3} />
            Sent
          </span>
        </div>
        <div className="mt-2 space-y-1.5">
          {FIELDS.map((field) => {
            const filled = step >= field.step;
            return (
              <p key={field.value} className="relative rounded-md border border-border bg-background px-2 py-1.5 text-[11px]">
                <span className={cn("absolute inset-y-1.5 left-2 text-muted-foreground transition-opacity duration-200 motion-reduce:transition-none", filled && "opacity-0")}>
                  {field.placeholder}
                </span>
                {/* Revealed left to right, as if typed */}
                <span
                  className={cn(
                    "block text-foreground transition-[clip-path] duration-500 ease-linear motion-reduce:transition-none",
                    filled ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_100%_0_0)]",
                  )}
                >
                  {field.value}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      {/* The lead arriving in the CRM */}
      <div
        className={cn(
          "absolute left-[252px] top-4 w-[132px] rounded-xl border border-accent-cyan/40 bg-card p-3 transition-[opacity,transform] duration-500 ease-pop motion-reduce:transition-none",
          leadIn ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
        )}
      >
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
          <span className="h-2 w-2 rounded-full bg-accent-cyan" />
          New lead
        </p>
        <p className="mt-2 text-[13px] font-semibold text-foreground">Emily Carter</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">Free roof inspection</p>
        <p className="mt-2 border-t border-border pt-2 text-[10px] text-muted-foreground">Meta Ads · Just now</p>
      </div>

      <div className={cn("absolute bottom-4 left-[252px] w-[132px] rounded-xl border border-border bg-card p-3", cardReveal(step >= LEAD_STEP))}>
        <p className="text-[11px] text-muted-foreground">Leads this week</p>
        <p className="mt-1.5 text-[28px] font-semibold leading-none tabular-nums text-foreground">{leads}</p>
        <p className={cn("mt-1 text-[10px] text-accent-cyan transition-opacity duration-300 motion-reduce:transition-none", counted ? "opacity-100" : "opacity-0")}>+1 just now</p>
      </div>
    </StoryStage>
  );
}
