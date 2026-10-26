import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { BlogPostPreview } from '@/types/blog'
import { urlFor } from '@/lib/sanity'
import { cn } from '@/lib/utils'

interface BlogPostCardProps {
  post: BlogPostPreview
  featured?: boolean
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <Link
      href={`/insights/${post.slug.current}`}
      className="group flex flex-col h-full animate-slide-up"
    >
      <article className={cn(
        "flex flex-col h-full rounded-2xl overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:border-accent-cyan/40",
        featured && "border-accent-cyan/40"
      )}>
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={urlFor(post.featuredImage).width(800).height(500).url()}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm font-medium">No Image Available</span>
            </div>
          )}

          {/* Category Badge */}
          {post.category && (
            <div className="absolute top-6 left-6">
              <Badge className="bg-card text-foreground border-border hover:bg-card shadow-sm">
                {post.category.title}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime ?? "5"} min read</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold tracking-tight mb-3 leading-tight group-hover:text-accent-cyan transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Footer CTA */}
          <div className="flex items-center gap-2 text-sm font-semibold text-accent-cyan mt-auto">
            Read article
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  )
}