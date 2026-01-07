
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
                                Clients have the right to discontinue services at any time; however, if the contract is terminated within an ongoing month, no refunds will be issued. A written notice via email or text message is required for cancellation 15 days prior to the cancellation of service, or pay a cancellation fee equal to one month of service. While future billing will stop, partial refunds will not be provided.
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
                                Cancellations for special event-based services coordinated by our sales team are not accepted. These are exclusive, time-sensitive deals requiring a minimum of 30 days’ notice for withdrawal.
                            </li>
                            <li>
                                Although SEO and other digital marketing services are non-refundable, clients may request cancellation with at least 15 days written notice.
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
