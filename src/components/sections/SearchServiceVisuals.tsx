"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, FileText, MapPin, Phone, Search, Settings2, X } from "lucide-react";
import styles from "./SearchServiceVisuals.module.css";

const services = ["Repair", "Installation", "Maintenance"];
const questions = [
  { label: "Can it be repaired?", answer: "The fault, condition and available parts determine whether repair is practical. An assessment is needed before recommending replacement.", next: "Describe the fault and share the equipment details." },
  { label: "What affects installation?", answer: "Equipment choice, site access and existing connections shape the installation scope. Confirm these details before requesting an estimate.", next: "Share the proposed equipment and photos of the site." },
  { label: "How should I prepare?", answer: "Keep the work area accessible and ask the business about any site-specific preparation. Requirements depend on the service and equipment.", next: "Confirm access arrangements with the service team." },
];
const costs = [
  { label: "Media spend", title: "Advertising delivery", text: "Budget paid to the advertising platform. Allocation depends on agreed services, coverage and capacity.", note: "Separate from the management fee." },
  { label: "Management", title: "Campaign work", text: "The fee for agreed research, setup, reviews and adjustments. Deliverables and review arrangements belong in the proposal.", note: "Pays for the agreed management scope." },
  { label: "Page work", title: "The destination", text: "A review, edits and a new landing-page build are different scopes. Any additional page or tracking work should be identified separately.", note: "A new page is included only when specified." },
];
const stages = [
  { label: "Enquiry", title: "Verify that contact happened", text: "A submitted form or verified call can evidence an enquiry. A phone-link click records an attempted action; it does not establish a completed call.", evidence: "Form submission or call record, where configured" },
  { label: "Qualified", title: "Check the fit", text: "Confirm the requested service, location and agreed customer criteria. A recorded conversion alone does not establish a suitable lead.", evidence: "Service, coverage and qualification notes" },
  { label: "Booked", title: "Confirm the appointment", text: "The business confirms a date and acceptance of the appointment. A qualified enquiry can remain unbooked.", evidence: "Confirmed appointment in the booking record" },
  { label: "Customer", title: "Confirm the business outcome", text: "Use the business record to confirm that work was purchased. A booking alone does not establish a sale.", evidence: "Confirmed purchase or completed job record" },
];

function Card({ label, title, text }: { label: string; title: string; text: string }) {
  return <div className={styles.card}><small>{label}</small><strong>{title}</strong><p>{text}</p></div>;
}

