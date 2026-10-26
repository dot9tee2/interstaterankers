export const handbookPath = "/downloads/website-launch-handbook.pdf";

export const handoverStory = {
  author: "Maverick",
  introduction: "I wrote this guide because receiving your website files should give you a clear next step. At Interstate Rankers, we provide those files when you want to host independently, move on from working with us, or simply keep your own copy while we continue working together.",
  delivery: "Our handover ZIP contains your website’s source files and a README. It gives you the files to run the site on your own hosting setup; it does not transfer our service accounts.",
  accounts: "While we manage your site, we use our own paid service accounts and cover those subscriptions without billing clients separately for them. If you choose to host independently, you will set up your own accounts and take responsibility for any plans, usage charges and renewals you choose.",
  support: "Handing over the files does not end our guidance. We continue helping you understand the setup and work through questions. On your independent setup, we guide you through the changes rather than directly adding to or editing the website.",
  approach: "We build each website around the business’s niche. The first few seconds should make it clear what the business does and which services it offers. That business-specific approach is what we aim to preserve when we hand the site over.",
  consultation: "Whether you need a new website, help launching files you already have, ongoing maintenance, or advice about a problem with your current site, we offer a free consultation to discuss your situation and the next steps.",
};

export const commandGroups = [
  {
    title: "Check your tools & open the project",
    note: "Install Git and a supported Node.js LTS release first. Open a terminal in the extracted folder containing package.json. The cd example below is for Windows PowerShell; replace the path with your own.",
    code: 'git --version\nnode --version\nnpm --version\ncd "C:\\path\\to\\your-website"\ngit status',
    result: "Version numbers confirm the tools are installed. For a fresh ZIP, 'not a git repository' is expected until you initialise Git. If it already is a repository, inspect its branch and remote instead of running the new-project setup blindly.",
  },
  {
    title: "Upload a fresh ZIP to GitHub with Git",
    note: "For a folder with no Git history: create an EMPTY private repository on GitHub first, without a README, licence or .gitignore. Keep the supplied .gitignore. Replace Your Name, the email, YOUR-ACCOUNT and YOUR-REPOSITORY before running these commands one at a time.",
    code: 'git init -b main\ngit config user.name "Your Name"\ngit config user.email "your-github-email@example.com"\ngit remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git\ngit status\ngit add .\ngit diff --cached --stat\ngit diff --cached\ngit commit -m "Add website files"\ngit push -u origin main',
    result: "Review the staged files before committing: no real secrets, .env.local, node_modules or .next. GitHub should show your files on main with a Private label. Use the browser sign-in offered by Git Credential Manager; your GitHub account password is not a Git-over-HTTPS password.",
  },
  {
    title: "Preview the website on your computer",
    note: "Use npm ci when the supplied package-lock.json matches package.json. For Windows PowerShell, Copy-Item creates the local settings file: run it only if .env.local does not already exist. Fill in its sample values privately. macOS/Linux equivalent: cp .env.example .env.local.",
    code: 'npm ci\nCopy-Item .env.example .env.local\nnpm run dev',
    result: "Open the Local address printed by the terminal, usually http://localhost:3000. This is a local preview, not your public website. Keep the terminal open; press Ctrl+C to stop. npm ci installs dependencies, while npm run dev starts the site.",
  },
  {
    title: "Publish an update you have tested",
    note: "In a repository already connected to GitHub: use a feature branch to preview edits. Start with a clean working tree. 'git pull --ff-only' stops instead of merging if histories have diverged. Replace main if your developer uses a different production branch.",
    code: 'git status\ngit switch main\ngit pull --ff-only\ngit switch -c update-contact-details\n# Edit your files, then check them locally\nnpm run build\ngit diff\ngit add path/to/changed-file\ngit diff --cached\ngit commit -m "Update contact details"\ngit push -u origin update-contact-details',
    result: "Replace path/to/changed-file with a real edited file path; repeat git add for each intended file. Open a pull request on GitHub, check the Vercel preview, then merge after reviewing it. A production deployment follows changes to Vercel’s configured production branch. For your next update, use a new branch name.",
  },
];

