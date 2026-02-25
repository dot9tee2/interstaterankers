import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Terms and Conditions | InterStateRankers",
    description: "Terms and Conditions for InterStateRankers. Please read these terms carefully before using our services.",
    openGraph: {
        title: "Terms and Conditions | InterStateRankers",
        description: "Read the Terms and Conditions for using InterStateRankers services.",
        url: "/terms-and-conditions",
        type: "website",
    },
    alternates: {
        canonical: "/terms-and-conditions",
    },
};

export default function TermsAndConditionsPage() {
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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
                                <BreadcrumbPage>Terms and Conditions</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <article className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h1 className="text-4xl md:text-5xl font-body font-bold mb-8 gradient-text">Terms and Conditions</h1>

                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                        <p className="text-sm text-muted-foreground mb-6">Last Updated: {currentDate}</p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
                            <p className="text-muted-foreground mb-4">
                                Welcome to InterStateRankers. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms. If you do not agree to any part of these terms, you may not use our services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Services</h2>
                            <p className="text-muted-foreground mb-4">
                                InterStateRankers provides digital marketing services, including SEO, web development, content marketing, and AI-driven answering services. The specific details of the services provided to you will be outlined in your individual service agreement or proposal.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">3. SMS and Mobile Messaging Terms</h2>
                            <p className="text-muted-foreground mb-4">
                                By providing your phone number and opting in to receive SMS/MMS messages from InterStateRankers, you agree to the following:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground mb-4">
                                <li><strong>Consent:</strong> You provide express written consent to receive recurring automated marketing and informational text messages (e.g., SMS and MMS) from InterStateRankers.</li>
                                <li><strong>Frequency:</strong> Message frequency varies.</li>
                                <li><strong>Rates:</strong> Message and data rates may apply.</li>
                                <li><strong>Opt-Out:</strong> You can cancel the SMS service at any time by replying "STOP" to any message. We will send you an SMS message to confirm that you have been unsubscribed.</li>
                                <li><strong>Help:</strong> For help, reply "HELP" to any message or contact us at info@interstaterankers.com.</li>
                                <li><strong>Lead Generation:</strong> If you provide your information via a Facebook Lead Ad or other third-party platform, your submission constitutes opt-in consent for us to contact you regarding the services you expressed interest in.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Intellectual Property</h2>
                            <p className="text-muted-foreground mb-4">
                                All content, original images, logos, and software on this site are the property of InterStateRankers or its content suppliers and are protected by international copyright laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Limitation of Liability</h2>
                            <p className="text-muted-foreground mb-4">
                                InterStateRankers will not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Governing Law</h2>
                            <p className="text-muted-foreground">
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Changes to Terms</h2>
                            <p className="text-muted-foreground">
                                We reserve the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting to this page.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Contact Us</h2>
                            <div className="mt-4">
                                <p className="font-semibold text-foreground">InterStateRankers</p>
                                <p className="text-muted-foreground"><a href="mailto:info@interstaterankers.com" className="hover:underline">info@interstaterankers.com</a></p>
                                <p className="text-muted-foreground">
                                    <a href="tel:+12816195295" className="hover:underline">(281) 619-5295</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </article>
            </main>

            <Script id="terms-schema" type="application/ld+json" strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Terms and Conditions",
                        description: "Terms and Conditions for using InterStateRankers services.",
                        url: "https://interstaterankers.com/terms-and-conditions",
                        publisher: {
                            "@type": "Organization",
                            name: "InterStateRankers",
                            logo: "https://interstaterankers.com/InterStateRankerLogo.png"
                        }
                    })
                }} />

            <Footer />
        </div>
    );
}
