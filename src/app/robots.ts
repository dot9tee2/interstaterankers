import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || 'https://interstaterankers.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/*']
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
