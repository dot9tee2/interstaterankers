import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Privacy Policy | InterStateRankers",
    description: "Privacy Policy for InterStateRankers. Learn how we collect, use, and protect your personal information.",
    openGraph: {
        title: "Privacy Policy | InterStateRankers",
        description: "Learn how InterStateRankers collects, uses, and protects your personal information.",
        url: "/privacy-policy",
        type: "website",
    },
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
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
                                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <article className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h1 className="text-4xl md:text-5xl font-body font-bold mb-8 gradient-text">Privacy Policy</h1>

                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                        <p className="text-sm text-muted-foreground mb-6">Last Updated: {currentDate}</p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
                            <p className="text-muted-foreground mb-4">
                                Welcome to InterStateRankers! We are a digital marketing agency committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, https://interstaterankers.com, and use our services.
                            </p>
                            <p className="text-muted-foreground">
                                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">2. What Information We Collect</h2>
                            <p className="text-muted-foreground mb-4">
                                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                            </p>

                            <h3 className="text-xl font-semibold mb-2 text-foreground">Personally Identifiable Information (PII)</h3>
                            <p className="text-muted-foreground mb-2">
                                This is information that can be used to identify you personally. We may collect the following PII:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground mb-4">
                                <li><strong>Contact Data:</strong> such as your name, email address, and phone number, which you provide when you fill out a contact form, subscribe to our newsletter, or request a quote.</li>
                                <li><strong>Billing Data:</strong> such as your billing name, billing address, and payment information, when you purchase our services. Please note that we use a third-party payment processor, and we do not store or process your credit card information on our servers.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2 text-foreground">Derivative Data</h3>
                            <p className="text-muted-foreground mb-4">
                                This is information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                            </p>

                            <h3 className="text-xl font-semibold mb-2 text-foreground">Cookies and Tracking Technologies</h3>
                            <p className="text-muted-foreground mb-2">
                                We use cookies and other tracking technologies to collect information about your browsing activities on our website. This helps us to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground">
                                <li>Understand and save your preferences for future visits.</li>
                                <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future.</li>
                                <li>Serve targeted advertisements to you on other websites.</li>
                            </ul>
                            <p className="text-muted-foreground mt-2">
                                You can control the use of cookies at the individual browser level. If you reject cookies, you may still use our site, but your ability to use some features or areas of our site may be limited.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Use Your Information</h2>
                            <p className="text-muted-foreground mb-2">
                                We use the information we collect for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground">
                                <li>To provide and improve our services: We use your information to deliver the services you have requested, to personalize your experience, and to improve our website and services.</li>
                                <li>To communicate with you: We may use your contact information to send you newsletters, marketing communications, and other information about our services. You may opt out of these communications at any time.</li>
                                <li>To process payments: We use your billing information to process payments for our services.</li>
                                <li>For marketing and advertising: We may use your information to display targeted advertisements to you on other websites.</li>
                                <li>For analytics and research: We use derivative data and information from cookies to analyze trends, administer the site, track users’ movements around the site, and to gather demographic information about our user base as a whole.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">4. How We Share Your Information</h2>
                            <p className="text-muted-foreground mb-2">
                                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground">
                                <li><strong>With your consent:</strong> We may share your information with third parties with your consent.</li>
                                <li><strong>With our service providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</li>
                                <li><strong>For legal purposes:</strong> We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to comply with a legal obligation, to protect and defend our rights or property, or to protect the personal safety of users of the Site or the public.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Your Data Protection Rights</h2>
                            <p className="text-muted-foreground mb-2">You have the following data protection rights:</p>
                            <ul className="list-disc pl-6 text-muted-foreground mb-4">
                                <li>The right to access: You have the right to request copies of your personal data.</li>
                                <li>The right to rectification: You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete information you believe is incomplete.</li>
                                <li>The right to erasure: You have the right to request that we erase your personal data, under certain conditions.</li>
                                <li>The right to restrict processing: You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                                <li>The right to object to processing: You have the right to object to our processing of your personal data, under certain conditions.</li>
                                <li>The right to data portability: You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                            </ul>
                            <p className="text-muted-foreground">
                                If you would like to exercise any of these rights, please contact us at <a href="mailto:info@interstaterankers.com" className="text-primary hover:underline">info@interstaterankers.com</a>.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Data Security</h2>
                            <p className="text-muted-foreground">
                                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Site is at your own risk.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Third-Party Websites</h2>
                            <p className="text-muted-foreground">
                                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every website that collects personally identifiable information.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Children’s Privacy</h2>
                            <p className="text-muted-foreground">
                                Our services are not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">9. Changes to this Privacy Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new privacy policy on this page.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">10. SMS and Mobile Communication Policy</h2>
                            <p className="text-muted-foreground mb-4">
                                This section outlines our policies regarding mobile information and SMS/text messaging in compliance with 10DLC and other regulations.
                            </p>
                            <div className="bg-muted/30 p-4 rounded-lg border border-border/50 mb-4">
                                <p className="text-muted-foreground font-medium mb-2">No Sharing for Marketing Purposes</p>
                                <p className="text-muted-foreground text-sm">
                                    No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
                                </p>
                            </div>
                            <p className="text-muted-foreground mb-2">
                                If you choose to provide us with your mobile phone number and opt-in to receive communications from us via SMS, you consent to receive text messages from us. These messages may include service updates, appointment reminders, or promotional and marketing materials.
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground">
                                <li><strong>Opt-Out:</strong> You can opt-out of receiving SMS messages from us at any time by replying “STOP” to any message you receive. After you send the “STOP” message, we will send you one final message to confirm that you have been unsubscribed.</li>
                                <li><strong>Help:</strong> If you need assistance, reply “HELP” to any message for more information.</li>
                                <li><strong>Rates:</strong> Message and data rates may apply for any messages sent to you from us and to us from you. Message frequency may vary.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">11. Contact Us</h2>
                            <p className="text-muted-foreground mb-2">
                                If you have any questions about this Privacy Policy, please contact us.
                            </p>
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

            <Script id="privacy-schema" type="application/ld+json" strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Privacy Policy",
                        description: "Privacy Policy regarding data collection and usage at InterStateRankers.",
                        url: "https://interstaterankers.com/privacy-policy",
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
