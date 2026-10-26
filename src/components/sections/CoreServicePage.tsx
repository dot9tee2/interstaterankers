import Image from "next/image";
import { coreServiceSchema } from "@/lib/core-service-schema";
import Link from "next/link";
import { ArrowRight, Check, Phone, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/data/cta";
import ServiceExplainer, { ServiceProcess } from "./ServiceExplainer";
import { GbpStartingPoint, GbpVisual, GbpMilestones } from "./GbpVisuals";
import ServiceStartingPoint from "./ServiceStartingPoint";
import ServiceMilestones from "./ServiceMilestones";
import { AnsweringVisual } from "./AnsweringVisuals";
import { SearchServiceVisual } from "./SearchServiceVisuals";
import { coreServicePresentation } from "@/data/core-service-presentation";

type Detail = { title: string; description: string };
export interface CoreServiceContent {
  slug: string;
  name: string;
  headline: string;
  description: string;
  intro: { title: string; paragraphs: string[] };
  fit: Detail[];
  deliverables: Detail[];
  process: Detail[];
  sections: { id: string; eyebrow: string; title: string; paragraphs: string[]; items?: Detail[]; link?: { label: string; href: string } }[];
  reporting: Detail[];
  requirements: string[];
  pricing: { startingMonthlyPrice?: number; description: string; included: string[]; separate: string[] };
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string; description: string }[];
  contactService: string;
}

const sectionClass = "scroll-mt-32 py-20 sm:py-24";
const containerClass = "container mx-auto px-4 md:px-6";

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">{paragraphs.map((p) => <p key={p}>{p}</p>)}</div>;
}

function Checklist({ items }: { items: string[] }) {
  return <ul className="space-y-4">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-cyan" /><span>{item}</span></li>)}</ul>;
}

function MoreDetail({ label = "Read the full explanation", children }: { label?: string; children: React.ReactNode }) {
  return <details className="group mt-6 border-t border-border pt-4"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">{label}<span aria-hidden="true" className="text-accent-cyan group-open:rotate-45">+</span></summary><div className="pt-5">{children}</div></details>;
}

function ShortDetail({ text }: { text: string }) {
  const first = text.match(/^.*?[.!?](?:\s|$)/)?.[0] ?? text;
  const rest = text.slice(first.length).trim();
  return <><p className="mt-3 leading-relaxed text-muted-foreground">{first.trim()}</p>{rest && <MoreDetail label="See delivery details"><p className="text-sm leading-relaxed text-muted-foreground">{rest}</p></MoreDetail>}</>;
}

