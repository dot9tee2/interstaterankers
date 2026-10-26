"use client";

import { CalendarCheck, Check, Headphones, PhoneIncoming } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardReveal, useStorySteps, type StoryProps } from "./hooks";
import { StoryStage } from "./StoryStage";

// The story: an after-hours call rings, the AI picks up, the conversation comes in line by line,
// then the caller is qualified and the job is booked.
// Places along the scroll, in milliseconds of a notional run: the call comes in, the AI answers, four messages,
// qualified, booked.
const STEP_TIMES = [100, 800, 1200, 1900, 2600, 3200, 3800, 4500];
const CALL_STEP = 1;
const ANSWERED_STEP = 2;
const FIRST_MESSAGE_STEP = 3;
const QUALIFIED_STEP = 7;
const BOOKED_STEP = 8;

const MESSAGES = [
  { from: "ai", text: "Acme Roofing, how can I help?" },
  { from: "caller", text: "My roof started leaking after the storm." },
  { from: "ai", text: "Can someone come by Tuesday at 10 AM?" },
  { from: "caller", text: "Yes, please book it." },
];

const TAGS = ["Roof leak", "This week", "Homeowner"];

export default function AnsweringStory({ progress }: StoryProps) {
  const step = useStorySteps(STEP_TIMES, progress);
  const ringing = step >= CALL_STEP && step < ANSWERED_STEP;
  const answered = step >= ANSWERED_STEP;
  const qualified = step >= QUALIFIED_STEP;
  const booked = step >= BOOKED_STEP;

  return (
    <StoryStage
      width={400}
      height={320}
      label="Example with sample data: an AI receptionist answers an after-hours call for Acme Roofing, qualifies the caller and books a roof inspection"
    >
      {/* The call, with its transcript */}
      <div className={cn("absolute left-4 top-4 h-[288px] w-[224px] rounded-xl border border-border bg-card p-3", cardReveal(step >= CALL_STEP))}>
        <div className="flex items-center gap-2.5 border-b border-border pb-3">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            {ringing && <span className="absolute inset-0 animate-ping rounded-full bg-accent-cyan/30" />}
            {answered ? <Headphones className="h-4 w-4 text-accent-cyan" /> : <PhoneIncoming className="h-4 w-4 text-accent-cyan" />}
          </span>
          <div>
            <p className="text-[13px] font-semibold leading-tight text-foreground">{answered ? "AI receptionist" : "Incoming call"}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className={cn("h-1.5 w-1.5 rounded-full", answered ? "bg-accent-cyan" : "bg-accent-amber")} />
              {answered ? "Answered at 9:42 PM" : "Ringing at 9:42 PM"}
            </p>
          </div>
        </div>
        {/* Hidden messages keep their space, so the conversation never shifts as it fills in */}
        <div className="mt-3 flex flex-col gap-2">
          {MESSAGES.map((message, index) => (
            <p
              key={message.text}
              className={cn(
                "max-w-[180px] rounded-2xl px-3 py-2 text-[11px] leading-snug text-foreground transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                message.from === "ai" ? "self-start rounded-tl-sm bg-muted" : "self-end rounded-tr-sm bg-accent-cyan/15",
                step >= FIRST_MESSAGE_STEP + index ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              {message.text}
            </p>
          ))}
        </div>
      </div>

      {/* What the AI learned about the caller */}
      <div
        className={cn(
          "absolute left-[252px] top-4 w-[132px] rounded-xl border border-border bg-card p-3 transition-[opacity,transform] duration-500 motion-reduce:transition-none",
          qualified ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-cyan text-background">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          Lead qualified
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {TAGS.map((tag, index) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                qualified ? "scale-100 opacity-100" : "scale-90 opacity-0",
              )}
              style={{ transitionDelay: qualified ? `${200 + index * 120}ms` : "0ms" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* The payoff: a booked job */}
      <div
        className={cn(
          "absolute bottom-4 left-[252px] w-[132px] rounded-xl border border-accent-cyan/40 bg-card p-3 transition-[opacity,transform] duration-500 ease-pop motion-reduce:transition-none",
          booked ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
        )}
      >
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <CalendarCheck className="h-3.5 w-3.5 text-accent-cyan" />
          Booked
        </p>
        <p className="mt-2 text-[15px] font-semibold leading-tight text-foreground">Tue, 10:00 AM</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Roof inspection</p>
        <p className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">Added to calendar</p>
      </div>
    </StoryStage>
  );
}
