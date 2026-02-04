"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Headphones, Phone, LayoutGrid, Search, Share2, Globe, Code, Smartphone, Palette, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ServiceSection = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>
  bullets: string[];
};

const SERVICES: (ServiceSection & { href?: string })[] = [
  {
    id: "seo",
    title: "Search Engine Optimization",
    description: "Technical, on-page, and local SEO to rank and win the demand you deserve.",
    icon: Search,
    href: "/services/seo",
    bullets: [
      "Technical audits",
      "Content & on-page",
      "Local SEO",
      "Reporting & insights"
    ]
  },
  {
    id: "gmb",
    title: "Google My Business Optimization",
    description: "Optimize and manage your Google Business Profile to dominate local search and maps.",
    icon: LayoutGrid,
    href: "/services/gmb",
    bullets: [
      "Profile setup & optimization",
      "Category & services tuning",
      "Posts & updates",
      "Review strategy & replies"
    ]
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Fast, modern websites engineered for SEO and conversion from day one.",
    icon: Code,
    bullets: [
      "Next.js/React builds",
      "Performance optimization",
      "Accessibility & SEO",
      "Analytics instrumentation"
    ]
  },
  {
    id: "answering",
    title: "Answering Services",
    description: "24/7 professional coverage so you never miss a lead. AI-assisted routing and real-time reporting.",
    icon: Headphones,
    bullets: [
      "Live call answering and intake",
      "Lead qualification and tagging",
      "Appointment scheduling",
      "Call analytics dashboard"
    ]
  },
  {
    id: "calling",
    title: "Outbound Calling",
    description: "Proactive outreach to nurture and convert. Scripts, compliance, and performance tracking built-in.",
    icon: Phone,
    bullets: [
      "Warm lead follow-ups",
      "Reactivation campaigns",
      "Appointment setting",
      "QA and compliance"
    ]
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    description: "Plan, produce, and distribute content that attracts, educates, and converts.",
    icon: Share2,
    bullets: [
      "Editorial strategy",
      "Blogs & guides",
      "Case studies",
      "Content distribution"
    ]
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    description: "Grow brand reach and engagement across social platforms with data-driven campaigns.",
    icon: Globe,
    bullets: [
      "Channel strategy",
      "Content calendars",
      "Community management",
      "Paid social boosts"
    ]
  },
  {
    id: "ppc-management",
    title: "PPC Management",
    description: "High-intent paid traffic and conversion optimization for reliable ROI.",
    icon: DollarSign,
    bullets: [
      "Account audits",
      "Keyword & audience strategy",
      "Ad creation & testing",
      "Landing & conversion tracking"
    ]
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    description: "Brand-first visuals that elevate trust and drive clarity.",
    icon: Palette,
    bullets: [
      "Brand identity",
      "Marketing collateral",
      "Social graphics",
      "Presentation design"
    ]
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Cross-platform apps that scale with your business and users.",
    icon: Smartphone,
    bullets: [
      "iOS & Android",
      "API integrations",
      "Scalable architecture",
      "App analytics"
    ]
  }
];

