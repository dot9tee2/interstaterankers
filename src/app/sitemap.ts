import { MetadataRoute } from 'next'
import { BlogPostPreview } from '@/types/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://interstaterankers.com'

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/insights/how-to-host-your-website-on-vercel`,
      lastModified: new Date('2026-10-26T00:00:00+05:00'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
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
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cancellation-and-refund-policy`,
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
    ...[
      'seo',
      'gmb',
      'web-development',
      'answering',
      'calling',
      'content-marketing',
      'social-media',
      'ppc',
      'graphic-design',
      'app-development',
    ].map(slug => ({
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

  // Blog post pages
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const allPages = [...staticPages, ...blogPostPages]
  console.log(`✅ Generated sitemap with ${allPages.length} URLs`)

  return allPages
}
