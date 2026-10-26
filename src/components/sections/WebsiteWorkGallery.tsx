"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Monitor, Smartphone } from "lucide-react";
import { websiteProjects } from "@/data/website-projects";

export default function WebsiteWorkGallery() {
  const [selected, setSelected] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const previewId = useId();
  const project = websiteProjects[selected];

  return (
    <div className="mt-10">
      <div aria-label="Choose a website project" className="mb-6 flex flex-wrap gap-2">
        {websiteProjects.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={selected === index} aria-controls={previewId} onClick={() => setSelected(index)} className={`min-h-11 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-background ${selected === index ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan" : "border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"}`}>
            {item.name}
          </button>
        ))}
      </div>
      <div id={previewId} className="grid items-center gap-8 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-background">
          <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-3 py-3 sm:px-5">
            <span className="min-w-0 truncate text-xs text-muted-foreground">{project.domain}</span>
            <div aria-label="Preview device" className="flex shrink-0 items-center gap-1 rounded-lg border border-border p-1">
              <button type="button" aria-label="Desktop preview" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")} className={`flex h-8 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${device === "desktop" ? "bg-muted text-foreground" : "text-muted-foreground/80 hover:text-foreground"}`}><Monitor aria-hidden="true" className="h-4 w-4" /></button>
              <button type="button" aria-label="Mobile preview" aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")} className={`flex h-8 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${device === "mobile" ? "bg-muted text-foreground" : "text-muted-foreground/80 hover:text-foreground"}`}><Smartphone aria-hidden="true" className="h-4 w-4" /></button>
            </div>
          </div>
          <div className={`relative flex h-[310px] items-center justify-center overflow-hidden sm:h-[430px] lg:h-[490px] ${device === "mobile" ? "bg-card py-5" : "bg-background"}`}>
            {device === "desktop" ? (
              <Image key={project.id + device} src={project.image} alt={`${project.name} desktop website preview`} fill unoptimized sizes="(min-width: 1024px) 65vw, 100vw" className="object-contain" />
            ) : (
              <Image key={project.id + device} src={project.mobileImage} alt={`${project.name} mobile website preview`} width={390} height={844} unoptimized className="h-full w-auto max-w-full rounded-xl border border-border object-contain" />
            )}
          </div>
          <p className="border-t border-border px-4 py-3 text-[11px] leading-relaxed text-muted-foreground/80 sm:px-5">Actual website capture. Explore the live site for the complete experience.</p>
        </div>
        <div className="min-w-0" aria-live="polite" aria-atomic="true">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-accent-cyan">{project.category}</p>
          <h3 className="text-3xl font-semibold tracking-tight text-foreground">{project.name}</h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.summary}</p>
          <ul className="mt-6 space-y-3">
            {project.focus.map(point => <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/80"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />{point}</li>)}
          </ul>
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline decoration-border underline-offset-8 transition-colors hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan">Visit {project.name}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span></a>
          <Link href="#website-enquiry" className="mt-5 flex min-h-11 w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan">Discuss your website<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  );
}
