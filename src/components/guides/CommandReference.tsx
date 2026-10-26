"use client";

import { useState } from "react";
import { Check, Copy, Download, Terminal } from "lucide-react";
import { commandGroups, guideFaqs, handbookPath, handbookSources, handoverStory } from "@/data/website-handbook";
import Link from "next/link";
import styles from "./CommandReference.module.css";

function CommandBlock({ code }: { code: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try { await navigator.clipboard.writeText(code); setState("copied"); }
    catch { setState("error"); }
  }
  return <div className={styles.code}><div><span><Terminal size={14} /> Terminal</span><button onClick={copy} type="button" aria-label="Copy commands">{state === "copied" ? <Check size={14} /> : <Copy size={14} />}{state === "copied" ? "Copied" : "Copy"}</button></div><pre><code>{code}</code></pre><span role="status" className={styles.copyStatus}>{state === "error" ? "Copy unavailable. Select the commands and copy them manually." : ""}</span></div>;
}

export function HandbookDownload() {
  return <a className={styles.download} href={handbookPath} download="Interstate-Rankers-Website-Launch-Handbook.pdf"><span className={styles.downloadIcon}><Download size={26} /></span><span><strong>Need more details? Download the complete PDF.</strong><small>Step-by-step setup, Git commands, hosting, domains, email, updates and troubleshooting. No sign-up.</small></span><span className={styles.fileType}>PDF <Download size={16} /></span></a>;
}

export function OurHandover() {
  return <section className={styles.ourStory} aria-labelledby="our-handover-title">
    <div><span className={styles.eyebrow}>A note from Maverick · Interstate Rankers</span><h2 id="our-handover-title">Your files. Your choice of what comes next.</h2><p>{handoverStory.introduction}</p><p>{handoverStory.approach}</p></div>
    <div className={styles.handoverCards}>{[
      ["01", "What’s in your ZIP", handoverStory.delivery],
      ["02", "How the accounts work", handoverStory.accounts],
      ["03", "Guidance after handover", handoverStory.support],
    ].map(([n,title,text]) => <div key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
  </section>;
}

export function ConsultationInvite() {
  return <section className={styles.consultation} aria-labelledby="consultation-title"><div><span className={styles.eyebrow}>Let’s work through it together</span><h2 id="consultation-title">Have the files, but need a hand?</h2><p>{handoverStory.consultation}</p><p className={styles.signature}>Maverick · Interstate Rankers</p></div><Link href="/contact">Talk to us · Free consultation ↗</Link></section>;
}

export function CommandReference() {
  return <div className={styles.reference}>
    <section aria-labelledby="commands-title" id="git-commands"><span className={styles.eyebrow}>Keep this beside your terminal</span><h2 id="commands-title">The commands, with the context.</h2><p>Run one line at a time. Replace the example paths, account names and addresses first. Git commands work in PowerShell, Terminal and Git Bash; the local settings copy command below is labelled for Windows.</p><div className={styles.commands}>{commandGroups.map((group,i) => <div className={styles.command} key={group.title}><div><span className={styles.number}>0{i + 1}</span><h3>{group.title}</h3><p>{group.note}</p><div className={styles.result}><Check size={16} /><span>{group.result}</span></div></div><CommandBlock code={group.code} /></div>)}</div></section>
    <section aria-labelledby="faq-title" className={styles.faq}><span className={styles.eyebrow}>When something gets in the way</span><h2 id="faq-title">Real questions. Practical fixes.</h2><p>Start with the question that matches what you see. The handbook has the longer walkthrough.</p>{guideFaqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
    <details className={styles.sources}><summary>Official references &amp; last checked date</summary><p>Checked October 26, 2026. Provider interfaces, limits and plan terms can change.</p><ul>{handbookSources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></li>)}</ul></details>
  </div>;
}
