"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Phone, ChevronDown, ChevronUp } from "lucide-react";

interface PricingPackage {
    name: string;
    price: string;
    description: string;
    features: string[];
    popular: boolean;
    gradient?: string;
}

interface PricingCardProps {
    pkg: PricingPackage;
}

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
                    <h2 className="text-2xl font-bold mb-3 min-h-[64px] flex items-center justify-center leading-tight">{pkg.name}</h2>
                    <p className="text-muted-foreground text-sm mb-6 h-10 flex items-center justify-center">{pkg.description}</p>
                    <div className="flex justify-center items-baseline gap-1">
                        <span className="text-5xl font-bold text-white">${pkg.price}</span>
                        <span className="text-muted-foreground text-lg">/mo</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                {/* Features */}
                <div className="flex-grow mb-8">
                    <ul className="space-y-4">
                        {displayedFeatures.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm group/item animate-fade-in-up">
                                <div className={`mt-0.5 rounded-full p-1 bg-gradient-to-br ${pkg.gradient || "from-blue-500/20 to-cyan-500/20"} flex-shrink-0`}>
                                    <Check className="w-3.5 h-3.5 text-foreground" />
                                </div>
                                <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
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
                                className="text-muted-foreground hover:text-primary text-xs flex items-center gap-1 h-auto py-1 px-3"
                            >
                                {expanded ? (
                                    <>Show Less <ChevronUp className="w-3 h-3" /></>
                                ) : (
                                    <>Show All Features <ChevronDown className="w-3 h-3" /></>
                                )}
                            </Button>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <Button className={`w-full h-12 text-base font-semibold rounded-xl ${pkg.popular ? 'hero-gradient text-white shadow-lg shadow-primary/25 hover:shadow-primary/40' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`} size="lg" asChild>
                    <a href="tel:+12816195295">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                    </a>
                </Button>
            </div>
        </div>
    );
};

export default PricingCard;
