import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact InterStateRankers (US)",
	description: "Contact InterStateRankers for human-led answering, SEO, and digital growth services across the United States.",
	openGraph: {
		title: "Contact InterStateRankers (US)",
		description: "Contact InterStateRankers for human-led answering, SEO, and digital growth services across the United States.",
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
import { PageHero } from "@/components/ui/page-hero";
import { primaryCta } from "@/data/cta";
import { pricingPackages } from "@/data/pricing";

type ContactPageProps = {
	searchParams: Promise<{ package?: string | string[]; interest?: string | string[]; service?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
	// Pricing cards link here with ?package=<slug> and the ISR HQ section with ?interest=isr-hq,
	// so the form opens with what the visitor picked already filled in
	const { package: packageSlug, interest, service } = await searchParams;
	const serviceOptions: Record<string, { label: string; id: string }> = {
		gmb: { label: "Google Business Profile management", id: "Local SEO / GMB" },
		answering: { label: "human-led answering and appointment support", id: "Answering & Lead Capture" },
		seo: { label: "website SEO", id: "SEO" },
		ppc: { label: "Google Ads management", id: "PPC" },
	};
	const selectedService = typeof service === "string" ? serviceOptions[service] : undefined;
	const selectedPackage = pricingPackages.find((pkg) => pkg.slug === packageSlug);
	const defaultMessage = selectedPackage
		? `I'm interested in the ${selectedPackage.name} ($${Number(selectedPackage.price)}/mo).`
		: interest === "isr-hq"
			? "I'd like a walkthrough of ISR HQ."
			: selectedService ? `I'd like a proposal for ${selectedService.label}.` : "";

	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="divide-y divide-border">
				<PageHero
					breadcrumbs={[{ label: "Contact" }]}
					eyebrow="Contact"
					title="Let's talk about your growth"
					description="Send us a message and we'll get back to you within one business day, or call us now."
				/>
				<section className="py-20 sm:py-24">
					<div className="container mx-auto grid grid-cols-1 items-start gap-12 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
						{/* Contact details */}
						<div className="space-y-8">
							<div>
								<h2 className="text-2xl font-semibold tracking-tight text-foreground">Get in touch</h2>
								<p className="mt-2 text-muted-foreground">{primaryCta.note}</p>
							</div>
							<ul className="space-y-6">
								<li className="flex items-center gap-4">
									<span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
										<Phone className="h-6 w-6 text-accent-cyan" />
									</span>
									<div>
										<p className="text-sm text-muted-foreground">Phone</p>
										<a href="tel:+12816195295" className="text-lg font-medium text-foreground transition-colors hover:text-accent-cyan">(281) 619-5295</a>
									</div>
								</li>
								<li className="flex items-center gap-4">
									<span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
										<Mail className="h-6 w-6 text-accent-cyan" />
									</span>
									<div>
										<p className="text-sm text-muted-foreground">Email</p>
										<a href="mailto:info@interstaterankers.com" className="text-lg font-medium text-foreground transition-colors hover:text-accent-cyan">info@interstaterankers.com</a>
									</div>
								</li>
							</ul>
							<div className="flex items-center gap-3 border-t border-border pt-8">
								<a href="https://instagram.com/interstaterankers" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="Instagram">
									<Instagram className="h-4 w-4" />
								</a>
								<a href="https://facebook.com/interstaterankers" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="Facebook">
									<Facebook className="h-4 w-4" />
								</a>
								<a href="https://twitter.com/interstaternkrs" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="Twitter">
									<Twitter className="h-4 w-4" />
								</a>
								<a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="LinkedIn">
									<Linkedin className="h-4 w-4" />
								</a>
							</div>
						</div>

						<div className="min-w-0">
							<ContactForm key={selectedPackage?.slug ?? selectedService?.id ?? "contact"} defaultServices={selectedPackage?.services ?? (selectedService ? [selectedService.id] : [])} defaultMessage={defaultMessage} />
						</div>
					</div>
				</section>
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



