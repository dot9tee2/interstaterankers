"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, CalendarCheck, Check, FileSearch, FileText, Headphones, MapPin, MousePointerClick, Pause, Phone, Play, Search, Settings2, Workflow } from "lucide-react";
import { usePrefersReducedMotion } from "./service-stories/hooks";
import styles from "./ServiceExplainer.module.css";

const stories = {
  gmb: {
    label: "From profile research to useful enquiries",
    steps: [
      { label: "Research", title: "Start with the business and its service area.", text: "We audit the listing, study competing profiles and research the services customers are looking for." },
      { label: "Improve", title: "Make the profile explain what you do.", text: "Categories, service descriptions and contact details are shaped around your actual operation." },
      { label: "Maintain", title: "Keep the listing connected to real work.", text: "Your work photos, three weekly posts after the initial stage, and review support keep information current." },
      { label: "Review", title: "Read the activity alongside real enquiries.", text: "Weekly ISR HQ updates and a monthly review connect completed work with available clicks and call activity." },
    ],
  },
  answering: {
    label: "How an incoming call becomes an organized next step",
    steps: [
      { label: "Receive", title: "A customer calls your business number.", text: "We agree forwarding or VoIP routing so the call enters the workflow prepared for your business." },
      { label: "Answer", title: "The response follows your coverage plan.", text: "Humans answer Monday–Friday, 9 AM–5 PM Houston time. Outside that window, support combines humans and AI." },
      { label: "Help", title: "Use your answers and booking instructions.", text: "We answer approved questions, record the request and book an appointment where the agreed rules allow it." },
      { label: "Handoff", title: "Give your team a record they can act on.", text: "The enquiry, action and next responsibility go into your agreed CRM workflow or ISR HQ." },
    ],
  },
  seo: {
    label: "How website SEO connects technical work with customer decisions",
    steps: [
      { label: "Audit", title: "Find what is stopping useful pages from working.", text: "We assess technical health, indexing, existing content and relevant search data before setting priorities." },
      { label: "Fix", title: "Connect recommendations with implementation.", text: "Our in-house development team can carry out agreed fixes to access, page structure and enquiry paths." },
      { label: "Explain", title: "Build pages around the work you actually sell.", text: "Service and location content answers customer questions and reflects genuine business coverage." },
      { label: "Measure", title: "Separate completed work from measured outcomes.", text: "ISR HQ updates and agreed reports explain search activity, tracked enquiries and the next priorities." },
    ],
  },
  ppc: {
    label: "The journey from a relevant search to a tracked enquiry",
    steps: [
      { label: "Target", title: "Choose the services and locations that fit.", text: "Campaign planning starts with your actual jobs, travel limits, budget and capacity to handle enquiries." },
      { label: "Advertise", title: "Match the ad to what the customer needs.", text: "Agreed keywords, exclusions and accurate ad copy help keep the campaign relevant to the business." },
      { label: "Connect", title: "Send the visitor to a useful destination.", text: "The page should explain the advertised service and make the next contact action easy. New pages are separately scoped." },
      { label: "Qualify", title: "An enquiry is the beginning of the conversation.", text: "Tracking records contact actions; CRM data and your feedback establish which become qualified leads, bookings and customers." },
    ],
  },
} as const;

type ServiceSlug = keyof typeof stories;
const icons = { gmb: MapPin, answering: Headphones, seo: FileSearch, ppc: MousePointerClick };

