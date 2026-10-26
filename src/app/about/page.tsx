import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import StatsResults from "@/components/sections/StatsResultsWrapper";
import { primaryCta } from "@/data/cta";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import Script from "next/script";
import {
	ArrowRight,
	Award,
	BadgeCheck,
	Clock,
	Code,
	Eye,
	Flag,
	Gem,
	HeartHandshake,
	Lightbulb,
	MapPin,
	MessageSquare,
	Share2,
	Shield,
	Target,
	TrendingUp,
	type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
	title: "About Us: US Digital Marketing Agency",
	description:
		"Interstate Rankers is your trusted US digital growth collective specializing in custom web development, SEO services, and social media marketing—proudly serving businesses across all 50 states. We craft high-quality digital solutions that elevate online visibility and drive measurable results for American businesses.",
	openGraph: {
		title: "About Interstate Rankers | US Digital Marketing Agency",
		description:
			"Trusted US digital growth collective specializing in web development, SEO services, and social media marketing for businesses across all 50 states.",
		url: "/about",
		type: "website",
		locale: "en_US",
		siteName: "Interstate Rankers",
		images: [
			{
				url: "/InterStateRankerLogo.png",
				width: 1200,
				height: 630,
				alt: "Interstate Rankers - US Digital Marketing Agency"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "About Interstate Rankers | US Digital Marketing Agency",
		description:
			"Trusted US digital growth collective specializing in web development, SEO services, and social media marketing for businesses across all 50 states.",
		images: ["/InterStateRankerLogo.png"]
	},
	alternates: {
		canonical: "/about"
	},
	robots: {
		index: true,
		follow: true
	}
};

// What we do: each card opens the matching service page (icons match the Navbar's service menu)
const services = [
	{
		icon: Code,
		title: "Custom Web Development for US Businesses",
		text: <>Crafting responsive, user-friendly websites that reflect your brand&apos;s identity and convert visitors into loyal customers across <strong>all US markets</strong>.</>,
		href: "/services/web-development",
	},
	{
		icon: TrendingUp,
		title: "Local & National SEO Services",
		text: <>Elevating your online visibility with in-depth keyword research, technical SEO, content optimization, and <strong>local SEO strategies</strong> tailored for US search patterns.</>,
		href: "/services/seo",
	},
	{
		icon: Share2,
		title: "Social Media Marketing",
		text: <>Creating authentic content and targeted campaigns that resonate with your <strong>US audience</strong> and drive engagement across platforms.</>,
		href: "/services/social-media",
	},
];

const highlights = [
	{ icon: MapPin, label: "Nationwide US coverage" },
	{ icon: Clock, label: "EST–PST availability" },
	{ icon: Shield, label: "Privacy-first & ADA-aware" },
	{ icon: TrendingUp, label: "Results-focused SEO" },
];

const reasons = [
	{ icon: MapPin, title: "US-Focused Expertise", text: <>Our team&apos;s collective experience in <strong>US markets</strong> ensures flexible, well-rounded solutions tailored to your business needs across all 50 states.</> },
	{ icon: Gem, title: "Quality Over Hype", text: <>We&apos;re focused on delivering real, measurable outcomes that align with your goals, not empty promises. <Link href="/contact" className="text-accent-cyan hover:underline">Talk to us</Link> about our results.</> },
	{ icon: MessageSquare, title: "Transparent Communication", text: <>Expect clear timelines, open collaboration, and consistent updates every step of the way with <strong>US-based support</strong>.</> },
	{ icon: Target, title: "Custom-Tailored Solutions", text: <>We treat every project as unique—your brand&apos;s needs guide our strategy, not a one-size-fits-all approach. Learn more about our <Link href="/services" className="text-accent-cyan hover:underline">custom services</Link>.</> },
	{ icon: Clock, title: "US Time Zone Coverage", text: <>We collaborate on your schedule with availability across <strong>Eastern to Pacific time zones</strong>, ensuring seamless communication.</> },
	{ icon: Shield, title: "Privacy-First & Accessibility-Minded", text: <>We build with best practices that respect user privacy and inclusive, accessible design, meeting <strong>US compliance standards</strong>.</> },
];

const purpose = [
	{ icon: Flag, title: "Our Mission", text: <>To empower <strong>US businesses</strong> to achieve sustainable digital growth through innovation, craftsmanship, and integrity across all markets from coast to coast.</> },
	{ icon: Eye, title: "Our Vision", text: <>To be the go-to digital partners for <strong>American businesses</strong> that value quality-driven results over flashy marketing—building trust one project at a time, from <strong>Silicon Valley startups to Main Street enterprises</strong>.</> },
];

const values = [
	{ icon: BadgeCheck, title: "Authenticity", text: <>Honest communication and dependable execution that reflects <strong>American business values</strong>.</> },
	{ icon: Award, title: "Excellence", text: <>We hold ourselves to the highest standard across all our work, delivering results that exceed expectations.</> },
	{ icon: Lightbulb, title: "Innovation", text: <>Staying agile and informed in the ever-evolving digital landscape, leveraging the latest <strong>US market trends</strong>.</> },
	{ icon: HeartHandshake, title: "Empathy", text: <>We listen, understand your challenges, and build solutions that resonate with your <strong>US audience</strong> and business goals.</> },
];

// Icon + title + text card used by the reasons, mission/vision and values grids
function InfoCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: ReactNode }) {
	return (
		<div className="flex gap-6 rounded-2xl border border-border bg-card p-6">
			<span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
				<Icon className="h-6 w-6 text-accent-cyan" />
			</span>
			<div>
				<h3 className="text-xl font-semibold text-foreground">{title}</h3>
				<p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
			</div>
		</div>
	);
}

