"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronRight, Code2, FileCode2, FileText, Folder, FolderOpen, Github, Globe2, ImageIcon, LockKeyhole, Mail, Monitor, MousePointer2, PackageOpen, Rocket, Settings2 } from "lucide-react";
import { CommandReference, HandbookDownload, OurHandover, ConsultationInvite } from "./CommandReference";
import s from "./VisualHandover.module.css";

const steps = [
  { id: "files", title: "Meet your files", label: "Your delivery", icon: FolderOpen },
  { id: "github", title: "Save your website", label: "GitHub", icon: Github },
  { id: "email", title: "Connect enquiries", label: "Resend", icon: Mail },
  { id: "deploy", title: "Put it online", label: "Vercel", icon: Rocket },
  { id: "domain", title: "Add your address", label: "Your domain", icon: Globe2 },
  { id: "test", title: "Check & launch", label: "Final checks", icon: CheckCircle2 },
];
const folders = [
  { name: "public/", icon: ImageIcon, title: "Your photos, videos & logos", description: "These are the media files your visitors see. Keep filenames consistent when replacing an image.", example: "images/  ·  hero.mp4  ·  favicon.ico", color: "cyan" },
  { name: "content/blog/", icon: FileText, title: "Your blog articles", description: "Each article is a text file. Copy an existing article’s format, write your content, then preview it before publishing.", example: "my-first-article.md", color: "violet" },
  { name: "app/ + components/", icon: Code2, title: "The design & pages", description: "The page layouts, navigation and interactive features live here. Ask a developer to help with code changes.", example: "page.tsx  ·  Header.tsx  ·  Footer.tsx", color: "cyan" },
  { name: "lib/", icon: Settings2, title: "Business information & logic", description: "Business details, service data and supporting code. A phone number may appear in several files, so ask your developer to update every occurrence.", example: "constants.ts  ·  data/services.ts", color: "violet" },
  { name: "package.json", icon: FileCode2, title: "The website’s software list", description: "Vercel reads this file to understand how to build your website. It must be in the selected project root.", example: "Next.js  +  React  +  build instructions", color: "cyan" },
  { name: ".env.example", icon: LockKeyhole, title: "A template for private settings", description: "Lists the email settings you must supply. Example values do not work. Keep real API keys private.", example: "RESEND_API_KEY=your-private-value", color: "violet" },
];

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className={s.window}><div className={s.windowBar}><span className={s.dots}><i /><i /><i /></span><span>{title}</span><LockKeyhole size={12} /></div>{children}</div>;
}

export function LaunchVisual() {
  return <div className={s.launchVisual} aria-label="Diagram: website files travel through Vercel to a live website">
    <div className={s.delivery}><PackageOpen size={30} /><div><strong>website-handover.zip</strong><small>Your complete website</small></div><span className={s.chip}>01</span></div>
    <div className={s.connector}><span /><ArrowRight size={18} /><span /></div>
    <Window title="Your website · live preview"><div className={s.siteMock}><div className={s.mockNav}><span>YOUR BUSINESS</span><span>About &nbsp; Services &nbsp; Contact</span></div><div className={s.mockHero}><div><span className={s.miniLabel}>BUILT FOR YOUR BUSINESS</span><strong>Your next chapter.<br />Now online.</strong><span className={s.mockButton}>Get in touch <ArrowUpRight size={13} /></span></div><div className={s.mockArt}><Globe2 size={72} strokeWidth={1} /><span className={s.orbit} /></div></div><div className={s.mockTiles}><span /><span /><span /></div></div></Window>
    <div className={s.liveBadge}><span />Published with Vercel <CheckCircle2 size={16} /></div>
  </div>;
}

