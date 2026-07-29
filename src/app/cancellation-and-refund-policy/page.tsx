
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "Cancellation and Refund Policy | InterStateRankers",
    description: "Read our cancellation and refund policy.",
};

export default function CancellationRefundPolicy() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8 text-foreground">Cancellation And Refund Policy</h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p>
                            Due to the nature of our work, refunds are not available.
                        </p>

                        <ul className="list-disc pl-6 space-y-4">
                            <li>
                                For standard, ongoing services (e.g., SEO, GBP Optimization, PPC, web development, content marketing, social media marketing, and answering services), clients have the right to discontinue at any time by providing at least 15 days&apos; written notice via email or text message. If less than 15 days&apos; notice is given, the client will be charged a cancellation fee equal to one month of service in lieu of notice. If the contract is terminated within an ongoing month, no partial refunds will be issued for that month, though future billing will stop once the notice period (or fee) has been satisfied.
                            </li>
                            <li>
                                Refunds will not be granted if the client disregards InterStateRankers’ recommendations and approvals regarding SEO strategies (White Hat only), including research techniques, content modifications, keyword enhancement, website evaluation, connectivity, and structure.
                            </li>
                            <li>
                                No reimbursement will be given if the client hires another SEO agency during our contract period or independently implements SEO changes on their website or Google listings.
                            </li>
                            <li>
                                If the client does not provide the necessary website access for SEO implementation or if the website is inactive or malfunctioning, no refunds will be processed.
                            </li>
                            <li>
                                Once mock-up designs are approved and the project enters the testing phase, refunds will not be issued.
                            </li>
                            <li>
                                Special, event-based placements coordinated by our sales team are a separate category from the standard ongoing services above. These are exclusive, time-sensitive bookings, and cancellations are not accepted once booked; withdrawal requires a minimum of 30 days&apos; notice.
                            </li>
                            <li>
                                Refunds will not be provided for projects that have been inactive or on hold for more than 30 days.
                            </li>
                            <li>
                                Customer understands and agrees that in the event the customer initiates a chargeback and/or merchant dispute with their issuing bank for the service they have received and in fact owe payment for, and the customer is successful in recovering the disputed funds that would otherwise be owed to the business, we will make every effort to provide documentation to the issuing bank that the customer did receive, any and all services, including this policy.
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
