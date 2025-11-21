import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { urlFor } from "@/lib/sanity";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { PortableText } from "@portabletext/react";

export const revalidate = 300;

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };
  const title = project.seo?.title || project.title;
  const description = project.seo?.description || project.summary || "";
  const imageUrl = project.featuredImage ? urlFor(project.featuredImage).width(1200).height(630).url() : undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/projects/${project.slug.current}`,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: project.featuredImage?.alt || project.title }] : [],
    },
    alternates: { canonical: `/projects/${project.slug.current}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

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
                  <Link href="/projects">Projects</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-body font-bold mb-4 gradient-text">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {project.industry ? <Badge variant="secondary">{project.industry}</Badge> : null}
            {(project.servicesProvided || []).map((s) => (
              <Badge key={s} variant="outline" className="border-accent-cyan/40 text-accent-cyan bg-accent-cyan/10">{s}</Badge>
            ))}
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener" aria-label="Open live site">
                <Button className="hero-gradient text-white">View Live Site</Button>
              </a>
            ) : null}
            {project.links && project.links.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {project.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener">
                    <Button variant="outline" size="sm">{l.label}</Button>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        {/* Featured Image */}
        {project.featuredImage ? (
          <div className="relative h-64 md:h-96 overflow-hidden rounded-lg mb-12 max-w-5xl mx-auto">
            <Image
              src={urlFor(project.featuredImage).width(1600).height(900).url()}
              alt={project.featuredImage.alt || project.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        {/* Content */}
        <article className="prose prose-lg max-w-3xl mx-auto mb-12">
          {project.content ? <PortableText value={project.content} /> : null}
        </article>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 ? (
          <section className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((img: any, idx: number) => (
                <div key={idx} className="relative w-full overflow-hidden rounded-md border border-border/60">
                  <div className="relative h-56">
                    <Image
                      src={urlFor(img).width(800).height(450).url()}
                      alt={img.alt || project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      {/* JSON-LD Structured Data */}
      <Script id="project-ld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: `https://interstaterankers.com/projects/${project.slug.current}`,
          image: project.featuredImage ? urlFor(project.featuredImage).width(1200).height(630).url() : undefined,
          isPartOf: { "@id": "https://interstaterankers.com/#website" },
          sameAs: project.liveUrl ? [project.liveUrl] : undefined,
        }) }} />

      <Footer />
    </div>
  );
}


