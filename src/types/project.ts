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
  servicesProvided?: string[]
  tags?: string[]
  featured?: boolean
  featuredImage?: SanityImageSource & { alt?: string }
}

export type Project = ProjectPreview & {
  gallery?: (SanityImageSource & { alt?: string })[]
  stats?: ProjectStat[]
  content?: PortableTextBlock[]
  links?: ProjectLink[]
  seo?: {
    title?: string
    description?: string
  }
}


