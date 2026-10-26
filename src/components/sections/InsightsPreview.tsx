import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedPosts, getAllPosts } from "@/lib/blog";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

const InsightsPreview = async () => {
  // Prefer featured posts; fallback to latest 3 posts
  let posts = await getFeaturedPosts();
  if (!posts || posts.length === 0) {
    const all = await getAllPosts();
    posts = all.slice(0, 3);
  }

  return (
    <section className="py-20 sm:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          className="mb-12 md:mb-16 animate-fade-in"
          eyebrow="Knowledge hub"
          title="Growth insights"
          description="Stay ahead of the curve with our latest strategies, case studies, and industry analysis for sustainable business growth."
        />

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              href={`/insights/${post.slug.current}`}
              key={post._id}
              className="group flex flex-col h-full animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <article className="flex flex-col h-full rounded-2xl overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:border-accent-cyan/40">
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

                  {/* Category Badge: inset to line up with the p-6 content below */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-card text-foreground border-border hover:bg-card shadow-sm">
                      {post.category?.title ?? "Insight"}
                    </Badge>
                  </div>
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
                      <span>{post.readTime ?? 5} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-body font-bold mb-3 leading-tight group-hover:text-accent-cyan transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent-cyan mt-auto">
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All CTA: outlined, because reading more is never the main action (the violet fill is kept for that) */}
        <div className="text-center mt-12 md:mt-16">
          <Button asChild variant="outline" size="lg" className="h-12 rounded-xl border-border bg-transparent px-6 font-semibold text-foreground hover:bg-muted hover:text-foreground">
            <Link href="/insights">
              View all insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InsightsPreview;