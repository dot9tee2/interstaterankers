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

// Revalidate the projects listing periodically to pick up new projects
export const revalidate = 60;

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getAllProjects } from "@/lib/projects";
import ProjectsHero from "@/components/sections/ProjectsHero";
import ProjectsList from "@/components/sections/ProjectsList";
import ProjectsCTA from "@/components/sections/ProjectsCTA";

export default async function ProjectsPage() {
	const projects = await getAllProjects();

	// Separate JSON-LD for cleaner return
	const jsonLd = {
		breadcrumb: {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Home", item: "https://interstaterankers.com/" },
				{ "@type": "ListItem", position: 2, name: "Projects", item: "https://interstaterankers.com/projects" }
			]
		},
		collection: {
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			name: "Our Projects",
			url: "https://interstaterankers.com/projects",
			inLanguage: "en-US",
			isPartOf: { "@id": "https://interstaterankers.com/#website" }
		},
		itemList: {
			"@context": "https://schema.org",
			"@type": "ItemList",
			itemListElement: (projects || []).map((p, idx) => ({
				"@type": "ListItem",
				position: idx + 1,
				url: `https://interstaterankers.com/projects/${p.slug.current}`,
				name: p.title
			}))
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow">
				<ProjectsHero />

				<div className="container mx-auto px-4 pb-20">
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

					<ProjectsList initialProjects={projects} />
				</div>

				<ProjectsCTA />
			</main>

			<Script id="projects-breadcrumb-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
			<Script id="projects-collectionpage-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.collection) }} />
			<Script id="projects-itemlist-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.itemList) }} />

			<Footer />
		</div>
	);
}



