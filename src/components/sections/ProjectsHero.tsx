"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function ProjectsHero() {
    return (
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            {/* Background Elements */}

            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto space-y-6"
                >
                    <Badge variant="outline" className="border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan mb-4 px-4 py-1.5 rounded-full text-sm">
                        Our Portfolio
                    </Badge>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-body tracking-tight">
                        Transforming Business <br className="hidden md:block" />
                        <span className="text-brand">Through Digital Excellence</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Explore our collection of successful case studies. From local dominance to national expansion,
                        see how we've helped businesses achieve measurable growth.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
