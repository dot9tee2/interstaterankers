"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, ChevronDown, ChevronUp, Star } from "lucide-react";
import { primaryCta } from "@/data/cta";
import type { pricingPackages } from "@/data/pricing";

interface PricingCardProps {
    pkg: (typeof pricingPackages)[number];
}

// Same card as the homepage PricingPreview, plus a toggle for packages with a long feature list
const PricingCard = ({ pkg }: PricingCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const initialFeatureCount = 5;
    const showToggle = pkg.features.length > initialFeatureCount;

    const displayedFeatures = expanded
        ? pkg.features
        : pkg.features.slice(0, initialFeatureCount);

    return (
        <div className="relative group flex flex-col h-full">
            {pkg.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20 w-max pointer-events-none">
                    <Badge className="bg-primary text-primary-foreground font-bold px-6 py-1.5 border-0 text-sm hover:bg-primary">
                        <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                        BEST VALUE
                    </Badge>
                </div>
            )}

            <div className={`
        relative h-full flex flex-col p-6 md:p-8 rounded-3xl border bg-card transition-all duration-300
        ${pkg.popular
                    ? 'border-primary shadow-xl'
                    : 'border-border hover:border-primary/40 hover:shadow-lg hover:-translate-y-1'
                }
      `}>
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight mb-3 min-h-[64px] flex items-center justify-center leading-tight">{pkg.name}</h2>
                    <p className="text-muted-foreground text-sm mb-6 min-h-10 flex items-center justify-center">{pkg.description}</p>
                    <div className="flex justify-center items-baseline gap-1">
                        <span className="text-5xl font-semibold tracking-tight text-foreground">${pkg.price}</span>
                        <span className="text-muted-foreground text-lg">/mo</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-border mb-8" />

                {/* Features */}
                <div className="flex-grow mb-8">
                    <ul className="space-y-4">
                        {displayedFeatures.map((feature, i) => (
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

                    {showToggle && (
                        <div className="mt-4 flex justify-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpanded(!expanded)}
                                aria-expanded={expanded}
                                className="text-muted-foreground hover:bg-muted hover:text-foreground text-xs h-auto py-1 px-3"
                            >
                                {expanded ? (
                                    <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
                                ) : (
                                    <>Show all features <ChevronDown className="h-3.5 w-3.5" /></>
                                )}
                            </Button>
                        </div>
                    )}
                </div>

                {/* CTA: the contact form opens with this package filled in. Only popular cards get the violet fill. */}
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
    );
};

export default PricingCard;
