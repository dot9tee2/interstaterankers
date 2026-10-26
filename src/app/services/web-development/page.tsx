import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, FileText, Fingerprint, Gauge, Globe, Headphones, MessageSquarePlus, Monitor, MousePointer2, Pencil, Search, Send, Smartphone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";
import WebsiteWorkGallery from "@/components/sections/WebsiteWorkGallery";

const description = "Custom website design and development for service businesses. Explore our work, delivery process, ISR HQ, content editing, and ongoing website care.";
const pageUrl = "https://interstaterankers.com/services/web-development";

export const metadata: Metadata = {
  title: "Custom Website Design & Development",
  description,
  alternates: { canonical: "/services/web-development" },
  openGraph: {
    title: "Custom Website Design & Development | Interstate Rankers",
    description,
    url: "/services/web-development",
    type: "website",
    images: [{ url: "/showcase/listing-photoshoot.webp", width: 1440, height: 990, alt: "Listing Photoshoot website by Interstate Rankers" }],
  },
};

const primaryCta = "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";
const secondaryCta = "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-muted-foreground/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-background";

const inclusions = [
  { icon: Fingerprint, title: "Design with your identity", text: "A visual direction, layout, and page hierarchy shaped around your business, your audience, and the impression you want to make.", detail: "Brand direction & custom page layouts" },
  { icon: Smartphone, title: "A considered mobile experience", text: "Readable content, reachable navigation, and clear calls to action on the screens your customers actually use.", detail: "Responsive layouts & device review" },
  { icon: MousePointer2, title: "Pages with a purpose", text: "Explain your services, answer the questions customers ask, and give each page a useful next step. Writing and content migration are agreed in your scope.", detail: "Page structure, content & enquiries" },
  { icon: Search, title: "A foundation for search", text: "Descriptive page titles, metadata, sensible headings, internal links, and a crawlable structure. Existing URLs and redirects are reviewed during a redesign.", detail: "On-page & technical foundations" },
  { icon: Send, title: "Connected enquiry paths", text: "Make it easy to call, send a form, or reach your booking system. We agree the tools, routing, and any custom integrations before the build.", detail: "Forms, call links & booking connections" },
  { icon: Gauge, title: "A deliberate launch", text: "Check layouts, links, form journeys, loading performance, and keyboard use before launch. Confirm tracking, access, and the next steps for your team.", detail: "Quality review, launch & handover" },
];

const steps = [
  { title: "Understand the business", text: "We discuss your services, customers, current website, and the actions you want visitors to take. The proposal sets the scope, responsibilities, review rounds, and milestones.", review: "You review the brief and proposed scope." },
  { title: "Plan the pages and design", text: "We organize the content and customer journeys, then establish the visual direction. You see how the site will communicate your offer before the full build moves ahead.", review: "You review the page plan and design direction." },
  { title: "Build and connect", text: "We develop the agreed pages, adapt the layouts for mobile, and connect the forms and tools in your scope. Content and imagery are brought together in the working site.", review: "You explore a working preview." },
  { title: "Review, refine, and launch", text: "We work through the agreed feedback rounds, check the customer journeys, and coordinate the launch. On a redesign, we account for important existing pages and changed URLs.", review: "You approve the agreed website for launch." },
  { title: "Keep the website useful", text: "After launch, your next step follows the plan we agreed: a defined handover, ongoing website care, or a wider growth engagement supported through ISR HQ.", review: "You have clear access, responsibilities, and support arrangements." },
];

const engagements = [
  { label: "Start with a clear foundation", title: "A new website", text: "For a new business, a new service, or a business ready for a dedicated online presence.", points: ["Page and content planning", "Custom design and development", "Agreed launch and handover"] },
  { label: "Build on what already matters", title: "A website redesign", text: "For a site that no longer reflects your business or makes it harder for customers to take the next step.", points: ["Review of existing content and journeys", "A refreshed design and structure", "URL and migration planning"] },
  { label: "Plan beyond launch day", title: "Ongoing website care", text: "For businesses that want continuing help keeping their website current and useful.", points: ["An agreed maintenance and change scope", "Website requests through ISR HQ", "Service updates and review context"] },
];

