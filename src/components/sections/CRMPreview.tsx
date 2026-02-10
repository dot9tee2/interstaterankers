"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Smartphone, Zap, BarChart3 } from "lucide-react";
import Link from "next/link";

const features = [
    {
        title: "Pocket-Ready Power",
        description: "App-like experience designed for iPhone & Android. Handle leads while you're on the move.",
        icon: Smartphone,
    },
    {
        title: "Zero-Latency Updates",
        description: "See new leads the second they arrive. No refreshing, no waiting.",
        icon: Zap,
    },
    {
        title: "Crystal Clear ROI",
        description: "Visualize your conversion rates with interactive charts. Know exactly what you're paying for.",
        icon: BarChart3,
    },
];

export default function CRMPreview() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold font-body leading-tight">
                                We Don't Just Send Leads. <br />
                                <span className="gradient-text">We Give You a Command Center.</span>
                            </h2>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                                Most agencies send you a spreadsheet and wish you luck. At <strong>Interstate Rankers</strong>, we equip you with a proprietary, mobile-first CRM that puts your entire pipeline in your pocket. Real-time. Transparent. Native-app fast.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex gap-4 items-start group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center glow-card group-hover:border-primary/50 transition-colors">
                                        <feature.icon className="w-6 h-6 text-primary-glow group-hover:text-accent-cyan transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 group-hover:text-accent-cyan transition-colors">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-button transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Get Your Demo
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    See Pricing
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual Content (Mockup Placeholder) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-full max-w-[300px] shadow-glow">
                            <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                            <div className="rounded-[2rem] overflow-hidden w-full h-[572px] bg-background border border-white/5 relative">
                                {/* Realistic UI Mockup */}
                                <div className="absolute inset-0 flex flex-col bg-background">
                                    {/* App Header */}
                                    <div className="px-6 pt-12 pb-4 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h4 className="text-2xl font-bold font-body">Dashboard</h4>
                                                <p className="text-xs text-muted-foreground">Welcome back, Alex</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-background">
                                                AL
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="bg-card p-2 rounded-lg border border-border/50 text-center">
                                                <div className="text-xs text-muted-foreground">Total</div>
                                                <div className="text-lg font-bold text-foreground">84</div>
                                            </div>
                                            <div className="bg-card p-2 rounded-lg border border-border/50 text-center">
                                                <div className="text-xs text-muted-foreground">New</div>
                                                <div className="text-lg font-bold text-accent-cyan">12</div>
                                            </div>
                                            <div className="bg-card p-2 rounded-lg border border-border/50 text-center">
                                                <div className="text-xs text-muted-foreground">Rate</div>
                                                <div className="text-lg font-bold text-purple-400">4.8%</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="flex-1 overflow-hidden p-4 space-y-3 relative">
                                        {/* Gradient overlay at bottom for scroll hint */}
                                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-10" />

                                        {/* Lead Card 1 */}
                                        <div className="p-3 rounded-xl bg-card border border-border/50 shadow-sm relative group">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                                                    <span className="font-semibold text-sm">Sarah Jenkins</span>
                                                </div>
                                                <span className="text-[10px] bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded-full font-medium">New Lead</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                                "Hi, I'm interested in your SEO packages for my dental practice in Austin..."
                                            </p>
                                            <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 border-t border-border/40 pt-2">
                                                <span>Just now</span>
                                                <span>Google Ads</span>
                                            </div>
                                        </div>

                                        {/* Lead Card 2 */}
                                        <div className="p-3 rounded-xl bg-card border border-border/50 shadow-sm opacity-90">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                    <span className="font-semibold text-sm">Mike Ross</span>
                                                </div>
                                                <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full font-medium">Contacted</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                                                Scheduled a call for Tuesday regarding local map pack ranking.
                                            </p>
                                            <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 border-t border-border/40 pt-2">
                                                <span>2h ago</span>
                                                <span>Organic</span>
                                            </div>
                                        </div>

                                        {/* Lead Card 3 */}
                                        <div className="p-3 rounded-xl bg-card border border-border/50 shadow-sm opacity-75">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                                    <span className="font-semibold text-sm">David Chen</span>
                                                </div>
                                                <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-medium">Follow Up</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                                                Looking for a custom quote for 3 locations.
                                            </p>
                                            <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 border-t border-border/40 pt-2">
                                                <span>5h ago</span>
                                                <span>Referral</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Navigation Mockup */}
                                    <div className="h-14 border-t border-border/40 bg-background/95 backdrop-blur flex items-center justify-around px-2 z-20">
                                        <div className="flex flex-col items-center gap-1 opacity-100 text-primary">
                                            <div className="w-5 h-5 bg-current rounded-md opacity-20" />
                                            <div className="h-1 w-1 rounded-full bg-current" />
                                        </div>
                                        <div className="flex flex-col items-center gap-1 opacity-40">
                                            <div className="w-5 h-5 bg-white rounded-md opacity-20" />
                                        </div>
                                        <div className="flex flex-col items-center gap-1 opacity-40">
                                            <div className="w-5 h-5 bg-white rounded-md opacity-20" />
                                        </div>
                                        <div className="flex flex-col items-center gap-1 opacity-40">
                                            <div className="w-5 h-5 bg-white rounded-full opacity-20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute top-1/2 -right-12 -translate-y-1/2 p-4 rounded-xl bg-card/80 backdrop-blur-xl border border-white/10 shadow-card card-tilt hidden md:block">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-medium text-muted-foreground">Live Pipeline</span>
                            </div>
                            <div className="text-2xl font-bold text-foreground">12 New Leads</div>
                            <div className="text-xs text-emerald-500 mt-1">↑ 24% this week</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
