'use client'

import { useState, useMemo } from 'react'
import { BlogPostGrid } from './BlogPostGrid'
import { CategoryFilter } from './CategoryFilter'
import { BlogPostPreview, Category } from '@/types/blog'

interface InsightsClientProps {
  initialPosts: BlogPostPreview[]
  categories: Category[]
}

export function InsightsClient({ initialPosts, categories }: InsightsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) {
      return initialPosts
    }
    return initialPosts.filter(post => post.category.slug.current === selectedCategory)
  }, [initialPosts, selectedCategory])

  return (
    <>
      {/* Category Filter */}
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Blog Posts Grid */}
      <BlogPostGrid posts={filteredPosts} />
    </>
  )
}
