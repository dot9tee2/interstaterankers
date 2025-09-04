"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Project = {
  title: string;
  url: string;
  image: string; // Screenshot path under /public/projects
  description: string;
  tags: string[];
};

// Ultra-realistic placeholder projects. Replace with your real ones anytime.
const projects: Project[] = [
  {
    title: "Al Furqan International Business",
    url: "https://alfurqanint.com",
    image: "/projects/alfurqanint.png",
    description: "International Business Website for Al Furqan International Business",
    tags: ["Gsap", "Tailwind", "SEO", "Accessibility"]
  },
  {
    title: "Curtains and Covers",
    url: "https://curtainsandcovers.com",
    image: "/projects/curtainsandcovers.png",
    description: "Home services site with quote funnel, dynamic service areas, and reviews.",
    tags: ["E-Commerce", "Payment Gateway", "Reviews", "Conversion"]
  },
  {
    title: "YatchtClub",
    url: "https://yatcht.vercel.app",
    image: "/projects/yatchtclub.png",
    description: "YatchClub is a website for a yatch club",
    tags: ["ShowCase", "Booking", "Yatch", "Reviews"]
  },
  // {
  //   title: "Pakistan Properties and Builders",
  //   url: "https://pakistanpropertiesandbuilders.com",
  //   image: "/projects/pakistanpropertiesandbuilders.png",
  //   description: "Pakistan Properties and Builders is a website for a real estate company",
  //   tags: ["PHP", "MySQL", "SEO", "Real Estate"]
  // }
];

function getTagClass(tag: string): string {
  const t = tag.toLowerCase();
  const isConversion = t.includes("seo") || t.includes("conversion") || t.includes("review");
  return isConversion
    ? "border-accent-amber/40 text-accent-amber bg-accent-amber/10"
    : "border-accent-cyan/40 text-accent-cyan bg-accent-cyan/10";
}

export default function ProjectsGrid() {
  return (
    <section className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Link
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
            aria-label={`Open ${p.title}`}
          >
            <Card className="h-full hover:border-primary/40 transition-colors card-tilt hover-lift glow-card border border-border/80 hover:ring-1 hover:ring-primary/30 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{p.title}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                {/* Image with subtle pan/zoom on hover */}
                <div className="rounded-md overflow-hidden border border-border/50 transform-gpu transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-[2%]">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={p.image}
                      alt={`${p.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={false}
                    />
                  </AspectRatio>
                </div>

                {/* Browser bar mock on hover */}
                <div className="pointer-events-none absolute left-3 right-3 top-3 h-8 rounded-md bg-background/70 backdrop-blur-sm border border-border/60 flex items-center gap-2 px-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="w-2 h-2 rounded-full bg-red-500/60" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <span className="w-2 h-2 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-[11px] text-muted-foreground truncate">{p.url.replace(/^https?:\/\//, "")}</span>
                </div>

                {/* Overlay sneak peek with description and tags */}
                <div className="pointer-events-none absolute inset-0 flex items-end p-4 bg-gradient-to-t from-background/85 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="w-full">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className={`text-[11px] tracking-wide ${getTagClass(t)}`}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}


