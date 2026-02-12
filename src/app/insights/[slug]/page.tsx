import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { SocialShare } from "@/components/blog/SocialShare";
import { PortableText, type PortableTextComponents, type PortableTextTypeComponentProps, type PortableTextMarkComponentProps } from "@portabletext/react";
import { type SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Calendar, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Revalidate individual post pages to keep related lists fresh
export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = post.seo?.metaDescription || post.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.seo?.keywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/insights/${post.slug.current}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.featuredImage ? [
        {
          url: urlFor(post.featuredImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.featuredImage.alt || post.title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: post.featuredImage ? [urlFor(post.featuredImage).width(1200).height(630).url()] : [],
    },
    alternates: {
      canonical: `/insights/${post.slug.current}`,
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

// Portable Text components for rendering rich content
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: PortableTextTypeComponentProps<SanityImageSource & { caption?: string; alt?: string; _type: 'image' }>) => {
      return (
        <figure className="my-10">
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-lg">
            <Image
              src={urlFor(value).width(1000).height(600).url()}
              alt={value.alt || ""}
              width={1000}
              height={600}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    // FIX: Render H1 as H2 to avoid duplicate H1 tags on the page
    h1: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-10 text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mb-3 mt-8 text-foreground/90">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold mb-2 mt-6 text-foreground/80">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-muted-foreground leading-loose text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent-cyan pl-6 my-8 italic text-xl text-foreground/80 bg-accent-cyan/5 py-4 rounded-r-lg">
        "{children}"
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-muted-foreground text-lg marker:text-accent-cyan">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-muted-foreground text-lg marker:text-accent-cyan marker:font-bold">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/90">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-2 py-0.5 rounded text-sm font-mono text-accent-cyan border border-border">{children}</code>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: ({ children, value }: PortableTextMarkComponentProps<any>) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-cyan hover:text-accent-cyan/80 hover:underline underline-offset-4 transition-colors font-medium cursor-pointer"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post._id, post.category?.slug?.current, 3);

  // Styling for different categories
  const categoryColorMap = {
    'primary': 'bg-primary/20 text-primary border-primary/20',
    'accent-cyan': 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/20',
    'accent-amber': 'bg-accent-amber/20 text-accent-amber border-accent-amber/20',
    'primary-glow': 'bg-primary-glow/20 text-white border-primary-glow/20',
  };

  const categoryStyle = categoryColorMap[post.category?.color || 'primary'];

  return (
    <div className="min-h-screen bg-background selection:bg-accent-cyan/20 selection:text-accent-cyan">
      <Navbar />

      <main className="pb-24 pt-32">
        <article className="container max-w-4xl mx-auto px-4">
          {/* Breadcrumb - Left Aligned */}
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/insights" className="hover:text-foreground transition-colors">Insights</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 max-w-[200px]">{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header */}
          <header className="mb-12 border-b border-border/40 pb-12">
            {/* Category */}
            {post.category && (
              <div className="mb-6">
                <Badge variant="outline" className="px-4 py-1.5 rounded-full text-sm font-medium border border-accent-cyan text-accent-cyan bg-accent-cyan/10">
                  {post.category.title}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-8 leading-tight text-balance text-foreground">
              {post.title}
            </h1>

            {/* Metadata Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20 text-accent-cyan">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground text-base">{post.author.name}</span>
                  <span className="text-xs">Author</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-border" />

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                  </time>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-16 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-sm border border-border/50">
              <Image
                src={urlFor(post.featuredImage).width(1200).height(600).url()}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent-cyan prose-img:rounded-2xl prose-strong:text-white">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>

          {/* Social Share */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <div className="text-muted-foreground font-medium">Share this article</div>
            <SocialShare
              url={`https://interstaterankers.com/insights/${post.slug.current}`}
              title={post.title}
            />
          </div>
        </article>

        {/* Back Button */}
        {/* Back Button */}
        <div className="container max-w-4xl mx-auto px-4 mt-12 mb-20">
          <Button variant="outline" size="lg" asChild className="group border-white/20 hover:bg-accent-cyan hover:text-black hover:border-accent-cyan transition-all duration-300">
            <Link href="/insights" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Insights
            </Link>
          </Button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-muted/30 py-20 border-t border-border/50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold font-heading">Related Articles</h2>
                <Link href="/insights" className="text-sm font-semibold text-accent-cyan hover:underline decoration-2 underline-offset-4 hidden md:block">
                  View all insights
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost._id} post={relatedPost} />
                ))}
              </div>

              <div className="mt-8 text-center md:hidden">
                <Link href="/insights" className="text-sm font-semibold text-accent-cyan hover:underline decoration-2 underline-offset-4">
                  View all insights
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* JSON-LD Structured Data */}
      <Script id="blog-post-ld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined,
            author: {
              "@type": "Person",
              name: post.author.name,
              url: post.author.socialLinks?.website,
            },
            publisher: {
              "@type": "Organization",
              name: "InterStateRankers",
              logo: {
                "@type": "ImageObject",
                url: "https://interstaterankers.com/InterStateRankerLogo.png",
              },
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://interstaterankers.com/insights/${post.slug.current}`,
            },
          })
        }} />

      <Footer />
    </div>
  );
}
