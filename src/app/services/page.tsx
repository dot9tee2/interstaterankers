import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Digital Services: SEO, Web, PPC, Social (US)",
	description: "Full-funnel growth services for US businesses: SEO, web & app development, PPC, social media, content, GMB.",
	openGraph: {
		title: "Digital Services: SEO, Web, PPC, Social (US)",
		description: "Full-funnel growth services for US businesses: SEO, web & app development, PPC, social media, content, GMB.",
		url: "/services",
		locale: "en_US"
	},
	alternates: { canonical: "/services" }
};
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Script from "next/script";

const ServicesScrollShowcase = dynamic(() => import("@/components/sections/ServicesScrollShowcase"), { ssr: false });

export default function ServicesPage() {
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
								<BreadcrumbPage>Services</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<h1 className="text-4xl font-body font-bold text-center mb-8 gradient-text">Our Services</h1>
				<p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
					Full-funnel growth services: answering, calling, content marketing, social media, web & app development, graphic designing, SEO, PPC, and Google My Business optimization.
				</p>
				<div className="mt-16">
					<ServicesScrollShowcase />
				</div>
			</main>
			{/* BreadcrumbList JSON-LD */}
			<Script id="services-breadcrumb-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{ "@type": "ListItem", position: 1, name: "Home", item: "https://interstaterankers.com/" },
						{ "@type": "ListItem", position: 2, name: "Services", item: "https://interstaterankers.com/services" }
					]
				}) }} />
			{/* CollectionPage JSON-LD */}
			<Script id="services-collectionpage-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					name: "Our Services",
					url: "https://interstaterankers.com/services",
					inLanguage: "en-US",
					isPartOf: { "@id": "https://interstaterankers.com/#website" }
				}) }} />
			<Footer />
		</div>
	);
}



