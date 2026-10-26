import Link from "next/link";
import Script from "next/script";
import { ArrowRight, BarChart, Check, CheckCircle, FileText, Target, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { primaryCta } from "@/data/cta";

export interface ServiceData {
  title: string;
  description: string;
  longDescription?: string;
  keywords: string[];
  features: string[];
  process?: { title: string; description: string }[];
  benefits?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
}

// Benefit icons by position; anything past the fourth gets the generic check
const benefitIcons = [Zap, Target, BarChart, FileText];

// One layout for every service page, in the homepage's section rhythm: hero, what's included, optional overview,
// process (a raised card band), benefits and FAQs, then the shared violet FinalCTA.
export default function ServicePage({ slug, service }: { slug: string; service: ServiceData }) {
  const pageUrl = `https://interstaterankers.com/services/${slug}`;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="divide-y divide-border">
        <PageHero
          breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
          eyebrow="Services"
          title={service.title}
          description={service.description}
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-xl px-6 text-base font-semibold">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-xl border-border bg-transparent px-6 text-base font-semibold text-foreground hover:bg-muted hover:text-foreground">
              <Link href="/pricing">View packages</Link>
            </Button>
          </div>
        </PageHero>

        {/* What's included */}
        <section className="py-20 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader className="mb-12 md:mb-16" eyebrow="What's included" title="Everything handled for you" description="Fully managed by our US-based team, scoped to your business and goals." />
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                    <Check className="h-5 w-5 text-accent-cyan" />
                  </span>
                  <span className="text-base font-semibold text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {service.longDescription && (
          <section className="py-20 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader className="mb-12 md:mb-16" eyebrow="Overview" title={`How we approach ${service.title}`} />
              <div className="mx-auto max-w-3xl whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
                {service.longDescription.trim()}
              </div>
            </div>
          </section>
        )}

        {service.process && (
          <section className="bg-card py-20 sm:py-24">
            <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <SectionHeader align="left" eyebrow="How it works" title="Our process" description="A proven methodology for consistent results." />
              <ol className="divide-y divide-border border-y border-border">
                {service.process.map((step, index) => (
                  <li key={step.title} className="flex gap-6 py-6">
                    <span aria-hidden="true" className="shrink-0 font-mono text-sm leading-7 text-accent-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {service.benefits && (
          <section className="py-20 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader className="mb-12 md:mb-16" eyebrow="Why it pays off" title="The benefits" description="Real value that drives your business forward." />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {service.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index] ?? CheckCircle;
                  return (
                    <div key={benefit.title} className="flex gap-6 rounded-2xl border border-border bg-card p-6">
                      <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                        <Icon className="h-6 w-6 text-accent-cyan" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                        <p className="mt-2 leading-relaxed text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {service.faqs && (
          <section className="py-20 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader className="mb-12 md:mb-16" eyebrow="FAQs" title="Frequently asked questions" description={`Common questions about our ${service.title} services.`} />
              <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index}`}>
                    <AccordionTrigger className="py-4 text-left text-base md:text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="pb-4 leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>
      <Footer />

      {/* Structured Data */}
      <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@type": "Organization", name: "Interstate Rankers", url: "https://interstaterankers.com" },
            areaServed: { "@type": "Country", name: "United States" },
            url: pageUrl,
            brand: { "@type": "Brand", name: "Interstate Rankers" },
          }),
        }}
      />
      {service.faqs && (
        <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      )}
      <Script id="breadcrumb-jsonld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://interstaterankers.com/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://interstaterankers.com/services" },
              { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
            ],
          }),
        }}
      />
    </div>
  );
}