const faqs = [
  { question: "What is included in a website project?", answer: "Your proposal specifies the pages, design and development work, content responsibilities, integrations, review rounds, and launch tasks. We also agree the handover or ongoing support arrangement. New pages, custom functionality, and additional work are discussed before they are added." },
  { question: "How much does a website cost?", answer: "We scope the website around the work it needs: page count, content creation or migration, design requirements, integrations, and launch complexity. Your proposal separates the project cost from any agreed ongoing care, hosting, licences, or marketing services." },
  { question: "How long will the project take?", answer: "We set a delivery schedule after agreeing the scope and reviewing content readiness. The plan includes design, build, feedback, and launch milestones, together with the decisions and materials needed from you. Extra functionality or late content can change that schedule." },
  { question: "Can you redesign my existing website?", answer: "Yes. We review what is useful in the current site, where the customer journey needs improvement, and which pages and URLs need to be retained or mapped. Content migration and redirects are included in the agreed redesign scope where needed." },
  { question: "Can I update the website through ISR HQ?", answer: "Content editing is available for supported connected websites. You can change the text and images enabled for your site and save them for review; our team reviews and publishes the approved changes. Your proposal confirms access and supported content. New pages, sections, and custom features are handled as separately agreed work." },
  { question: "Does the website include ongoing SEO?", answer: "The build includes the search foundations agreed in your scope, such as page structure, metadata, and launch checks. Continuing local SEO, content publishing, Google Business Profile management, and performance reporting are separate ongoing services that can be added to your engagement." },
  { question: "How does the website work with your answering service?", answer: "We plan the enquiry journey around the tools you use. Phone links, forms, booking routes, and answering arrangements can be coordinated as part of the agreed setup. AI answering and appointment handling are separate services, with their own configuration and scope." },
  { question: "Who handles hosting, access, and maintenance?", answer: "We confirm domain and hosting responsibilities, account access, handover arrangements, and any recurring costs before the build. Ongoing maintenance and change requests follow your chosen care arrangement. The proposal sets out who handles each part after launch." },
  { question: "How do you measure whether the website is working?", answer: "We agree the useful actions to measure, such as enquiries, form completions, calls, or bookings, and identify the tracking needed. Where reporting is part of your engagement, we review results using clear dates and source context. Design quality and business outcomes are assessed with the evidence available." },
  { question: "What do you need from me to get started?", answer: "Start with your current website, a description of your business and services, the areas you serve, and what you want the new website to achieve. We then agree the brand assets, content, photography, tool access, and review contacts needed for the project." },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": pageUrl + "#service", name: "Custom Website Design & Development", description, url: pageUrl, serviceType: "Website design and development", areaServed: { "@type": "Country", name: "United States" }, provider: { "@id": "https://interstaterankers.com/#organization" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://interstaterankers.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://interstaterankers.com/services" },
      { "@type": "ListItem", position: 3, name: "Website Design & Development", item: pageUrl },
    ] },
    { "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ],
};

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"><span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent-cyan" />{children}</p>;
}

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="website-development">
        <section aria-labelledby="website-service-title" className="relative overflow-hidden pb-16 pt-36 sm:pb-20">
          <div className="container relative mx-auto px-4 md:px-6">
            <nav aria-label="Breadcrumb" className="mb-12 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground/80"><Link href="/" className="hover:text-foreground">Home</Link><span aria-hidden="true">/</span><Link href="/services" className="hover:text-foreground">Services</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-foreground/80">Website development</span></nav>
            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
              <div className="min-w-0">
                <Eyebrow>Website design & development</Eyebrow>
                <h1 id="website-service-title" className="text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-6xl xl:text-7xl">Custom websites.<br /><span className="text-muted-foreground">Built around</span><br /><span className="text-accent-cyan">your business.</span></h1>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">Show people what makes your business worth choosing. We bring together considered design, clear service pages, and an easy path from first impression to first enquiry.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Link href="#website-enquiry" className={primaryCta}>Plan my website<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link><Link href="#website-work" className={secondaryCta}>Explore our work<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
                <p className="mt-6 text-xs leading-relaxed tracking-wide text-muted-foreground/80">New websites <span aria-hidden="true" className="mx-2 text-muted-foreground/40">/</span> Redesigns <span aria-hidden="true" className="mx-2 text-muted-foreground/40">/</span> Ongoing care</p>
              </div>
              <div className="relative min-w-0 lg:pl-3">
                <a href="https://listingphotoshoot.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Listing Photoshoot, a website by Interstate Rankers (opens in a new tab)" className="group block overflow-hidden rounded-2xl border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan">
                  <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3"><span className="flex items-center gap-2 text-[11px] text-muted-foreground"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />listingphotoshoot.com</span><ArrowUpRight aria-hidden="true" className="h-4 w-4 text-muted-foreground/80 group-hover:text-accent-cyan" /></div>
                  <Image src="/showcase/listing-photoshoot.webp" alt="Custom website for Listing Photoshoot, with editorial typography and property photography" width={1440} height={990} unoptimized priority className="h-auto w-full" />
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-4"><span className="text-sm font-medium text-foreground">Listing Photoshoot</span><span className="text-[10px] uppercase tracking-[0.13em] text-muted-foreground/80">Selected website work</span></div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <nav aria-label="Website service page sections" className="sticky top-[104px] z-30 border-y border-border bg-background/95">
          <div className="container mx-auto flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-3 text-xs font-medium text-muted-foreground md:px-6 sm:gap-x-8 sm:text-sm">
            {[["The work", "website-work"], ["What you get", "website-inclusions"], ["The process", "website-process"], ["ISR HQ", "website-hq"], ["After launch", "website-care"], ["FAQs", "website-faq"]].map(([label, id]) => <Link key={id} href={`#${id}`} className="flex min-h-9 items-center transition-colors hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan">{label}</Link>)}
          </div>
        </nav>

        <section id="website-work" aria-labelledby="website-work-heading" className="scroll-mt-56 py-20 sm:scroll-mt-48 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><Eyebrow>Selected work</Eyebrow><h2 id="website-work-heading" className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">Different businesses.<br /><span className="text-muted-foreground">Different websites.</span></h2></div><p className="max-w-md text-base leading-relaxed text-muted-foreground">Explore three real projects. Switch between desktop and mobile to see how the design adapts to the way people browse.</p></div>
            <WebsiteWorkGallery />
          </div>
        </section>

        <section id="website-inclusions" aria-labelledby="website-inclusions-heading" className="scroll-mt-56 border-y border-border bg-card py-20 sm:scroll-mt-48 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl"><Eyebrow>What goes into the build</Eyebrow><h2 id="website-inclusions-heading" className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">Every page has a job to do.</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">The design earns attention. The structure helps people understand. The details make it easier to take the next step. Your project scope brings those pieces together.</p></div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-muted md:grid-cols-2 lg:grid-cols-3">
              {inclusions.map(({ icon: Icon, title, text, detail }) => <article key={title} className="bg-background p-6 sm:p-8"><Icon aria-hidden="true" className="mb-6 h-6 w-6 text-accent-cyan" strokeWidth={1.5} /><h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p><p className="mt-5 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground/80">{detail}</p></article>)}
            </div>
          </div>
        </section>

        <section aria-labelledby="website-journey-heading" className="py-20 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 max-w-2xl"><Eyebrow>Part of your growth</Eyebrow><h2 id="website-journey-heading" className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">From being found<br /><span className="text-muted-foreground">to starting a conversation.</span></h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">A website sits in the middle of the customer journey. We can coordinate the services around it so the next step feels connected.</p></div>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-border p-6 sm:p-8"><Globe aria-hidden="true" className="mb-5 h-6 w-6 text-muted-foreground" strokeWidth={1.5} /><p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">01 / Be discovered</p><h3 className="text-xl font-semibold text-foreground">Local SEO</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Build your visibility for the services and areas that matter to your business.</p><Link href="/services/gmb" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm text-foreground/80 hover:text-accent-cyan">Explore local SEO<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></article>
              <article className="rounded-2xl border border-accent-cyan/25 bg-accent-cyan/[0.04] p-6 sm:p-8"><Monitor aria-hidden="true" className="mb-5 h-6 w-6 text-accent-cyan" strokeWidth={1.5} /><p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-accent-cyan/70">02 / Build confidence</p><h3 className="text-xl font-semibold text-foreground">Your website</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Show your work, explain your services, and make contacting you feel straightforward.</p><span className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm text-accent-cyan"><Check aria-hidden="true" className="h-4 w-4" />The foundation we build here</span></article>
              <article className="rounded-2xl border border-border p-6 sm:p-8"><Headphones aria-hidden="true" className="mb-5 h-6 w-6 text-muted-foreground" strokeWidth={1.5} /><p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">03 / Respond to interest</p><h3 className="text-xl font-semibold text-foreground">AI answering</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Help handle incoming enquiries and guide people toward the next step in your agreed process.</p><Link href="/services/answering" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm text-foreground/80 hover:text-accent-cyan">Explore answering<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></article>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80">Ongoing SEO and answering are optional services, scoped separately from the website build.</p>
          </div>
        </section>

        <section id="website-process" aria-labelledby="website-process-heading" className="scroll-mt-56 border-y border-border bg-card py-20 sm:scroll-mt-48 sm:py-24">
          <div className="container mx-auto grid gap-10 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div><Eyebrow>The process</Eyebrow><h2 id="website-process-heading" className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">Clear stages.<br /><span className="text-muted-foreground">Shared decisions.</span></h2><p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">You know what is being built, what needs your input, and what comes next. The schedule follows your agreed scope and content readiness.</p><Link href="#website-enquiry" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-cyan hover:text-foreground">Talk through your project<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
            <ol className="divide-y divide-border border-y border-border">
              {steps.map((step, index) => <li key={step.title} className="flex gap-4 py-7 first:pt-6 last:pb-6 sm:gap-6"><span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-sm text-accent-cyan">0{index + 1}</span><div><h3 className="text-xl font-semibold text-foreground">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p><p className="mt-4 text-xs leading-relaxed text-foreground/80">{step.review}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section id="website-hq" aria-labelledby="website-hq-heading" className="scroll-mt-56 py-20 sm:scroll-mt-48 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 max-w-3xl"><Eyebrow>ISR HQ / Your client workspace</Eyebrow><h2 id="website-hq-heading" className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">Your website has a home<br /><span className="text-accent-cyan">after launch.</span></h2><p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">With an eligible ongoing engagement, ISR HQ keeps your service updates, reports, website information, and change requests together. The tools you see follow your active services and connected website.</p></div>
            <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              <figure className="min-w-0"><a href="/showcase/isr-hq-overview.webp" target="_blank" rel="noopener noreferrer" aria-label="Enlarge the ISR HQ demonstration screenshot (opens in a new tab)" className="group block overflow-hidden rounded-2xl border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"><div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-xs"><span className="font-medium text-foreground">Inside ISR HQ</span><span className="flex items-center gap-2 text-muted-foreground/80">Sample account<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 group-hover:text-accent-cyan" /></span></div><Image src="/showcase/isr-hq-overview.webp" alt="Actual ISR HQ interface showing a fictional client’s dated report and work updates" width={1440} height={1000} unoptimized className="h-auto w-full" /></a><figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground/80">Actual interface, fictional demonstration data. Select the image to enlarge it.</figcaption></figure>
              <div className="divide-y divide-border">
                <article className="pb-6"><FileText aria-hidden="true" className="mb-3 h-5 w-5 text-accent-cyan" strokeWidth={1.5} /><h3 className="text-lg font-semibold text-foreground">Follow your services</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Review published work updates, dated performance reports, and the website information available for your account.</p></article>
                <article className="py-6"><MessageSquarePlus aria-hidden="true" className="mb-3 h-5 w-5 text-accent-cyan" strokeWidth={1.5} /><h3 className="text-lg font-semibold text-foreground">Request a change</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Explain what needs changing and add a screenshot when helpful. Follow the request from pending to in progress to completed, within your agreed service scope.</p></article>
                <article className="pt-6"><Pencil aria-hidden="true" className="mb-3 h-5 w-5 text-accent-cyan" strokeWidth={1.5} /><h3 className="text-lg font-semibold text-foreground">Edit supported content</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">On supported connected sites, update enabled text and images and save them for review. Our team checks and publishes the approved version.</p></article>
              </div>
            </div>
            <div className="mt-9 rounded-2xl border border-accent-cyan/15 bg-accent-cyan/[0.03] p-5 sm:p-7"><p className="text-sm font-medium text-foreground">A clear path from an edit to a published update.</p><ol className="mt-4 grid gap-4 text-sm text-foreground/80 sm:grid-cols-4">{["Edit supported content", "Save for review", "Our team approves", "The update is published"].map((text, index) => <li key={text} className="flex gap-3"><span aria-hidden="true" className="font-mono text-xs text-accent-cyan">0{index + 1}</span>{text}</li>)}</ol><p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground/80">Your proposal confirms HQ access and the content tools enabled for your site. New pages, sections, and custom functionality are scoped separately.</p></div>
          </div>
        </section>

        <section id="website-care" aria-labelledby="website-care-heading" className="scroll-mt-56 border-y border-border bg-card py-20 sm:scroll-mt-48 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><Eyebrow>Choose the right engagement</Eyebrow><h2 id="website-care-heading" className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">Start where your<br /><span className="text-muted-foreground">business is today.</span></h2></div><p className="max-w-md text-base leading-relaxed text-muted-foreground">A build, a redesign, and continuing care solve different needs. We agree the work and ongoing responsibilities before you commit.</p></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{engagements.map((engagement, index) => <article key={engagement.title} className="flex flex-col rounded-2xl border border-border bg-background p-6 sm:p-8"><p className="mb-7 font-mono text-xs text-accent-cyan">0{index + 1}</p><h3 className="text-2xl font-semibold tracking-tight text-foreground">{engagement.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{engagement.text}</p><ul className="mt-6 space-y-3 border-t border-border pt-6">{engagement.points.map(point => <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/80"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />{point}</li>)}</ul><p className="mt-auto pt-7 text-xs leading-relaxed text-muted-foreground/80">{engagement.label}</p></article>)}</div>
            <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"><div className="max-w-2xl"><h3 className="text-lg font-semibold text-foreground">A proposal built around the actual work.</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Page count, content, integrations, and launch requirements shape the project cost. Ongoing care, hosting, licences, and marketing are itemized where they apply.</p></div><Link href="#website-enquiry" className={`${secondaryCta} w-fit shrink-0`}>Discuss scope & cost<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
          </div>
        </section>

        <section id="website-faq" aria-labelledby="website-faq-heading" className="scroll-mt-56 py-20 sm:scroll-mt-48 sm:py-24">
          <div className="container mx-auto grid items-start gap-10 px-4 md:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div><Eyebrow>Before we begin</Eyebrow><h2 id="website-faq-heading" className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">The details<br /><span className="text-muted-foreground">worth knowing.</span></h2><p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">Scope, timing, access, and support should be clear from the start. Here are the questions we work through with you.</p></div>
            <div className="min-w-0 border-t border-border">{faqs.map(faq => <details key={faq.question} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan [&::-webkit-details-marker]:hidden">{faq.question}<ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground/80 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><p className="pb-6 pr-4 text-sm leading-relaxed text-muted-foreground sm:pr-10">{faq.answer}</p></details>)}</div>
          </div>
        </section>

        <section id="website-enquiry" aria-labelledby="website-enquiry-heading" className="scroll-mt-56 border-t border-border bg-card py-20 sm:scroll-mt-48 sm:py-24">
          <div className="container mx-auto grid items-start gap-10 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div><Eyebrow>Your next website</Eyebrow><h2 id="website-enquiry-heading" className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">Tell us what your<br />website needs<br /><span className="text-accent-cyan">to do.</span></h2><p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">Share your current site, the services you offer, and what you want to improve. We will work through the right scope, design approach, and support arrangement with you.</p><div className="mt-8 max-w-md border-t border-border pt-6"><p className="text-sm font-medium text-foreground">A useful starting point</p><ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">{["Your current website, if you have one", "Your services and the customers you want to reach", "What a better website would help you achieve"].map(point => <li key={point} className="flex gap-3"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />{point}</li>)}</ul></div><a href="tel:+12816195295" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground hover:text-accent-cyan">Prefer to talk? (281) 619-5295<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div>
            <div className="min-w-0"><ContactForm defaultServices={["Web Development"]} messagePlaceholder="Tell us about your business, your current website, and what you want the new site to achieve." /></div>
          </div>
        </section>
      </main>
      <script id="website-service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Footer />
    </div>
  );
}
