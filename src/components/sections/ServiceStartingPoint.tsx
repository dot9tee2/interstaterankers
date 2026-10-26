"use client";

import { useState } from "react";
import { ArrowRight, Search, Workflow, MessageSquare } from "lucide-react";
import type { StartingPath } from "@/data/core-service-presentation";
import styles from "./GbpVisuals.module.css";

const icons = [Search, Workflow, MessageSquare];

export default function ServiceStartingPoint({ slug, paths }: { slug: string; paths: StartingPath[] }) {
  const [selected, setSelected] = useState(0);
  const answerId = `${slug}-starting-answer`;
  const path = paths[selected];
  return <div className={styles.startingPoint}>
    <div className={styles.choices} role="group" aria-label={`Your ${slug === "ppc" ? "Google Ads" : slug === "seo" ? "website SEO" : "answering"} starting point`}>
      {paths.map((item, i) => { const Icon = icons[i] ?? Search; return <button key={item.label} type="button" aria-pressed={selected === i} aria-controls={answerId} onClick={() => setSelected(i)}><Icon size={19} aria-hidden="true" />{item.label}<ArrowRight size={16} aria-hidden="true" /></button>; })}
    </div>
    <div id={answerId} className={styles.answer}><p className={styles.eyebrow}>Your route with ISR</p><h3>{path.title}</h3><p>{path.text}</p><ol className={styles.route}>{path.steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol></div>
  </div>;
}