export default function AboutPage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			{/* Same rhythm as the homepage: divide-y between sections, py-20 sm:py-24 each, one violet band (FinalCTA) at the end */}
			<main className="divide-y divide-border">
				<PageHero
					breadcrumbs={[{ label: "About" }]}
					eyebrow="About us"
					title="Your trusted digital growth collective for US businesses"
					description={<>At Interstate Rankers, we specialize in empowering <strong className="text-foreground">US businesses</strong> to thrive online through custom web solutions, strategic SEO, and dynamic social media engagement. Founded by a dedicated team of experienced professionals, our mission is to deliver dependable, results-driven services with integrity and a human touch—serving clients nationwide across <strong className="text-foreground">all 50 states</strong>.</>}
				>
					<ul className="flex flex-wrap gap-3" aria-label="Key features">
						{highlights.map(({ icon: Icon, label }) => (
							<li key={label} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground">
								<Icon aria-hidden="true" className="h-4 w-4 text-accent-cyan" />
								{label}
							</li>
						))}
					</ul>
				</PageHero>

				{/* Who we are + what we do */}
				<section className="py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<SectionHeader
							className="mb-12 md:mb-16"
							eyebrow="Who we are"
							title="US digital marketing experts"
							description={<>We&apos;re a collective of US-based digital experts—web developers, SEO strategists, content creators, and marketing artisans—who came together with one shared goal: to offer streamlined, high-quality digital services without the fluff. Drawing on our time in various agencies and internal corporate teams across major US markets, we bring a rich blend of experience, fresh ideas, and a client-first mindset to every project.</>}
						/>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							{services.map(({ icon: Icon, title, text, href }) => (
								<Link key={href} href={href} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-lg">
									<span aria-hidden="true" className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background">
										<Icon className="h-6 w-6 text-accent-cyan" />
									</span>
									<h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-accent-cyan">{title}</h3>
									<p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{text}</p>
									<span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan">
										Learn more
										<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
									</span>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* Why choose us: raised band */}
				<section className="bg-card py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<SectionHeader className="mb-12 md:mb-16" eyebrow="Why us" title="Why US businesses choose Interstate Rankers" description="Six reasons American businesses trust us with their digital growth." />
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							{reasons.map((reason) => (
								<div key={reason.title} className="rounded-2xl border border-border bg-background p-6">
									<span aria-hidden="true" className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
										<reason.icon className="h-6 w-6 text-accent-cyan" />
									</span>
									<h3 className="text-xl font-semibold text-foreground">{reason.title}</h3>
									<p className="mt-2 leading-relaxed text-muted-foreground">{reason.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Mission, vision and values */}
				<section className="py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<SectionHeader className="mb-12 md:mb-16" eyebrow="What drives us" title="Our mission and values" description="The principles that guide our work with American businesses." />
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
							{purpose.map((item) => <InfoCard key={item.title} {...item} />)}
							{values.map((item) => <InfoCard key={item.title} {...item} />)}
						</div>
					</div>
				</section>

				{/* Who we serve */}
				<section className="py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<SectionHeader className="mb-12 md:mb-16" eyebrow="Who we serve" title="US businesses nationwide" />
						<div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
							<p>
								Our clients span <strong className="text-foreground">startups, small and medium enterprises, and growing brands</strong>—from local businesses in rural communities to service-focused firms in major metropolitan areas—who seek a digital presence that&apos;s both meaningful and effective across the United States. We serve businesses in <strong className="text-foreground">all 50 states</strong>, from tech startups in California to manufacturing companies in the Midwest and service providers on the East Coast.
							</p>
							<p>
								<strong className="text-foreground">Ready to grow your US business online?</strong> Explore our <Link href="/services" className="text-accent-cyan hover:underline">services</Link> or <Link href={primaryCta.href} className="text-accent-cyan hover:underline">schedule a consultation</Link> to discuss your digital growth strategy.
							</p>
						</div>
					</div>
				</section>

				{/* Social proof and results */}
				<Suspense fallback={<div className="h-32 animate-pulse bg-muted/20" />}>
					<StatsResults />
				</Suspense>

				{/* FAQ */}
				<section className="py-20 sm:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<SectionHeader className="mb-12 md:mb-16" eyebrow="FAQs" title="Frequently asked questions" description="About working with us across the US." />
						<Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
							<AccordionItem value="q1">
								<AccordionTrigger className="py-4 text-left text-base md:text-lg">Do you work with businesses across all 50 US states?</AccordionTrigger>
								<AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
									Yes. We partner with companies nationwide, from <strong>California to New York, Texas to Florida</strong>, and collaborate across all US time zones (EST–PST). Our team understands the unique needs of businesses in different regions and markets.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="q2">
								<AccordionTrigger className="py-4 text-left text-base md:text-lg">Can you improve our local search visibility in US markets?</AccordionTrigger>
								<AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
									Absolutely. We implement technical SEO, content optimization, and <strong>local SEO strategies</strong> tailored to your specific US service areas. We understand how Americans search for local businesses and optimize accordingly.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="q3">
								<AccordionTrigger className="py-4 text-left text-base md:text-lg">Do you sign NDAs and provide clear project scopes?</AccordionTrigger>
								<AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
									Yes. We&apos;re happy to sign NDAs and provide transparent scopes, timelines, and progress updates. We understand the importance of confidentiality in US business relationships.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="q4">
								<AccordionTrigger className="py-4 text-left text-base md:text-lg">What types of US businesses do you work with?</AccordionTrigger>
								<AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
									We work with <strong>startups, SMBs, and growing enterprises</strong> across all industries—from tech companies in Silicon Valley to manufacturing firms in the Midwest, service providers on the East Coast, and local businesses in rural communities. <Link href="/contact" className="text-accent-cyan hover:underline">Contact us</Link> to see how we can help your business.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="q5">
								<AccordionTrigger className="py-4 text-left text-base md:text-lg">How do you handle different US time zones?</AccordionTrigger>
								<AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
									Our team operates across <strong>Eastern, Central, Mountain, and Pacific time zones</strong>, ensuring we can collaborate on your schedule. We&apos;re available for calls and meetings during your business hours, regardless of your location in the US.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</section>

				<FinalCTA />
			</main>
			{/* Enhanced Organization JSON-LD (US-focused) */}
			<Script id="about-organization-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Organization",
						name: "Interstate Rankers",
						alternateName: "Interstate Rankers",
						description: "US digital growth collective specializing in custom web development, SEO services, and social media marketing for businesses across all 50 states.",
						url: "https://interstaterankers.com",
						logo: "https://interstaterankers.com/InterStateRankerLogo.png",
						areaServed: [
							{ "@type": "Country", name: "United States" },
							{ "@type": "State", name: "California" },
							{ "@type": "State", name: "New York" },
							{ "@type": "State", name: "Texas" },
							{ "@type": "State", name: "Florida" }
						],
						foundingLocation: { "@type": "Country", name: "United States" },
						knowsAbout: [
							"web development",
							"SEO services",
							"local SEO",
							"social media marketing",
							"digital solutions",
							"custom websites",
							"online visibility",
							"digital growth",
							"US business marketing",
							"local search optimization"
						],
						serviceType: [
							"Web Development",
							"SEO Services",
							"Social Media Marketing",
							"Local SEO",
							"Digital Marketing"
						],
						contactPoint: {
							"@type": "ContactPoint",
							contactType: "customer support",
							areaServed: "US",
							availableLanguage: "English"
						},
						sameAs: [
							"https://interstaterankers.com"
						]
					})
				}} />
			{/* LocalBusiness JSON-LD */}
			<Script id="about-localbusiness-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "LocalBusiness",
						name: "Interstate Rankers",
						description: "Digital marketing agency serving US businesses nationwide with web development, SEO, and social media services.",
						areaServed: "United States",
						serviceArea: {
							"@type": "Country",
							name: "United States"
						},
						hasOfferCatalog: {
							"@type": "OfferCatalog",
							name: "Digital Marketing Services",
							itemListElement: [
								{
									"@type": "Offer",
									itemOffered: {
										"@type": "Service",
										name: "Web Development",
										description: "Custom website development for US businesses"
									}
								},
								{
									"@type": "Offer",
									itemOffered: {
										"@type": "Service",
										name: "SEO Services",
										description: "Search engine optimization for local and national US markets"
									}
								},
								{
									"@type": "Offer",
									itemOffered: {
										"@type": "Service",
										name: "Social Media Marketing",
										description: "Social media strategies for US businesses"
									}
								}
							]
						}
					})
				}} />
			{/* Enhanced FAQPage JSON-LD */}
			<Script id="about-faq-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "FAQPage",
						mainEntity: [
							{
								"@type": "Question",
								name: "Do you work with businesses across all 50 US states?",
								acceptedAnswer: {
									"@type": "Answer",
									text: "Yes. We partner with companies nationwide, from California to New York, Texas to Florida, and collaborate across all US time zones (EST–PST). Our team understands the unique needs of businesses in different regions and markets."
								}
							},
							{
								"@type": "Question",
								name: "Can you improve our local search visibility in US markets?",
								acceptedAnswer: {
									"@type": "Answer",
									text: "Absolutely. We implement technical SEO, content optimization, and local SEO strategies tailored to your specific US service areas. We understand how Americans search for local businesses and optimize accordingly."
								}
							},
							{
								"@type": "Question",
								name: "Do you sign NDAs and provide clear project scopes?",
								acceptedAnswer: {
									"@type": "Answer",
									text: "Yes. We're happy to sign NDAs and provide transparent scopes, timelines, and progress updates. We understand the importance of confidentiality in US business relationships."
								}
							},
							{
								"@type": "Question",
								name: "What types of US businesses do you work with?",
								acceptedAnswer: {
									"@type": "Answer",
									text: "We work with startups, SMBs, and growing enterprises across all industries—from tech companies in Silicon Valley to manufacturing firms in the Midwest, service providers on the East Coast, and local businesses in rural communities."
								}
							},
							{
								"@type": "Question",
								name: "How do you handle different US time zones?",
								acceptedAnswer: {
									"@type": "Answer",
									text: "Our team operates across Eastern, Central, Mountain, and Pacific time zones, ensuring we can collaborate on your schedule. We're available for calls and meetings during your business hours, regardless of your location in the US."
								}
							}
						]
					})
				}} />
			{/* BreadcrumbList JSON-LD */}
			<Script id="about-breadcrumb-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: "https://interstaterankers.com/"
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "About",
								item: "https://interstaterankers.com/about"
							}
						]
					})
				}} />
			<Footer />
		</div>
	);
}



