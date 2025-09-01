# InterStateRankers

Marketing site and lead-gen app for AI-driven answering services, SEO, PPC, and web development. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- Next.js 14 (App Router, `src/app`)
- React 18 + TypeScript
- Tailwind CSS + tailwindcss-animate + typography
- shadcn/ui (Radix UI primitives)
- TanStack Query
- Recharts, Embla Carousel
- Three.js (`@react-three/fiber`, `@react-three/drei`)
- EmailJS (client-side) for demo contact form

## Getting Started

Prerequisites:

- Node.js 18+ and npm

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

The app runs on `http://localhost:8080`.

Build and start production server:

```bash
npm run build
npm start
```

## Environment Variables

Copy `env.example` to `.env.local` and fill in your EmailJS credentials. These are client-exposed and optional; when omitted, the contact flow runs in demo mode.

```bash
cp env.example .env.local
# Then edit .env.local
```

Required (optional for demo):

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

Email sending logic lives in `src/lib/email.ts`. If the variables are not set, the app simulates a successful request for a smooth demo.

## Project Structure

Key directories:

- `src/app` — App Router pages and layout
  - `layout.tsx` — root layout and metadata
  - `page.tsx` — homepage composition
  - `about`, `contact`, `pricing`, `projects`, `insights`, `services/*` — marketing pages
- `src/components` — UI, layout, and section components (shadcn/ui based)
- `src/lib` — utilities and EmailJS integration
- `public` — static assets and logos
- `tailwind.config.ts` — Tailwind theme and animation settings

## Scripts

- `npm run dev` — start Next.js dev server on port 8080
- `npm run build` — production build
- `npm start` — start production server on port 8080
- `npm run lint` — run ESLint

## Styling & UI

- Tailwind configured for class-based dark mode (`dark` class)
- Custom theme tokens in `tailwind.config.ts`
- shadcn/ui components under `src/components/ui`

## Deployment

This is a standard Next.js app and can be deployed to any Node-compatible host or edge platform:

- Vercel (recommended)
- Netlify
- Render / Fly.io / Docker

Typical Vercel steps: push to a Git repo, import in Vercel, set env vars, and deploy.

## Contact & Forms

- Email sending uses EmailJS from the browser (`@emailjs/browser`)
- Configure your service/template/public key in `.env.local`
- For production-grade email, consider moving to a server-side provider (e.g., Resend, SendGrid) and API Route

## License

Proprietary – All rights reserved.
