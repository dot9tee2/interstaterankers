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
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Script from "next/script";
import ServicesScrollShowcase from "@/components/sections/ServicesScrollShowcaseWrapper";
import { Badge } from "@/components/ui/badge";

export default function ServicesPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="relative py-24 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-background overflow-visible">
					<div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
					<div className="container relative mx-auto px-4 text-center">
						<div className="animate-fade-in-up">
							<Badge variant="outline" className="mb-6 bg-primary/10 border-primary/40 text-white px-6 py-1.5 text-sm font-medium backdrop-blur-md">
								Our Capabilities
							</Badge>
							<h1 className="text-5xl md:text-6xl font-body font-bold mb-6 gradient-text tracking-tight pb-2 leading-tight">
								Our Services
							</h1>
							<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
								Full-funnel growth services: answering, calling, content marketing, social media, web & app development, graphic designing, SEO, PPC, and Google My Business optimization.
							</p>
						</div>
					</div>
				</section>

				<div className="container mx-auto px-4 py-12">
					<div className="mb-12">
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

					<div className="mt-8">
						<ServicesScrollShowcase />
					</div>
				</div>
			</main>
			{/* BreadcrumbList JSON-LD */}
			<Script id="services-breadcrumb-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{ "@type": "ListItem", position: 1, name: "Home", item: "https://interstaterankers.com/" },
							{ "@type": "ListItem", position: 2, name: "Services", item: "https://interstaterankers.com/services" }
						]
					})
				}} />
			{/* CollectionPage JSON-LD */}
			<Script id="services-collectionpage-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "CollectionPage",
						name: "Our Services",
						url: "https://interstaterankers.com/services",
						inLanguage: "en-US",
						isPartOf: { "@id": "https://interstaterankers.com/#website" }
					})
				}} />
			<Footer />
		</div>
	);
}



