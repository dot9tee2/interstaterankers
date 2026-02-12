import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import LivePreview from "@/components/ui/live-preview";

export const revalidate = 300;

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  const title = project.seo?.title || project.title;
  const description = project.seo?.description || project.summary || "";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/projects/${project.slug.current}`,
      type: "website",
    },
    alternates: { canonical: `/projects/${project.slug.current}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16">
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
        <header className="relative max-w-5xl mx-auto text-center mb-16 px-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 bg-primary/10 blur-[100px] rounded-full opacity-60 pointer-events-none" />

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {project.industry ? (
              <Badge variant="outline" className="bg-background/40 backdrop-blur-sm border-white/10 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                {project.industry}
              </Badge>
            ) : null}
          </div>

          <h1 className="text-5xl md:text-7xl font-body font-bold mb-6 gradient-text tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            {project.summary}
          </p>




        </header>

        {/* Live Preview */}
        {project.liveUrl && (
          <div className="mb-20">
            <LivePreview url={project.liveUrl} />
          </div>
        )}

        {/* Featured Image */}




        {/* Gallery */}

      </main>



      <Footer />
    </div>
  );
}