/** Section IDs from core-seo-ads; the parent owns placement and surrounding copy. */
export function SearchServiceVisual({ slug, kind }: { slug: string; kind: string }) {
  const instance = useId();
  const panelId = `search-visual-${encodeURIComponent(slug)}-${encodeURIComponent(kind)}-${instance}`;
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [included, setIncluded] = useState([true, false, true, false]);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setSeen(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const buttons = (labels: string[], group: string) => <div className={styles.controls} role="group" aria-label={group}>{labels.map((label, index) => <button type="button" key={label} aria-pressed={selected === index} aria-controls={panelId} onClick={() => setSelected(index)}>{label}</button>)}</div>;
  let title: string;
  let content: ReactNode;
  let caption: string;

  if (slug === "seo" && kind === "technical-and-content") {
    title = "Two problems, different fixes";
    caption = "Illustrative page structure. Access and useful information need their own checks.";
    content = <>{buttons(["Technical", "Content"], "Explore SEO fixes")}<div id={panelId} className={styles.panel} aria-live="polite">
      <div className={styles.sitemap}>
        <div className={styles.root}><Search size={17} aria-hidden="true" />Home / services</div>
        <svg className={styles.links} viewBox="0 0 300 48" preserveAspectRatio="none" aria-hidden="true"><path d="M150 0V22H50V48M150 22V48M150 22H250V48" /></svg>
        <div className={styles.nodes}><span>Repair</span><span>Installation</span><span>Helpful guide</span></div>
      </div>
      {selected === 0 ? <Card label="Technical access" title="Reconnect the journey" text="Map old addresses to relevant destinations, correct internal links and check unintended indexing blocks. More copy cannot repair a broken link." /> : <Card label="Content clarity" title="Explain the service" text="Describe the work, coverage and next step. Link a supporting guide to its relevant service page. Faster loading alone cannot answer a missing service question." />}
    </div></>;
  } else if (slug === "seo" && kind === "services-and-locations") {
    const details = ["Explain faults assessed, repair limitations and what information to send.", "Explain installation scope, site requirements and estimate preparation.", "Explain maintenance tasks, equipment suitability and scheduling requirements."];
    title = "Match the page to the job";
    caption = "Example planning cards, not client projects. Use only genuine services and coverage.";
    content = <>{buttons(services, "Explore service page plans")}<div id={panelId} className={styles.panel} aria-live="polite"><div className={styles.pair}>
      <Card label="Service page" title={services[selected]} text={details[selected]} />
      <Card label="Location information" title={`${services[selected]} in your service area`} text="Confirm actual coverage, local availability and the right contact route. A separate location page needs useful, distinct information." />
    </div><div className={styles.strip}><MapPin size={17} aria-hidden="true" />Real coverage → relevant service → clear contact</div></div></>;
  } else if (slug === "seo" && kind === "content-that-helps") {
    title = "An answer with a useful next step";
    caption = "Illustrative content anatomy. Verify service details with the business before publishing.";
    content = <>{buttons(questions.map((q) => q.label), "Choose a customer question")}<div id={panelId} className={styles.panel} aria-live="polite"><ol className={styles.anatomy}>
      <li><span>01 · Customer question</span><strong>{questions[selected].label}</strong></li>
      <li><span>02 · Clear answer</span><p>{questions[selected].answer}</p></li>
      <li><span>03 · Next contact</span><p>{questions[selected].next}</p></li>
    </ol></div></>;
  } else if (slug === "ppc" && kind === "targeting-real-services") {
    title = "Define what belongs in the plan";
    caption = "Illustrative targeting choices. Actual settings need review; exclusions do not guarantee enquiry quality.";
    const choices = ["Repair service", "Equipment retail", "Within coverage", "Outside coverage"];
    content = <><div className={styles.targetControls}>{["Service choices", "Location choices"].map((group, groupIndex) => <div role="group" aria-label={group} key={group}><small>{group}</small>{choices.slice(groupIndex * 2, groupIndex * 2 + 2).map((label, index) => {
      const position = groupIndex * 2 + index;
      return <button type="button" key={label} aria-pressed={included[position]} aria-controls={panelId} onClick={() => setIncluded((current) => current.map((value, i) => i === position ? !value : value))}>{included[position] ? <Check size={16} aria-hidden="true" /> : <X size={16} aria-hidden="true" />}<span>{label}</span><small>{included[position] ? "Include" : "Exclude"}</small></button>;
    })}</div>)}</div><div id={panelId} className={styles.panel} aria-live="polite"><div className={styles.targetList}>{choices.map((choice, index) => <div key={choice} data-included={included[index]}><span>{choice}</span><strong>{included[index] ? "In the plan" : "Excluded from plan"}</strong></div>)}</div><p className={styles.note}>Agree real services and travel limits before configuring targeting and exclusions.</p></div></>;
  } else if (slug === "ppc" && kind === "budget-and-landing-pages") {
    title = "Separate costs. Connect the journey.";
    caption = "Illustrative journey, not a delivery or conversion forecast. Scope each cost component in the proposal.";
    content = <>{buttons(costs.map((cost) => cost.label), "Explore advertising cost components")}<div id={panelId} className={styles.panel} aria-live="polite"><Card label={costs[selected].label} title={costs[selected].title} text={costs[selected].text} /><p className={styles.note}>{costs[selected].note}</p>
      <ol className={styles.journey}><li><Search size={18} aria-hidden="true" /><small>Ad</small><strong>Repair service</strong></li><li><FileText size={18} aria-hidden="true" /><small>Matching page</small><strong>Repair scope & coverage</strong></li><li><Phone size={18} aria-hidden="true" /><small>Contact route</small><strong>Request an assessment</strong></li></ol>
    </div></>;
  } else if (slug === "ppc" && kind === "lead-quality") {
    title = "Each stage needs its own evidence";
    caption = "Evidence stages, not automatic progression. Your team confirms qualification, bookings and purchases.";
    content = <>{buttons(stages.map((stage) => stage.label), "Explore enquiry evidence stages")}<div id={panelId} className={styles.panel} aria-live="polite"><div className={styles.callCheck}><span><Phone size={17} aria-hidden="true" />Recorded phone click</span><span aria-hidden="true">≠</span><span>Completed call</span></div><Card label={`${selected + 1} · ${stages[selected].label}`} title={stages[selected].title} text={stages[selected].text} /><div className={styles.strip}><FileText size={17} aria-hidden="true" /><span>Evidence: {stages[selected].evidence}</span></div></div></>;
  } else {
    return null;
  }

  return <figure ref={ref} className={styles.figure} data-seen={seen}><div className={styles.heading}><Settings2 size={18} aria-hidden="true" /><span>{title}</span><small>Illustration</small></div>{content}<figcaption>{caption}</figcaption></figure>;
}
