import type { PortableTextBlock } from 'sanity'

export interface Author {
  _id: string
  name: string
  slug: { current: string }
  bio?: string
  avatar?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  socialLinks?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  color?: 'primary' | 'accent-cyan' | 'accent-amber' | 'primary-glow'
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: PortableTextBlock[] // Portable Text content
  featuredImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  category?: Category
  author: Author
  publishedAt: string
  readTime: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  featured: boolean
}

export interface BlogPostPreview {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  category?: Category
  author: Author
  publishedAt: string
  readTime: number
  featured: boolean
}
