import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const StatsResults = dynamic(() => import("@/components/sections/StatsResults"), { 
	ssr: false,
	loading: () => <div className="animate-pulse bg-muted/20 h-32 rounded-lg" />
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { 
	ssr: false,
	loading: () => <div className="animate-pulse bg-muted/20 h-48 rounded-lg" />
});
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { 
	MapPin, 
	Clock, 
	Shield, 
	TrendingUp, 
	Users, 
	Globe, 
	Star,
	ArrowRight,
	CheckCircle,
	Building2,
	Target,
	Zap,
	Heart
} from "lucide-react";

export const metadata: Metadata = {
	title: "About Us: US Digital Marketing Agency | InterStateRankers",
	description:
		"InterStateRankers is your trusted US digital growth collective specializing in custom web development, SEO services, and social media marketing—proudly serving businesses across all 50 states. We craft high-quality digital solutions that elevate online visibility and drive measurable results for American businesses.",
	keywords: [
		"About InterStateRankers",
		"US digital marketing agency",
		"web development USA",
		"SEO services United States",
		"social media marketing US",
		"digital solutions America",
		"custom websites USA",
		"online visibility US",
		"digital growth United States",
		"local SEO USA",
		"US business marketing",
		"American digital agency",
		"nationwide digital services",
		"US time zone coverage",
		"California digital marketing",
		"New York SEO services",
		"Texas web development",
		"Florida social media marketing"
	],
	openGraph: {
		title: "About InterStateRankers | US Digital Marketing Agency",
		description:
			"Trusted US digital growth collective specializing in web development, SEO services, and social media marketing for businesses across all 50 states.",
		url: "/about",
		type: "website",
		locale: "en_US",
		siteName: "InterStateRankers",
		images: [
			{
				url: "/InterStateRankerLogo.png",
				width: 1200,
				height: 630,
				alt: "InterStateRankers - US Digital Marketing Agency"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "About InterStateRankers | US Digital Marketing Agency",
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

export default function AboutPage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="container mx-auto px-4 py-16">
				{/* Breadcrumbs */}
				<nav aria-label="Breadcrumb" className="mb-8">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href="/">Home</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>About</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</nav>

				<article>
					{/* Visual Hero Section */}
					<header className="relative text-center mb-16 overflow-hidden">
						{/* Background Elements */}
						<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent-cyan/5 to-primary/10 rounded-3xl -z-10" />
						<div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
						<div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-cyan/10 rounded-full blur-2xl animate-pulse delay-1000" />
						
						<div className="relative z-10">
							<h1 className="text-4xl md:text-6xl font-heading font-bold mb-8 gradient-text animate-fade-in">
								Your Trusted Digital Growth Collective for <span className="text-primary">US Businesses</span>
							</h1>
							<p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-up">
								At <span className="font-semibold text-primary">InterStateRankers</span>, we specialize in empowering <strong>US businesses</strong> to thrive online through custom web solutions, strategic SEO, and dynamic social media engagement. Founded by a dedicated team of experienced professionals, our mission is to deliver dependable, results-driven services with integrity and a human touch—serving clients nationwide across <strong>all 50 states</strong> from <strong>California to New York, Texas to Florida</strong>.
							</p>
						</div>
					</header>

					{/* Enhanced Visual Badges */}
					<div className="flex flex-wrap items-center justify-center gap-4 mb-16" role="list" aria-label="Key features">
						<Badge variant="secondary" className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-primary/10 to-accent-cyan/10 border-primary/20 hover:scale-105 transition-transform duration-200" role="listitem">
							<MapPin className="w-4 h-4 mr-2" />
							Nationwide US Coverage
						</Badge>
						<Badge variant="secondary" className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-accent-cyan/10 to-primary/10 border-accent-cyan/20 hover:scale-105 transition-transform duration-200" role="listitem">
							<Clock className="w-4 h-4 mr-2" />
							EST–PST Availability
						</Badge>
						<Badge variant="secondary" className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-primary/10 to-accent-cyan/10 border-primary/20 hover:scale-105 transition-transform duration-200" role="listitem">
							<Shield className="w-4 h-4 mr-2" />
							Privacy-First & ADA-Aware
						</Badge>
						<Badge variant="secondary" className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-accent-cyan/10 to-primary/10 border-accent-cyan/20 hover:scale-105 transition-transform duration-200" role="listitem">
							<TrendingUp className="w-4 h-4 mr-2" />
							Results-Focused SEO
						</Badge>
					</div>

					{/* Enhanced Who We Are Section */}
					<section className="max-w-6xl mx-auto mb-16">
						<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent-cyan/5" />
							<CardHeader className="relative z-10 text-center pb-8">
								<div className="flex items-center justify-center mb-6">
									<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center">
										<Users className="w-8 h-8 text-white" />
									</div>
								</div>
								<CardTitle className="text-3xl md:text-4xl font-heading font-bold mb-4">
									Who We Are: <span className="text-primary">US Digital Marketing Experts</span>
								</CardTitle>
								<CardDescription className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
									We're a collective of <strong>US-based digital experts</strong>—web developers, SEO strategists, content creators, and marketing artisans—who came together with one shared goal: to offer streamlined, high-quality digital services without the fluff. Drawing on our time in various agencies and internal corporate teams across <strong>major US markets</strong>, we bring a rich blend of experience, fresh ideas, and a client-first mindset to every project.
								</CardDescription>
							</CardHeader>
						</Card>
					</section>

					{/* Enhanced Service Cards */}
					<section className="grid md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
						<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<CardHeader className="relative z-10">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<Globe className="w-6 h-6 text-white" />
								</div>
								<CardTitle className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
									Custom Web Development for US Businesses
								</CardTitle>
								<CardDescription className="text-muted-foreground leading-relaxed">
									Crafting responsive, user-friendly websites that reflect your brand's identity and convert visitors into loyal customers across <strong>all US markets</strong>.
								</CardDescription>
							</CardHeader>
							<CardContent className="relative z-10">
								<div className="flex items-center text-sm text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
									<span>Learn more</span>
									<ArrowRight className="w-4 h-4 ml-2" />
								</div>
							</CardContent>
						</Card>

						<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-accent-cyan/10 transition-all duration-500 hover:-translate-y-2">
							<div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<CardHeader className="relative z-10">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<TrendingUp className="w-6 h-6 text-white" />
								</div>
								<CardTitle className="text-xl font-semibold mb-3 group-hover:text-accent-cyan transition-colors duration-300">
									Local & National SEO Services
								</CardTitle>
								<CardDescription className="text-muted-foreground leading-relaxed">
									Elevating your online visibility with in-depth keyword research, technical SEO, content optimization, and <strong>local SEO strategies</strong> tailored for US search patterns.
								</CardDescription>
							</CardHeader>
							<CardContent className="relative z-10">
								<div className="flex items-center text-sm text-accent-cyan font-medium group-hover:translate-x-2 transition-transform duration-300">
									<span>Learn more</span>
									<ArrowRight className="w-4 h-4 ml-2" />
								</div>
							</CardContent>
						</Card>

						<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<CardHeader className="relative z-10">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<Users className="w-6 h-6 text-white" />
								</div>
								<CardTitle className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
									Social Media Marketing
								</CardTitle>
								<CardDescription className="text-muted-foreground leading-relaxed">
									Creating authentic content and targeted campaigns that resonate with your <strong>US audience</strong> and drive engagement across platforms.
								</CardDescription>
							</CardHeader>
							<CardContent className="relative z-10">
								<div className="flex items-center text-sm text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
									<span>Learn more</span>
									<ArrowRight className="w-4 h-4 ml-2" />
								</div>
							</CardContent>
						</Card>
					</section>

					{/* Enhanced Service Quick Links */}
					<section className="max-w-6xl mx-auto mb-16">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 gradient-text">
								Our Core Services for <span className="text-primary">US Businesses</span>
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								Comprehensive digital solutions tailored for American businesses across all industries
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
								<Link href="/services" className="block p-6 text-center">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										<Globe className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">Web Development</h3>
									<p className="text-sm text-muted-foreground">Custom websites for US businesses</p>
								</Link>
							</Card>
							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-accent-cyan/5 transition-all duration-300 hover:-translate-y-1">
								<Link href="/services" className="block p-6 text-center">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										<TrendingUp className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2 group-hover:text-accent-cyan transition-colors duration-300">SEO Services</h3>
									<p className="text-sm text-muted-foreground">Local & national search optimization</p>
								</Link>
							</Card>
							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
								<Link href="/services" className="block p-6 text-center">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										<Users className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">Social Media</h3>
									<p className="text-sm text-muted-foreground">US-focused social strategies</p>
								</Link>
							</Card>
							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
								<Link href="/projects" className="block p-6 text-center">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										<Building2 className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">View Our Work</h3>
									<p className="text-sm text-muted-foreground">Success stories & case studies</p>
								</Link>
							</Card>
							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-accent-cyan/5 transition-all duration-300 hover:-translate-y-1">
								<Link href="/insights" className="block p-6 text-center">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										<Target className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2 group-hover:text-accent-cyan transition-colors duration-300">Digital Insights</h3>
									<p className="text-sm text-muted-foreground">Latest trends & strategies</p>
								</Link>
							</Card>
							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
								<Link href="/contact" className="block p-6 text-center">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
										<Zap className="w-6 h-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">Get Started</h3>
									<p className="text-sm text-muted-foreground">Free consultation</p>
								</Link>
							</Card>
						</div>
					</section>

					{/* Enhanced Why Choose Us Section */}
					<section className="max-w-6xl mx-auto mb-16">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 gradient-text">
								Why Choose <span className="text-primary">InterStateRankers</span> for Your US Business
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								Six compelling reasons why American businesses trust us with their digital growth
							</p>
						</div>
						
						<div className="grid md:grid-cols-2 gap-8">
							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<MapPin className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
												US-Focused Expertise
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Our team's collective experience in <strong>US markets</strong> ensures flexible, well-rounded solutions tailored to your business needs across all 50 states.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-accent-cyan/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Star className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-accent-cyan transition-colors duration-300">
												Quality Over Hype
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												We're focused on delivering real, measurable outcomes that align with your goals, not empty promises. See our <Link href="/projects" className="text-primary hover:underline">success stories</Link>.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Users className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
												Transparent Communication
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Expect clear timelines, open collaboration, and consistent updates every step of the way with <strong>US-based support</strong>.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-accent-cyan/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Target className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-accent-cyan transition-colors duration-300">
												Custom-Tailored Solutions
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												We treat every project as unique—your brand's needs guide our strategy, not a one-size-fits-all approach. Learn more about our <Link href="/services" className="text-primary hover:underline">custom services</Link>.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Clock className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
												US Time Zone Coverage
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												We collaborate on your schedule with availability across <strong>Eastern to Pacific time zones</strong>, ensuring seamless communication.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-accent-cyan/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Shield className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-accent-cyan transition-colors duration-300">
												Privacy-First & Accessibility-Minded
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												We build with best practices that respect user privacy and inclusive, accessible design, meeting <strong>US compliance standards</strong>.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</section>

					{/* Enhanced Mission & Vision Section */}
					<section className="max-w-6xl mx-auto mb-16">
						<div className="grid md:grid-cols-2 gap-8">
							<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
								<div className="absolute top-4 right-4 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
								<CardHeader className="relative z-10">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
											<Target className="w-6 h-6 text-white" />
										</div>
										<h3 className="text-2xl font-heading font-bold text-primary">Our Mission</h3>
									</div>
									<CardDescription className="text-lg leading-relaxed">
										To empower <strong>US businesses</strong> to achieve sustainable digital growth through innovation, craftsmanship, and integrity across all markets from coast to coast.
									</CardDescription>
								</CardHeader>
							</Card>

							<Card className="relative overflow-hidden border-0 bg-gradient-to-br from-accent-cyan/5 to-accent-cyan/10 backdrop-blur-sm">
								<div className="absolute top-4 right-4 w-16 h-16 bg-accent-cyan/10 rounded-full blur-xl" />
								<CardHeader className="relative z-10">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center">
											<Star className="w-6 h-6 text-white" />
										</div>
										<h3 className="text-2xl font-heading font-bold text-accent-cyan">Our Vision</h3>
									</div>
									<CardDescription className="text-lg leading-relaxed">
										To be the go-to digital partners for <strong>American businesses</strong> that value quality-driven results over flashy marketing—building trust one project at a time, from <strong>Silicon Valley startups to Main Street enterprises</strong>.
									</CardDescription>
								</CardHeader>
							</Card>
						</div>
					</section>

					{/* Enhanced Values Section */}
					<section className="max-w-6xl mx-auto mb-16">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 gradient-text">
								Our Core Values for <span className="text-primary">US Clients</span>
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								The principles that guide our work with American businesses
							</p>
						</div>
						
						<div className="grid md:grid-cols-2 gap-6">
							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Heart className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
												Authenticity
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Honest communication and dependable execution that reflects <strong>American business values</strong>.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-accent-cyan/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Star className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-accent-cyan transition-colors duration-300">
												Excellence
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												We hold ourselves to the highest standard across all our work, delivering results that exceed expectations.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Zap className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
												Innovation
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Staying agile and informed in the ever-evolving digital landscape, leveraging the latest <strong>US market trends</strong>.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-accent-cyan/5 transition-all duration-300">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-cyan/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											<Users className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2 group-hover:text-accent-cyan transition-colors duration-300">
												Empathy
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												We listen, understand your challenges, and build solutions that resonate with your <strong>US audience</strong> and business goals.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</section>

					<section className="max-w-4xl mx-auto mb-14 space-y-4">
						<h2 className="text-2xl md:text-3xl font-heading font-semibold">Who We Serve: US Businesses Nationwide</h2>
						<p className="text-muted-foreground">
							Our clients span <strong>startups, small and medium enterprises, and growing brands</strong>—from local businesses in <strong>rural communities</strong> to service-focused firms in <strong>major metropolitan areas</strong>—who seek a digital presence that's both meaningful and effective across the United States. We serve businesses in <strong>all 50 states</strong>, from <strong>tech startups in California</strong> to <strong>manufacturing companies in the Midwest</strong> and <strong>service providers on the East Coast</strong>.
						</p>
						<div className="mt-6">
							<p className="text-muted-foreground mb-4">
								<strong>Ready to grow your US business online?</strong> Explore our <Link href="/projects" className="text-primary hover:underline">successful case studies</Link> or <Link href="/contact" className="text-primary hover:underline">schedule a consultation</Link> to discuss your digital growth strategy.
							</p>
						</div>
					</section>

				{/* Social proof and results */}
				<Suspense fallback={<div className="animate-pulse bg-muted/20 h-32 rounded-lg mb-8" />}>
					<StatsResults />
				</Suspense>
				{/* <Suspense fallback={<div className="animate-pulse bg-muted/20 h-48 rounded-lg mb-8" />}>
					<Testimonials compact />
				</Suspense> */}

				{/* Team */}
				{/* <section className="max-w-5xl mx-auto mt-12 md:mt-16 mb-16">
					<h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6 text-center">Meet the Team</h2>
					<p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">Experienced US-based professionals committed to clarity, craftsmanship, and results.</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
						<div className="text-center rounded-lg border p-6 bg-background/50">
							<Avatar className="w-16 h-16 mx-auto mb-3">
								<AvatarImage src="" alt="Kenneth Adams" />
								<AvatarFallback>KA</AvatarFallback>
							</Avatar>
							<div className="font-semibold">Kenneth Adams</div>
							<div className="text-sm text-muted-foreground mb-2">Founder</div>
							<a className="text-sm text-primary hover:underline" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
						</div>
						<div className="text-center rounded-lg border p-6 bg-background/50">
							<Avatar className="w-16 h-16 mx-auto mb-3">
								<AvatarImage src="" alt="Benny Hoover" />
								<AvatarFallback>BH</AvatarFallback>
							</Avatar>
							<div className="font-semibold">Benny Hoover</div>
							<div className="text-sm text-muted-foreground mb-2">Co-Founder</div>
							<a className="text-sm text-primary hover:underline" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
						</div>
						<div className="text-center rounded-lg border p-6 bg-background/50">
							<Avatar className="w-16 h-16 mx-auto mb-3">
								<AvatarImage src="" alt="Maverick Cooper" />
								<AvatarFallback>JB</AvatarFallback>
							</Avatar>
							<div className="font-semibold">Jonnathan Brown</div>
							<div className="text-sm text-muted-foreground mb-2">Co-founder</div>
							<a className="text-sm text-primary hover:underline" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
						</div>
						<div className="text-center rounded-lg border p-6 bg-background/50">
							<Avatar className="w-16 h-16 mx-auto mb-3">
								<AvatarImage src="" alt="Maverick Cooper" />
								<AvatarFallback>MC</AvatarFallback>
							</Avatar>
							<div className="font-semibold">Maverick Cooper</div>
							<div className="text-sm text-muted-foreground mb-2">Web Developer</div>
							<a className="text-sm text-primary hover:underline" href="https://www.linkedin.com/in/dot9tee2/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
						</div>
						<div className="text-center rounded-lg border p-6 bg-background/50">
							<Avatar className="w-16 h-16 mx-auto mb-3">
								<AvatarImage src="" alt="Zack Wilson" />
								<AvatarFallback>ZW</AvatarFallback>
							</Avatar>
							<div className="font-semibold">Zack Wilson</div>
							<div className="text-sm text-muted-foreground mb-2">Team Lead</div>
							<a className="text-sm text-primary hover:underline" href="https://www.linkedin.com/in/dot9tee2/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
						</div>
						<div className="text-center rounded-lg border p-6 bg-background/50">
							<Avatar className="w-16 h-16 mx-auto mb-3">
								<AvatarImage src="" alt="Eric Murphy" />
								<AvatarFallback>EM</AvatarFallback>
							</Avatar>
							<div className="font-semibold">Eric Murphy</div>
							<div className="text-sm text-muted-foreground mb-2">Team Lead</div>
							<a className="text-sm text-primary hover:underline" href="https://www.linkedin.com/in/dot9tee2/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
						</div>
					</div>
				</section> */}

					{/* FAQ */}
					<section className="max-w-4xl mx-auto mb-16">
						<h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">Frequently Asked Questions About Our US Services</h2>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="q1">
								<AccordionTrigger>Do you work with businesses across all 50 US states?</AccordionTrigger>
								<AccordionContent>
									Yes. We partner with companies nationwide, from <strong>California to New York, Texas to Florida</strong>, and collaborate across all US time zones (EST–PST). Our team understands the unique needs of businesses in different regions and markets.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="q2">
								<AccordionTrigger>Can you improve our local search visibility in US markets?</AccordionTrigger>
								<AccordionContent>
									Absolutely. We implement technical SEO, content optimization, and <strong>local SEO strategies</strong> tailored to your specific US service areas. We understand how Americans search for local businesses and optimize accordingly.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="q3">
								<AccordionTrigger>Do you sign NDAs and provide clear project scopes?</AccordionTrigger>
								<AccordionContent>
									Yes. We're happy to sign NDAs and provide transparent scopes, timelines, and progress updates. We understand the importance of confidentiality in US business relationships.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="q4">
								<AccordionTrigger>What types of US businesses do you work with?</AccordionTrigger>
								<AccordionContent>
									We work with <strong>startups, SMBs, and growing enterprises</strong> across all industries—from tech companies in Silicon Valley to manufacturing firms in the Midwest, service providers on the East Coast, and local businesses in rural communities. <Link href="/projects" className="text-primary hover:underline">View our case studies</Link> to see our diverse client portfolio.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="q5">
								<AccordionTrigger>How do you handle different US time zones?</AccordionTrigger>
								<AccordionContent>
									Our team operates across <strong>Eastern, Central, Mountain, and Pacific time zones</strong>, ensuring we can collaborate on your schedule. We're available for calls and meetings during your business hours, regardless of your location in the US.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</section>

					{/* Homepage-style CTA Section */}
					<section className="relative py-20 overflow-hidden">
						{/* Background */}
						<div className="absolute inset-0 hero-gradient" />
						
						{/* Content */}
						<div className="relative z-10 container mx-auto px-4">
							<div className="max-w-4xl mx-auto text-center">
								{/* Trust Badge */}
								<div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 text-sm font-medium text-white animate-fade-in">
									<Star className="w-4 h-4 text-accent-amber" />
									<span>Trusted by 100+ US businesses</span>
								</div>

								{/* Main Headline */}
								<h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 animate-slide-up">
									Ready to Grow Your <span className="accent-gradient-text">US Business</span>?
								</h2>

								{/* Subheadline */}
								<p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
									Stop losing leads to poor search rankings and weak digital presence.
									<br />
									<span className="accent-gradient-text font-semibold">Start dominating your market today.</span>
								</p>

								{/* Benefits List */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '400ms' }}>
									<div className="flex items-center space-x-3 text-white/90">
										<CheckCircle className="w-5 h-5 text-accent-cyan flex-shrink-0" />
										<span className="text-sm font-medium">Free consultation & business audit</span>
									</div>
									<div className="flex items-center space-x-3 text-white/90">
										<CheckCircle className="w-5 h-5 text-accent-cyan flex-shrink-0" />
										<span className="text-sm font-medium">Custom growth strategy in 24 hours</span>
									</div>
									<div className="flex items-center space-x-3 text-white/90">
										<CheckCircle className="w-5 h-5 text-accent-cyan flex-shrink-0" />
										<span className="text-sm font-medium">No long-term contracts required</span>
									</div>
									<div className="flex items-center space-x-3 text-white/90">
										<CheckCircle className="w-5 h-5 text-accent-cyan flex-shrink-0" />
										<span className="text-sm font-medium">Results guaranteed or money back</span>
									</div>
								</div>

								{/* CTA Buttons */}
								<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 animate-slide-up" style={{ animationDelay: '600ms' }}>
									<Link href="/contact">
										<Button 
											size="lg" 
											className="bg-white text-primary hover:bg-white/90 hover-lift glow-button text-lg px-8 py-6 h-auto font-bold"
										>
											Get Your Free Proposal
											<ArrowRight className="ml-2 h-6 w-6" />
										</Button>
									</Link>
									
									<Link href="/projects">
										<Button 
											variant="outline" 
											size="lg" 
											className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 h-auto font-semibold"
										>
											<Building2 className="mr-2 h-5 w-5" />
											View Our Work
										</Button>
									</Link>
								</div>

								{/* Trust Indicators */}
								<div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-white/70 text-sm animate-slide-up" style={{ animationDelay: '800ms' }}>
									<div className="flex items-center space-x-2">
										<CheckCircle className="w-4 h-4" />
										<span>No setup fees</span>
									</div>
									<div className="flex items-center space-x-2">
										<CheckCircle className="w-4 h-4" />
										<span>Cancel anytime</span>
									</div>
									<div className="flex items-center space-x-2">
										<CheckCircle className="w-4 h-4" />
										<span>US-based support</span>
									</div>
								</div>
							</div>

							{/* Background Elements */}
							<div className="absolute top-10 left-10 w-32 h-32 bg-accent-cyan/20 rounded-full blur-3xl animate-pulse" />
							<div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-amber/20 rounded-full blur-3xl animate-pulse delay-1000" />
							<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-500" />
						</div>
					</section>
				</article>
			</main>
			{/* Enhanced Organization JSON-LD (US-focused) */}
			<Script id="about-organization-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Organization",
					name: "InterStateRankers",
					alternateName: "InterState Rankers",
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
				}) }} />
			{/* LocalBusiness JSON-LD */}
			<Script id="about-localbusiness-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "LocalBusiness",
					name: "InterStateRankers",
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
				}) }} />
			{/* Enhanced FAQPage JSON-LD */}
			<Script id="about-faq-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
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
				}) }} />
			{/* BreadcrumbList JSON-LD */}
			<Script id="about-breadcrumb-ld" type="application/ld+json" strategy="afterInteractive"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Home",
							item: "/"
						},
						{
							"@type": "ListItem",
							position: 2,
							name: "About",
							item: "/about"
						}
					]
				}) }} />
			<Footer />
		</div>
	);
}



