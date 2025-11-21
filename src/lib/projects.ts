import { client } from './sanity'
import type { Project, ProjectPreview } from '@/types/project'

const previewFields = `
  _id,
  title,
  slug,
  clientName,
  summary,
  liveUrl,
  industry,
  servicesProvided,
  tags,
  featured,
  featuredImage
`

const fullFields = `
  ${previewFields},
  gallery,
  stats,
  content,
  links,
  seo
`

export async function getFeaturedProjects(limit: number = 3): Promise<ProjectPreview[]> {
  const query = `*[_type == "project" && featured == true] | order(_updatedAt desc) [0...$limit] {
    ${previewFields}
  }`
  return await client.fetch(query, { limit })
}

export async function getAllProjects(): Promise<ProjectPreview[]> {
  const query = `*[_type == "project"] | order(featured desc, _updatedAt desc) {
    ${previewFields}
  }`
  return await client.fetch(query)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    ${fullFields}
  }`
  return await client.fetch(query, { slug })
}


