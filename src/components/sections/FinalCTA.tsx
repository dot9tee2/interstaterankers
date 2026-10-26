import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, CheckCircle, Users } from "lucide-react";
import { primaryCta } from "@/data/cta";
import { clientCount, guarantee } from "@/data/proof";

const FinalCTA = () => {
  const benefits = [
    "Free consultation & business audit",
    "Business audit in 1–2 working days",
    "No long-term contracts required",
    guarantee.title
  ];

  return (
    // The page's only violet band and its last high point, so it gets more room than the standard py-20 sm:py-24.
    // MobileCTABar watches the id and hides its own bar while this section is on screen.
    <section id="final-cta" className="relative py-24 sm:py-32 overflow-hidden bg-primary text-primary-foreground">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 text-sm font-medium animate-fade-in">
            <Users className="w-4 h-4" />
            <span>Trusted by {clientCount}+ growing businesses</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 animate-slide-up">
            Ready to grow?
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
            Stop losing leads to missed calls and poor search rankings.
            <br />
            <span className="font-semibold">Start capturing every opportunity today.</span>
          </p>

          {/* Benefits List: same check icon, size and gap as the trust row below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '400ms' }}>
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-slide-up" style={{ animationDelay: '600ms' }}>
            <Button
              asChild
              size="lg"
              className="h-14 w-full sm:w-auto px-8 text-base font-semibold rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <a href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 w-full sm:w-auto px-8 text-base font-semibold rounded-xl border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="tel:+12816195295">
                <Phone className="h-4 w-4" />
                Talk to an Expert Now
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 text-primary-foreground/90 text-sm animate-slide-up" style={{ animationDelay: '800ms' }}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>24/7 support</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
