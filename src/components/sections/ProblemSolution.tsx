"use client";

import React from "react";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const problems = [
    {
        title: "Feeling ghosted",
        text: "Stuck with a company that promised the world but now barely responds to your emails.",
    },
    {
        title: "Using outdated tech",
        text: "Competitors are leveraging AI and modern SEO, while you're left behind with strategies from 2015.",
    },
    {
        title: "Losing leads & calls",
        text: "Your marketing brings traffic, but missed calls and slow follow-ups are costing you revenue.",
    },
];

const solutions = [
    {
        text: "Never feel ignored again.",
        subtext: "24/7 direct access via our custom Client Portal & Mobile App.",
    },
    {
        text: "Always ahead of the curve.",
        subtext: "We leverage proprietary AI & advanced SEO tools to outpace competitors.",
    },
    {
        text: "Stop losing business.",
        subtext: "Our CRM & AI Answering Service ensures no lead is ever left behind.",
    },
    {
        text: "Complete transparency.",
        subtext: "Live metrics & realistic growth forecasts, no guesswork.",
    },
];

// First section after the hero: names the pain before any service is pitched. The guarantee lives next to pricing.
const ProblemSolution = () => {
    return (
        <section className="py-20 sm:py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <SectionHeader
                    className="mb-12 md:mb-16"
                    eyebrow="Sound familiar?"
                    title={<>The <span className="text-muted-foreground line-through decoration-destructive/50 decoration-4">problem</span> vs. <span className="text-brand">our solution</span></>}
                    description="We own a business ourselves, so we know firsthand what it takes to succeed in this space. We've faced the frustrations of the industry and built a better way forward."
                />

                {/* lg:gap-16 leaves room for the connector arrow, so it sits in the gutter instead of over the cards' text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch relative">

                    {/* Arrow / Connector (Desktop Only) */}
                    <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-primary transform -rotate-12">
                        <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 opacity-90 drop-shadow-sm">
                            <path d="M10 20 Q 50 0, 90 20" stroke="currentColor" strokeWidth="4" fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                            <defs>
                                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <path d="M0,0 L6,3 L0,6 L0,0" fill="currentColor" />
                                </marker>
                            </defs>
                        </svg>
                    </div>

                    {/* Problem: neutral card. Both lists share the same 40px marker, gap and item spacing so they read as a pair */}
                    <div className="bg-card text-card-foreground rounded-3xl p-6 md:p-12 border border-border relative overflow-hidden">
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">
                            More than likely, you're either
                        </h3>

                        <ul className="space-y-6">
                            {problems.map((problem, i) => (
                                <li key={problem.title} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-lg font-bold text-muted-foreground font-heading border border-border">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{problem.title}</h4>
                                        <p className="mt-1 text-muted-foreground leading-relaxed font-medium">{problem.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 pt-8 border-t border-border">
                            <p className="text-muted-foreground text-sm italic">
                                "It's tough to trust anyone in the marketing space when you've been burned by empty promises before."
                            </p>
                        </div>
                    </div>

                    {/* Solution: same surface as the problem card, set apart by the brand violet border */}
                    <div className="bg-card text-card-foreground rounded-3xl p-6 md:p-12 border border-primary/50 relative overflow-hidden">
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10 text-foreground">
                            Our solution
                        </h3>

                        <ul className="space-y-6">
                            {solutions.map((item) => (
                                <li key={item.text} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-brand stroke-[3]" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-foreground">{item.text}</p>
                                        <p className="mt-1 text-sm text-muted-foreground font-medium">{item.subtext}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
