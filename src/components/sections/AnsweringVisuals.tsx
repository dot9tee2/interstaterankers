"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Bot, CalendarDays, ClipboardList, Clock3, FileCheck, Headphones, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import styles from "./AnsweringVisuals.module.css";

const bookingSteps = [
  { label: "Service / location", title: "Check the request fits.", text: "Collect the service and property location. Compare both with your approved services and working areas.", icon: MapPin, fields: ["Requested service", "Property location", "Service-area rules"] },
  { label: "Approved availability", title: "Use your calendar rules.", text: "Check calendar access, appointment type, duration and approved slots before offering a time.", icon: CalendarDays, fields: ["Appointment type", "Duration & available slots", "Required caller details"] },
  { label: "Appointment / handoff", title: "Stay within your authority.", text: "Schedule only within the agreed rules. Custom quotes, exceptions and unavailable slots go to your team.", icon: FileCheck, fields: ["Within rules → appointment", "Outside rules → team handoff", "Explain the next step to the caller"] },
];

const recordViews = [
  { label: "Request", title: "What did the caller need?", fields: [["Caller", "Name & callback number"], ["Request", "Service needed & location"], ["Preference", "Preferred next step"]] },
  { label: "Action", title: "What happened on the call?", fields: [["Answer", "Approved information shared"], ["Outcome", "Appointment or message recorded"], ["Follow-up", "Agreed action & open questions"]] },
  { label: "Next owner", title: "Who takes it from here?", fields: [["Owner", "Designated team contact"], ["Next action", "Review request or return call"], ["Route", "Agreed handoff / escalation channel"]] },
];

