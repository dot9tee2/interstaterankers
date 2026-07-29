import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Terms and Conditions | Interstate Rankers",
    description: "Terms and Conditions for Interstate Rankers. Please read these terms carefully before using our services.",
    openGraph: {
        title: "Terms and Conditions | Interstate Rankers",
        description: "Read the Terms and Conditions for using Interstate Rankers services.",
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
                                Welcome to Interstate Rankers. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms. If you do not agree to any part of these terms, you may not use our services. You must be at least 18 years of age, and authorized to bind the business or entity on whose behalf you are acting, to agree to these Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Services</h2>
                            <p className="text-muted-foreground mb-4">
                                Interstate Rankers provides digital marketing services, including SEO, web development, content marketing, and AI-driven answering services. The specific details of the services provided to you will be outlined in your individual service agreement or proposal.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Google Business Profile (GBP) Optimization Services</h2>
                            <p className="text-muted-foreground mb-4">
                                For clients who sign up for Google Business Profile (GBP) Optimization services, the following additional terms apply:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground mb-4">
                                <li><strong>Managerial Access:</strong> The client must grant Interstate Rankers managerial-level access to their Google Business Profile within fourteen (14) days of signing up for GBP Optimization services.</li>
                                <li><strong>Profile Verification:</strong> If the client&apos;s Google Business Profile is not yet verified with Google, the client is responsible for completing verification within fourteen (14) days of signing up, independent of and prior to granting managerial access.</li>
                                <li><strong>Failure to Provide Access or Verify:</strong> If, for any reason, the client does not grant managerial access and/or does not complete verification of their Google Business Profile within the applicable 14-day period, Interstate Rankers reserves the right, at its sole discretion, to build and launch alternative landing page(s) for the client&apos;s business hosted on Interstate Rankers&apos; high-authority domain (<a href="https://nearbybizfinder.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nearbybizfinder.com</a>) and to begin SEO optimization efforts on those landing pages in place of, or in addition to, the client&apos;s Google Business Profile.</li>
                                <li><strong>Continued Billing:</strong> The unavailability of managerial access or an unverified Google Business Profile does not pause, suspend, or excuse billing. Interstate Rankers remains entitled to invoice and collect payment for the following month(s) of service regardless of whether optimization occurs on the client&apos;s Google Business Profile or on the substitute landing page(s) described above.</li>
                                <li><strong>Ownership and Transition:</strong> Landing pages created under this section are owned and hosted by Interstate Rankers on its own domain. If the client subsequently grants managerial access and/or completes verification, Interstate Rankers may, at its discretion, resume or add optimization directly on the client&apos;s Google Business Profile.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">4. SMS and Mobile Messaging Terms</h2>
                            <p className="text-muted-foreground mb-4">
                                By providing your phone number and opting in to receive SMS/MMS messages from Interstate Rankers, you agree to the following:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground mb-4">
                                <li><strong>Consent:</strong> You provide express written consent to receive recurring automated marketing and informational text messages (e.g., SMS and MMS) from Interstate Rankers.</li>
                                <li><strong>Frequency:</strong> Message frequency varies.</li>
                                <li><strong>Rates:</strong> Message and data rates may apply.</li>
                                <li><strong>Opt-Out:</strong> You can cancel the SMS service at any time by replying "STOP" to any message. We will send you an SMS message to confirm that you have been unsubscribed.</li>
                                <li><strong>Help:</strong> For help, reply "HELP" to any message or contact us at info@interstaterankers.com.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Intellectual Property</h2>
                            <p className="text-muted-foreground mb-4">
                                All content, original images, logos, and software on this site are the property of Interstate Rankers or its content suppliers and are protected by international copyright laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">6. No Guarantee of Results; Limitation of Liability; Disclaimer of Warranties</h2>
                            <p className="text-muted-foreground mb-4">
                                Search engine rankings, online visibility, lead volume, and similar outcomes are influenced by factors outside of Interstate Rankers&apos; control, including but not limited to changes to third-party algorithms (e.g., Google, Bing, Meta), market competition, and client-provided content and access. Interstate Rankers does not guarantee any specific ranking, amount of traffic, number of leads, or other results from its SEO, GBP, PPC, content marketing, web development, or other digital marketing services.
                            </p>
                            <p className="text-muted-foreground mb-4">
                                Interstate Rankers will not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages. To the fullest extent permitted by law, Interstate Rankers&apos; total aggregate liability arising out of or relating to these Terms or the services provided shall not exceed the total fees paid by the client to Interstate Rankers in the three (3) months preceding the event giving rise to the claim.
                            </p>
                            <p className="text-muted-foreground mb-4">
                                Except as expressly stated in these Terms or in your individual service agreement or proposal, our services are provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind, whether express or implied.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Indemnification</h2>
                            <p className="text-muted-foreground">
                                You agree to indemnify, defend, and hold harmless Interstate Rankers, its officers, employees, and agents from and against any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising out of or related to: (a) the accuracy of the business information, content, or approvals you provide to us; (b) your use of our services in violation of these Terms or applicable law; or (c) content published on your behalf, including on the landing pages described in Section 3.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Governing Law</h2>
                            <p className="text-muted-foreground">
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions. You agree that any dispute arising out of or relating to these Terms or our services shall be brought exclusively in the state or federal courts located in Harris County, Texas, and you consent to the personal jurisdiction of such courts.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">9. Severability</h2>
                            <p className="text-muted-foreground">
                                If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">10. Entire Agreement</h2>
                            <p className="text-muted-foreground">
                                These Terms, together with any applicable service agreement or proposal, constitute the entire agreement between you and Interstate Rankers regarding your use of our services and supersede any prior agreements or understandings, whether written or oral.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">11. Force Majeure</h2>
                            <p className="text-muted-foreground">
                                Interstate Rankers will not be liable for any delay or failure to perform resulting from causes outside of our reasonable control, including but not limited to acts of God, natural disasters, internet or utility outages, or changes to third-party platform policies or algorithms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">12. Changes to Terms</h2>
                            <p className="text-muted-foreground">
                                We reserve the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting to this page.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">13. Contact Us</h2>
                            <div className="mt-4">
                                <p className="font-semibold text-foreground">Interstate Rankers</p>
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
                        description: "Terms and Conditions for using Interstate Rankers services.",
                        url: "https://interstaterankers.com/terms-and-conditions",
                        publisher: {
                            "@type": "Organization",
                            name: "Interstate Rankers",
                            logo: "https://interstaterankers.com/InterStateRankerLogo.png"
                        }
                    })
                }} />

            <Footer />
        </div>
    );
}
