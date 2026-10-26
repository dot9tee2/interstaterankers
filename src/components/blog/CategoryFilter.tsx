'use client'

import { Category } from '@/types/blog'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (categorySlug: string | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const chip = (selected: boolean) => cn(
    'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
    selected
      ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
      : 'border-border bg-background text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground'
  )

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12 md:mb-16">
      <button type="button" aria-pressed={selectedCategory === null} onClick={() => onCategoryChange(null)} className={chip(selectedCategory === null)}>
        All posts
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          type="button"
          aria-pressed={selectedCategory === category.slug.current}
          onClick={() => onCategoryChange(category.slug.current)}
          className={chip(selectedCategory === category.slug.current)}
        >
          {category.title}
        </button>
      ))}
    </div>
  )
}