export default function CoreServicePage({ content: c }: { content: CoreServiceContent }) {
  const presentation = coreServicePresentation[c.slug];
  const contactUrl = `/contact?service=${encodeURIComponent(c.slug)}`;
  const nav = [
    { id: "overview", label: "Is it for you?" },
    { id: "scope", label: "What we do" },
    { id: "process", label: "How it works" },
    ...c.sections.map(({ id, eyebrow }) => ({ id, label: eyebrow })),
    { id: "reporting", label: "ISR HQ & reporting" },
    { id: "getting-started", label: "Getting started" },
    { id: "pricing", label: "Scope & pricing" },
    { id: "questions", label: "FAQs" },
  ];
  const schema = coreServiceSchema(c);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="divide-y divide-border">
        <PageHero breadcrumbs={[{ label: "Services", href: "/services" }, { label: c.name }]} eyebrow={c.name} title={c.headline} description={presentation.description} aside={
          <ServiceExplainer slug={c.slug} />
        }>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild className="h-12 rounded-xl px-6 text-base font-semibold"><Link href={contactUrl}>{primaryCta.label}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></Button>
            <Button asChild variant="outline" className="h-12 rounded-xl border-border bg-transparent px-6 text-base"><a href="#scope">See what we do</a></Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">Built around your services, service areas, and the enquiries you want.</p>
          <p className="mt-5 max-w-lg border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">Your Houston-based, in-house ISR team researches the business, agrees the work, and keeps you involved through ISR HQ. You have a direct contact managing your project.</p>
        </PageHero>

        <nav aria-label="On this service page" className="bg-card">
          <div className={`${containerClass} py-5`}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Find your answer</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">{nav.map((item) => <li key={item.id}><a className="inline-flex min-h-8 items-center text-sm text-foreground underline-offset-4 hover:text-accent-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href={`#${item.id}`}>{item.label}</a></li>)}</ul>
          </div>
        </nav>

        <section id="overview" className={sectionClass}>
          <div className={containerClass}>
            <SectionHeader className="mb-12" eyebrow="Your starting point" title="Where are you starting from?" description="Choose the situation that matches your business." />
            {c.slug === "gmb" ? <GbpStartingPoint /> : <ServiceStartingPoint slug={c.slug} paths={presentation.paths} />}
            <MoreDetail label={c.slug === "gmb" ? "Who this service is for and how we assess your profile" : "Who this service is for and how we assess your needs"}>
              <Paragraphs paragraphs={c.intro.paragraphs} />
              <div className="mt-8 grid gap-6 md:grid-cols-2">{c.fit.map((item) => <article key={item.title}><h3 className="font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p></article>)}</div>
            </MoreDetail>
          </div>
        </section>

        <section id="scope" className={`${sectionClass} bg-card`}>
          <div className={containerClass}>
            <SectionHeader className="mb-12 md:mb-16" eyebrow="What we do" title="The work behind the service" description="These are the areas we plan around. Your proposal identifies the deliverables, access, and responsibilities for your business." />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{c.deliverables.map((item, i) => <article key={item.title} className="rounded-2xl border border-border bg-background p-6"><span aria-hidden="true" className="font-mono text-xs text-accent-cyan">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3><ShortDetail text={item.description} /></article>)}</div>
          </div>
        </section>

        <section id="process" className={sectionClass}>
          <div className={containerClass}>
            <SectionHeader className="mb-12" eyebrow="How it works" title={presentation.processTitle} description={presentation.processDescription} />
            {c.slug === "gmb" ? <GbpMilestones /> : <ServiceMilestones items={presentation.milestones} />}
            <MoreDetail label="Open the step-by-step onboarding process"><ServiceProcess steps={c.process} /></MoreDetail>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">{presentation.processNote}</p>
          </div>
        </section>

        {c.sections.map((section, i) => (
          <section id={section.id} key={section.id} className={`${sectionClass} ${i % 2 === 0 ? "bg-card" : "bg-background"}`}>
            <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <SectionHeader align="left" eyebrow={section.eyebrow} title={section.title} description={presentation.summaries[section.id]} />
                <MoreDetail label={`More about ${section.eyebrow.toLowerCase()}`}>
                  <Paragraphs paragraphs={section.paragraphs} />
                  {section.items && <div className="mt-6 space-y-5">{section.items.map((item) => <article key={item.title}><h3 className="font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p></article>)}</div>}
                </MoreDetail>
                {section.link && <Link href={section.link.href} className="mt-5 inline-flex items-center gap-2 py-2 text-sm font-medium text-accent-cyan hover:underline">{section.link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>}
              </div>
              <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                {c.slug === "gmb" ? <GbpVisual kind={section.id} /> : c.slug === "answering" ? <AnsweringVisual kind={section.id} /> : <SearchServiceVisual slug={c.slug} kind={section.id} />}
              </div>
            </div>
          </section>
        ))}

        <section id="reporting" className={`${sectionClass} bg-card`}>
          <div className={containerClass}>
            <SectionHeader className="mb-12 md:mb-16" eyebrow="ISR HQ & reporting" title="See the work. Understand the progress." description="Your view of ISR follows the service you buy. We explain completed work, measured activity, and the next priorities so you can ask informed questions." />
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <figure className="min-w-0"><div className="overflow-hidden rounded-2xl border border-border bg-background"><div className="flex flex-wrap justify-between gap-2 border-b border-border px-4 py-3 text-xs text-muted-foreground"><span>ISR HQ / client workspace</span><span>Demonstration account</span></div><Image src="/showcase/isr-hq-overview.webp" alt="ISR HQ interface showing a demonstration client's dated work updates and report" width={1440} height={1000} className="h-auto w-full" /></div><figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">Actual ISR HQ interface with fictional demonstration data. Available information and connected features depend on your services and setup.</figcaption></figure>
              <div className="divide-y divide-border">{c.reporting.map((item) => <article key={item.title} className="py-5 first:pt-0"><h3 className="text-lg font-semibold">{item.title}</h3><ShortDetail text={item.description} /></article>)}</div>
            </div>
          </div>
        </section>

        <section id="getting-started" className={sectionClass}>
          <div className={`${containerClass} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
            <div><SectionHeader align="left" eyebrow="Getting started" title="What we need from you" /><p className="mt-6 leading-relaxed text-muted-foreground">Accurate business information and a responsive point of contact help us move forward. Where possible, grant account access by invitation instead of sharing personal passwords.</p><div className="mt-8 rounded-2xl border border-border bg-card p-6"><h3 className="text-lg font-semibold">One team responsible for the work</h3><p className="mt-3 leading-relaxed text-muted-foreground">Tell us about anyone else editing the same accounts or website. We need clear responsibilities and coordinated changes so the work can be assessed properly. We work with established, legitimately operating businesses and can discuss readiness before an engagement begins.</p></div></div>
            <Checklist items={c.requirements} />
          </div>
        </section>

        <section id="pricing" className={`${sectionClass} bg-card`}>
          <div className={containerClass}>
            <SectionHeader className="mb-12 md:mb-16" eyebrow="Scope & pricing" title="Know what you are buying" description={c.pricing.description} />
            <div className="grid gap-8 md:grid-cols-2"><article className="rounded-2xl border border-border bg-background p-6 md:p-8"><h3 className="mb-6 text-xl font-semibold">What your proposal defines</h3><Checklist items={c.pricing.included} /></article><article className="rounded-2xl border border-border bg-background p-6 md:p-8"><h3 className="mb-6 text-xl font-semibold">Items to scope separately</h3><Checklist items={c.pricing.separate} /></article></div>
            <p className="mt-8 max-w-3xl leading-relaxed text-muted-foreground">We explain the fees, responsibilities, and applicable terms before you decide. Bring your current setup and your questions to the first conversation so we can recommend the right scope.</p>
          </div>
        </section>

        <section id="questions" className={sectionClass}>
          <div className={`${containerClass} grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
            <div><SectionHeader align="left" eyebrow="Questions answered" title="Before you make a decision" description="Practical answers about delivery, access, costs, and expectations." /><a href="tel:+12816195295" className="mt-6 inline-flex items-center gap-2 py-2 font-medium text-accent-cyan"><Phone aria-hidden="true" className="h-4 w-4" />(281) 619-5295</a></div>
            <div className="min-w-0 border-t border-border">{c.faqs.map((faq) => <details key={faq.question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-medium transition-colors hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">{faq.question}<span aria-hidden="true" className="shrink-0 text-xl text-accent-cyan group-open:rotate-45">+</span></summary><p className="pb-6 pr-4 leading-relaxed text-muted-foreground">{faq.answer}</p></details>)}</div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className={containerClass}><SectionHeader className="mb-12" eyebrow="Connected services" title="Put the right pieces together" /><div className="grid gap-8 md:grid-cols-3">{c.related.map((item) => <Link key={item.href} href={item.href} className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent-cyan/50"><h3 className="flex items-start justify-between gap-4 text-lg font-semibold">{item.label}<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-cyan" /></h3><p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p></Link>)}</div></div>
        </section>

        <section id="final-cta" className="bg-primary py-24 text-primary-foreground sm:py-32">
          <div className={`${containerClass} max-w-4xl text-center`}><p className="text-xs font-semibold uppercase tracking-[0.2em]">Your next step</p><h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">Let's review your business first.</h2><p className="mt-6 text-lg leading-relaxed">Tell us about your services, where you work, and what needs to improve. Our marketing team aims to respond within one to two working hours; a business audit normally follows within one to two working days.</p><div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"><Button asChild className="h-12 rounded-xl bg-primary-foreground px-6 text-base font-semibold text-primary hover:bg-primary-foreground/90"><Link href={contactUrl}>{primaryCta.label}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></Button><Button asChild variant="outline" className="h-12 rounded-xl border-primary-foreground/40 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="tel:+12816195295">Talk through your questions</a></Button></div></div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
