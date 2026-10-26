"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, CalendarDays, Check, FileCheck, ImagePlus, MapPin, MessageSquare, Search, ShieldCheck, Users } from "lucide-react";
import styles from "./GbpVisuals.module.css";

export function GbpStartingPoint() {
  const [selected, setSelected] = useState(0);
  const paths = [
    { label: "I have a profile", icon: Search, title: "Find what is holding it back.", text: "We audit your information, services and local competitors before planning changes. You keep ownership and invite ISR as a manager.", steps: ["Manager access", "Business audit", "Research & improvements"] },
    { label: "I need a profile", icon: Building2, title: "Build the right foundation first.", text: "New profile creation is quoted separately. We help prepare the business information and guide verification; you participate as the business owner.", steps: ["Business information", "Separately quoted setup", "Owner-led verification"] },
    { label: "My listing has an issue", icon: ShieldCheck, title: "Understand the issue before acting.", text: "We review the listing and accurate business documents, then guide the available next steps. Verification, reinstatement and review removal depend on the platform.", steps: ["Review the issue", "Gather documentation", "Appropriate next steps"] },
  ];
  return <div className={styles.startingPoint}>
    <div className={styles.choices} role="group" aria-label="Your Google Business Profile starting point">{paths.map((path, i) => { const Icon = path.icon; return <button key={path.label} type="button" aria-pressed={selected === i} aria-controls="gbp-starting-answer" onClick={() => setSelected(i)}><Icon size={19} aria-hidden="true" />{path.label}<ArrowRight size={16} aria-hidden="true" /></button>; })}</div>
    <div id="gbp-starting-answer" className={styles.answer}><p className={styles.eyebrow}>Your route with ISR</p><h3>{paths[selected].title}</h3><p>{paths[selected].text}</p><ol className={styles.route}>{paths[selected].steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol></div>
  </div>;
}

export function GbpVisual({ kind }: { kind: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.25 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (kind === "service-area") {
    const labels = ["Service-area business", "Storefront", "Multiple locations"];
    const descriptions = ["Tell us where your team travels and which jobs it takes. The profile should reflect that real coverage.", "Keep your location, hours and customer-facing services clear. We work from the facts of your operation.", "We assess each location's services, coverage and contact route. The quote accounts for the additional work."];
    return <figure ref={ref} className={styles.figure} data-seen={visible}>
      <div className={styles.figureHeading}><MapPin size={18} />Your business, your coverage<small>Illustration</small></div>
      <div className={styles.coverageMap} aria-hidden="true"><svg viewBox="0 0 440 240"><path className={styles.roads} d="M0 40L440 150M50 0L180 240M340 0L240 240M0 190L440 70" /><ellipse className={styles.coverage} cx="220" cy="115" rx={selected === 1 ? 45 : 130} ry={selected === 1 ? 45 : 82} /><path className={styles.connection} d="M145 100L220 120 300 80" style={{ opacity: selected === 2 ? 1 : 0 }} /></svg><span className={styles.centralPin}><Building2 size={26} /></span>{selected === 2 && <><span className={styles.branchOne}><MapPin size={23} /></span><span className={styles.branchTwo}><MapPin size={23} /></span></>}<span className={styles.mapCaption}>{labels[selected]}</span></div>
      <div className={styles.modeButtons} role="group" aria-label="Explore business coverage types">{labels.map((label, i) => <button key={label} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{label}</button>)}</div>
      <figcaption><p>{descriptions[selected]}</p><small>Illustrative coverage, not a ranking map or a promise of visibility.</small></figcaption>
    </figure>;
  }

  if (kind === "profile-activity") {
    return <figure ref={ref} className={styles.figure} data-seen={visible}>
      <div className={styles.figureHeading}><CalendarDays size={18} />A profile that stays active<small>Ongoing schedule</small></div>
      <div className={styles.calendar} aria-label="Illustrative schedule showing three posts each week"><div className={styles.calendarHeader}><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div className={styles.days}>{Array.from({ length: 21 }, (_, i) => { const posted = [0, 2, 4].includes(i % 7); return <span key={i} className={posted ? styles.postDay : ""} style={{ animationDelay: `${Math.floor(i / 7) * 200 + (i % 7) * 65}ms` }}><small>{i + 1}</small>{posted && <ImagePlus size={18} aria-hidden="true" />}</span>; })}</div></div>
      <div className={styles.contentFlow}><span><ImagePlus size={18} />Your real work photos</span><ArrowRight size={16} aria-hidden="true" /><span><FileCheck size={18} />ISR prepares the update</span></div>
      <figcaption><strong>Three posts a week after the initial stage.</strong><p>Posting may be more frequent at the start. You supply photos and business updates; we turn them into relevant profile activity.</p><small>Example posting days. The agreed schedule can vary.</small></figcaption>
    </figure>;
  }

  const steps = [
    { label: "Understand", icon: Search, title: "Start with the facts.", text: "Your team supplies the job context. We distinguish a real customer concern from suspected abuse or a listing issue." },
    { label: "Respond", icon: MessageSquare, title: "Give the concern an appropriate response.", text: "We help prepare a constructive reply and support the customer-resolution process with your team." },
    { label: "Next step", icon: ShieldCheck, title: "Resolve the issue or report with evidence.", text: "Customer resolution and platform reporting are different routes. We guide the appropriate next step; removal and reinstatement are not guaranteed." },
  ];
  return <figure ref={ref} className={styles.figure} data-seen={visible}>
    <div className={styles.figureHeading}><MessageSquare size={18} />A thoughtful response, step by step<small>Illustration</small></div>
    <div className={styles.reviewDiagram} aria-hidden="true"><div className={styles.reviewMessage}><span><Users size={22} /></span><div><strong>A customer raises a concern</strong><i /><i /></div></div><div className={styles.reviewLine} /><div className={styles.reviewNodes}>{steps.map((step, i) => { const Icon = step.icon; return <span key={step.label} className={selected >= i ? styles.nodeActive : ""}><Icon size={24} /><small>{step.label}</small></span>; })}</div></div>
    <div className={styles.modeButtons} role="group" aria-label="Explore the review response workflow">{steps.map((step, i) => <button key={step.label} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{i + 1}. {step.label}</button>)}</div>
    <figcaption><strong>{steps[selected].title}</strong><p>{steps[selected].text}</p><small>Reporting an issue does not guarantee a platform decision.</small></figcaption>
  </figure>;
}

export function GbpMilestones() {
  const milestones = [
    { label: "First two weeks", title: "Research & priorities", text: "Audit the business, review competitors and plan the profile improvements.", icon: Search },
    { label: "Initial stage onward", title: "Improve & maintain", text: "Refine information, publish real work, support reviews and keep details current.", icon: Check },
    { label: "Weekly + monthly", title: "Make the work visible", text: "Weekly ISR HQ updates, plus a detailed monthly report reviewed together on a call.", icon: CalendarDays },
  ];
  return <ol className={styles.milestones}>{milestones.map((item) => { const Icon = item.icon; return <li key={item.title}><span className={styles.milestoneIcon}><Icon size={22} aria-hidden="true" /></span><p className={styles.eyebrow}>{item.label}</p><h3>{item.title}</h3><p>{item.text}</p></li>; })}</ol>;
}
