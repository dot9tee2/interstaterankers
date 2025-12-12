import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { PortableText, type PortableTextComponents, type PortableTextTypeComponentProps, type PortableTextMarkComponentProps } from "@portabletext/react";
import { type SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
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
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || ""}
            width={800}
            height={400}
            className="rounded-lg mx-auto"
          />
          {value.caption && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8 gradient-text">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: ({ children, value }: PortableTextMarkComponentProps<any>) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
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

  const categoryColorMap = {
    'primary': 'bg-primary text-primary-foreground',
    'accent-cyan': 'bg-accent-cyan text-white',
    'accent-amber': 'bg-accent-amber text-white',
    'primary-glow': 'bg-primary-glow text-white',
  };

  const categoryColor = categoryColorMap[post.category?.color || 'primary'];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/insights">Insights</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/insights" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
          </Button>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            {/* Category */}
            {post.category && (
              <div className="mb-4">
                <Badge className={`${categoryColor} hover:opacity-90 transition-opacity`}>
                  {post.category.title}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
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

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative h-64 md:h-96 overflow-hidden rounded-lg mb-8">
                <Image
                  src={urlFor(post.featuredImage).width(1200).height(600).url()}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost._id} post={relatedPost} />
              ))}
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
