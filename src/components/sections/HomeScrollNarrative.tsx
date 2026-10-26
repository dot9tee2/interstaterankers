"use client";
import { useEffect, useRef, useState } from "react";
import { Compass, Hammer, Rocket, GaugeCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

type PlaybookStep = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const STEPS: PlaybookStep[] = [
  {
    id: "discover",
    title: "Discover",
    description: "We audit your current funnel, calls, and traffic to pinpoint the biggest levers for growth.",
    bullets: ["Inbound journey mapping", "Call quality review", "SEO & page diagnostics", "KPI baseline"],
    icon: Compass
  },
  {
    id: "build",
    title: "Build",
    description: "We craft the scripts, pages, and measurement plan that turn attention into appointments.",
    bullets: ["Answering scripts", "GMB profile plan", "Analytics events", "Routing & automations"],
    icon: Hammer
  },
  {
    id: "launch",
    title: "Launch",
    description: "We ship fast, validate with real users, and iterate based on signal—not hunch.",
    bullets: ["Go‑live checklist", "A/B experiments", "QA & compliance", "Rapid feedback loops"],
    icon: Rocket
  },
  {
    id: "optimize",
    title: "Optimize",
    description: "We scale what works and trim what doesn’t with weekly insights and action items.",
    bullets: ["Weekly reporting", "Conversion insights", "Ranking growth", "Roadmap updates"],
    icon: GaugeCircle
  }
];

const HomeScrollNarrative = () => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState<string>(STEPS[0].id);
  const [progressById, setProgressById] = useState<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const vh = window.innerHeight;
        const updates: Record<string, number> = {};
        for (const entry of entries) {
          const id = entry.target.getAttribute("id");
          if (!id) continue;
          const rect = entry.target.getBoundingClientRect();
          const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
          const ratio = Math.max(0, Math.min(1, visible / Math.min(vh, rect.height || vh)));
          updates[id] = ratio;
        }
        if (Object.keys(updates).length) {
          setProgressById((prev) => ({ ...prev, ...updates }));
          // Most visible of the sections that just changed; React skips the update when it's already active
          const best = Object.entries(updates).sort((a, b) => b[1] - a[1])[0];
          if (best) setActiveId(best[0]);
        }
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );
    STEPS.forEach((s) => {
      const node = sectionRefs.current[s.id];
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const handleJump = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          className="mb-12 md:mb-16"
          eyebrow="How it works"
          title="Our growth playbook"
          description="A simple, repeatable system that compounds results—designed to move fast and measure what matters."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left sticky nav (desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                <h3 className="text-2xl font-body font-bold">Playbook</h3>
                <p className="mt-1 text-sm text-muted-foreground">Follow the steps as the story scrolls on the right.</p>
              </div>
              <nav className="p-2 rounded-2xl bg-card border border-border shadow-sm divide-y divide-border">
                {STEPS.map((s) => {
                  const isActive = s.id === activeId;
                  const pct = Math.round((progressById[s.id] || 0) * 100);
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleJump(s.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`w-full text-left py-4 px-4 flex items-center justify-between gap-4 transition-colors ${isActive ? "text-accent-cyan" : "text-foreground hover:text-accent-cyan"}`}
                    >
                      <span className="flex items-center gap-3">
                        <s.icon className="w-4 h-4 opacity-80" />
                        <span className="font-medium">{s.title}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">{pct}%</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile top pills */}
          <div className="lg:hidden -mx-4 md:-mx-6">
            <div className="px-4 md:px-6 pb-4 sticky top-16 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {STEPS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleJump(s.id)}
                    className={`shrink-0 px-4 py-2 rounded-full border text-sm transition-colors ${activeId === s.id ? "border-accent-cyan text-accent-cyan bg-accent-cyan/10" : "border-border text-foreground"}`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right scrollytelling content: the wider desktop spacing gives the sticky nav room to track each step */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-16">
            {STEPS.map((s) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => { sectionRefs.current[s.id] = el; }}
                className="scroll-mt-24 p-6 rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Neutral icon tile: violet fills are kept for the main call-to-action button */}
                  <div className="w-12 h-12 shrink-0 rounded-xl border border-border bg-background flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="text-xl font-body font-semibold">{s.title}</h4>
                    <p className="text-muted-foreground mt-1">{s.description}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      <span className="text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeScrollNarrative;


