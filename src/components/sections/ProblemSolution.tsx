"use client";

import React from "react";
import { Check, ShieldCheck, Zap, MessageCircle, BarChart3, PhoneMissed } from "lucide-react";

const ProblemSolution = () => {
    return (
        <section className="py-8 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 uppercase tracking-tight">
                        The <span className="text-muted-foreground line-through decoration-destructive/50 decoration-4">Problem</span> vs <span className="gradient-text">Our Solution</span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        We own a business ourselves, so we know firsthand what it takes to succeed in this space.
                        We've faced the frustrations of the industry and built a better way forward.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative">

                    {/* Arrow / Connector (Desktop Only) */}
                    <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-slate-800 transform -rotate-12 dark:text-slate-200">
                        <svg width="120" height="60" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 opacity-90 drop-shadow-sm">
                            <path d="M10 20 Q 50 0, 90 20" stroke="currentColor" strokeWidth="4" fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                            <defs>
                                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <path d="M0,0 L6,3 L0,6 L0,0" fill="currentColor" />
                                </marker>
                            </defs>
                        </svg>
                    </div>

                    {/* Matches Screenshot: Light Appearance (Problem) */}
                    <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
                        {/* Decorative scribbles */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-100 rounded-full blur-3xl opacity-50" />

                        <h3 className="text-3xl font-bold mb-10 uppercase tracking-tight relative z-10">
                            More Than Likely, You're Either
                        </h3>

                        <div className="space-y-8 relative z-10">
                            {/* Problem 1: Ghosting */}
                            <div className="flex gap-5">
                                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold text-slate-400 font-heading border border-slate-200 shadow-sm">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Feeling Ghosted</h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        Stuck with a company that promised the world but now barely responds to your emails.
                                    </p>
                                </div>
                            </div>

                            {/* Problem 2: Outdated Tech */}
                            <div className="flex gap-5">
                                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold text-slate-400 font-heading border border-slate-200 shadow-sm">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Using Outdated Tech</h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        Competitors are leveraging AI and modern SEO, while you're left behind with strategies from 2015.
                                    </p>
                                </div>
                            </div>

                            {/* Problem 3: Losing Leads */}
                            <div className="flex gap-5">
                                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold text-slate-400 font-heading border border-slate-200 shadow-sm">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Losing Leads & Calls</h4>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        Your marketing brings traffic, but missed calls and slow follow-ups are costing you revenue.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100 relative z-10">
                            <p className="text-slate-500 text-sm italic">
                                "It's tough to trust anyone in the marketing space when you've been burned by empty promises before."
                            </p>
                        </div>

                        {/* Hand-drawn style decorative elements */}
                        <svg className="absolute bottom-6 right-6 w-24 h-24 text-indigo-500/10 transform rotate-12" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M10 90 Q 50 10, 90 90" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                            <path d="M15 95 Q 55 15, 95 95" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.5" />
                        </svg>
                    </div>

                    {/* Matches Screenshot: Dark Appearance (Solution) */}
                    <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/20 border-2 border-primary/20 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
                        {/* Decorative accent */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-bl-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-tr-full blur-2xl" />

                        <h3 className="text-3xl font-bold mb-10 text-white uppercase tracking-tight flex items-center gap-3">
                            Our Solution
                        </h3>

                        <ul className="space-y-6 mb-12 relative z-10">
                            {[
                                {
                                    text: "Never Feel Ignored Again.",
                                    subtext: "24/7 direct access via our custom Client Portal & Mobile App.",
                                    icon: MessageCircle
                                },
                                {
                                    text: "Always Ahead of the Curve.",
                                    subtext: "We leverage proprietary AI & advanced SEO tools to outpace competitors.",
                                    icon: Zap
                                },
                                {
                                    text: "Stop Losing Business.",
                                    subtext: "Our CRM & AI Answering Service ensures no lead is ever left behind.",
                                    icon: PhoneMissed
                                },
                                {
                                    text: "Complete Transparency.",
                                    subtext: "Live metrics & realistic growth forecasts, no guesswork.",
                                    icon: BarChart3
                                },
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-primary stroke-[3]" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-white">{item.text}</p>
                                        <p className="text-sm text-slate-400 font-medium">{item.subtext}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 backdrop-blur-md relative shadow-inner">
                            <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg ring-4 ring-slate-950">
                                Guaranteed
                            </div>
                            <div className="flex gap-4 pt-1">
                                <ShieldCheck className="w-6 h-6 text-cyan flex-shrink-0 mt-1" />
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                    If you don't see significant growth within 180 days, we'll keep working with you at no additional cost until you do. That's our guarantee.
                                </p>
                            </div>
                            {/* Star accent */}
                            <svg className="absolute bottom-4 right-4 w-12 h-12 text-white/20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
