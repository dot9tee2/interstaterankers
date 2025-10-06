import { BlogPostPreview } from '@/types/blog'
import { BlogPostCard } from './BlogPostCard'

interface BlogPostGridProps {
  posts: BlogPostPreview[]
  featured?: boolean
}

export function BlogPostGrid({ posts, featured = false }: BlogPostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No blog posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <BlogPostCard
          key={post._id}
          post={post}
          featured={featured}
        />
      ))}
    </div>
  )
}