export function AnsweringVisual({ kind }: { kind: string }) {
  const ref = useRef<HTMLElement>(null);
  const instanceId = useId();
  const [seen, setSeen] = useState(false);
  // Keep each panel's controls independent, including when kind changes.
  const [afterHours, setAfterHours] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [standalone, setStandalone] = useState(false);
  const [recordView, setRecordView] = useState(0);
  const panelId = `answering-${kind}-${instanceId}`;
  const titleId = `${panelId}-title`;

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setSeen(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [kind]);

  if (kind === "coverage") return (
    <figure ref={ref} className={styles.figure} data-seen={seen} aria-labelledby={titleId}>
      <div className={styles.heading}><Headphones size={18} aria-hidden="true" /><span id={titleId}>The right coverage window</span><small>Illustration</small></div>
      <div className={styles.controls} role="group" aria-label="Explore answering coverage">
        {["Business hours", "After hours"].map((label, i) => <button key={label} type="button" aria-pressed={afterHours === Boolean(i)} aria-controls={panelId} onClick={() => setAfterHours(Boolean(i))}>{label}</button>)}
      </div>
      <div id={panelId} className={styles.diagram} aria-live="polite" aria-atomic="true">
        <div className={styles.clockFace} aria-hidden="true"><Clock3 size={54} strokeWidth={1.2} /><span>Houston / Central</span></div>
        <div className={styles.schedule}>
          <div data-active={!afterHours}><span className={styles.dot} /><div><strong>9 AM–5 PM · Mon–Fri</strong><span>Human answering</span></div><Headphones size={20} aria-hidden="true" /></div>
          <div data-active={afterHours}><span className={styles.dot} /><div><strong>Outside that window</strong><span>Mixed human + AI, as scoped</span></div><Bot size={20} aria-hidden="true" /></div>
        </div>
        <div className={styles.status}><Phone size={17} aria-hidden="true" /><span>{afterHours ? "Agreed backup & escalation route" : "Business-specific answers & intake"}</span></div>
      </div>
      <figcaption>{afterHours ? "The mix of human and AI support follows your agreed handling and escalation scope." : "Human answering follows Houston’s local Central Time, including daylight saving changes."}</figcaption>
    </figure>
  );

  if (kind === "booking-rules") {
    const step = bookingSteps[bookingStep];
    const Icon = step.icon;
    return (
      <figure ref={ref} className={styles.figure} data-seen={seen} aria-labelledby={titleId}>
        <div className={styles.heading}><CalendarDays size={18} aria-hidden="true" /><span id={titleId}>Your rules before a time slot</span><small>Illustration</small></div>
        <div className={`${styles.controls} ${styles.steps}`} role="group" aria-label="Inspect booking steps">
          {bookingSteps.map((item, i) => <button key={item.label} type="button" aria-pressed={bookingStep === i} aria-controls={panelId} onClick={() => setBookingStep(i)}><span className={styles.number}>{i + 1}</span>{item.label}</button>)}
        </div>
        <div id={panelId} className={styles.diagram} aria-live="polite" aria-atomic="true">
          <div className={styles.ruleCard}><div className={styles.cardHeading}><Icon size={24} aria-hidden="true" /><span className={styles.eyebrow}>Rule check {bookingStep + 1} / 3</span></div><h3>{step.title}</h3><ul className={styles.checklist}>{step.fields.map((field) => <li key={field}><span aria-hidden="true" />{field}</li>)}</ul></div>
          <div className={styles.branch}><span><CalendarDays size={17} aria-hidden="true" />Appointment within rules</span><span><UserRound size={17} aria-hidden="true" />Team handles exceptions</span></div>
          <p className={styles.detail}>{step.text}</p>
        </div>
        <figcaption>Example workflow only. No appointment is booked here; an estimate, consultation and service visit are distinct appointment types.</figcaption>
      </figure>
    );
  }

  if (kind === "pilot") {
    const milestones = standalone
      ? [{ title: "Signed agreement", note: "Define the trial & scope" }, { title: "Standalone trial week", note: "One week free of service charge" }, { title: "Review the workflow", note: "Agree any ongoing arrangement" }]
      : [{ title: "Signed agreement", note: "Initial service payment" }, { title: "Paid service + extra week", note: "Extra pilot week: no service charge" }, { title: "Next recurring payment", note: "Moved back by one week" }];
    return (
      <figure ref={ref} className={styles.figure} data-seen={seen} aria-labelledby={titleId}>
        <div className={styles.heading}><FileCheck size={18} aria-hidden="true" /><span id={titleId}>Two ways to evaluate the workflow</span><small>Illustration</small></div>
        <div className={styles.controls} role="group" aria-label="Compare pilot and trial arrangements">
          {["Paid service + extra week", "Standalone free week"].map((label, i) => <button key={label} type="button" aria-pressed={standalone === Boolean(i)} aria-controls={panelId} onClick={() => setStandalone(Boolean(i))}>{label}</button>)}
        </div>
        <div id={panelId} className={styles.diagram} aria-live="polite" aria-atomic="true">
          <ol className={styles.timeline}>{milestones.map((item, i) => <li key={i}><span className={styles.number}>{i + 1}</span><div><strong>{item.title}</strong><p>{item.note}</p></div>{i < 2 && <ArrowDown className={styles.timelineArrow} size={16} aria-hidden="true" />}</li>)}</ol>
          <div className={styles.agreement}><ShieldCheck size={20} aria-hidden="true" /><span>{standalone ? "Free service trial under a signed agreement." : "The initial payment is for service, not a separate setup fee."}</span></div>
        </div>
        <figcaption>{standalone ? "This standalone trial is separate from the extra pilot week after a service payment." : "The additional pilot week deliberately delays your next recurring payment by one week."}<span>Phone, usage, tools and other separate costs are agreed before either arrangement starts.</span></figcaption>
      </figure>
    );
  }

  if (kind === "call-information") {
    const view = recordViews[recordView];
    return (
      <figure ref={ref} className={styles.figure} data-seen={seen} aria-labelledby={titleId}>
        <div className={styles.heading}><ClipboardList size={18} aria-hidden="true" /><span id={titleId}>A call record with a next step</span><small>Illustration</small></div>
        <div className={styles.recordRoute} role="group" aria-label="Inspect recorded call fields">
          {recordViews.map((item, i) => <div key={item.label}><button type="button" aria-pressed={recordView === i} aria-controls={panelId} onClick={() => setRecordView(i)}>{i === 0 ? "Call request" : item.label}</button>{i < 2 && <ArrowRight size={15} aria-hidden="true" />}</div>)}
        </div>
        <div id={panelId} className={styles.diagram} aria-live="polite" aria-atomic="true">
          <div className={styles.recordCard}><div className={styles.cardHeading}><ClipboardList size={21} aria-hidden="true" /><span className={styles.eyebrow}>Recorded fields · example</span></div><h3>{view.title}</h3><dl>{view.fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
          <div className={styles.destinations}><span>Your CRM</span><span>or</span><span>ISR HQ</span></div>
          <p className={styles.detail}>CRM updates depend on agreed access and scope. ISR HQ provides visibility when an existing CRM is not used.</p>
        </div>
        <figcaption><ShieldCheck size={17} aria-hidden="true" />Recordings require consent and an agreed setup. Availability: up to three months; access and storage agreed during setup.</figcaption>
      </figure>
    );
  }

  return null;
}
