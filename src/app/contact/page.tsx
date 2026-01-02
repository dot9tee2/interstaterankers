import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact InterStateRankers (US)",
	description: "Contact InterStateRankers for AI answering, SEO, and digital growth services across the United States.",
	openGraph: {
		title: "Contact InterStateRankers (US)",
		description: "Contact InterStateRankers for AI answering, SEO, and digital growth services across the United States.",
		url: "/contact",
		locale: "en_US"
	},
	alternates: { canonical: "/contact" }
};
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";
import { Phone, Mail, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import Script from "next/script";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ContactPage() {
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
								<BreadcrumbPage>Contact</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="mx-auto max-w-3xl text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-body font-bold gradient-text">Contact Us</h1>
					<p className="mt-4 text-lg md:text-xl text-muted-foreground">
						Ready to grow your business? Send us a message and we’ll get back to you.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8">
					{/* Contact details */}
					<div className="rounded-2xl border border-primary/40 ring-1 ring-primary/20 bg-card/60 p-8 md:p-10 glow-card">
						<h2 className="text-2xl font-body font-bold mb-4">Get in touch</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center shrink-0">
									<Phone className="w-5 h-5 text-white" />
								</div>
								<div>
									<p className="text-sm text-muted-foreground">Phone</p>
									<a href="tel:+12816195295" className="text-lg font-medium hover:underline">(281) 619-5295</a>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center shrink-0">
									<Mail className="w-5 h-5 text-white" />
								</div>
								<div>
									<p className="text-sm text-muted-foreground">Email</p>
									<a href="mailto:hello@interstaterankers.com" className="text-lg font-medium hover:underline">info@interstaterankers.com</a>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-6 flex items-center gap-3">
						<a href="https://instagram.com/interstaterankers" target="_blank" className="p-2 rounded-md border border-border/60 hover:border-primary/40 hover:text-foreground transition-colors" aria-label="Instagram">
							<Instagram className="h-4 w-4" />
						</a>
						<a href="https://facebook.com/interstaterankers" target="_blank" className="p-2 rounded-md border border-border/60 hover:border-primary/40 hover:text-foreground transition-colors" aria-label="Facebook">
							<Facebook className="h-4 w-4" />
						</a>
						<a href="https://twitter.com/interstaternkrs" target="_blank" className="p-2 rounded-md border border-border/60 hover:border-primary/40 hover:text-foreground transition-colors" aria-label="Twitter">
							<Twitter className="h-4 w-4" />
						</a>
						<a href="https://linkedin.com/" target="_blank" className="p-2 rounded-md border border-border/60 hover:border-primary/40 hover:text-foreground transition-colors" aria-label="LinkedIn">
							<Linkedin className="h-4 w-4" />
						</a>
					</div>

					<ContactForm />
				</div>
			</main>
			{/* BreadcrumbList JSON-LD */}
			<Script id="contact-breadcrumb-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{ "@type": "ListItem", position: 1, name: "Home", item: "https://interstaterankers.com/" },
							{ "@type": "ListItem", position: 2, name: "Contact", item: "https://interstaterankers.com/contact" }
						]
					})
				}} />
			{/* ContactPage JSON-LD */}
			<Script id="contact-contactpage-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "ContactPage",
						name: "Contact InterStateRankers",
						url: "https://interstaterankers.com/contact",
						inLanguage: "en-US",
						isPartOf: { "@id": "https://interstaterankers.com/#website" }
					})
				}} />
			<Footer />
		</div>
	);
}



