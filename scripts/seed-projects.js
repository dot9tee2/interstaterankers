// Seed initial projects into Sanity (minimal fields, edit/enrich in Studio)
// Usage:
//   SANITY_WRITE_TOKEN=xxxx node scripts/seed-projects.js
// Optionally set SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION

import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6zrqfn4s'
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN env var. Aborting.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const toSlug = (str) =>
  (str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 96)

const seedProjects = [
  {
    title: 'Al Furqan International Business',
    liveUrl: 'https://alfurqanint.com',
    summary: 'International Business Website for Al Furqan International Business',
    tags: ['Gsap', 'Tailwind', 'SEO', 'Accessibility'],
  },
  {
    title: 'Curtains and Covers',
    liveUrl: 'https://curtainsandcovers.com',
    summary: 'Home services site with quote funnel, dynamic service areas, and reviews.',
    tags: ['E-Commerce', 'Payment Gateway', 'Reviews', 'Conversion'],
  },
  {
    title: 'YatchtClub',
    liveUrl: 'https://yatcht.vercel.app',
    summary: 'YatchClub is a website for a yatch club',
    tags: ['ShowCase', 'Booking', 'Yatch', 'Reviews'],
  },
]

async function ensureProject(doc) {
  const slug = toSlug(doc.title)
  const existing = await client.fetch(`*[_type == "project" && slug.current == $slug][0]{_id}`, { slug })
  if (existing?._id) {
    console.log(`✓ Exists: ${doc.title}`)
    return existing._id
  }
  const newDoc = {
    _type: 'project',
    title: doc.title,
    slug: { _type: 'slug', current: slug },
    summary: doc.summary,
    liveUrl: doc.liveUrl,
    tags: doc.tags,
    featured: false,
  }
  const created = await client.create(newDoc)
  console.log(`+ Created: ${doc.title} (${created._id})`)
  return created._id
}

async function run() {
  for (const p of seedProjects) {
    await ensureProject(p)
  }
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})


