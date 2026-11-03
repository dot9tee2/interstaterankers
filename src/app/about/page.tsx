import HQScreenshot from "./hq-screenshot";
import FoundersNotebook from "./founders-notebook";
import TeamMembers from "./team-members";
import { team } from "@/data/team";
import aboutStyles from "./about.module.css";
import { videoTestimonials } from "@/data/proof";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import StatsResults from "@/components/sections/StatsResultsWrapper";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import Script from "next/script";
import {
	ArrowRight,
	Code,
	Share2,
	TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
	title: "About Us: Digital Marketing for US Businesses",
	description:
		"Interstate Rankers is an independent digital marketing agency specializing in custom web development, SEO services, and social media marketing—proudly serving businesses across all 50 states. We craft high-quality digital solutions that elevate online visibility and drive measurable results for American businesses.",
	openGraph: {
		title: "About Interstate Rankers | Digital Marketing for US Businesses",
		description:
			"Independent digital marketing agency specializing in web development, SEO services, and social media marketing for businesses across all 50 states.",
		url: "/about",
		type: "website",
		locale: "en_US",
		siteName: "Interstate Rankers",
		images: [
			{
				url: "/InterStateRankerLogo.png",
				width: 1200,
				height: 630,
				alt: "Interstate Rankers - Digital Marketing for US Businesses"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "About Interstate Rankers | Digital Marketing for US Businesses",
		description:
			"Independent digital marketing agency specializing in web development, SEO services, and social media marketing for businesses across all 50 states.",
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

export default function AboutPage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			{/* Same rhythm as the homepage: divide-y between sections, py-20 sm:py-24 each, one violet band (FinalCTA) at the end */}
			<main className="divide-y divide-border">
				<PageHero
					breadcrumbs={[{ label: "About" }]}
                    className={aboutStyles.hero}
					eyebrow="Independent minds. Shared standards."
					title={<>We wanted to do work<br className="hidden sm:block" /> we could <span className={aboutStyles.heroEmphasis}>stand behind.<svg viewBox="0 0 600 25" preserveAspectRatio="none" aria-hidden="true"><path d="M4 17Q240 0 594 12M65 23Q350 9 560 20" /></svg></span></>}
                    description="Interstate Rankers is an independent team building websites, software, and search strategies for US businesses."
				>
                    <a href="#founding-story" className={aboutStyles.storyLink}>Here’s why we started <span aria-hidden="true">↘</span></a>
				</PageHero>

                <FoundersNotebook />

                <section className="bg-card py-20 sm:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className={aboutStyles.teamHeading}>
                            <SectionHeader eyebrow="The people behind the work" title="Good work takes good people." align="left" />
                            <p>A small, independent team. Different strengths, the same care for what we put our names on.</p>
                        </div>
                        <TeamMembers />
                        <p className="mt-8 text-xs text-muted-foreground">Our team uses professional names on this site.</p>
                    </div>
                </section>

                <section id="interstate-hq" className="scroll-mt-28 py-20 sm:py-24">
                    <div className="container mx-auto grid items-center gap-10 px-4 md:px-6 lg:grid-cols-2">
                        <div>
                            <SectionHeader eyebrow="From the workbench" title="Inside Interstate HQ" align="left" className="mb-5" />
                            <p className="max-w-xl leading-relaxed text-muted-foreground">We built Interstate HQ to give clients one place to see what we’re working on and how it’s performing.</p>
                            <dl className="mt-6 space-y-4">
                                <div><dt className="font-semibold">Follow the work</dt><dd className="text-sm leading-relaxed text-muted-foreground">Read dated updates to see what’s complete, what’s in progress, and what’s next.</dd></div>
                                <div><dt className="font-semibold">Review performance</dt><dd className="text-sm leading-relaxed text-muted-foreground">Open reports and see the metrics for the services you use.</dd></div>
                                <div><dt className="font-semibold">Request website changes</dt><dd className="text-sm leading-relaxed text-muted-foreground">Send a request and track its status in the same workspace.</dd></div>
                            </dl>
                            <p className="mt-6 text-sm text-muted-foreground">From the technical team led by <strong className="text-foreground">Maverick Cooper, CTO</strong>, which also builds client websites, CRMs, and ERPs.</p>
                        </div>
                        <figure className="min-w-0">
                            <HQScreenshot />
                            <figcaption className="mt-3 text-xs text-muted-foreground">Actual Interstate HQ interface with fictional data. Features depend on your services and setup.</figcaption>
                        </figure>
                    </div>
                </section>

                <section className="py-16 sm:py-20">
                    <div className="container mx-auto max-w-5xl px-4 md:px-6">
                        <SectionHeader eyebrow="What we do" title="Digital marketing for US businesses" align="left" className="mb-8" />
                        <ul className="divide-y divide-border border-y border-border">
                            {services.map(({ icon: Icon, title, text, href }) => (
                                <li key={href}>
                                    <Link href={href} className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 py-5 sm:gap-6">
                                        <Icon aria-hidden="true" className="mt-1 h-5 w-5 text-accent-cyan" />
                                        <div>
                                            <h3 className="font-semibold group-hover:text-accent-cyan">{title}</h3>
                                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                                        </div>
                                        <ArrowRight aria-hidden="true" className="mt-1 h-5 w-5 text-accent-cyan motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {videoTestimonials.length > 0 && (
                    <section className="bg-card py-20 sm:py-24">
                        <div className="container mx-auto px-4 md:px-6">
                            <SectionHeader eyebrow="Client stories" title="Hear from our clients" className="mb-10" />
                            <div className="mx-auto grid max-w-4xl gap-8">
                                {videoTestimonials.map(({ src, name, company, captions }) => (
                                    <figure key={src}>
                                        <video controls playsInline preload="metadata" aria-label={`Client testimonial from ${name}`} className="aspect-video w-full rounded-2xl border border-border bg-black">
                                            <source src={src} />
                                            <track kind="captions" src={captions} srcLang="en" label="English" default />
                                            <a href={src}>Download the testimonial video</a>
                                        </video>
                                        <figcaption className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">{name}</strong> · {company}</figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

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
									We schedule calls around your business hours, from <strong>Eastern to Pacific time</strong>.
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
                        "@id": "https://interstaterankers.com/#organization",
                        employee: team.map(member => ({
                            "@type": "Person",
                            "@id": `https://interstaterankers.com/about#${member.slug}`,
                            name: member.name,
                            jobTitle: member.role,
                            description: member.detail,
                            knowsAbout: member.focus,
                            url: `https://interstaterankers.com/about#${member.slug}`,
                            worksFor: { "@id": "https://interstaterankers.com/#organization" },
                        })),
						name: "Interstate Rankers",
						alternateName: "Interstate Rankers",
						description: "Independent digital marketing agency specializing in custom web development, SEO services, and social media marketing for businesses across all 50 states.",
						url: "https://interstaterankers.com",
						logo: "https://interstaterankers.com/InterStateRankerLogo.png",
						areaServed: [
							{ "@type": "Country", name: "United States" },
							{ "@type": "State", name: "California" },
							{ "@type": "State", name: "New York" },
							{ "@type": "State", name: "Texas" },
							{ "@type": "State", name: "Florida" }
						],
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
									text: "We schedule calls around your business hours, from Eastern to Pacific time."
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



