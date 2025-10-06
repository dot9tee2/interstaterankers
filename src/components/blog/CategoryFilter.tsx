'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Category } from '@/types/blog'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (categorySlug: string | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categoryColorMap = {
    'primary': 'bg-primary text-primary-foreground',
    'accent-cyan': 'bg-accent-cyan text-white',
    'accent-amber': 'bg-accent-amber text-white',
    'primary-glow': 'bg-primary-glow text-white',
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className="transition-all duration-300"
      >
        All Posts
      </Button>
      {categories.map((category) => (
        <Button
          key={category._id}
          variant={selectedCategory === category.slug.current ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.slug.current)}
          className="transition-all duration-300"
        >
          {category.title}
        </Button>
      ))}
    </div>
  )
}
