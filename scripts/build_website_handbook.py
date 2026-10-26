"""Generate the client handbook. Run via build-website-handbook.mjs."""
from pathlib import Path
from xml.sax.saxutils import escape
import json
import re
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Preformatted, Table, TableStyle, KeepTogether, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader

DATA = json.loads(Path('tmp/pdfs/website-handbook-data.json').read_text(encoding='utf-8'))
FAQS = DATA['guideFaqs'][3:]
BRAND = DATA['handoverStory']
OUT = Path('output/pdf/website-launch-handbook.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)
INK = colors.HexColor('#172134')
VIOLET = colors.HexColor('#6941c6')
TEAL = colors.HexColor('#087e8b')
MUTED = colors.HexColor('#516176')
LINE = colors.HexColor('#dce2eb')
PALE = colors.HexColor('#f1f4fa')
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleIR', fontName='Helvetica-Bold', fontSize=37, leading=42, textColor=INK, spaceAfter=22))
styles.add(ParagraphStyle(name='ChapterIR', fontName='Helvetica-Bold', fontSize=26, leading=31, textColor=INK, spaceAfter=20))
styles.add(ParagraphStyle(name='SubIR', fontName='Helvetica-Bold', fontSize=13, leading=18, textColor=INK, spaceBefore=15, spaceAfter=8))
styles.add(ParagraphStyle(name='BodyIR', fontName='Helvetica', fontSize=9.5, leading=14.2, textColor=MUTED, spaceAfter=8))
styles.add(ParagraphStyle(name='SmallIR', fontName='Helvetica', fontSize=8.2, leading=12, textColor=MUTED, spaceAfter=7))
styles.add(ParagraphStyle(name='EyeIR', fontName='Helvetica-Bold', fontSize=8, leading=12, textColor=TEAL, spaceAfter=12, tracking=1))
styles.add(ParagraphStyle(name='CodeIR', fontName='Courier', fontSize=8.2, leading=12.4, textColor=INK, backColor=PALE, borderPadding=12, spaceBefore=12, spaceAfter=18))
styles['SubIR'].spaceBefore = 11
styles['SubIR'].spaceAfter = 6
styles['SubIR'].keepWithNext = True
story=[]
def clean(text):
    return text.replace('\u2019', "'").replace('\u2018', "'").replace('\u201c','"').replace('\u201d','"').replace('\u2013','-').replace('\u2014','-').replace('\u2192',' > ').replace('\u00a0',' ')
def p(text, style='BodyIR'):
    story.append(Paragraph(escape(clean(text)), styles[style]))
def sub(text): p(text,'SubIR')
def code(text): story.append(Preformatted(clean(text),styles['CodeIR']))
def note(text):
    box=Table([[Paragraph('<b>CHECKPOINT</b><br/>'+escape(clean(text)),styles['BodyIR'])]],colWidths=[483])
    box.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#eaf5f4')),('BOX',(0,0),(-1,-1),.6,colors.HexColor('#b6deda')),('LEFTPADDING',(0,0),(-1,-1),14),('RIGHTPADDING',(0,0),(-1,-1),14),('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),6)]))
    story.extend([Spacer(1,8),box])
def chapter(n,title,intro):
    story.append(PageBreak());p(f'WEBSITE OWNERSHIP / {n:02d}','EyeIR');p(title,'ChapterIR');p(intro)
def bullets(items):
    for item in items: p('- '+item)
def footer(canvas,doc):
    canvas.saveState();w,h=A4
    canvas.setStrokeColor(LINE);canvas.line(48,43,w-48,43)
    canvas.setFont('Helvetica',8);canvas.setFillColor(MUTED)
    canvas.drawString(48,29,'INTERSTATE RANKERS  /  WEBSITE LAUNCH HANDBOOK')
    canvas.drawRightString(w-48,29,f'{doc.page:02d}')
    if doc.page>1:
        canvas.setFont('Helvetica',7);canvas.drawString(48,h-30,'Next.js + GitHub + Vercel + Resend  |  Edition: 26 October 2026')
    canvas.restoreState()

p('INTERSTATE RANKERS / CLIENT EDUCATION','EyeIR');story.append(Spacer(1,45))
p('Your website.\nYour next steps.'.replace('\n',' '),'TitleIR')
p('The complete launch and ownership handbook','SubIR')
p('By Maverick / Interstate Rankers','EyeIR')
p('A practical reference for business owners who received a Next.js website and want to understand, host, update and look after it. No technical background assumed.')
story.append(Spacer(1,24))
rows=[]
for name,desc in [('YOUR FILES','The website source, images and content'),('GITHUB','A private copy with a history of changes'),('VERCEL','The service that builds and hosts the site'),('YOUR DOMAIN','The web address customers visit'),('RESEND','Delivery of contact-form notifications')]:
    rows.append([Paragraph(name,styles['EyeIR']),Paragraph(desc,styles['BodyIR'])])
t=Table(rows,colWidths=[125,358]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('LINEBELOW',(0,0),(-1,-1),.5,LINE),('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),14),('BOTTOMPADDING',(0,0),(-1,-1),8),('LEFTPADDING',(0,0),(-1,-1),15)]));story.append(t)
story.append(Spacer(1,28));p('Includes copyable commands, launch checks, troubleshooting and official references. Examples use generic names and sample values. Keep passwords and real API keys out of public files.','SmallIR')
p('Edition 1.0 / 26 October 2026','EyeIR')

story.append(PageBreak())
p('A NOTE FROM MAVERICK / INTERSTATE RANKERS','EyeIR')
p('Your files. Your choice.','ChapterIR')
p(BRAND['introduction'])
sub('What we hand over')
p(BRAND['delivery'])
sub('Our paid accounts and your independent setup')
p(BRAND['accounts'])
sub('Guidance does not end with the ZIP')
p(BRAND['support'])
sub('Built around the business')
p(BRAND['approach'])
sub('A free conversation about your next step')
p(BRAND['consultation'])
story.append(Paragraph('<link href="https://interstaterankers.com/contact" color="#087e8b">Talk to Interstate Rankers - free consultation</link>',styles['BodyIR']))

chapter(0,'Choose your route','Read this page first. A website that is already live does not necessarily need a new deployment.')
sub('If Interstate Rankers currently manages your site')
p('Our managed setup uses our own paid accounts. Those accounts stay with Interstate Rankers; the handover is your source files and README. If you only want a backup while we keep working together, save your ZIP and no hosting change is needed. For independent hosting, prepare accounts you control, confirm the domain and DNS arrangements with us, and coordinate the cutover only after the new deployment is tested. We continue providing guidance through your questions.')
sub('If you only received a ZIP')
p('Save the original unchanged. Extract it into a working folder. Follow chapters 1-8 in order, then test the complete customer journey before switching a domain away from an existing site.')
sub('How to use the commands')
p('Run one line at a time in the project folder. Replace sample paths, account names and email addresses before running a command. Lines beginning with # are comments. A command printed here is an instruction for you, not evidence that it has already run. Never paste command output containing secrets into public support posts.')
sub('Inside this handbook')
for n,title in enumerate(['Understand your files and ownership','Install the tools and open a terminal','Preview your website locally','First Git upload to GitHub','Import into Vercel and deploy','Configure contact-form email','Connect a domain without breaking email','Launch checks and search visibility','Update content with Git and previews','Useful commands and optional CLI deployment','Recover from a bad change','Troubleshoot Git and local setup','Troubleshoot hosting, DNS and enquiries','Keep the site healthy and hand it over','Official references'],1): p(f'{n:02d}  {title}','SmallIR')

chapter(1,'Understand what you received','This guide matches a Next.js delivery with Markdown blog articles and a server-side contact form. Other platforms require different instructions.')
sub('The folder map')
code('your-website/\n  app/                 Pages and server routes\n  components/          Navigation and page sections\n  public/              Images, video, icons\n  content/blog/        Article text files\n  lib/                 Business data and helpers\n  package.json         Software and script definitions\n  package-lock.json    Exact dependency versions\n  .gitignore           Files Git should leave out\n  .env.example         Template for private settings\n  README.md            Project-specific technical notes')
p('Do not double-click a source file and expect a complete site. Next.js must install its dependencies and build or run the application. The contact endpoint needs a compatible server runtime; a static file host alone is not enough.')
sub('What you own versus what you subscribe to')
p('Source files, photographs and content are separate from the hosting subscription and domain registration. Your contract determines rights to licensed images, fonts and other third-party assets. Keep copies of licence information supplied by your developer.')
p('Ask for a record of the repository URL, Vercel project, production branch, email recipient, sending domain, DNS manager, analytics account and renewal responsibilities. Keep credentials in a password manager, not a public README.')
note('You can identify package.json in the project root, have a backup of the original delivery and know who owns the accounts.')

chapter(2,'Install tools. Open the right folder.','You need Git, Node.js with npm, a text editor and accounts for GitHub and Vercel. Resend is needed for this example contact form.')
sub('Install from the official sources')
p('Get Git from git-scm.com, Node.js from nodejs.org, and an editor such as Visual Studio Code from code.visualstudio.com. Choose a currently supported Node.js LTS release compatible with the supplied Next.js version. Next.js 16 requires at least Node.js 20.9; the minimum is not a recommendation to use an unsupported release.')
sub('Open a terminal in the project folder')
p('On Windows, open the extracted folder in File Explorer, right-click the background and choose Open in Terminal if available. In VS Code, open that folder and choose Terminal > New Terminal. On macOS, use Terminal and cd into the folder. Paths with spaces need quotation marks.')
code(DATA['commandGroups'][0]['code'])
p(DATA['commandGroups'][0]['result'])
sub('A few words translated')
bullets(['Terminal: a window where you type instructions.','Repository: a project and its change history.','Commit: a saved checkpoint in that history.','Push: upload your commits to the remote repository.','Deployment: an online built version of your website.','Environment variable: a setting supplied to the running application.'])
note('The version commands work after reopening the terminal. You are inside the folder containing package.json.')

chapter(3,'Preview your website locally','Local preview lets you check edits without changing what customers see. Installing dependencies is different from publishing a site.')
sub('Install the delivered dependency versions')
code('npm ci')
p('npm ci uses the supplied lockfile and expects it to match package.json. It replaces the dependency installation in node_modules; do not store personal files there. If it fails because the lockfile is missing or mismatched, ask the developer to supply a consistent package rather than immediately changing package versions.')
sub('Create local email settings, if needed')
p('Only when .env.local does not already exist, copy the template. For Windows PowerShell:')
code('Copy-Item .env.example .env.local')
p('For macOS/Linux: cp .env.example .env.local. Open .env.local in your editor and fill in the three email values described in chapter 6. Preserve an existing settings file; do not overwrite it with sample values. Restart the development server after changing local environment settings.')
sub('Start the site')
code('npm run dev')
p('Open the Local URL printed in the terminal, commonly http://localhost:3000. If this project defines a different port, use that printed URL. Keep the terminal open. Press Ctrl+C to stop the server. The address only works while the server is running; localhost means your own computer.')
sub('Check the production build separately')
code('npm run build\nnpm run start')
p('These commands create and serve a production build locally. Stop a server already using the same port first. If the project forces HTTPS in production, ask the developer for a supported local production preview instead of bypassing browser warnings.')
note('You can navigate the site locally. This has not uploaded your files or changed your public domain.')

chapter(4,'Upload a fresh ZIP with Git','Use this route only for a new local folder without existing Git history. If your developer supplied a repository, inspect that existing setup first.')
p('On GitHub, create a new private repository. Leave README, licence and .gitignore initialisation unchecked so the remote is empty. Keep the .gitignore from your website delivery. Replace all sample identity and repository values below; user.name and user.email here are scoped to this repository.')
code(DATA['commandGroups'][1]['code'])
p('git add stages changes; it does not publish them. git diff --cached lets you inspect exactly what will be committed. Confirm there are no real API keys, .env.local, .env, node_modules or .next files. If anything private appears, stop before committing and fix the ignore rules or ask for help.')
p('Complete the sign-in prompt from Git Credential Manager if offered. A GitHub password is not accepted as a Git-over-HTTPS password. Depending on your setup, use credential-manager browser authentication, an appropriately scoped token or an SSH key. Never paste a token into the repository URL or guide.')
sub('If there is already a remote')
code('git remote -v\ngit branch --show-current\ngit status')
p('If origin is correct, skip the remote-add command. If it is wrong, confirm the intended destination before changing it with git remote set-url origin URL. Do not delete the .git folder or force-push as a shortcut.')
note('The GitHub repository is Private and shows your website folders and package.json on the intended branch.')

chapter(5,'Import into Vercel','Use your business-owned Vercel account or team. Check current plan terms: Hobby is limited to personal, non-commercial use.')
bullets(['Choose Add New > Project and connect GitHub if needed. Authorise access to the intended repository.','Under Import Git Repository, find the private repository and choose Import. If missing, check which GitHub account and repositories the integration can access.','Confirm Next.js as the framework. Set Root Directory to the folder containing package.json. A nested folder from an extracted ZIP is a common source of mistakes.','Keep the automatically detected install, build and output settings unless the supplied README specifies an override.','Add the three email environment variables from chapter 6 before deploying. Include Production in their target selection.','Choose Deploy. Wait until the build completes, then open the generated .vercel.app address.'])
image_path=Path('public/images/guides/vercel-start.jpg')
if image_path.exists(): story.extend([Spacer(1,10),Image(str(image_path),width=483,height=103),Spacer(1,8)])
p('Real Vercel entry screen, captured October 26, 2026. The Git repository import area appears below this part of the page. Other configuration examples in this handbook are teaching instructions, not live dashboard captures.','SmallIR')
sub('What a successful first deployment proves')
p('It proves that Vercel can build and serve this version. It does not prove that your custom domain, enquiry email, analytics or account ownership is configured correctly. Test those independently. A preview URL is not the same thing as the final domain.')
note('The temporary Vercel URL loads your homepage, contact page, navigation, images and blog articles.')

chapter(6,'Make contact-form email work','This project sends contact notifications through Resend. It does not create a business mailbox or store enquiries in a database.')
sub('Verify the sender before using it')
p('In Resend, add a domain you control. Add the exact DNS records Resend provides in the active DNS manager and wait for verification. A sending subdomain can keep website notifications separate from your main mailbox configuration. Preserve the existing records used by your normal business email.')
sub('Three settings, three jobs')
code('RESEND_API_KEY=re_YOUR_PRIVATE_KEY\nCONTACT_TO_EMAIL=leads@yourbusiness.com\nCONTACT_FROM_EMAIL=Business <website@yourbusiness.com>')
p('The first value is a private key with permission to send email. The second is an existing receiving inbox; this example supports multiple recipients separated by commas. The third is the sender and must use your verified sending domain. All shown values are examples.')
p('In a local .env.local file, quote the full sender value, for example CONTACT_FROM_EMAIL="Business <website@yourbusiness.com>". In the Vercel dashboard value field, enter the sender without those surrounding file-format quotes. Do not rename these variables or add NEXT_PUBLIC_ to the private key.')
sub('Production, Preview and Development are separate')
p('Set the variables for the environments that need them. Production needs real delivery settings. Preview can use a test recipient so test submissions do not confuse the sales team. Redeploy after dashboard changes; restart npm run dev after local changes. Existing deployed code does not automatically receive new environment values.')
sub('Verify delivery, not just the success message')
p('Submit one clearly labelled test. Confirm the notification arrives in the correct inbox, inspect spam and check Reply addresses the test sender. Check Resend delivery status if it is missing. The supplied endpoint rate-limits repeated submissions, so pause testing if you hit its limit.')
note('A test enquiry reaches the intended inbox and your team knows where to respond.')

chapter(7,'Connect a domain safely','A domain is an address. DNS is the set of records that tells browsers and email services where that address leads.')
bullets(['Open the correct Vercel project > Settings > Domains. Add your root domain, such as yourbusiness.com.','Add www.yourbusiness.com if desired. Choose one main address and configure the other to redirect using the options Vercel offers.','Find the active DNS manager. This may be your registrar, Cloudflare or another provider; it is not always where you purchased the domain.','Copy the Type, Name/Host and Value/Target from your own Vercel project. Do not copy a fixed IP or target from an unrelated tutorial.','Record the previous website-related values before changing them. Preserve email MX, SPF, DKIM and other service records.','Wait for Vercel verification and HTTPS provisioning, then test root and www on another network as well.'])
sub('Match fields rather than guessing')
p('A, CNAME and TXT are different record types. The root host may be shown as @, blank or the domain itself depending on your provider. Some providers append your domain automatically. Inspect the resulting full name to avoid entering the domain twice.')
sub('Why a change is not instant everywhere')
p('Resolvers can cache earlier DNS answers until their TTL expires. The time depends on the previous TTL, provider and caches. Use the status shown by Vercel and your DNS manager rather than repeatedly making different changes. Nameserver changes affect all DNS services, so they need a complete migration plan.')
sub('Before replacing an existing live site')
p('Check the temporary deployment first. Confirm the enquiry recipient, important URLs and redirects. Keep the old hosting available during the transition until the new site and email work. A change of domain may also require canonical URLs, sitemap URLs, schema, tracking and Resend configuration to be updated.')
note('The main domain opens securely, its alternate redirects correctly, and normal business email still works.')

chapter(8,'Launch checks and discoverability','Test as a customer would. A green deployment badge is not a complete launch check.')
sub('The customer journey')
bullets(['Open the homepage, service pages, about page, contact page and at least one blog post. Test navigation and calls to action.','Check a phone-sized screen. Look for clipped text, overlapping buttons, missing media and difficult form fields.','Tap the phone number and email links. Check that they point to the business details you intended.','Submit a test enquiry and verify receipt and reply-to behaviour.','Check both root and www domain addresses. Important old URLs should redirect to their matching new pages rather than all going to the homepage.'])
sub('Search setup after the correct domain is live')
p('Open /robots.txt and /sitemap.xml on your domain. Confirm intended pages are accessible, not accidentally noindexed, and use the correct canonical domain. Verify domain ownership in Google Search Console and submit the live sitemap. A sitemap helps discovery; Google does not guarantee indexing or rankings.')
p('If the domain changed, ask the developer to review canonical URLs, structured data, sitemap links and business references across the project. Updating DNS alone does not update hardcoded URLs inside source files.')
sub('Analytics and consent')
p('Confirm the analytics property and any advertising pixels belong to the correct business. Avoid leaving a previous business or test tracker in place. Your developer should confirm the tracking and consent configuration matches the requirements for your audience and tools.')
sub('Keep a launch record')
p('Record the production deployment URL, launch date, repository branch, account owners, recipient inbox and renewal responsibilities. Do not put API keys in that public record. Check service usage and billing alerts in the relevant dashboards.')
note('A real visitor can find the site, navigate it, contact you and receive a response.')

chapter(9,'Publish updates with confidence','For a connected GitHub project, a branch gives you a separate place to make changes before they reach the production site.')
p(DATA['commandGroups'][3]['note'])
code(DATA['commandGroups'][3]['code'])
p(DATA['commandGroups'][3]['result'])
sub('What to check in the pull request')
p('Review the changed files, spelling, business details, image paths and mobile layout. Check the build result and the preview URL. A Preview deployment may be protected or use different email settings. Test with the intended environment, then merge when ready. Changes on the production branch can trigger a live deployment automatically.')
sub('Editing an article or replacing an image')
p('In this package, blog posts live in content/blog as Markdown files. Copy an existing article as a starting point; preserve valid front matter and unique filenames. Media goes under public. The visible URL for public/images/photo.webp is /images/photo.webp. Match case exactly. A new post appears after a successful rebuild; editing the local ZIP alone does nothing online.')
note('Your changes are reviewed in a preview before they reach the production branch. Keep the last good version available.')

chapter(10,'Useful commands at a glance','These commands have different jobs. Read the current folder, branch and deployment target before acting.')
sub('Inspect without publishing')
code('git status\ngit branch --show-current\ngit remote -v\ngit log --oneline -5\ngit diff\ngit diff --cached')
p('These show your working files, current branch, remote destinations, recent checkpoints, unstaged changes and staged changes. Run git diff --cached before every commit if you are unsure what will be included.')
sub('Build and choose a different local port')
code('npm run build\nnpm run dev -- --port 3001')
p('The first checks whether the site builds. The second starts a development server on another port when the project uses Next.js scripts. Open the address it prints. These commands are separate workflows; stop an existing local server if you need its terminal.')
sub('Optional Vercel CLI route')
code('npx vercel login\nnpx vercel link\nnpx vercel deploy\n# Only after checking the preview and production settings:\nnpx vercel deploy --prod')
p('The CLI is an alternative to Git-connected deployments, not a required extra step. Verify the team and project when linking, and read the prompts before confirming. The plain deploy command produces a preview by default; --prod publishes to production. Environment variables must already be configured for the intended target. Keep the source in Git even if you choose CLI deployment.')
p('Use one team workflow consistently so a CLI deployment is not immediately replaced by an unexpected Git deployment. Do not install packages or accept command prompts you do not understand just to clear an error.')
note('A local build is not a deployment. A Git commit is not a push. A preview is not necessarily production.')

chapter(11,'Recover from a bad change','First identify whether the problem is in source code, deployment settings, DNS or email. Undoing the wrong layer can create a second problem.')
sub('If the live code deployment is broken')
p('Open the Vercel project and find the last known working deployment. Use the available rollback controls for your plan and deployment type. Verify the target before making it production. Test the affected pages and the form afterwards. Vercel rollback is not a backup of your email inbox or external services.')
sub('Fix the repository as well')
p('A hosting rollback does not remove the bad source commit. The next deployment can reintroduce it. Ask the developer to correct or revert the source in a reviewed branch. For an ordinary non-merge commit, the pattern below creates a new commit that undoes the earlier one without erasing shared history:')
code('git log --oneline -5\ngit switch -c fix-recent-change\ngit revert COMMIT_ID\nnpm run build\ngit push -u origin fix-recent-change')
p('Replace COMMIT_ID with the confirmed commit. Reverting a merge commit requires additional choices; ask your developer rather than guessing. If Git reports conflicts, stop and review them. Do not use reset --hard or push --force as a beginner recovery shortcut.')
sub('If the problem is DNS or credentials')
p('A code rollback does not restore DNS records or rotate an exposed API key. Use your saved DNS record history for domain recovery and the provider dashboard for credential replacement. If a secret reached GitHub, revoke or rotate it immediately; deleting it from the latest file does not remove it from earlier commits.')
note('The live site works again and the repository explains the fix so the next deployment remains correct.')

chapter(12,'Fix Git and local setup errors','Use the exact message to choose a fix. Do not run a random sequence of commands until the error disappears.')
for i in [3,4,5,8,9]:
    sub(FAQS[i]['question']);p(FAQS[i]['answer'])
sub('npm ci reports package-lock mismatch')
p('Confirm you are in the project root, using the intended Node/npm version and the supplied package-lock.json. Ask the developer to reconcile the lockfile with package.json. npm install can change dependency resolution, so do not silently replace the lockfile just to make a client handover run.')
sub('PowerShell blocks npm.ps1')
p('On Windows, try npm.cmd in place of npm, for example npm.cmd ci or npm.cmd run dev, if the npm PowerShell wrapper is blocked by policy. This uses the installed command wrapper; it does not require disabling your system execution policy. On a managed computer, follow your administrator\'s rules.')

chapter(13,'Fix hosting, DNS and email issues','Check one layer at a time: build, deployment, domain, then email. Capture the first relevant error with private values removed.')
for i in [0,6,7,10]:
    sub(FAQS[i]['question']);p(FAQS[i]['answer'])
sub('Images work locally but disappear online')
p('Confirm the image is committed, its path begins at the correct public URL and filename case matches exactly. Windows may accept Photo.webp and photo.webp as the same file where the deployment does not. Also check file size, supported image formats and any remote-image allowlist if the source is an external URL.')
sub('A new article does not appear')
p('Confirm the Markdown filename, valid front matter, publication settings and image references. Check that the changes reached the production branch and produced a successful deployment. Browser cache and build failure are different problems; identify which version is actually serving the page.')

chapter(14,'Keep ownership simple','A good handover gives you access, a repeatable update path and a way to recover, not just a ZIP file.')
sub('What a complete handover record includes')
bullets(['Repository URL, owner, default branch and production branch.','Vercel team, project, domain list, deployment workflow and billing owner.','Domain registrar, active DNS manager and renewal owner.','Resend account, verified sending domain and notification recipient.','Names of required environment variables, with secret values stored separately.','Analytics and advertising account owners, plus any required consent configuration.','Asset licences and any external service dependencies.','Original delivery, latest source backup and a tested recovery contact.'])
sub('A practical maintenance rhythm')
p('After each change, test the changed page, phone layout, navigation and enquiry form. Periodically review billing and usage, domain renewal, delivery failures and broken links. Keep a current repository backup. Dependency and framework upgrades should be tested on a separate branch with a production build; routine content editing does not require upgrading everything.')
sub('When to ask for a developer')
p('Get help with build errors you cannot explain, conflicting Git history, domain migrations, contact-form changes, dependency upgrades, complex layouts and business details repeated across schema and content. For frequent non-technical content updates, discuss adding a CMS rather than assuming this delivery already includes one.')
sub('What ongoing costs may remain')
p('Domain registration renews separately from hosting. Hosting, email delivery, mailbox services, paid images and monitoring may each have their own billing. Review current plan terms and limits before subscribing; this guide does not promise permanently free hosting or a fixed provider price.')
note('You know how to access the site, publish a reviewed change, receive enquiries and ask for help with an exact, useful error report.')

chapter(15,'Official references','Technical guidance was checked against the linked official documentation on 26 October 2026. Interfaces, supported runtimes, limits and plan terms can change.')
for item in DATA['handbookSources']:
    p(item['title'],'SubIR')
    url=item['url'];story.append(Paragraph(f'<link href="{escape(url)}" color="#087e8b">{escape(url)}</link>',styles['SmallIR']))
p('Project-specific facts were checked against the supplied Next.js handover README, package.json, .env.example and contact API source. No client credentials or private account data are included. Commands use example identities and destinations.','SmallIR')

doc=SimpleDocTemplate(str(OUT),pagesize=A4,rightMargin=54,leftMargin=54,topMargin=54,bottomMargin=55,title='Website Launch and Ownership Handbook',author='Maverick - Interstate Rankers',subject='Next.js, Git, GitHub, Vercel, domains and contact forms')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
reader=PdfReader(str(OUT))
text='\n'.join(page.extract_text() or '' for page in reader.pages)
for required in ['git init -b main','git push -u origin main','CONTACT_FROM_EMAIL','npm run build','Official references']:
    assert required in text, f'Missing content: {required}'
assert all((page.extract_text() or '').strip() for page in reader.pages)
print(f'Created {OUT}: {len(reader.pages)} pages, {len(text.split())} words, {OUT.stat().st_size} bytes')
