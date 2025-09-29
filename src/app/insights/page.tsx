import type { Metadata } from "next";

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
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function InsightsPage() {
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
								<BreadcrumbPage>Insights</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<h1 className="text-4xl font-body font-bold text-center mb-8 gradient-text">Insights & Resources</h1>
				<p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
					Stay ahead with our latest insights on business growth, SEO strategies, and industry best practices.
				</p>
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



