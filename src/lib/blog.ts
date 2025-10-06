import { client } from './sanity'
import { BlogPost, BlogPostPreview, Category, Author } from '@/types/blog'

// GROQ queries
const postFields = `
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  category->{
    _id,
    title,
    slug,
    description,
    color
  },
  author->{
    _id,
    name,
    slug,
    bio,
    avatar,
    socialLinks
  },
  publishedAt,
  readTime,
  featured
`

const postContentFields = `
  _id,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  category->{
    _id,
    title,
    slug,
    description,
    color
  },
  author->{
    _id,
    name,
    slug,
    bio,
    avatar,
    socialLinks
  },
  publishedAt,
  readTime,
  seo,
  featured
`

// Get all blog posts (preview)
export async function getAllPosts(): Promise<BlogPostPreview[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }`
  
  return await client.fetch(query)
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPostPreview[]> {
  const query = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    ${postFields}
  }`
  
  return await client.fetch(query)
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<BlogPostPreview[]> {
  const query = `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    ${postFields}
  }`
  
  return await client.fetch(query, { categorySlug })
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ${postContentFields}
  }`
  
  return await client.fetch(query, { slug })
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }`
  
  return await client.fetch(query)
}

// Get all authors
export async function getAllAuthors(): Promise<Author[]> {
  const query = `*[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    bio,
    avatar,
    socialLinks
  }`
  
  return await client.fetch(query)
}

// Get related posts (same category, excluding current post)
export async function getRelatedPosts(currentPostId: string, categorySlug: string | null, limit: number = 3): Promise<BlogPostPreview[]> {
  // If no category slug provided, get recent posts instead
  if (!categorySlug) {
    const query = `*[_type == "post" && _id != $currentPostId] | order(publishedAt desc) [0...$limit] {
      ${postFields}
    }`
    return await client.fetch(query, { currentPostId, limit })
  }
  
  const query = `*[_type == "post" && _id != $currentPostId && category->slug.current == $categorySlug] | order(publishedAt desc) [0...$limit] {
    ${postFields}
  }`
  
  return await client.fetch(query, { currentPostId, categorySlug, limit })
}

// Search posts
export async function searchPosts(searchTerm: string): Promise<BlogPostPreview[]> {
  const query = `*[_type == "post" && (title match $searchTerm || excerpt match $searchTerm || content[].children[].text match $searchTerm)] | order(publishedAt desc) {
    ${postFields}
  }`
  
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` })
}
