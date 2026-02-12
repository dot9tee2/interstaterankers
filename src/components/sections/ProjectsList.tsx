"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProjectPreview } from "@/types/project";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    cn
} from "@/lib/utils";
import { X, Filter } from "lucide-react";

interface ProjectsListProps {
    initialProjects: ProjectPreview[];
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");

    // unique industries
    const industries = useMemo(() => {
        const all = initialProjects.map((p) => p.industry).filter(Boolean) as string[];
        return ["All", ...Array.from(new Set(all))];
    }, [initialProjects]);

    const filteredProjects = useMemo(() => {
        return initialProjects.filter((project) => {
            const matchesFilter = activeFilter === "All" || project.industry === activeFilter;
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.summary?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [initialProjects, activeFilter, searchQuery]);

    return (
        <div className="space-y-8">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border/40 backdrop-blur-sm">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {industries.map((industry) => (
                        <Button
                            key={industry}
                            variant={activeFilter === industry ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveFilter(industry)}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                activeFilter === industry
                                    ? "bg-accent-cyan text-accent-cyan-foreground shadow-md shadow-accent-cyan/20 hover:bg-accent-cyan/90"
                                    : "border-border/60 hover:border-accent-cyan/50 hover:text-accent-cyan hover:bg-accent-cyan/10"
                            )}
                        >
                            {industry}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={project._id}
                            className="h-full"
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-muted mb-4">
                            <Filter className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">No projects found</h3>
                        <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria.</p>
                        <Button variant="outline" onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}>
                            Reset Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: ProjectPreview }) {
    return (
        <Link
            href={`/projects/${project.slug.current}`}
            className="group block h-full focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
        >
            <div className="h-full border border-border/60 bg-card rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent">
                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground/20">
                                <span className="text-4xl font-bold">{project.title.charAt(0)}</span>
                            </div>
                        </div>

                        <div className="absolute top-3 right-3 z-10">
                            {project.industry && (
                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm border-border/50">
                                    {project.industry}
                                </Badge>
                            )}
                        </div>
                    </AspectRatio>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-cyan transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                        {project.summary}
                    </p>

                    <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-border/40">

                        {/* View Case Study "Button" appearance on hover */}
                        <div className="ml-auto flex items-center text-xs font-semibold text-accent-cyan opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            View Case Study →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
