import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://interstaterankers.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Get blog posts from Sanity
  let blogPosts: any[] = []
  try {
    const { getAllPosts } = await import('@/lib/blog')
    blogPosts = await getAllPosts()
    console.log(`📝 Found ${blogPosts.length} blog posts for sitemap`)
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Get categories from Sanity
  let categories: any[] = []
  try {
    const { getAllCategories } = await import('@/lib/blog')
    categories = await getAllCategories()
    console.log(`📂 Found ${categories.length} categories for sitemap`)
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  // Blog post pages
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Category pages (if you have category pages)
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/insights/category/${category.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  const allPages = [...staticPages, ...blogPostPages, ...categoryPages]
  console.log(`✅ Generated sitemap with ${allPages.length} URLs`)
  
  return allPages
}
