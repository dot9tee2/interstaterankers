import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Check, Phone, ShieldCheck } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingPackages } from "@/data/pricing";
import PricingCard from "@/components/pricing/PricingCard";
import FinalCTA from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { primaryCta } from "@/data/cta";
import { guarantee } from "@/data/proof";

export const metadata: Metadata = {
	title: "SEO & Digital Growth Packages Pricing",
	description: "Google Business Profile management from $249/mo, with SEO, advertising and human-led answering packages for US businesses.",
	openGraph: {
		title: "SEO & Digital Growth Packages Pricing",
		description: "Google Business Profile management from $249/mo, with SEO, advertising and human-led answering packages for US businesses.",
		url: "/pricing",
		type: "website",
	},
	alternates: {
		canonical: "/pricing",
	},
};

const crmFeatures = [
	{ title: "Real-time lead sync", text: "Facebook & Google leads appear instantly." },
	{ title: "Automated speed-to-lead", text: "Instant SMS/email follow-ups sent automatically." },
	{ title: "Pipeline ROI tracking", text: "Know exactly which ad made you money." },
];

const faqs = [
	{
		question: "Is there a long-term contract?",
		answer: "Recurring services are month-to-month, with 15 days' notice for cancellation. Your proposal explains the service scope and billing arrangements. Any pilot or trial is provided under a signed agreement; ask us about the terms before starting.",
	},
	{
		question: 'What does "Target any 5 areas" mean?',
		answer: 'This allows you to dominate specifically in your most profitable neighborhoods or cities. Instead of just ranking for "Plumber" (too broad), we rank you for "Plumber [City Name]" or "Plumber [Neighborhood]" where your actual customers are searching.',
	},
	{
		question: "How does ISR HQ work?",
		answer: "It is a unified app (mobile & desktop) where all your leads land. When a lead comes in from Facebook or Google, your phone buzzes instantly. You can call, text, or email them right from the app, ensuring you never miss a deal.",
	},
	{
		question: "Can I switch packages later?",
		answer: "Absolutely. Many clients start with one growth package to build a foundation, then upgrade to Interstate Premium once they see the ROI and want to expand to more territories.",
	},
];

export default function PricingPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-grow divide-y divide-border">
				<PageHero
					breadcrumbs={[{ label: "Pricing" }]}
					eyebrow="Pricing"
					title="Simple growth packages"
					description="Choose the level that fits your goals, from local presence to complete market coverage. Month to month, no long-term contracts."
				/>

				{/* Packages: a raised band, like the homepage pricing section */}
				<section className="bg-card py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<SectionHeader className="mb-12 md:mb-16" eyebrow="Packages" title="Choose your growth engine" />
						{/* gap-y-12 leaves room for the "Best value" badge that sits on a card's top edge */}
						<div className="mx-auto grid max-w-lg grid-cols-1 gap-8 gap-y-12 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
							{pricingPackages.map((pkg) => (
								<PricingCard key={pkg.name} pkg={pkg} />
							))}
						</div>
						<div className="mx-auto mt-12 flex max-w-lg items-start gap-4 rounded-2xl border border-primary/50 bg-background p-6 md:mt-16 md:max-w-none">
							<span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
								<ShieldCheck className="h-5 w-5 text-accent-cyan" />
							</span>
							<div>
								<h2 className="text-base font-semibold text-foreground">{guarantee.title}</h2>
								<p className="mt-1 text-sm leading-relaxed text-muted-foreground">{guarantee.text}</p>
							</div>
						</div>
					</div>
				</section>

				{/* CRM & Lead Gen add-on */}
				<section className="py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
							<div>
								<SectionHeader
									align="left"
									eyebrow="ISR HQ"
									title="Your entire business in one pocket"
									description="Stop chasing leads across five different apps. Centralize leads from Facebook Ads, Google Ads, and your website in one unified dashboard."
								/>
								<ul className="mt-12 space-y-6">
									{crmFeatures.map((feature) => (
										<li key={feature.title} className="flex items-start gap-4">
											<span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
												<Check className="h-5 w-5 text-accent-cyan" />
											</span>
											<div>
												<h3 className="font-semibold text-foreground">{feature.title}</h3>
												<p className="mt-1 text-sm text-muted-foreground">{feature.text}</p>
											</div>
										</li>
									))}
								</ul>
							</div>

							<div className="rounded-3xl border border-border bg-card p-6 text-center md:p-8">
								<div className="mb-8 border-b border-border pb-8">
									<p className="mb-2 text-sm font-medium text-muted-foreground">One-time setup</p>
									<p className="text-4xl font-semibold tracking-tight text-foreground">$200</p>
								</div>

								<div className="mb-8">
									<p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Subscription</p>
									<div className="flex items-baseline justify-center gap-1">
										<span className="text-5xl font-semibold tracking-tight text-foreground">$50</span>
										<span className="text-lg text-muted-foreground">/mo</span>
									</div>
									<p className="mt-4 inline-block rounded-full border border-border px-4 py-1 text-sm text-muted-foreground">Includes 3 team members</p>
								</div>

								<div className="mb-8 flex justify-between rounded-xl border border-border bg-background p-4 text-left text-sm">
									<span className="text-muted-foreground">Additional users</span>
									<span className="font-semibold text-foreground">+$10/mo</span>
								</div>

								<Button asChild variant="outline" className="h-12 w-full rounded-xl border-border bg-transparent text-base font-semibold text-foreground hover:bg-muted hover:text-foreground">
									<a href="tel:+12816195295">
										<Phone className="h-4 w-4" />
										Call to get access
									</a>
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className="py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<SectionHeader className="mb-12 md:mb-16" eyebrow="FAQs" title="Frequently asked questions" />
						<Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
							{faqs.map((faq, index) => (
								<AccordionItem key={faq.question} value={`item-${index}`}>
									<AccordionTrigger className="py-4 text-left text-base md:text-lg">{faq.question}</AccordionTrigger>
									<AccordionContent className="pb-4 leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
						<div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card p-6 text-center md:mt-16 md:p-8">
							<h2 className="text-2xl font-semibold tracking-tight text-foreground">Need something customized?</h2>
							<p className="mx-auto mt-3 max-w-xl text-muted-foreground">
								One size doesn&apos;t fit all. We build custom plans tailored to your industry, competition, and growth goals.
							</p>
							<Button asChild variant="outline" className="mt-6 h-12 rounded-xl border-border bg-transparent px-6 text-base font-semibold text-foreground hover:bg-muted hover:text-foreground">
								<Link href={primaryCta.href}>Get a custom quote</Link>
							</Button>
						</div>
					</div>
				</section>

				<FinalCTA />
			</main>

			<Script id="pricing-schema" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "PriceSpecification",
						"priceCurrency": "USD",
						"minPrice": Math.min(...pricingPackages.map((pkg) => Number(pkg.price))).toFixed(2),
						"maxPrice": Math.max(...pricingPackages.map((pkg) => Number(pkg.price))).toFixed(2)
					})
				}} />

			<Footer />
		</div>
	);
}
