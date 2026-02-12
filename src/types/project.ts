import type { PortableTextBlock } from 'sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type ProjectLink = {
  label: string
  url: string
}

export type ProjectStat = {
  label: string
  value: string
}

export type ProjectPreview = {
  _id: string
  title: string
  slug: { current: string }
  clientName?: string
  summary?: string
  liveUrl?: string
  industry?: string
  featured?: boolean
}

export type Project = ProjectPreview & {
  stats?: ProjectStat[]
  seo?: {
    title?: string
    description?: string
  }
}