export function VisualHandover() {
  const [step, setStep] = useState(0);
  const [folder, setFolder] = useState(0);
  const [live, setLive] = useState(false);
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false]);
  const lessonRef = useRef<HTMLDivElement>(null);
  const selected = folders[folder];
  const Icon = selected.icon;
  const go = (value: number) => {
    setStep(value);
    lessonRef.current?.scrollIntoView({ block: "start" });
  };

  return <div className={s.guide}>
    <OurHandover />
    <section className={s.roadmap} aria-label="How your website gets online">
      <div className={s.roadmapIntro}><span className={s.eyebrow}>The whole journey</span><h2>From a folder<br />to your front door.</h2></div>
      {[{ icon: FolderOpen, title: "Your files", sub: "The website itself" }, { icon: Github, title: "GitHub", sub: "Stores your files" }, { icon: Rocket, title: "Vercel", sub: "Runs your website" }, { icon: Globe2, title: "Your domain", sub: "Your online address" }].map(({ icon: NodeIcon, title, sub }, i) => <div className={s.roadmapNode} key={title}><div className={s.nodeIcon}><NodeIcon size={26} /></div><strong>{title}</strong><span>{sub}</span>{i < 3 && <ArrowRight className={s.nodeArrow} size={18} />}</div>)}
    </section>

    <div className={s.layout}>
      <aside className={s.sidebar}><span className={s.eyebrow}>Your launch guide</span><nav aria-label="Tutorial steps">{steps.map(({ title, label, icon: StepIcon }, i) => <button key={title} onClick={() => go(i)} aria-current={step === i ? "step" : undefined}><span className={s.stepNumber}>{i + 1}</span><span><strong>{title}</strong><small>{label}</small></span><StepIcon size={16} /></button>)}</nav><div className={s.sidebarTip}><Monitor size={20} /><p>Follow along on a computer. Keep this guide open in a second tab.</p></div></aside>

      <div ref={lessonRef} className={s.lesson} style={{ scrollMarginTop: 110 }}>
        <div className={s.lessonTop}><span className={s.eyebrow}>Step {step + 1} of 6 · {steps[step].label}</span><span className={s.diagramLabel}>Interactive teaching diagrams</span></div>
        {step === 0 && <>
          <h2>A quick tour of what you own.</h2><p className={s.lead}>Extract your ZIP, then click a file or folder below to see what it does.</p>
          <div className={s.explorer}><div className={s.fileTree}><div className={s.treeTitle}><FolderOpen size={17} /> your-website</div>{folders.map(({ name, icon: ItemIcon }, i) => <button key={name} onClick={() => setFolder(i)} aria-pressed={folder === i}><ItemIcon size={17} /><span>{name}</span><ChevronRight size={14} /></button>)}</div><div className={s.fileDetail} aria-live="polite"><div className={s.largeIcon}><Icon size={38} strokeWidth={1.5} /></div><span className={s.eyebrow}>{selected.name}</span><h3>{selected.title}</h3><p>{selected.description}</p><code>{selected.example}</code><span className={s.clickHint}><MousePointer2 size={14} /> Click another folder to explore</span></div></div>
          <div className={s.callout}><FileCode2 size={20} /><p>This is a <strong>Next.js website</strong>. Double-clicking a file will not open the finished site. Vercel builds it for you.</p></div>
          <div className={s.routeToggle}><h3>Is your website already live?</h3><div><button aria-pressed={!live} onClick={() => setLive(false)}>I have files to publish</button><button aria-pressed={live} onClick={() => setLive(true)}>It’s already online</button></div><p aria-live="polite">{live ? "If we currently manage your site, ask us to coordinate the move before changing the domain. Our paid service accounts stay with Interstate Rankers. Use your ZIP to prepare your own accounts and deployment, test it, then arrange the cutover with us. If you only want a backup copy, no hosting change is needed." : "Continue through the steps. Keep your original ZIP as a backup. For independent hosting, use accounts owned by your business and check the plans and costs you will take on."}</p></div>
        </>}

        {step === 1 && <>
          <h2>Give your files a home.</h2><p className={s.lead}>A GitHub repository is an online project folder. Vercel watches it for updates.</p>
          <div className={s.split}><div className={s.instructions}><span className={s.action}><b>1</b> Open GitHub Desktop</span><p>Sign in, choose <strong>File → New repository</strong>, and create a project folder.</p><span className={s.action}><b>2</b> Copy your website into it</span><p>Copy the contents of your extracted folder, including <code>.gitignore</code>. Keep <code>package.json</code> at the top level.</p><span className={s.action}><b>3</b> Commit, then publish privately</span><p>Review the files, enter a summary, commit to the main branch, then publish with <strong>Keep this code private</strong> selected.</p></div><Window title="GitHub · repository illustration"><div className={s.dashboard}><div className={s.repoHeading}><Github size={25} /><strong>your-business / website</strong><span className={s.chip}>Private</span></div><div className={s.branch}>⑂ main <span><Check size={14} /> Initial website files</span></div>{["app", "components", "public", "content", "lib"].map(name => <div className={s.repoRow} key={name}><Folder size={16} /><span>{name}/</span></div>)}<div className={s.repoRow}><FileCode2 size={16} /><span>package.json</span><span className={s.annotation}>At the top level</span></div><div className={s.repoRow}><FileText size={16} />.gitignore</div></div></Window></div>
          <div className={s.callout}><LockKeyhole size={20} /><p>Keep <code>.env.example</code>. Never upload real keys, <code>.env.local</code>, <code>node_modules</code> or <code>.next</code>. Your developer can prepare this repository for you.</p></div>
          <a className={s.external} href="https://desktop.github.com/" target="_blank" rel="noreferrer">Get GitHub Desktop <ArrowUpRight size={16} /></a>
          <p><a className={s.external} href="#git-commands">Prefer the terminal? See the Git commands below ↓</a></p>
        </>}

        {step === 2 && <>
          <h2>Make every enquiry reach you.</h2><p className={s.lead}>Your form needs an email delivery service. This website uses Resend.</p>
          <div className={s.emailFlow}><div><Monitor size={30} /><strong>Contact form</strong><small>A customer sends an enquiry</small></div><ArrowRight /><div><Mail size={30} /><strong>Resend</strong><small>Delivers the notification</small></div><ArrowRight /><div><CheckCircle2 size={30} /><strong>Your inbox</strong><small>You receive the lead</small></div></div>
          <div className={s.split}><div className={s.instructions}><span className={s.action}><b>1</b> Verify your sending domain</span><p>Add a domain in Resend. Copy its DNS records into your domain’s DNS manager and wait for verification.</p><span className={s.action}><b>2</b> Create a sending API key</span><p>This private key connects your website to Resend. Save it securely for the Vercel setup.</p><span className={s.action}><b>3</b> Choose sender & recipient</span><p>The sender must use your verified domain. The recipient is your existing inbox.</p></div><Window title="Email configuration · example"><div className={s.dashboard}><div className={s.field}><label>RESEND_API_KEY</label><div><LockKeyhole size={14} />••••••••••••••••••••••••</div><small>Private key from your Resend account</small></div><div className={s.field}><label>CONTACT_TO_EMAIL</label><div>leads@yourbusiness.com</div><small>Where enquiries arrive</small></div><div className={s.field}><label>CONTACT_FROM_EMAIL</label><div>Business &lt;website@yourbusiness.com&gt;</div><small>Sender on the verified domain</small></div></div></Window></div>
          <div className={s.checkpoint}><CheckCircle2 size={20} /><span>Ready for the next step: verified domain + API key + both email addresses.</span></div>
          <a className={s.external} href="https://resend.com/docs/dashboard/domains/introduction" target="_blank" rel="noreferrer">Resend’s domain instructions <ArrowUpRight size={16} /></a>
        </>}

        {step === 3 && <>
          <h2>Turn your files into a website.</h2><p className={s.lead}>Import your repository. Vercel takes care of building and hosting it.</p>
          <div className={s.split}><div className={s.instructions}><span className={s.action}><b>1</b> Import your repository</span><p>In Vercel, choose <strong>Add New → Project</strong>. Connect GitHub, find your private repository, then choose <strong>Import</strong>.</p><span className={s.action}><b>2</b> Check the settings</span><p>Framework: <strong>Next.js</strong>. Root directory: the folder with <code>package.json</code>. Keep the detected build settings.</p><span className={s.action}><b>3</b> Add email settings & deploy</span><p>Add the three variables from the previous step. Include Production in the environment selection, then click <strong>Deploy</strong>.</p></div><Window title="Vercel · setup illustration"><div className={s.dashboard}><div className={s.vercelTitle}><span>▲</span><strong>Configure your project</strong></div><div className={s.field}><label>Framework preset</label><div>◉ Next.js <Check size={16} /></div></div><div className={s.field}><label>Root directory</label><div>./ <Folder size={16} /></div><small>The folder containing package.json</small></div><div className={s.envPanel}><LockKeyhole size={16} /><span>3 environment variables</span><span className={s.chip}>Production</span></div><div className={s.deployButton}>Deploy <Rocket size={17} /></div><div className={s.annotation}>↑ This creates your first online version</div></div></Window></div>
          <div className={s.checkpoint}><Globe2 size={20} /><span>Success looks like: your website opens at <code>your-project.vercel.app</code>.</span></div>
          <details className={s.reference}><summary>See the real Vercel starting screen</summary><Image src="/images/guides/vercel-start.jpg" width={1240} height={265} alt="Vercel New Project screen. Scroll below this area to Import Git Repository." /><p>Captured October 26, 2026. Scroll below this area to <strong>Import Git Repository</strong>. This guide uses GitHub for future updates.</p></details>
          <div className={s.callout}><Settings2 size={20} /><p>Use a plan that permits business use. Vercel’s Hobby plan is for personal, non-commercial projects. Changing email settings later requires a redeployment.</p></div>
        </>}

        {step === 4 && <>
          <h2>Give it your business address.</h2><p className={s.lead}>Your domain points visitors to the website running on Vercel.</p>
          <div className={s.domainVisual}><div className={s.address}><LockKeyhole size={17} /><span>https://<strong>yourbusiness.com</strong></span></div><div className={s.domainLine}>DNS connects the address to the website <ArrowRight size={18} /></div><div className={s.domainDestination}><Globe2 size={36} /><strong>Your Vercel website</strong><span className={s.chip}>Connected</span></div></div>
          <div className={s.split}><div className={s.instructions}><span className={s.action}><b>1</b> Add your domain in Vercel</span><p>Open <strong>Settings → Domains</strong>. Add your main address and the <code>www</code> version if you want both supported.</p><span className={s.action}><b>2</b> Copy the DNS records</span><p>Open the DNS manager for your domain. Match the type, name and value exactly to the records Vercel gives your project.</p><span className={s.action}><b>3</b> Wait for verification</span><p>Once DNS is verified and HTTPS is ready, open both addresses on your phone and computer.</p></div><div className={s.dnsTable}><span className={s.eyebrow}>Match these three fields</span>{[["TYPE", "A / CNAME / TXT", "Choose the type Vercel specifies"], ["NAME / HOST", "@ or www", "Use your project’s actual host value"], ["VALUE / TARGET", "Provided by Vercel", "Copy it exactly from your project"]].map(([label,value,help], i) => <div key={label}><span className={s.stepNumber}>{i + 1}</span><div><small>{label}</small><strong>{value}</strong><p>{help}</p></div></div>)}</div></div>
          <div className={s.callout}><Mail size={20} /><p>Preserve your existing business email records. Only change what the website needs. DNS providers use different labels; ask for help if a record conflicts.</p></div>
          <a className={s.external} href="https://vercel.com/docs/domains/working-with-domains/add-a-domain" target="_blank" rel="noreferrer">Vercel’s domain instructions <ArrowUpRight size={16} /></a>
        </>}

        {step === 5 && <>
          <h2>One final check. Then you’re live.</h2><p className={s.lead}>A good-looking website is only half the job. Test the customer journey too.</p>
          <div className={s.launchCheck}><div className={s.launchStamp}><Rocket size={52} strokeWidth={1.3} /><strong>{checks.filter(Boolean).length} / 4</strong><span>launch checks complete</span><div className={s.progress}><span style={{ width: `${checks.filter(Boolean).length * 25}%` }} /></div></div><div>{["My domain opens the right website", "Pages and images work on my phone", "A real test enquiry arrives in my inbox", "I control my accounts and saved the original ZIP"].map((text,i) => <label className={s.checkItem} key={text}><input type="checkbox" checked={checks[i]} onChange={() => setChecks(values => values.map((value,index) => index === i ? !value : value))} /><span>{text}</span></label>)}</div></div>
          <div className={s.checkpoint} aria-live="polite"><CheckCircle2 size={20} /><span>{checks.every(Boolean) ? "All four checks complete. Your launch checklist is ready." : "Send a clearly labelled test enquiry. Check your inbox and spam folder, and confirm Reply addresses the test sender."}</span></div>
          <h3>How future changes go live</h3><div className={s.emailFlow}><div><Code2 size={28} /><strong>Edit a copy</strong><small>Keep a working version safe</small></div><ArrowRight /><div><Monitor size={28} /><strong>Preview & check</strong><small>Test before publishing</small></div><ArrowRight /><div><Rocket size={28} /><strong>Publish</strong><small>Merge into the production branch</small></div></div><p>With GitHub connected, Vercel rebuilds on changes to the configured production branch. Editing the ZIP on your computer does not update the live site. Code changes may need a developer; this package has no visual editing dashboard.</p><small>Checklist progress lasts for this page visit only.</small>
        </>}

        <div className={s.lessonFooter}><button disabled={step === 0} onClick={() => go(step - 1)}>← Previous</button><span>{String(step + 1).padStart(2,"0")} / 06</span><button disabled={step === 5} onClick={() => go(step + 1)}>Next step <ArrowRight size={16} /></button></div>
      </div>
    </div>
    <HandbookDownload />
    <CommandReference />
    <ConsultationInvite />
  </div>;
}