export const guideFaqs = [
  { question: "Can I ask Interstate Rankers for my files while we still work together?", answer: "Yes. We provide the source files and README when you want your own copy, as well as when you want to leave our managed setup and host independently. Receiving the ZIP does not require you to stop working with us." },
  { question: "Does receiving my files include your hosting accounts or paid subscriptions?", answer: "No. Our managed setup uses Interstate Rankers’ own paid accounts, and we do not charge clients separately for those subscriptions. The handover includes source files and a README. For independent hosting, create accounts you control and check their costs. Coordinate the cutover with us before changing the domain so the current site stays available during setup." },
  { question: "Will Interstate Rankers still help after handing over my website?", answer: "Yes. We continue providing guidance after handover. When you run the site in your own setup, we help explain what to do rather than directly editing or adding to that website. We also offer a free consultation about issues with your current site; discuss implementation or maintenance work with us separately." },
  { question: "Can I upload a Next.js ZIP straight to ordinary hosting?", answer: "This delivery needs a platform that supports its Next.js runtime and server-side contact endpoint. Shared hosting that only serves static files cannot run that endpoint. Static export requires code changes and a replacement for server features; renaming files or uploading the source to public_html will not make it work." },
  { question: "Do I need GitHub to use Vercel?", answer: "Vercel also supports CLI and other deployment routes, so GitHub is not mandatory. This guide uses a private GitHub repository because it keeps source history and connects future updates to deployments. Use one documented workflow consistently." },
  { question: "Is Vercel free for a business website?", answer: "Vercel’s Hobby plan is restricted to personal, non-commercial use. Choose a plan that permits your business use and check current pricing, limits and usage charges before subscribing. Domain renewal and email delivery may be separate costs." },
  { question: "Why does git say it is not recognised?", answer: "Install Git from git-scm.com, close and reopen the terminal, then run git --version. If it still fails, check the installer’s PATH option. Do the same for Node.js if node or npm is missing. Do not change security settings or paste unrelated scripts to fix it." },
  { question: "How do I fix remote origin already exists?", answer: "Run git remote -v first. If origin already points to the correct repository, skip git remote add origin. If the address is wrong and you have confirmed the correct destination, use git remote set-url origin followed by that repository’s HTTPS URL. Changing a remote does not move repository ownership." },
  { question: "Why was my Git push rejected?", answer: "Check the exact error. Authentication failures need account/repository access checked. A non-fast-forward rejection means the remote has commits you do not have. Do not force-push over them. For a first upload to a repository containing a README, clone that repository into a separate folder and copy your website into it while preserving its .git folder. For an existing collaborative project, ask your developer to reconcile the histories." },
  { question: "Why is my contact form not sending emails?", answer: "Check RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in the right Vercel environment. The sender must use a verified Resend domain, and the key must have sending permission. Redeploy after changes. Look at Vercel logs, Resend delivery status and the receiving spam folder. This example’s endpoint also limits repeated test submissions." },
  { question: "Why does my domain still show the old website?", answer: "Check that you changed records in the active DNS manager and copied the values from the correct Vercel project. Existing TTL values and caches can delay the change. Check Vercel’s domain status, both root and www addresses, and another network. Do not delete business email records or repeatedly switch nameservers while waiting." },
  { question: "Why does localhost fail with HTTPS or an SSL error?", answer: "A normal npm run dev server uses HTTP. Open the exact Local URL printed in the terminal, including its port. HTTPS on an HTTP-only port will fail. If the browser saved an earlier redirect, use a fresh local port for development. Do not bypass certificate warnings for a public website." },
  { question: "How do I fix EADDRINUSE or port 3000 already in use?", answer: "Another process is using that port. If it is your earlier development server, stop it in its terminal with Ctrl+C. Otherwise choose another port: npm run dev -- --port 3001. Open the new URL printed in the terminal. Do not stop an unknown process just to free a port." },
  { question: "Why did my Vercel deployment fail?", answer: "Open the failed deployment’s build logs and find the first meaningful error. Confirm the root contains package.json, required variables exist, and the Node version is compatible. Run npm ci and npm run build locally to reproduce it. A missing file may be a filename-case mismatch that Windows tolerated but the deployment does not." },
  { question: "How do I undo a website change?", answer: "If the live site is broken, use Vercel’s rollback controls when available for your plan and deployment. Then fix or revert the source change too, otherwise the next deployment can restore the bug. For an ordinary non-merge commit, git revert COMMIT_ID creates a new undo commit without rewriting shared history. Confirm the correct commit with your developer." },
  { question: "Can I edit content without learning code?", answer: "This package has Markdown blog files and code-based pages, not a visual editing dashboard. Small article edits can be made in a text editor, but syntax and image paths still matter. A CMS or visual editor can be added separately if you need frequent non-technical editing." },
  { question: "Does submitting a sitemap guarantee Google indexing?", answer: "No. A sitemap helps search engines discover URLs but does not guarantee indexing or rankings. First confirm the live site is accessible, intended pages permit indexing, and canonical URLs use the right domain. Verify your property in Google Search Console and submit the live sitemap there." },
];

export const handbookSources = [
  { title: "GitHub: add locally hosted code", url: "https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github" },
  { title: "GitHub: authentication", url: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github" },
  { title: "GitHub: manage remotes", url: "https://docs.github.com/en/get-started/git-basics/managing-remote-repositories" },
  { title: "Next.js: installation", url: "https://nextjs.org/docs/app/getting-started/installation" },
  { title: "Vercel: GitHub deployments", url: "https://vercel.com/docs/git/vercel-for-github" },
  { title: "Vercel: environment variables", url: "https://vercel.com/docs/environment-variables" },
  { title: "Vercel: custom domains", url: "https://vercel.com/docs/domains/working-with-domains/add-a-domain" },
  { title: "Vercel: Hobby plan terms", url: "https://vercel.com/docs/plans/hobby" },
  { title: "Vercel: rollback", url: "https://vercel.com/docs/instant-rollback" },
  { title: "Vercel: CLI deployment", url: "https://vercel.com/docs/cli/deploy" },
  { title: "Resend: verified domains", url: "https://resend.com/docs/dashboard/domains/introduction" },
  { title: "Google: sitemaps", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" },
];
