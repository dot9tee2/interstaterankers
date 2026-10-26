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
import Script from "next/script";
import ServicesScrollShowcase from "@/components/sections/ServicesScrollShowcaseWrapper";
import FinalCTA from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/page-hero";

export default function ServicesPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow divide-y divide-border">
				<PageHero
					breadcrumbs={[{ label: "Services" }]}
					eyebrow="Our capabilities"
					title="Our services"
					description="Full-funnel growth services: answering, calling, content marketing, social media, web & app development, graphic designing, SEO, PPC, and Google My Business optimization."
				/>
				<ServicesScrollShowcase />
				<FinalCTA />
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



