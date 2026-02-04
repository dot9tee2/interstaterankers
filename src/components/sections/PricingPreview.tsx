"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, Star } from "lucide-react";
import { pricingPackages } from "@/data/pricing";

const PricingPreview = () => {
  // Filter for the 3 specific packages requested
  const displayedPackages = pricingPackages.filter(pkg =>
    pkg.name === "Google Maps Growth Package" ||
    pkg.name === "Google/Meta Ads Growth Package" ||
    pkg.name === "Lead Capture & Booking Suite"
  );

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-6 bg-cyan-500/10 border-cyan-500/40 text-cyan-500 px-6 py-1.5 text-sm font-medium backdrop-blur-md">
            Growth Packages
          </Badge>
          <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 gradient-text">
            Choose Your Growth Engine
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scalable solutions designed to dominate your local market and automate your lead generation.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedPackages.map((pkg, index) => (
            <div key={pkg.name} className="relative group flex flex-col h-full">
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20 w-max pointer-events-none">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-1.5 shadow-lg border-0 text-sm">
                    <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                    BEST VALUE
                  </Badge>
                </div>
              )}

              <div className={`
                        relative h-full flex flex-col p-8 rounded-3xl border transition-all duration-300
                        ${pkg.popular
                  ? 'bg-card border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10'
                  : 'bg-card/40 border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-1'
                }
                    `}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3 min-h-[64px] flex items-center justify-center leading-tight">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 h-10 flex items-center justify-center">{pkg.description}</p>
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">${pkg.price}</span>
                    <span className="text-muted-foreground text-lg">/mo</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm group/item">
                      <div className={`mt-0.5 rounded-full p-1 bg-gradient-to-br ${pkg.gradient || "from-blue-500/20 to-cyan-500/20"} flex-shrink-0`}>
                        <Check className="w-3.5 h-3.5 text-foreground" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button className={`w-full h-12 text-base font-semibold rounded-xl ${pkg.popular ? 'hero-gradient text-white shadow-lg shadow-primary/25 hover:shadow-primary/40' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`} asChild>
                  <a href="tel:+12816195295">
                    <Phone className="w-4 h-4 mr-2" />
                    Get Started Now
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-muted-foreground text-lg">
            Not sure which package is right for you?
          </p>
          <Button variant="link" size="lg" className="text-cyan-500 hover:text-cyan-500/80" asChild>
            <a href="/pricing">View All Packages &rarr;</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;