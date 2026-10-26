"use client";

import { useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CalendarCheck, Code, Headphones, MapPin, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { createStoryProgress, type StoryProgress, type StoryProps } from "./service-stories/hooks";
import MapsStory from "./service-stories/MapsStory";
import AnsweringStory from "./service-stories/AnsweringStory";
import AdsStory from "./service-stories/AdsStory";
import WebsiteStory from "./service-stories/WebsiteStory";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ServiceModule = {
  id: string;
  /** What the customer does at this stop of the journey */
  step: string;
  name: string;
  /** Same icon as the service has in the navbar */
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tags: string[];
  link: { label: string; href: string };
  /** What the story shows, in a few words */
  example: string;
  Story: ComponentType<StoryProps>;
};

// In the order a customer meets them, from the search to the call, so the journey ends on the booked job
const MODULES: ServiceModule[] = [
  {
    id: "maps",
    step: "Someone searches “roofer near me”",
    name: "Google Maps",
    icon: MapPin,
    title: "Get found on Google Maps",
    description: "The top three Maps results get the calls. We tune your Google Business Profile, keep it active and grow your reviews to move you into them.",
    tags: ["Map pack", "Reviews", "Local SEO"],
    link: { label: "Explore Google Maps growth", href: "/services/gmb" },
    example: "A roofer's Maps listing",
    Story: MapsStory,
  },
  {
    id: "ads",
    step: "They tap your ad",
    name: "Google & Meta ads",
    icon: MousePointerClick,
    title: "Turn ad clicks into booked jobs",
    description: "We run your Google and Meta ads, build the landing pages they point to and send every lead to your CRM the moment it comes in.",
    tags: ["Google Ads", "Meta Ads", "Landing pages"],
    link: { label: "Explore ad management", href: "/services/ppc" },
    example: "A lead from a Meta ad",
    Story: AdsStory,
  },
  {
    id: "websites",
    step: "They check out your website",
    name: "Websites",
    icon: Code,
    title: "Websites that turn visits into calls",
    description: "Fast, mobile-first sites built with Next.js, set up for search from day one and designed to get visitors to call.",
    tags: ["Next.js", "Mobile-first", "SEO-ready"],
    link: { label: "Explore web development", href: "/services/web-development" },
    example: "A roofer's new website",
    Story: WebsiteStory,
  },
  {
    id: "answering",
    step: "They call, even after hours",
    name: "Answering & booking",
    icon: Headphones,
    title: "Give callers a team that knows your business",
    description: "Our team learns your services, answers questions and books appointments, with AI backup supporting coverage outside normal working hours.",
    tags: ["Human-led", "AI backup", "Booking"],
    link: { label: "Explore answering services", href: "/services/answering" },
    example: "An after-hours call",
    Story: AnsweringStory,
  },
];

// Where each stop holds still while its story plays: wide and tall enough screens. Elsewhere the stops scroll by.
const HOLDING_SCREENS = "(min-width: 1024px) and (min-height: 640px)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
// Room kept above a held stop for the fixed navbar, in px
const NAV_CLEARANCE = 88;
// A held stop's service fades in once its dot rises above this share of the screen height
const REVEAL = 0.75;
// Scrolling stops: the tip of the line rides this far down the screen
const TIP = 0.6;
// Scrolling stops: a story plays out while the tip travels this share of the way to the next dot
const STORY_SPAN = 0.72;
// How far the line may swing out either side of the dots, in px
const MAX_SWING = 120;
const MIN_SWING = 6;

// Desktop: service, then the line's lane, then the story. Phones: the line down the left edge, everything else beside it.
const STOP_GRID = "grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 lg:grid-cols-[minmax(0,1fr)_10rem_minmax(0,1.1fr)] lg:gap-x-0";

type Point = { x: number; y: number };
type Curve = [Point, Point, Point, Point];
type Box = { left: number; right: number; top: number; bottom: number };

/** The line as drawn, plus points along it in order of height, for working out where the scroll has taken its tip */
type Route = {
  d: string;
  xs: number[];
  ys: number[];
  lengths: number[];
  /** Height of each dot's centre */
  dots: number[];
  /** Height of the point where the line swings back beside each stop's story, between one dot and the next */
  swings: number[];
};

/** Which content shows: services faded in, and dots the line has reached. Null shows everything. */
type Shown = { revealed: number; reached: number } | null;

type Parts = {
  wrapper: HTMLDivElement;
  stage: HTMLDivElement;
  journey: HTMLDivElement;
  track: SVGPathElement;
  line: SVGPathElement;
  tip: SVGCircleElement;
  progress: ReturnType<typeof createStoryProgress>[];
  show: (shown: Shown) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * clamp(amount, 0, 1);

/** A curve that leaves `from` heading straight down and arrives at `to` heading straight down */
function dropBetween(from: Point, to: Point): Curve {
  const handle = (to.y - from.y) / 2;
  return [from, { x: from.x, y: from.y + handle }, { x: to.x, y: to.y - handle }, to];
}

/** How far the line can swing left and right beside one stop without running into its text or its story */
function swingRoom(stop: Element | undefined, x: number, local: (element: Element) => Box) {
  // On phones nothing sits left of the line, so it may drift into the container's side padding
  let leftEdge = -12;
  let rightEdge = Infinity;
  stop?.querySelectorAll("[data-journey-content]").forEach((element) => {
    const box = local(element);
    if (box.right <= x) leftEdge = Math.max(leftEdge, box.right);
    else if (box.left >= x) rightEdge = Math.min(rightEdge, box.left);
  });
  return { left: clamp(x - leftEdge - 16, MIN_SWING, MAX_SWING), right: clamp(rightEdge - x - 16, MIN_SWING, MAX_SWING) };
}

/**
 * Measures the journey and lays a winding line through its dots: it drops in from under the section header, and
 * between two dots it swings out left beside the service, back across beside the story and down into the next dot.
 */
function buildRoute(journey: HTMLElement): Route | null {
  const frame = journey.getBoundingClientRect();
  const local = (element: Element): Box => {
    const box = element.getBoundingClientRect();
    return { left: box.left - frame.left, right: box.right - frame.left, top: box.top - frame.top, bottom: box.bottom - frame.top };
  };
  const dots = Array.from(journey.querySelectorAll("[data-journey-dot]"), (dot) => {
    const box = local(dot);
    return { x: (box.left + box.right) / 2, y: (box.top + box.bottom) / 2 };
  });
  if (dots.length < 2) return null;
  const stops = Array.from(journey.querySelectorAll("[data-journey-stop]"));

  const start = { x: frame.width / 2, y: -40 };
  const curves: Curve[] = [dropBetween(start, dots[0])];
  const swings: number[] = [];
  dots.slice(1).forEach((to, index) => {
    const from = dots[index];
    const room = swingRoom(stops[index], from.x, local);
    const height = to.y - from.y;
    const left = { x: Math.min(from.x, to.x) - room.left, y: from.y + height * 0.3 };
    const right = { x: Math.max(from.x, to.x) + room.right, y: from.y + height * 0.72 };
    swings.push(right.y);
    curves.push(dropBetween(from, left), dropBetween(left, right), dropBetween(right, to));
  });

  // Sample the curves every few pixels; every curve heads downward, so the samples come out in order of height
  const xs: number[] = [];
  const ys: number[] = [];
  const lengths: number[] = [];
  let length = 0;
  curves.forEach(([p0, c1, c2, p3], index) => {
    const steps = Math.max(12, Math.ceil((Math.abs(p3.x - p0.x) + (p3.y - p0.y)) / 4));
    for (let i = index === 0 ? 0 : 1; i <= steps; i++) {
      const t = i / steps;
      const u = 1 - t;
      const x = u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p3.x;
      const y = u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p3.y;
      if (xs.length) length += Math.hypot(x - xs[xs.length - 1], y - ys[ys.length - 1]);
      xs.push(x);
      ys.push(y);
      lengths.push(length);
    }
  });

  const round = (value: number) => Math.round(value * 10) / 10;
  const d = [`M ${round(start.x)} ${round(start.y)}`, ...curves.map(([, c1, c2, p3]) => `C ${[c1, c2, p3].map((p) => `${round(p.x)} ${round(p.y)}`).join(" ")}`)].join(" ");
  return { d, xs, ys, lengths, dots: dots.map((dot) => dot.y), swings };
}

/** Finds the first sample whose value in `values` (sorted ascending) passes `target`, and how far between samples it falls */
function locate(values: number[], target: number) {
  let low = 0;
  let high = values.length - 1;
  while (high - low > 1) {
    const middle = (low + high) >> 1;
    if (values[middle] <= target) low = middle;
    else high = middle;
  }
  return { low, high, t: clamp((target - values[low]) / (values[high] - values[low] || 1), 0, 1) };
}

/** How much of the line lies above height `y` */
function lengthAtHeight({ ys, lengths }: Route, y: number) {
  const { low, high, t } = locate(ys, y);
  return lerp(lengths[low], lengths[high], t);
}

/** Draws the line down to `length` along the route and puts the tip dot there */
function paintLine({ line, tip }: Parts, route: Route, length: number) {
  const total = route.lengths[route.lengths.length - 1];
  const drawn = clamp(length / total, 0, 1);
  const { low, high, t } = locate(route.lengths, length);
  line.style.strokeDashoffset = String(1 - drawn);
  line.style.opacity = drawn > 0 ? "1" : "0";
  tip.style.opacity = drawn > 0 && drawn < 1 ? "1" : "0";
  tip.setAttribute("transform", `translate(${lerp(route.xs[low], route.xs[high], t)} ${lerp(route.ys[low], route.ys[high], t)})`);
}

function drawRoute({ journey, track, line }: Parts) {
  const route = buildRoute(journey);
  track.setAttribute("d", route?.d ?? "");
  line.setAttribute("d", route?.d ?? "");
  return route;
}

/** Sets a px style only when it changes, so resize observers settle instead of looping */
function setPx(element: HTMLElement, property: "height" | "paddingTop" | "paddingBottom", value: number) {
  const px = `${Math.round(value)}px`;
  if (element.style[property] !== px) element.style[property] = px;
}

// Without motion: the whole line, every service and every story's last frame, all at once
function showEverything(parts: Parts) {
  const draw = () => drawRoute(parts);
  draw();
  parts.line.style.strokeDashoffset = "0";
  parts.line.style.opacity = "1";
  parts.show(null);
  parts.progress.forEach((store) => store.set(1));
  const observer = new ResizeObserver(draw);
  observer.observe(parts.journey);
  return () => observer.disconnect();
}

// Phones and short screens: the stops scroll by while the line's tip rides 60% down the screen, revealing each
// service as it passes and playing its story on the way to the next dot
function setUpScrollingStops(parts: Parts) {
  const { journey, progress } = parts;
  let route: Route | null = null;

  const update = () => {
    if (!route) return;
    const { dots } = route;
    const tipY = window.innerHeight * TIP - journey.getBoundingClientRect().top;
    paintLine(parts, route, lengthAtHeight(route, tipY));
    const passed = dots.filter((y) => y <= tipY).length;
    parts.show({ revealed: passed, reached: passed });
    progress.forEach((store, index) => {
      const from = dots[index];
      store.set(clamp((tipY - from) / (STORY_SPAN * (dots[index + 1] - from)), 0, 1));
    });
  };
  const relayout = () => {
    route = drawRoute(parts);
    update();
  };

  relayout();
  ScrollTrigger.create({ trigger: journey, start: "top bottom", end: "bottom top", onUpdate: update });
  // Story sizes follow the column width, so the route is re-laid whenever the journey changes size
  const observer = new ResizeObserver(relayout);
  observer.observe(journey);
  return () => observer.disconnect();
}

/**
 * Desktop: each stop slides up and holds in the middle of the screen while scrolling plays its story, then the
 * journey moves on to the next one. The stops sit on a sticky stage and slide by transform, with an extra hold's worth
 * of scrolling added per stop, so the winding line stays joined up from start to finish.
 */
function setUpHeldStops(parts: Parts) {
  const { wrapper, stage, journey, progress } = parts;
  const stopCount = progress.length;
  let route: Route | null = null;
  let hold = 0;
  let maxShift = 0;

  const layout = () => {
    const stageHeight = window.innerHeight - NAV_CLEARANCE;
    hold = clamp(window.innerHeight * 0.8, 560, 760);
    // Centre a held stop in the space under the navbar
    const stopHeight = Math.max(...Array.from(journey.querySelectorAll<HTMLElement>("[data-journey-stop]"), (stop) => stop.offsetHeight));
    setPx(journey, "paddingTop", Math.max(64, (stageHeight - stopHeight) / 2));
    route = drawRoute(parts);
    if (!route) return;
    const { dots } = route;
    // Leave room below the last stop for it to slide all the way up into the held position
    const natural = journey.offsetHeight - (parseFloat(journey.style.paddingBottom) || 0);
    setPx(journey, "paddingBottom", Math.max(0, dots[stopCount - 1] - dots[0] + stageHeight - natural));
    maxShift = journey.offsetHeight - stageHeight;
    setPx(wrapper, "height", journey.offsetHeight + hold * stopCount);
    Object.assign(stage.style, { position: "sticky", top: `${NAV_CLEARANCE}px`, height: `${stageHeight}px` });
  };

  const update = () => {
    if (!route) return;
    const { dots, swings } = route;
    // Scrolling since the stage stuck under the navbar: negative while the journey is still on its way up
    const scrolled = NAV_CLEARANCE - wrapper.getBoundingClientRect().top;
    let holding = -1;
    let held = 0;
    let done = 0;
    if (scrolled >= 0) {
      for (let index = 0; index < stopCount; index++) {
        const start = dots[index] - dots[0] + index * hold;
        if (scrolled < start) break;
        if (scrolled <= start + hold) {
          holding = index;
          held = (scrolled - start) / hold;
          break;
        }
        done = index + 1;
      }
    }

    // The point of the journey level with the held position, and how far the stops have slid up to get it there
    const level = holding >= 0 ? dots[holding] : dots[0] + scrolled - done * hold;
    const shift = scrolled < 0 ? 0 : Math.min(maxShift, level - dots[0]);
    journey.style.transform = `translate3d(0, ${-shift}px, 0)`;

    // While a stop holds, its stretch of line fills in as the story's progress bar; between stops it carries on
    // down to the next dot, arriving as that stop settles into place
    let length = lengthAtHeight(route, level);
    if (holding >= 0) length = lerp(lengthAtHeight(route, dots[holding]), lengthAtHeight(route, swings[holding]), held);
    else if (done > 0 && level < dots[done]) {
      const from = dots[done - 1];
      length = lerp(lengthAtHeight(route, swings[done - 1]), lengthAtHeight(route, dots[done]), (level - from) / (dots[done] - from));
    }
    paintLine(parts, route, length);

    const journeyTop = stage.getBoundingClientRect().top - shift;
    parts.show({
      revealed: dots.filter((y) => journeyTop + y <= window.innerHeight * REVEAL).length,
      reached: dots.filter((y) => y <= level).length,
    });
    progress.forEach((store, index) => store.set(index < done ? 1 : index === holding ? held : 0));
  };

  const relayout = () => {
    layout();
    update();
  };

  relayout();
  const trigger = ScrollTrigger.create({ trigger: wrapper, start: "top bottom", end: "bottom top", onUpdate: update });
  const observer = new ResizeObserver(() => {
    relayout();
    trigger.refresh();
  });
  observer.observe(journey);
  window.addEventListener("resize", relayout);

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", relayout);
    journey.style.paddingTop = "";
    journey.style.paddingBottom = "";
    journey.style.transform = "";
    wrapper.style.height = "";
    stage.style.position = "";
    stage.style.top = "";
    stage.style.height = "";
  };
}

/** Classes for content that rises into place once the line reaches it */
function revealed(shown: boolean) {
  return cn("transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none", shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0");
}

type JourneyStopProps = { service: ServiceModule; number: number; revealed: boolean; reached: boolean; progress: StoryProgress };

// One stop: its dot on the line, the customer's step beside it, then what we do about it and the story of it working
function JourneyStop({ service, number, revealed: shown, reached, progress }: JourneyStopProps) {
  const { icon: Icon, Story } = service;

  return (
    <li data-journey-stop className={STOP_GRID}>
      <span
        data-journey-dot
        aria-hidden="true"
        className={cn(
          "relative col-start-1 row-start-1 mt-1 h-3 w-3 justify-self-center rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none lg:col-start-2",
          reached ? "border-accent-cyan bg-accent-cyan" : "border-border bg-background",
        )}
      />

      <p data-journey-content className={cn("col-start-2 row-start-1 flex items-baseline gap-3 text-sm lg:col-start-3", revealed(shown))}>
        <span className="font-semibold tabular-nums text-accent-cyan">{String(number).padStart(2, "0")}</span>
        <span className="text-foreground">{service.step}</span>
      </p>

      <div
        data-journey-content
        className={cn("col-start-2 row-start-2 mt-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-md", revealed(shown))}
        style={{ transitionDelay: shown ? "120ms" : "0ms" }}
      >
        <span className="flex items-center gap-3 text-sm font-medium text-foreground">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card">
            <Icon className="h-5 w-5 text-accent-cyan" />
          </span>
          {service.name}
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">{service.title}</h3>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{service.description}</p>
        <ul aria-label={`${service.name} includes`} className="mt-5 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>
        <Link
          href={service.link.href}
          className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-foreground transition-colors hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          {service.link.label}
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </Link>
      </div>

      {/* The story's cards float free and appear one by one as the scroll plays it */}
      <figure data-journey-content className="col-start-2 row-start-3 mt-8 max-w-lg lg:col-start-3 lg:row-start-2 lg:mt-6">
        <Story progress={progress} />
        <figcaption className={cn("mt-3 text-xs text-muted-foreground", revealed(shown))}>Sample data · {service.example}</figcaption>
      </figure>
    </li>
  );
}

// The four services as the path a customer takes, told by the scroll: a winding line draws itself down the section
// and each service appears as the line reaches it. On desktop each stop then holds still while scrolling plays its
// story; on phones the stops scroll by and the stories play on the way. Scrolling back up rewinds it all.
// GSAP ScrollTrigger drives it, in step with the site's smooth scrolling.
export default function ServicesShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const [progress] = useState(() => MODULES.map(() => createStoryProgress()));
  // Until the scroll code is set up everything shows, so no content waits on scripts
  const [shown, setShown] = useState<Shown>(null);
  const isRevealed = (index: number) => shown === null || shown.revealed > index;
  const isReached = (index: number) => shown === null || shown.reached > index;

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const stage = stageRef.current;
      const journey = journeyRef.current;
      const track = trackRef.current;
      const line = lineRef.current;
      const tip = tipRef.current;
      if (!wrapper || !stage || !journey || !track || !line || !tip) return;

      const parts: Parts = {
        wrapper,
        stage,
        journey,
        track,
        line,
        tip,
        progress,
        show: (next) =>
          setShown((current) => (current && next && current.revealed === next.revealed && current.reached === next.reached ? current : next)),
      };

      // Re-runs, after undoing the previous set-up, whenever the screen crosses one of these conditions. matchMedia only
      // runs it while at least one condition matches, so "all" keeps it running on phones too.
      const media = gsap.matchMedia();
      media.add({ holding: HOLDING_SCREENS, reduced: REDUCED_MOTION, always: "all" }, (context) => {
        if (context.conditions?.reduced) return showEverything(parts);
        return context.conditions?.holding ? setUpHeldStops(parts) : setUpScrollingStops(parts);
      });
      return () => media.revert();
    },
    { dependencies: [progress], scope: wrapperRef },
  );

  return (
    <section aria-labelledby="services-showcase-heading" className="bg-background py-20 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          className="mb-12 md:mb-16"
          id="services-showcase-heading"
          eyebrow="What we do"
          title="From first search to booked job"
          description="Four modules, one team: we run your Google Maps listing, your ads, your website and your phone line, so more local searches turn into booked jobs."
        />

        {/* On desktop the wrapper adds the scrolling the held stops need, and the stage sticks under the navbar */}
        <div ref={wrapperRef}>
          <div ref={stageRef}>
            <div ref={journeyRef} className="relative pt-16">
              {/* The route: a faint dashed preview of the way ahead, the line drawn so far, and a dot at its tip */}
              <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <path ref={trackRef} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeDasharray="2 8" className="text-border" />
                <path
                  ref={lineRef}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  className="text-accent-cyan"
                />
                <circle ref={tipRef} r={5} fill="currentColor" opacity={0} className="text-accent-cyan" style={{ stroke: "hsl(var(--background))", strokeWidth: 3 }} />
              </svg>

              <ol className="relative space-y-16 lg:space-y-24">
                {MODULES.map((service, index) => (
                  <JourneyStop
                    key={service.id}
                    service={service}
                    number={index + 1}
                    revealed={isRevealed(index)}
                    reached={isReached(index)}
                    progress={progress[index]}
                  />
                ))}
              </ol>

              <div className={cn("relative mt-16 items-center lg:mt-24", STOP_GRID)}>
                <span
                  data-journey-dot
                  aria-hidden="true"
                  className={cn(
                    "col-start-1 flex h-6 w-6 items-center justify-center justify-self-center rounded-full border-2 bg-background transition-colors duration-300 motion-reduce:transition-none lg:col-start-2",
                    isReached(MODULES.length) ? "border-accent-cyan text-accent-cyan" : "border-border text-muted-foreground",
                  )}
                >
                  <CalendarCheck className="h-3.5 w-3.5" />
                </span>
                <p className={cn("col-start-2 text-lg font-semibold text-foreground lg:col-start-3", revealed(isRevealed(MODULES.length)))}>Booked job</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
