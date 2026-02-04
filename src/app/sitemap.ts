import { MetadataRoute } from 'next'
import { BlogPostPreview } from '@/types/blog'
import { ProjectPreview } from '@/types/project'

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
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Service Subpages
    ...['seo', 'web-development', 'social-media', 'ppc', 'content-marketing'].map(slug => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
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
  let blogPosts: BlogPostPreview[] = []
  try {
    const { getAllPosts } = await import('@/lib/blog')
    blogPosts = await getAllPosts()
    console.log(`📝 Found ${blogPosts.length} blog posts for sitemap`)
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Get projects from Sanity
  let projects: ProjectPreview[] = []
  try {
    const { getAllProjects } = await import('@/lib/projects')
    projects = await getAllProjects()
    console.log(`📁 Found ${projects.length} projects for sitemap`)
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  // Blog post pages
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Project pages
  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const allPages = [...staticPages, ...blogPostPages, ...projectPages]
  console.log(`✅ Generated sitemap with ${allPages.length} URLs`)

  return allPages
}
