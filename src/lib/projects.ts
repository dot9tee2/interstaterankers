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
  tags,
  featured
`

const fullFields = `
  ${previewFields},
  stats,
  seo
`

export async function getFeaturedProjects(limit: number = 3): Promise<ProjectPreview[]> {
  const query = `*[_type == "project" && featured == true] | order(_updatedAt desc) [0...$limit] {
    ${previewFields}
  }`
  try {
    return await client.fetch(query, { limit })
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

export async function getAllProjects(): Promise<ProjectPreview[]> {
  const query = `*[_type == "project"] | order(featured desc, _updatedAt desc) {
    ${previewFields}
  }`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching all projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    ${fullFields}
  }`
  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error(`Error fetching project by slug "${slug}":`, error)
    return null
  }
}


