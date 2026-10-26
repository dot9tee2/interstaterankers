"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, ShieldCheck, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { pricingPackages } from "@/data/pricing";
import { primaryCta } from "@/data/cta";
import { guarantee } from "@/data/proof";

const PricingPreview = () => {
  // Filter for the 3 specific packages requested
  const displayedPackages = pricingPackages.filter(pkg =>
    pkg.name === "Google Maps Growth Package" ||
    pkg.name === "Google/Meta Ads Growth Package" ||
    pkg.name === "Lead Capture & Booking Suite"
  );

  return (
    <section className="py-20 sm:py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          className="mb-12 md:mb-16"
          eyebrow="Pricing"
          title="Choose your growth engine"
          description="Scalable solutions designed to dominate your local market and automate your lead generation."
        />

        {/* Packages Grid: three columns only from lg, below that the prices don't fit the card width */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-lg mx-auto lg:max-w-none">
          {displayedPackages.map((pkg) => (
            <div key={pkg.name} className="relative group flex flex-col h-full">
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20 w-max pointer-events-none">
                  <Badge className="bg-primary text-primary-foreground font-bold px-6 py-1.5 border-0 text-sm hover:bg-primary">
                    <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                    BEST VALUE
                  </Badge>
                </div>
              )}

              <div className={`
                        relative h-full flex flex-col p-6 md:p-8 rounded-3xl border bg-background transition-all duration-300
                        ${pkg.popular
                  ? 'border-primary shadow-xl'
                  : 'border-border hover:border-primary/40 hover:shadow-lg hover:-translate-y-1'
                }
                    `}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold tracking-tight mb-3 min-h-[64px] flex items-center justify-center leading-tight">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 min-h-10 flex items-center justify-center">{pkg.description}</p>
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-5xl font-semibold tracking-tight text-foreground">${pkg.price}</span>
                    <span className="text-muted-foreground text-lg">/mo</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-border mb-8" />

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      {/* 20px marker = one 20px text-sm line, so it lines up with the first line */}
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="w-3.5 h-3.5 text-brand" />
                      </div>
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA: the contact form opens with this package filled in. Only the popular card gets the violet fill. */}
                <Button
                  asChild
                  variant={pkg.popular ? "default" : "outline"}
                  className={`w-full h-12 text-base font-semibold rounded-xl ${pkg.popular ? '' : 'border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <Link href={`${primaryCta.href}?package=${pkg.slug}`}>
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* The guarantee sits under the prices, where the risk of saying yes is weighed */}
        <div className="mt-8 flex max-w-lg mx-auto lg:max-w-none items-start gap-4 rounded-2xl border border-primary/50 bg-background p-6">
          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
            <ShieldCheck className="h-5 w-5 text-accent-cyan" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">{guarantee.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{guarantee.text}</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-muted-foreground text-lg">
            Not sure which package is right for you?
          </p>
          <Button variant="link" size="lg" className="text-accent-cyan hover:text-accent-cyan/80" asChild>
            <Link href="/pricing">
              View all packages
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
