import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { InsightsClient } from "@/components/blog/InsightsClient";
import Link from "next/link";
import { ArrowRight, FolderOpen, Globe, Mail } from "lucide-react";

export const metadata: Metadata = {
	title: "Insights: SEO & Growth Guides (US)",
	description: "US-focused insights on SEO strategies, digital growth, and best practices.",
	openGraph: {
		title: "Insights: SEO & Growth Guides (US)",
		description: "US-focused insights on SEO strategies, digital growth, and best practices.",
		url: "/insights",
		locale: "en_US"
	},
	alternates: { canonical: "/insights" }
};

// Revalidate the Insights listing periodically to pick up newly published posts
export const revalidate = 60;

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import { PageHero } from "@/components/ui/page-hero";

export default async function InsightsPage() {
	const [posts, categories] = await Promise.all([
		getAllPosts(),
		getAllCategories()
	]);

	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="divide-y divide-border">
				<PageHero
					breadcrumbs={[{ label: "Insights" }]}
					eyebrow="Insights"
					title="Insights & resources"
					description="Stay ahead with our latest insights on business growth, SEO strategies, and industry best practices."
				/>

				<section className="py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<Link href="/insights/how-to-host-your-website-on-vercel" className="group mb-12 grid gap-8 rounded-2xl border border-accent-cyan/30 bg-card p-6 transition-colors hover:border-accent-cyan md:grid-cols-[1fr_1.6fr] md:p-10">
							<div aria-hidden="true" className="flex items-center justify-center gap-4 rounded-xl border border-border bg-background p-8 text-accent-cyan">
								<FolderOpen className="h-10 w-10" /><ArrowRight className="h-5 w-5" /><Globe className="h-10 w-10" /><ArrowRight className="h-5 w-5" /><Mail className="h-10 w-10" />
							</div>
							<div>
								<p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-cyan">Client tutorial · Visual walkthrough</p>
								<h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">Got your website files? Here’s how to launch on Vercel.</h2>
								<p className="mb-5 leading-relaxed text-muted-foreground">Understand your files, connect your domain, and get enquiry emails working. A step-by-step guide for business owners with no technical background.</p>
								<span className="inline-flex items-center gap-2 font-semibold text-accent-cyan">Open the visual guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
							</div>
						</Link>
						{/* Blog Posts with Category Filter */}
						<InsightsClient
							initialPosts={posts}
							categories={categories}
						/>
					</div>
				</section>
			</main>
			{/* BreadcrumbList JSON-LD */}
			<Script id="insights-breadcrumb-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{ "@type": "ListItem", position: 1, name: "Home", item: "https://interstaterankers.com/" },
						{ "@type": "ListItem", position: 2, name: "Insights", item: "https://interstaterankers.com/insights" }
					]
				}) }} />
			{/* CollectionPage JSON-LD */}
			<Script id="insights-collectionpage-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					name: "Insights & Resources",
					url: "https://interstaterankers.com/insights",
					inLanguage: "en-US",
					isPartOf: { "@id": "https://interstaterankers.com/#website" }
				}) }} />
			<Footer />
		</div>
	);
}