const ServicesScrollShowcase = () => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const [progressById, setProgressById] = useState<Record<string, number>>({});
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  const openService = (id: string) => {
    setOpenServiceId(id);
    if (typeof window !== "undefined") {
      const url = `${window.location.pathname}#${id}`;
      window.history.pushState(null, "", url);
    }
  };
  const closeService = () => {
    setOpenServiceId(null);
    if (typeof window !== "undefined") {
      const url = `${window.location.pathname}`;
      window.history.pushState(null, "", url);
    }
  };
  const selectedService = useMemo(() => SERVICES.find(s => s.id === openServiceId) || null, [openServiceId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const viewportH = window.innerHeight;
        const updates: Record<string, number> = {};
        let currentActive = activeId;
        for (const entry of entries) {
          const id = entry.target.getAttribute("id");
          if (!id) continue;
          const rect = entry.target.getBoundingClientRect();
          const visiblePx = Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0);
          const clamped = Math.max(0, Math.min(1, visiblePx / Math.min(viewportH, rect.height || viewportH)));
          updates[id] = clamped;
        }
        if (Object.keys(updates).length) {
          setProgressById((prev) => ({ ...prev, ...updates }));
          // Active is the most visible section
          const best = Object.entries({ ...progressById, ...updates }).sort((a, b) => b[1] - a[1])[0];
          if (best && best[0] !== currentActive) {
            currentActive = best[0];
            setActiveId(best[0]);
          }
        }
      },
      { root: null, threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );

    SERVICES.forEach((s) => {
      const node = sectionRefs.current[s.id];
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const node = sectionRefs.current[id];
    if (!node) return;
    const yOffset = 96; // offset for sticky navbar (~24)
    const y = node.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Sync with URL: open modal for /services#id, or scroll only for /services?focus=1#id
  useEffect(() => {
    const ids = new Set(SERVICES.map(s => s.id));
    const syncFromHash = () => {
      const raw = typeof window !== "undefined" ? window.location.hash : "";
      const id = raw ? raw.replace(/^#/, "") : "";
      const search = typeof window !== "undefined" ? window.location.search : "";
      const focus = new URLSearchParams(search).get("focus");
      if (id && ids.has(id)) {
        if (focus === "1") {
          setOpenServiceId(null);
          // Scroll to section with offset after mount
          handleClick(id);
        } else {
          setOpenServiceId(id);
        }
      } else {
        setOpenServiceId(null);
      }
    };
    syncFromHash();
    const onHashChange = () => syncFromHash();
    const onPopState = () => syncFromHash();
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Sticky summary and nav (hidden on small, shown on lg) */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border glow-card">
                  <h3 className="text-2xl font-body font-bold mb-2">Services We Provide</h3>
                  <p className="text-sm text-muted-foreground">Explore our core capabilities. The list highlights the section currently in view.</p>
                </div>

                <nav className="p-2 rounded-2xl bg-card border border-border glow-card divide-y divide-border">
                  {SERVICES.map((s) => {
                    const isActive = activeId === s.id;
                    const progress = Math.round((progressById[s.id] || 0) * 100);
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleClick(s.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={
                          `w-full text-left py-4 px-4 flex items-center justify-between gap-4 transition-colors ` +
                          (isActive ? " text-accent-cyan" : " text-foreground hover:text-accent-cyan")
                        }
                      >
                        <span className="flex items-center gap-3">
                          <s.icon className="w-4 h-4 opacity-80" />
                          <span className="font-medium">{s.title}</span>
                        </span>
                        <span className="text-xs text-muted-foreground">{progress}%</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Mobile top nav */}
            <div className="lg:hidden -mx-4">
              <div className="px-4 pb-4 sticky top-16 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleClick(s.id)}
                      className={`shrink-0 px-4 py-2 rounded-full border text-sm transition-colors ` +
                        (activeId === s.id ? " border-accent-cyan text-accent-cyan bg-accent-cyan/10" : " border-border text-foreground")}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Scrollable sections */}
            <div className="lg:col-span-8 space-y-16">
              {SERVICES.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  ref={(el) => { sectionRefs.current[s.id] = el; }}
                  className="scroll-mt-24 p-6 rounded-2xl bg-card border border-border glow-card group cursor-pointer"
                  onClick={() => openService(s.id)}
                  role="button"
                  aria-label={`Learn more about ${s.title}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-white" />
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

                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-accent-cyan transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Dialog open={!!openServiceId} onOpenChange={(o) => { if (!o) closeService(); }}>
        <DialogContent className="max-w-2xl">
          {selectedService && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                    <selectedService.icon className="w-5 h-5 text-white" />
                  </div>
                  <DialogTitle>{selectedService.title}</DialogTitle>
                </div>
                <DialogDescription>{selectedService.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">What’s included</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border p-4 bg-background/50">
                  <p className="text-sm text-muted-foreground">
                    Want specifics for your use case? Get a tailored proposal and timeline.
                  </p>
                  <a href="/contact" className="inline-block mt-3 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">Get a Proposal</a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesScrollShowcase;


