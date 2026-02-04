import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Play, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Service Data Definition
interface ServiceData {
    title: string;
    description: string;
    keywords: string[];
    features: string[];
}

const services: Record<string, ServiceData> = {
    "seo": {
        title: "Search Engine Optimization (SEO)",
        description: "Dominate search results with our data-driven SEO strategies tailored for US businesses. We focus on technical SEO, content optimization, and high-quality backlinks to drive organic traffic.",
        keywords: ["SEO services US", "technical SEO", "link building", "organic traffic", "keyword research"],
        features: ["Technical Audit & Fixes", "Keyword Strategy", "On-Page Optimization", "Link Building", "Local SEO"]
    },
    "web-development": {
        title: "Custom Web Development",
        description: "Build a digital presence that converts. Our US-based developers craft responsive, fast, and accessible websites using modern frameworks like Next.js and React.",
        keywords: ["web development agency", "custom websites", "Next.js developers", "responsive web design", "US web dev"],
        features: ["Custom Design", "Mobile-First Development", "Speed Optimization", "CMS Integration", "Accessibility Compliance"]
    },
    "social-media": {
        title: "Social Media Marketing",
        description: "Engage your audience where they spend their time. We create authentic content and manage communities across major platforms to build brand loyalty and drive leads.",
        keywords: ["social media marketing", "community management", "content creation", "brand awareness", "social strategy"],
        features: ["Content Strategy", "Community Management", "Paid Social Ads", "Influencer Marketing", "Analytics & Reporting"]
    },
    "ppc": {
        title: "Pay-Per-Click Advertising (PPC)",
        description: "Get immediate results with targeted ad campaigns. We manage Google Ads and social media advertising to maximize your ROI and capture high-intent leads.",
        keywords: ["PPC management", "Google Ads", "paid search", "ad campaign optimization", "ROI focused advertising"],
        features: ["Campaign Setup", "Keyword Bidding", "Ad Copywriting", "Landing Page Optimization", "Conversion Tracking"]
    },
    "content-marketing": {
        title: "Content Marketing",
        description: "Tell your story with compelling content. From blog posts to whitepapers, we produce high-quality assets that establish authority and nurture prospects.",
        keywords: ["content marketing services", "blog writing", "copywriting", "brand storytelling", "content strategy"],
        features: ["Blog Production", "Copywriting", "Email Newsletters", "Video Scripts", "Distribution Strategy"]
    },
    "answering": {
        title: "24/7 Answering Services",
        description: "Never miss a lead again. Our AI-driven and human-supported answering services ensure every caller gets a professional response, day or night.",
        keywords: ["answering service", "24/7 call support", "virtual receptionist", "lead capture", "after-hours answering"],
        features: ["24/7 Availability", "appointment Scheduling", "Emergency Dispatch", "Bilingual Support", "Call Recording"]
    },
    "calling": {
        title: "Outbound Calling Services",
        description: "Proactive growth through targeted outreach. We handle lead qualification, appointment setting, and follow-ups so your sales team focuses on closing.",
        keywords: ["outbound calling", "telemarketing", "appointment setting", "lead qualification", "cold calling services"],
        features: ["Lead Qualification", "Appointment Setting", "Customer Surveys", "Event Reminders", "Database Cleanup"]
    },
    "graphic-design": {
        title: "Graphic Designing",
        description: "Visuals that captivate and convert. From logos to marketing materials, our designers create cohesive brand identities that stand out in a crowded market.",
        keywords: ["graphic design services", "logo design", "brand identity", "marketing materials", "creative design"],
        features: ["Logo Design", "Brand Identity", "Marketing Collateral", "Social Media Graphics", "Infographics"]
    },
    "app-development": {
        title: "Mobile App Development",
        description: "Turn your idea into a powerful mobile experience. We build native iOS and Android apps that are intuitive, fast, and built to scale with your business.",
        keywords: ["app development", "iOS development", "Android development", "mobile apps", "custom software"],
        features: ["iOS & Android", "UI/UX Design", "Cross-Platform", "App Store Optimization", "Maintenance & Support"]
    },
    "gmb": {
        title: "Google Business Profile Optimization",
        description: "Dominate the 'Map Pack' and get found locally. We optimize your Google Business Profile to drive calls, clicks, and visits from high-intent local searchers.",
        keywords: ["google my business", "local seo", "map pack ranking", "gbp optimization", "local search"],
        features: ["Profile Setup", "Review Management", "Post Updates", "Q&A Management", "Spam Fighting"]
    }
};

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return Object.keys(services).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = services[slug];

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${service.title} | InterStateRankers`,
        description: service.description,
        openGraph: {
            title: `${service.title} | InterStateRankers`,
            description: service.description,
            url: `/services/${slug}`,
            type: "website",
        },
        alternates: {
            canonical: `/services/${slug}`
        }
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = services[slug];

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-16">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 pt-8">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/services">Services</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{service.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-background overflow-visible -mt-8">
                    <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
                    <div className="container relative mx-auto px-4 text-center">
                        <div className="animate-fade-in-up">
                            <Badge variant="outline" className="mb-8 bg-primary/10 border-primary/40 text-white px-6 py-1.5 text-sm font-medium backdrop-blur-md">
                                Enterprise Grade Solution
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-body font-bold mb-8 gradient-text tracking-tight pb-2 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                                {service.description}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button asChild size="lg" className="hero-gradient text-white h-14 px-8 text-lg shadow-lg hover:shadow-primary/25">
                                    <Link href="/contact">
                                        Get a Proposal
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-primary/20 hover:bg-primary/10">
                                    <Link href="/pricing">
                                        View Packages
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="max-w-6xl mx-auto mb-24 px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.features.map((feature, index) => (
                            <div key={index} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                                        <Check className="w-6 h-6 text-primary flex-shrink-0" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">{feature}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Engineered for maximum impact and ROI. Fully managed by our US-based team.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="container mx-auto px-4 mb-20">
                    <div className="text-center bg-gradient-to-br from-slate-900 to-indigo-950/50 border border-white/10 rounded-3xl p-12 md:p-20 relative overflow-hidden group">
                        {/* Decorative Glows */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-700" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to scale your {service.title}?</h2>
                            <p className="text-white/70 mb-10 text-xl max-w-2xl mx-auto">
                                Stop settling for average results. Partner with the agency that treats your growth as our own.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg font-bold">
                                    <Link href="/contact">
                                        Start Now
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 h-14 px-8 text-lg">
                                    <Link href="/projects">
                                        See Results
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Structured Data */}
            <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: service.title,
                        description: service.description,
                        provider: {
                            "@type": "Organization",
                            name: "InterStateRankers",
                            url: "https://interstaterankers.com"
                        },
                        areaServed: {
                            "@type": "Country",
                            name: "United States"
                        },
                        url: `https://interstaterankers.com/services/${slug}`,
                        brand: {
                            "@type": "Brand",
                            name: "InterStateRankers"
                        }
                    })
                }}
            />
            <Script id="breadcrumb-jsonld" type="application/ld+json" strategy="afterInteractive"
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
                                name: "Services",
                                item: "https://interstaterankers.com/services"
                            },
                            {
                                "@type": "ListItem",
                                position: 3,
                                name: service.title,
                                item: `https://interstaterankers.com/services/${slug}`
                            }
                        ]
                    })
                }}
            />

            <Footer />
        </div>
    );
}
