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

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return []
  }
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPostPreview[]> {
  const query = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    ${postFields}
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<BlogPostPreview[]> {
  const query = `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    ${postFields}
  }`

  try {
    return await client.fetch(query, { categorySlug })
  } catch (error) {
    console.error(`Error fetching posts by category "${categorySlug}":`, error)
    return []
  }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ${postContentFields}
  }`

  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error)
    return null
  }
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

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching all categories:', error)
    return []
  }
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

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching all authors:', error)
    return []
  }
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

  try {
    if (!categorySlug) {
      // Re-define query for safety if logic flow changes, though params handles it
      return await client.fetch(query, { currentPostId, limit })
    }
    return await client.fetch(query, { currentPostId, categorySlug, limit })
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

// Search posts
export async function searchPosts(searchTerm: string): Promise<BlogPostPreview[]> {
  const query = `*[_type == "post" && (title match $searchTerm || excerpt match $searchTerm || content[].children[].text match $searchTerm)] | order(publishedAt desc) {
    ${postFields}
  }`

  try {
    return await client.fetch(query, { searchTerm: `*${searchTerm}*` })
  } catch (error) {
    console.error(`Error searching posts with term "${searchTerm}":`, error)
    return []
  }
}
