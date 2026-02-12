import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedPosts, getAllPosts } from "@/lib/blog";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

const InsightsPreview = async () => {
  // Prefer featured posts; fallback to latest 3 posts
  let posts = await getFeaturedPosts();
  if (!posts || posts.length === 0) {
    const all = await getAllPosts();
    posts = all.slice(0, 3);
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-cyan/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 border-accent-cyan text-accent-cyan bg-accent-cyan/10 px-4 py-1.5 rounded-full text-sm">
            Knowledge Hub
          </Badge>
          <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 gradient-text">
            Growth Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay ahead of the curve with our latest strategies, case studies, and industry analysis for sustainable business growth.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {posts.map((post, index) => (
            <Link
              href={`/insights/${post.slug.current}`}
              key={post._id}
              className="group flex flex-col h-full animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <article className="flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-card/30 hover:bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-accent-cyan/10 hover:-translate-y-2 group-hover:border-accent-cyan/20">
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
                    <div className="w-full h-full bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm font-medium">No Image Available</span>
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-white/10 hover:bg-background shadow-lg">
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
                      <span>{post.readTime ?? "5 min read"}</span>
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
                  <div className="flex items-center text-sm font-semibold text-accent-cyan/90 group-hover:text-accent-cyan transition-colors mt-auto">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/insights">
            <Button size="lg" className="hero-gradient hover-lift text-white font-semibold rounded-full px-8 h-12 shadow-lg shadow-primary/20">
              View All Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsPreview;