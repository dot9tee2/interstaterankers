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
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export default function ProjectsPage() {
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
				<h1 className="text-4xl font-heading font-bold text-center mb-8 gradient-text">Our Projects</h1>
				<p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
					Explore our portfolio of successful business growth transformations and case studies.
				</p>

				<div className="mt-12">
					<ProjectsGrid />
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
			<Footer />
		</div>
	);
}



