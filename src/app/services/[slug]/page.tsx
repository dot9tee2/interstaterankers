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
import { CheckCircle, ArrowRight } from "lucide-react";

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
                <header className="text-center mb-16 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-body font-bold mb-6 gradient-text">
                        {service.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {service.description}
                    </p>
                </header>

                {/* Features Grid */}
                <section className="max-w-5xl mx-auto mb-20">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.features.map((feature, index) => (
                            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{feature}</h3>
                                        <p className="text-sm text-muted-foreground">Expertly delivered to meet US market standards.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center bg-muted/30 rounded-3xl p-12 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Ready to upgrade your {service.title}?</h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                        Let's discuss how we can tailor our {service.title.toLowerCase()} strategies to your specific business goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="hero-gradient text-white">
                            <Link href="/contact">
                                Get a Proposal
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/projects">
                                View Our Work
                            </Link>
                        </Button>
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
