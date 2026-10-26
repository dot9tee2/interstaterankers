import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChartNoAxesCombined, FileCheck2, LayoutDashboard, MessageSquarePlus, Smartphone } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

// The lead CRM and ISR HQ used to be two back-to-back sections; together they answer one question: what do I get to see once I'm a client?
const features = [
  { icon: Smartphone, title: "Leads in your pocket", text: "Our mobile-first CRM shows every lead from your Google and Meta ads the second it arrives, on iPhone or Android." },
  { icon: ChartNoAxesCombined, title: "See your performance", text: "Reports, service metrics and conversion rates in one place, so you know exactly what you're paying for." },
  { icon: FileCheck2, title: "Follow the work", text: "Review published updates and see what's completed, in progress, and coming next." },
  { icon: MessageSquarePlus, title: "Request website changes", text: "Send your website requests and follow their status without losing the details in an inbox." },
];

// Sample data for the CRM mockup: ad leads for the same fictional business as the ISR HQ screenshot beside it
const sampleLeads = [
  {
    name: "Emily Carter",
    status: "New lead",
    note: "Requested a free roof inspection. Hail damage, needs someone this week.",
    time: "Just now",
    source: "Meta Ads",
    dot: "bg-accent-cyan animate-pulse motion-reduce:animate-none",
    badge: "bg-accent-cyan/10 text-accent-cyan",
    card: "",
  },
  {
    name: "Jason Reed",
    status: "Contacted",
    note: "Called back, inspection set for Tuesday at 10:00 AM.",
    time: "2h ago",
    source: "Google Ads",
    dot: "bg-brand",
    badge: "bg-brand/10 text-brand",
    card: "opacity-90",
  },
  {
    name: "Maria Lopez",
    status: "Follow up",
    note: "Wants a quote for three rental properties.",
    time: "5h ago",
    source: "Google Ads",
    dot: "bg-accent-amber",
    badge: "bg-accent-amber/10 text-accent-amber",
    card: "opacity-75",
  },
];

const sampleTotals = [
  { label: "Total", value: "84", color: "text-foreground" },
  { label: "New", value: "12", color: "text-accent-cyan" },
  { label: "Contacted", value: "31", color: "text-brand" },
];

// Drawn at a fixed 280x560 and scaled by its wrapper, so the mockup keeps its proportions at every size
function LeadsPhone() {
  return (
    <div className="relative h-[560px] w-[280px] rounded-[2.5rem] border-[12px] border-muted bg-muted shadow-2xl">
      <div className="absolute -start-[15px] top-[72px] h-[32px] w-[3px] rounded-s-lg bg-muted" />
      <div className="absolute -start-[15px] top-[124px] h-[46px] w-[3px] rounded-s-lg bg-muted" />
      <div className="absolute -start-[15px] top-[178px] h-[46px] w-[3px] rounded-s-lg bg-muted" />
      <div className="absolute -end-[15px] top-[142px] h-[64px] w-[3px] rounded-e-lg bg-muted" />

      <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background">
        {/* App header */}
        <div className="border-b border-border/40 px-5 pb-4 pt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-foreground">Leads</p>
              <p className="text-xs text-muted-foreground">Acme Roofing</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-brand">AR</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {sampleTotals.map((total) => (
              <div key={total.label} className="rounded-lg border border-border/50 bg-card p-2 text-center">
                <p className="text-xs text-muted-foreground">{total.label}</p>
                <p className={`text-lg font-bold ${total.color}`}>{total.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead list, faded at the bottom as if it scrolls */}
        <div className="relative flex-1 space-y-3 overflow-hidden p-4">
          <div className="absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-background to-transparent" />
          {sampleLeads.map((lead, i) => (
            <div key={lead.name} className={`rounded-xl border border-border/50 bg-card p-3 shadow-sm ${lead.card}`}>
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${lead.dot}`} />
                  <span className="text-sm font-semibold text-foreground">{lead.name}</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${lead.badge}`}>{lead.status}</span>
              </div>
              <p className={`mb-2 text-xs text-muted-foreground ${i === 0 ? "line-clamp-2" : "line-clamp-1"}`}>{lead.note}</p>
              <div className="flex items-center justify-between border-t border-border/40 pt-2 text-[10px] text-muted-foreground/60">
                <span>{lead.time}</span>
                <span>{lead.source}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom navigation */}
        <div className="flex h-14 items-center justify-around border-t border-border/40 px-2">
          <div className="flex flex-col items-center gap-1 text-brand">
            <div className="h-5 w-5 rounded-md bg-current opacity-20" />
            <div className="h-1 w-1 rounded-full bg-current" />
          </div>
          <div className="h-5 w-5 rounded-md bg-foreground opacity-10" />
          <div className="h-5 w-5 rounded-md bg-foreground opacity-10" />
          <div className="h-5 w-5 rounded-full bg-foreground opacity-10" />
        </div>
      </div>
    </div>
  );
}

export default function HQShowcase() {
  return (
    <section id="isr-hq" aria-labelledby="hq-showcase-heading" className="relative scroll-mt-24 overflow-hidden bg-background py-20 sm:py-24">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeader
              align="left"
              id="hq-showcase-heading"
              eyebrow="What you get"
              title={<><span className="text-muted-foreground">We don't just send leads.</span><br />We give you a command center.</>}
              description="Most agencies send a spreadsheet and wish you luck. ISR HQ brings your reports, work updates and website requests into one workspace, and our mobile-first CRM puts every lead from your Google and Meta ads in your pocket."
            />
            {/* Secondary action: outlined, because the violet fill is kept for the main call to action */}
            <Link href="/contact?interest=isr-hq" className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan/50 hover:bg-accent-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-background">
              Ask for an HQ walkthrough
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
          </div>

          <figure className="min-w-0">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
                  <span className="flex items-center gap-2 text-xs font-medium text-foreground">
                    <LayoutDashboard aria-hidden="true" className="h-3.5 w-3.5 text-accent-cyan" />
                    Inside ISR HQ
                  </span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground">Demo workspace</span>
                </div>
                <Image src="/showcase/isr-hq-overview.webp" alt="ISR HQ client overview with service metrics, work updates, and website management for a fictional demonstration business" width={1440} height={1000} unoptimized sizes="(min-width: 1400px) 730px, (min-width: 1024px) 58vw, 100vw" className="h-auto w-full" />
              </div>

              {/* The CRM phone over the screenshot's quiet bottom-left corner (sidebar and footer), hanging 48px below it.
                  Hidden on phones, where it would cover most of the screenshot; the "Leads in your pocket" feature still describes it. */}
              <div
                role="img"
                aria-label="Lead CRM on a phone showing new leads from Google and Meta ads for the same demo business (sample data)"
                className="absolute -bottom-12 left-4 hidden h-[280px] w-[140px] sm:block lg:-left-10 lg:h-[360px] lg:w-[180px]"
              >
                <div className="origin-top-left scale-50 lg:scale-[0.643]">
                  <LeadsPhone />
                </div>
              </div>
            </div>
            {/* Left padding clears the phone hanging over this line from sm up */}
            <figcaption className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground sm:pl-[10.5rem] lg:pl-40">
              ISR HQ<span className="hidden sm:inline"> and the lead CRM</span>, shown with sample data. Available tools depend on your active services and connected website.
            </figcaption>
          </figure>
        </div>

        {/* Same item layout as the details row in WebsiteShowcase, with four items instead of three */}
        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                <Icon className="h-5 w-5 text-accent-cyan" />
              </span>
              <div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
