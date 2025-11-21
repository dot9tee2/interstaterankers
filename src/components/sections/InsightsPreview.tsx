import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { getFeaturedPosts, getAllPosts } from "@/lib/blog";

const InsightsPreview = async () => {
  // Prefer featured posts; fallback to latest 3 posts
  let posts = await getFeaturedPosts();
  if (!posts || posts.length === 0) {
    const all = await getAllPosts();
    posts = all.slice(0, 3);
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 gradient-text">
            Growth Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay ahead of the competition with proven strategies, case studies, and actionable business growth tips.
          </p>
        </div>

        {/* Insights Grid (latest/featured posts) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {posts.map((post, index) => (
            <article 
              key={post._id}
              className="group relative animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Card */}
              <div className="relative h-full p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500 card-tilt glow-card">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-1">
                    <Badge 
                      variant="secondary" 
                      className="text-xs mb-2 border-0 bg-muted/50"
                    >
                      {post.category?.title ?? "Insights"}
                    </Badge>
                    
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime ?? "— min read"}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-body font-semibold mb-3 leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/insights/${post.slug.current}`} className="hover:underline decoration-primary/30">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <Link href={`/insights/${post.slug.current}`}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="p-0 h-auto font-medium text-sm hover:text-primary animate-underline"
                    >
                      Read Article
                    </Button>
                  </Link>
                  
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Hover Accent */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-accent-cyan rounded-full animate-pulse" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/insights">
            <Button size="lg" variant="outline" className="animate-underline font-semibold">
              View All Insights
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <div className="mt-6 inline-flex items-center space-x-2 text-sm text-muted-foreground bg-card/50 border border-border rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-accent-amber rounded-full animate-pulse" />
            <span>New insights published weekly • Subscribe for updates</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsPreview;