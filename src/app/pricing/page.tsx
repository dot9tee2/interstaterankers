import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Check, Star, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingPackages } from "@/data/pricing";
import PricingCard from "@/components/pricing/PricingCard";

export const metadata: Metadata = {
	title: "SEO & Digital Growth Packages Pricing",
	description: "Local SEO & Growth packages starting at $399/mo. Includes dedicated Lead CRM, GMB Optimization, and Custom Plans.",
	openGraph: {
		title: "SEO & Digital Growth Packages Pricing",
		description: "Local SEO & Growth packages starting at $399/mo. Includes dedicated Lead CRM, GMB Optimization, and Custom Plans.",
		url: "/pricing",
		type: "website",
	},
	alternates: {
		canonical: "/pricing",
	},
};

export default function PricingPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-grow">
				{/* Hero Section */}
				<section className="relative py-24 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-background overflow-visible">
					<div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
					<div className="container relative mx-auto px-4 text-center">
						<div className="animate-fade-in-up">
							<Badge variant="outline" className="mb-6 bg-cyan-500/10 border-cyan-500/40 text-cyan-500 px-6 py-1.5 text-sm font-medium backdrop-blur-md">
								Transparent Pricing
							</Badge>
							<h1 className="text-5xl md:text-6xl font-body font-bold mb-6 gradient-text tracking-tight pb-2 leading-tight">
								Simplified Growth Packages
							</h1>
							<p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
								Choose the power level that fits your goals. From local presence to complete market domination.
							</p>
						</div>
					</div>
				</section>

				<div className="container mx-auto px-4 py-12">
					{/* Breadcrumb */}
					<div className="mb-16">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href="/">Home</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>Pricing</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>

					{/* Packages Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
						{pricingPackages.map((pkg) => (
							<PricingCard key={pkg.name} pkg={pkg} />
						))}
					</div>
				</div>

				{/* CRM & Lead Gen Section - Full Width */}
				<section className="py-24 bg-gradient-to-br from-indigo-950/50 to-background border-y border-indigo-500/10 relative overflow-hidden">
					<div className="container mx-auto px-4 max-w-5xl">
						<div className="grid md:grid-cols-2 gap-16 items-center">
							<div className="relative z-10">
								<Badge className="mb-6 bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
									ISR Command Center
								</Badge>
								<h2 className="text-4xl font-bold mb-6">Your Entire Business in One Pocket.</h2>
								<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
									Stop chasing leads across five different apps. Centralize leads from Facebook Ads, Google Ads, and your Website in one unified dashboard.
								</p>

								<div className="space-y-5">
									<div className="flex items-start gap-4">
										<div className="bg-indigo-500/10 p-2 rounded-lg">
											<Check className="w-6 h-6 text-indigo-400" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Real-time Lead Sync</h4>
											<p className="text-sm text-muted-foreground">Facebook & Google leads appear instantly.</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="bg-indigo-500/10 p-2 rounded-lg">
											<Check className="w-6 h-6 text-indigo-400" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Automated Speed-to-Lead</h4>
											<p className="text-sm text-muted-foreground">Instant SMS/Email follow-ups sent automatically.</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="bg-indigo-500/10 p-2 rounded-lg">
											<Check className="w-6 h-6 text-indigo-400" />
										</div>
										<div>
											<h4 className="font-semibold mb-1">Pipeline ROI Tracking</h4>
											<p className="text-sm text-muted-foreground">Know exactly which ad made you money.</p>
										</div>
									</div>
								</div>
							</div>

							<div className="relative">
								{/* Decorative Glow */}
								<div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />

								<div className="bg-card/50 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-8 text-center relative shadow-2xl hover:scale-105 transition-transform duration-500">
									<div className="mb-8 pb-8 border-b border-white/10">
										<p className="text-sm font-medium text-muted-foreground mb-2">One-Time Setup</p>
										<p className="text-4xl font-bold">$200</p>
									</div>

									<div className="mb-8">
										<p className="text-sm font-medium text-indigo-300 mb-2 font-mono uppercase tracking-wider">Subscription</p>
										<div className="flex items-baseline justify-center gap-1">
											<span className="text-6xl font-bold text-white">$50</span>
											<span className="text-xl text-muted-foreground">/mo</span>
										</div>
										<p className="text-sm text-muted-foreground mt-4 bg-white/5 inline-block px-4 py-1 rounded-full">Includes 3 Team Members</p>
									</div>

									<div className="text-left text-sm space-y-2 mb-8 bg-black/20 p-4 rounded-lg">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Additional Users</span>
											<span className="font-semibold">+$10/mo</span>
										</div>
									</div>

									<Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg h-12 shadow-lg shadow-indigo-500/25" asChild>
										<a href="tel:+12816195295">
											Get Access Now
										</a>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ & Footer Section */}
				<div className="container mx-auto px-4 py-24">
					{/* FAQ Section */}
					<div className="max-w-3xl mx-auto mb-24">
						<h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
						<Accordion type="single" collapsible className="w-full space-y-4">
							<AccordionItem value="item-1" className="border rounded-lg px-4 bg-card/50">
								<AccordionTrigger className="text-lg">Is there a long-term contract?</AccordionTrigger>
								<AccordionContent className="text-muted-foreground">
									No. All our "Ranker" packages are month-to-month. We believe our results should keep you staying, not a piece of paper. You can cancel or upgrade at any time with a 30-day notice.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2" className="border rounded-lg px-4 bg-card/50">
								<AccordionTrigger className="text-lg">What does "Target any 5 areas" mean?</AccordionTrigger>
								<AccordionContent className="text-muted-foreground">
									This allows you to dominate specifically in your most profitable neighborhoods or cities. Instead of just ranking for "Plumber" (too broad), we rank you for "Plumber [City Name]" or "Plumber [Neighborhood]" where your actual customers are searching.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3" className="border rounded-lg px-4 bg-card/50">
								<AccordionTrigger className="text-lg">How does the "ISR Command Center" work?</AccordionTrigger>
								<AccordionContent className="text-muted-foreground">
									It is a unified app (mobile & desktop) where all your leads land. When a lead comes in from Facebook or Google, your phone buzzes instantly. You can call, text, or email them right from the app, ensuring you never miss a deal.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-4" className="border rounded-lg px-4 bg-card/50">
								<AccordionTrigger className="text-lg">Can I switch packages later?</AccordionTrigger>
								<AccordionContent className="text-muted-foreground">
									Absolutely. Most clients start with the **Local Ranker** to build a foundation and upgrade to **InterState Omni** once they see the ROI and want to expand to more territories.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>

					{/* Custom Plan Footer */}
					<div className="text-center bg-gradient-to-r from-muted/50 via-card to-muted/50 border border-border rounded-3xl p-16 max-w-5xl mx-auto relative overflow-hidden group">
						<div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,white,transparent)] opacity-20" />

						<div className="relative z-10">
							<h2 className="text-4xl font-bold mb-6">Need Something Customized?</h2>
							<p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
								We know one size doesn't fit all. We build bespoke **Custom Plans** tailored to your specific industry, competition, and aggressive growth goals.
							</p>
							<Button asChild variant="outline" size="lg" className="border-primary/50 hover:bg-primary/5 text-lg h-14 px-8">
								<Link href="/contact">
									Get a Custom Quote
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</main>

			<Script id="pricing-schema" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "PriceSpecification",
						"priceCurrency": "USD",
						"minPrice": "399.00",
						"maxPrice": "599.00"
					})
				}} />

			<Footer />
		</div>
	);
}
