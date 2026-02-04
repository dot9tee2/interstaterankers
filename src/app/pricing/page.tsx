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
	const packages = [
		{
			name: "Local Ranker",
			price: "399.00",
			description: "Essential growth foundation for local reach.",
			features: [
				"Target any 5 areas of your choice",
				"5 one page webpages",
				"4k UHD video to showcase your business",
				"50 high ranking keywords",
				"Digital Presence",
				"Monthly Reporting"
			],
			popular: false,
			gradient: "from-blue-500/20 to-cyan-500/20"
		},
		{
			name: "Growth Ranker",
			price: "499.00",
			description: "Enhanced visibility with AI & GBP optimization.",
			features: [
				"Target any 5 areas of your choice",
				"5 one page webpages",
				"50 high ranking keywords",
				"Complimentary GBP prioritization",
				"GBP AI Optimization",
				"4k UHD video to showcase your business",
				"Complimentary Business Cards",
				"Complimentary Flyers",
				"Monthly Reporting"
			],
			popular: false,
			gradient: "from-purple-500/20 to-pink-500/20"
		},
		{
			name: "InterState Omni",
			price: "599.00",
			description: "Complete domination with full-suite marketing.",
			features: [
				"Target any 10 areas of your choice",
				"10 one page webpages",
				"100 high ranking keywords",
				"Complimentary GBP optimization",
				"GBP Creation",
				"4k UHD video to showcase your business",
				"Complimentary Business Cards",
				"Complimentary Flyers",
				"Website SEO / Revamp",
				"Social media management",
				"Free QR Code",
				"Monthly Reporting"
			],
			popular: true,
			gradient: "from-amber-500/20 to-orange-500/20"
		}
	];

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
									<BreadcrumbPage>Pricing</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>

					{/* Packages Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{packages.map((pkg) => (
							<div key={pkg.name} className="relative group">
								{pkg.popular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 w-full text-center">
										<Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-4 py-1.5 shadow-lg border-0">
											<Star className="w-3 h-3 mr-1 fill-current" />
											BEST VALUE
										</Badge>
									</div>
								)}

								<div className={`
								relative h-full flex flex-col p-8 rounded-2xl border transition-all duration-300
								${pkg.popular
										? 'bg-card border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-0'
										: 'bg-card/50 border-border hover:border-primary/30 hover:shadow-xl'
									}
							`}>
									{/* Header */}
									<div className="text-center mb-8">
										<h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
										<p className="text-muted-foreground text-sm mb-6 h-10">{pkg.description}</p>
										<div className="flex justify-center items-baseline gap-1">
											<span className="text-4xl font-bold gradient-text">${pkg.price}</span>
											<span className="text-muted-foreground">/mo</span>
										</div>
									</div>

									{/* Divider */}
									<div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

									{/* Features */}
									<ul className="space-y-4 mb-8 flex-grow">
										{pkg.features.map((feature, i) => (
											<li key={i} className="flex items-start gap-3 text-sm">
												<div className={`mt-0.5 rounded-full p-1 bg-gradient-to-br ${pkg.gradient}`}>
													<Check className="w-3 h-3 text-foreground" />
												</div>
												<span className="text-muted-foreground group-hover:text-foreground transition-colors">
													{feature}
												</span>
											</li>
										))}
									</ul>

									{/* CTA */}
									<Button className={`w-full ${pkg.popular ? 'hero-gradient text-white shadow-lg' : ''}`} size="lg" asChild>
										<a href="tel:+12816195295">
											<Phone className="w-4 h-4 mr-2" />
											Call Now
										</a>
									</Button>
								</div>
							</div>
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
							<h2 className="text-4xl font-bold mb-6">Need something custom?</h2>
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
