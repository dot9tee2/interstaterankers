import type { Metadata } from "next";
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
import { CheckCircle, ArrowRight, Play, Check, Zap, Target, BarChart, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// Service Data
const service = {
    title: "Mobile App Development",
    description: "Transform your ideas into powerful mobile applications. We develop intuitive, high-performance iOS and Android apps that engage users.",
    longDescription: undefined,
    keywords: ["mobile app development", "iOS development", "Android development", "cross-platform apps", "app design"],
    features: ["iOS & Android", "Cross-Platform (React Native)", "UI/UX Design", "App Store Optimization", "Maintenance & Support"],
    process: undefined,
    benefits: undefined,
    faqs: undefined
};

export const metadata: Metadata = {
    title: `${service.title} | InterStateRankers`,
    description: service.description,
    openGraph: {
        title: `${service.title} | InterStateRankers`,
        description: service.description,
        url: `/services/app-development`,
        type: "website",
    },
    alternates: {
        canonical: `/services/app-development`
    }
};

export default function AppDevelopmentPage() {
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

                {/* Long Description */}
                {service.longDescription && (
                    <section className="container mx-auto px-4 mb-20">
                        <div className="max-w-4xl mx-auto text-lg text-muted-foreground leading-relaxed whitespace-pre-line text-center">
                            {service.longDescription}
                        </div>
                    </section>
                )}

                {/* Features Grid */}
                <section className="max-w-6xl mx-auto mb-24 px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
                        <p className="text-muted-foreground text-lg">Everything you need to succeed.</p>
                    </div>
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

                {/* Process Section */}
                {service.process && (
                    <section className="container mx-auto px-4 mb-24">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/20 text-primary">How We Work</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
                            <p className="text-muted-foreground text-lg">A proven methodology for consistent results.</p>
                        </div>
                        <div className="relative max-w-5xl mx-auto">
                            <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2 md:-translate-x-1/2" />

                            {service.process.map((step, index) => (
                                <div key={index} className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary z-10 -translate-x-1/2 mt-1.5 shadow-[0_0_0_4px_rgba(var(--primary),0.2)]" />

                                    <div className="flex-1 md:w-1/2" />
                                    <div className="flex-1 md:w-1/2 pl-12 md:pl-0 md:px-12">
                                        <div className="bg-card/30 border border-border/50 p-6 rounded-2xl hover:border-primary/30 transition-colors">
                                            <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                <Badge className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center p-0 text-sm font-bold shadow-lg">
                                                    {index + 1}
                                                </Badge>
                                                <h3 className="text-xl font-bold">{step.title}</h3>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Benefits Section */}
                {service.benefits && (
                    <section className="bg-muted/30 py-24 mb-24">
                        <div className="container mx-auto px-4">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/20 text-primary">Why Choose Us</Badge>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">The Benefits</h2>
                                <p className="text-muted-foreground text-lg">Real value that drives your business forward.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                {service.benefits.map((benefit, index) => (
                                    <div key={index} className="flex gap-5">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/20">
                                                {index === 0 && <Zap className="w-6 h-6 text-white" />}
                                                {index === 1 && <Target className="w-6 h-6 text-white" />}
                                                {index === 2 && <BarChart className="w-6 h-6 text-white" />}
                                                {index === 3 && <FileText className="w-6 h-6 text-white" />}
                                                {index > 3 && <CheckCircle className="w-6 h-6 text-white" />}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ Section */}
                {service.faqs && (
                    <section className="max-w-3xl mx-auto mb-24 px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground text-lg">Common questions about our {service.title} services.</p>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {service.faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left py-4 text-base md:text-lg">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                )}

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
                                    <Link href="/contact">
                                        Contact Us
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
                        url: `https://interstaterankers.com/services/app-development`,
                        brand: {
                            "@type": "Brand",
                            name: "InterStateRankers"
                        }
                    })
                }}
            />
            {service.faqs && (
                <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: service.faqs.map(faq => ({
                                "@type": "Question",
                                name: faq.question,
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: faq.answer
                                }
                            }))
                        })
                    }}
                />
            )}
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
                                item: `https://interstaterankers.com/services/app-development`
                            }
                        ]
                    })
                }}
            />

            <Footer />
        </div>
    );
}
