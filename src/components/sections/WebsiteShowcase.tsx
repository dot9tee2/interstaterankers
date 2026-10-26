import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Fingerprint, MousePointer2, Smartphone } from "lucide-react";
import { websiteProjects as websites } from "@/data/website-projects";
import { SectionHeader } from "@/components/ui/section-header";

const details = [
  { icon: Fingerprint, title: "Distinctly your business", text: "Design and messaging shaped around your brand and customers." },
  { icon: Smartphone, title: "Made for every screen", text: "A considered experience from the desktop to the phone in your customer's hand." },
  { icon: MousePointer2, title: "A clear next step", text: "Make it easy to explore your services, get in touch, or request a quote." },
];

export default function WebsiteShowcase() {
  return (
    <section id="websites" aria-labelledby="website-showcase-heading" className="relative scroll-mt-24 overflow-hidden bg-card py-20 sm:py-24">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-8 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            align="left"
            id="website-showcase-heading"
            eyebrow="Our work"
            title={<>Built for your business.<br /><span className="text-muted-foreground">Designed to be remembered.</span></>}
            description="Give the people finding you through local search a website that builds confidence and makes the next step easy."
          />
          <Link href="/services/web-development" className="group inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-cyan/50 hover:bg-accent-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-card">
            Explore web development
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {websites.map((website) => (
            <a key={website.domain} href={website.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${website.name} website (opens in a new tab)`} className="group block min-w-0 overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-accent-cyan/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-card">
              <div aria-hidden="true" className="flex items-center gap-3 border-b border-border bg-muted px-4 py-3">
                <div className="flex shrink-0 gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                </div>
                <span className="min-w-0 truncate text-[10px] tracking-wide text-muted-foreground sm:text-xs">{website.domain}</span>
              </div>
              <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                <Image src={website.image} alt={website.alt} fill unoptimized sizes="(min-width: 1400px) 410px, (min-width: 768px) 33vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none" />
              </div>
              <div className="flex items-end justify-between gap-4 border-t border-border p-6">
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{website.category}</p>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{website.name}</h3>
                </div>
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-accent-cyan/30 group-hover:text-accent-cyan">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Same item layout as the feature row in HQShowcase */}
        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
          {details.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
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
