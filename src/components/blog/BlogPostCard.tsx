import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Clock, User } from 'lucide-react'
import { BlogPostPreview } from '@/types/blog'
import { urlFor } from '@/lib/sanity'
import { format } from 'date-fns'

interface BlogPostCardProps {
  post: BlogPostPreview
  featured?: boolean
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const categoryColorMap = {
    'primary': 'bg-primary text-primary-foreground',
    'accent-cyan': 'bg-accent-cyan text-white',
    'accent-amber': 'bg-accent-amber text-white',
    'primary-glow': 'bg-primary-glow text-white',
  } as const

  // Fix: Properly handle the optional category and color properties with null safety
  const categoryColor = categoryColorMap[(post.category?.color as keyof typeof categoryColorMap) || 'primary']

  return (
    <article className="group relative animate-slide-up">
      <Card className="relative h-full overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 card-tilt glow-card">
        <Link href={`/insights/${post.slug.current}`} className="block">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={urlFor(post.featuredImage).width(400).height(200).url()}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Category */}
            {post.category && (
              <div className="mb-3">
                <Badge className={`${categoryColor} hover:opacity-90 transition-opacity`}>
                  {post.category.title}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              </time>
            </div>
          </div>
        </Link>
      </Card>
    </article>
  )
}