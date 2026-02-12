"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ProjectsCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10" />

            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-primary/5">
                    {/* Decorative Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 blur-sm" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8 relative z-10"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-body">
                            Ready to Write Your <span className="text-primary">Success Story?</span>
                        </h2>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Join the ranks of businesses dominating their markets.
                            Let's discuss how we can engineer your growth.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                            <Button asChild size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                                <Link href="/contact">
                                    Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full hover:bg-muted/50 border-border/60">
                                <Link href="/pricing">
                                    View Pricing
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
