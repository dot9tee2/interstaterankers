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
  featuredImage?: any
}

export type Project = ProjectPreview & {
  gallery?: any[]
  stats?: ProjectStat[]
  content?: any
  links?: ProjectLink[]
  seo?: {
    title?: string
    description?: string
  }
}


