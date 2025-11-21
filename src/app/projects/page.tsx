import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects & Case Studies (US)",
	description: "Explore InterStateRankers projects and case studies for US businesses.",
	openGraph: {
		title: "Projects & Case Studies (US)",
		description: "Explore InterStateRankers projects and case studies for US businesses.",
		url: "/projects",
		locale: "en_US"
	},
	alternates: { canonical: "/projects" }
};
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getAllProjects } from "@/lib/projects";
import { urlFor } from "@/lib/sanity";

export default async function ProjectsPage() {
	const projects = await getAllProjects();
	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="container mx-auto px-4 py-16">
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
								<BreadcrumbPage>Projects</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<h1 className="text-4xl font-body font-bold text-center mb-8 gradient-text">Our Projects</h1>
				<p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
					Explore our portfolio of successful business growth transformations and case studies.
				</p>

				<div className="mt-12">
					<section className="py-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{projects.map((p) => (
								<Link
									key={p._id}
									href={`/projects/${p.slug.current}`}
									className="group block focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
									aria-label={`Open ${p.title}`}
								>
									<Card className="h-full hover:border-primary/40 transition-colors card-tilt hover-lift glow-card border border-border/80 hover:ring-1 hover:ring-primary/30 overflow-hidden">
										<CardHeader className="pb-2">
											<CardTitle className="text-lg flex items-center justify-between">
												<span>{p.title}</span>
												{p.industry ? (
													<Badge variant="secondary" className="text-xs">
														{p.industry}
													</Badge>
												) : null}
											</CardTitle>
										</CardHeader>
										<CardContent className="relative">
											<div className="rounded-md overflow-hidden border border-border/50 transform-gpu transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-[2%]">
												<AspectRatio ratio={16 / 9}>
													{p.featuredImage ? (
														<Image
															src={urlFor(p.featuredImage).width(960).height(540).fit('crop').url()}
															alt={p.featuredImage.alt || `${p.title} preview`}
															fill
															sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
															className="object-cover"
															priority={false}
														/>
													) : (
														<div className="w-full h-full bg-muted" />
													)}
												</AspectRatio>
											</div>
											<div className="pointer-events-none absolute inset-0 flex items-end p-4 bg-gradient-to-t from-background/85 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
												<div className="w-full">
													<p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.summary || ""}</p>
													<div className="flex flex-wrap gap-2">
														{(p.tags || p.servicesProvided || []).slice(0, 4).map((t) => (
															<Badge key={t} variant="outline" className="text-[11px] tracking-wide border-accent-cyan/40 text-accent-cyan bg-accent-cyan/10">
																{t}
															</Badge>
														))}
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					</section>
				</div>
			</main>
			{/* BreadcrumbList JSON-LD */}
			<Script id="projects-breadcrumb-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{ "@type": "ListItem", position: 1, name: "Home", item: "https://interstaterankers.com/" },
						{ "@type": "ListItem", position: 2, name: "Projects", item: "https://interstaterankers.com/projects" }
					]
				}) }} />
			{/* CollectionPage JSON-LD */}
			<Script id="projects-collectionpage-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					name: "Our Projects",
					url: "https://interstaterankers.com/projects",
					inLanguage: "en-US",
					isPartOf: { "@id": "https://interstaterankers.com/#website" }
				}) }} />
			{/* ItemList JSON-LD */}
			<Script id="projects-itemlist-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "ItemList",
					itemListElement: (projects || []).map((p, idx) => ({
						"@type": "ListItem",
						position: idx + 1,
						url: `https://interstaterankers.com/projects/${p.slug.current}`,
						name: p.title
					}))
				}) }} />
			<Footer />
		</div>
	);
}