function Status({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <span className={`${styles.status} ${active ? styles.statusActive : ""}`}><span aria-hidden="true" />{children}</span>;
}

function MapScene({ step }: { step: number }) {
  return <div className={styles.mapScene}>
    <div className={styles.map} aria-hidden="true">
      <svg viewBox="0 0 420 210" preserveAspectRatio="xMidYMid slice"><path className={styles.road} d="M-20 30L160 90 440 20M25-20L110 230M285-20L225 230M-20 170L440 115" /><ellipse className={`${styles.serviceArea} ${step > 0 ? styles.areaActive : ""}`} cx="210" cy="110" rx="112" ry="69" /><path className={styles.route} d="M120 140L185 115 235 75 300 105" pathLength="1" style={{ strokeDashoffset: step > 0 ? 0 : 1 }} /></svg>
      <span className={styles.mapPin}><MapPin size={30} /></span><span className={styles.mapLabel}>Your service area</span>
      <span className={`${styles.photoTag} ${step >= 2 ? styles.tagActive : ""}`}><Check size={14} />Work photos & posts</span>
    </div>
    <div className={styles.mockCard}><div className={styles.cardHeading}><span className={styles.iconTile}><MapPin size={19} /></span><div><strong>Your business profile</strong><small>Services • locations • contact details</small></div></div>
      <div className={styles.checks}>{["Business & competitor research", "Clear services and categories", "Regular posts and review support"].map((text, i) => <div key={text} className={step >= i ? styles.checked : ""}><span>{step >= i ? <Check size={12} /> : <span />}</span>{text}</div>)}</div>
      <Status active={step === 3}>{step === 3 ? "Review calls and clicks in context" : "You retain profile ownership"}</Status>
    </div>
  </div>;
}

function AnsweringScene({ step }: { step: number }) {
  return <div className={styles.callScene}>
    <div className={`${styles.flowCard} ${step === 0 ? styles.focused : ""}`}><Phone size={20} /><div><strong>Incoming customer call</strong><small>Your number → agreed call routing</small></div><span className={styles.signal} data-active={step === 0} /></div>
    <div className={styles.connector}><ArrowDown size={17} /></div>
    <div className={styles.twoColumns}><div className={`${styles.routeCard} ${step === 1 ? styles.focused : ""}`}><Headphones size={20} /><strong>Human team</strong><small>Mon–Fri · 9 AM–5 PM<br />Houston / Central Time</small></div><div className={`${styles.routeCard} ${step === 1 ? styles.focused : ""}`}><Workflow size={20} /><strong>Human + AI</strong><small>Outside those hours<br />As agreed for your business</small></div></div>
    <div className={styles.connector}><ArrowDown size={17} /></div>
    <div className={`${styles.flowCard} ${step === 2 ? styles.focused : ""}`}><CalendarCheck size={20} /><div><strong>Answer · record · arrange</strong><small>Approved FAQs and booking rules</small></div>{step >= 2 && <Check className={styles.completedIcon} size={18} />}</div>
    <div className={`${styles.handoff} ${step === 3 ? styles.focused : ""}`}><FileText size={18} /><span>Enquiry → action → next responsibility</span><strong>CRM / ISR HQ</strong></div>
  </div>;
}

function SeoScene({ step }: { step: number }) {
  return <div className={styles.seoScene}><div className={styles.browserBar}><span /><span /><span /><small>Your service business website</small></div>
    <div className={styles.siteDiagram}><div className={`${styles.siteRoot} ${step === 0 ? styles.focused : ""}`}><Search size={18} />Website audit</div><svg aria-hidden="true" viewBox="0 0 360 60"><path d="M180 0V25H60V60M180 25V60M180 25H300V60" /></svg><div className={styles.sitePages}>{["Services", "Locations", "Contact"].map((label) => <div key={label} className={step >= 2 ? styles.pageActive : ""}><FileText size={18} /><strong>{label}</strong><i /><i /></div>)}</div></div>
    <div className={`${styles.flowCard} ${step === 1 ? styles.focused : ""}`}><Settings2 size={20} /><div><strong>Agreed technical improvements</strong><small>Indexing · internal links · enquiry paths</small></div>{step >= 1 && <Check className={styles.completedIcon} size={18} />}</div>
    <div className={styles.checks}><div className={step >= 2 ? styles.checked : ""}><span>{step >= 2 && <Check size={12} />}</span>Pages that answer real service questions</div></div>
    <Status active={step === 3}>{step === 3 ? "Review work, search activity and enquiries" : "Priorities based on your website"}</Status>
  </div>;
}

function AdsScene({ step }: { step: number }) {
  return <div className={styles.adsScene}><div className={`${styles.searchBox} ${step === 0 ? styles.focused : ""}`}><Search size={17} /><span>Customer searches for your service</span></div>
    <div className={`${styles.adCard} ${step === 1 ? styles.focused : ""}`}><small>Sponsored · illustrative ad</small><strong>Your service. Your actual coverage.</strong><p>Clear offer, relevant location, useful next step.</p><span><MapPin size={12} />Agreed service areas</span></div>
    <div className={styles.connector}><ArrowDown size={17} /></div>
    <div className={`${styles.landingCard} ${step === 2 ? styles.focused : ""}`}><div><FileText size={19} /><strong>Matching landing page</strong></div><p>What you do · where you work · how to enquire</p><span className={styles.mockAction}>Call or send an enquiry <ArrowRight size={13} /></span></div>
    <div className={styles.leadStages}>{["Enquiry", "Qualified", "Booked"].map((label, i) => <span key={label} className={step === 3 && i === 0 ? styles.leadActive : ""}>{label}{i < 2 && <ArrowRight size={12} />}</span>)}</div><small className={styles.leadNote}>Qualification and bookings need evidence beyond the click.</small>
  </div>;
}

const scenes = { gmb: MapScene, answering: AnsweringScene, seo: SeoScene, ppc: AdsScene };

export default function ServiceExplainer({ slug }: { slug: string }) {
  const kind: ServiceSlug = slug in stories ? slug as ServiceSlug : "gmb";
  const story = stories[kind];
  const Scene = scenes[kind];
  const Icon = icons[kind];
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !playing || reduced || step === story.steps.length - 1) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setStep((previous) => Math.min(previous + 1, story.steps.length - 1));
    }, 3200);
    return () => window.clearInterval(timer);
  }, [visible, playing, reduced, step, story.steps.length]);

  const select = (index: number) => { setPlaying(false); setStep(index); };
  const finished = step === story.steps.length - 1;

  return <figure ref={ref} className={styles.explainer} aria-label={story.label} data-reduced={reduced}>
    <div className={styles.header}><span><Icon size={17} />How the service works</span><small>Illustration</small></div>
    <div className={styles.scene} aria-hidden="true"><Scene step={step} /></div>
    <div className={styles.controls}>
      <div className={styles.steps} role="group" aria-label="Choose an explanation step">{story.steps.map((item, i) => <button key={item.label} type="button" aria-pressed={step === i} aria-controls={`explanation-${kind}`} onClick={() => select(i)}><span>{String(i + 1).padStart(2, "0")}</span>{item.label}<i className={i <= step ? styles.progressActive : ""} /></button>)}</div>
      {!reduced && <button type="button" className={styles.playButton} aria-label={finished ? "Replay explanation" : playing ? "Pause explanation" : "Play explanation"} onClick={() => { if (finished) { setStep(0); setPlaying(true); } else setPlaying(!playing); }}>{playing && !finished ? <Pause size={15} /> : <Play size={15} />}</button>}
    </div>
    <figcaption id={`explanation-${kind}`} className={styles.caption}><strong>{story.steps[step].title}</strong><p>{story.steps[step].text}</p><small>Illustrative workflow, not client results. Select any step to explore.</small></figcaption>
  </figure>;
}

export function ServiceProcess({ steps }: { steps: { title: string; description: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.setAttribute("data-seen", "true"); observer.unobserve(entry.target); } }); }, { threshold: 0.4 });
    node.querySelectorAll("li").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return <ol ref={ref} className={styles.process}>{steps.map((item, i) => <li key={item.title}><span className={styles.processNumber} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><div><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p></div></li>)}</ol>;
}
