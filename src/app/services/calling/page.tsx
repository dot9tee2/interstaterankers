import type { Metadata } from "next";
import ServicePage, { type ServiceData } from "@/components/sections/ServicePage";

// Service Data
const service: ServiceData = {
    title: "Outbound Calling Services",
    description: "Proactive customer outreach that drives results. Our US-based calling team handles lead qualification, appointment setting, and market research.",
    longDescription: undefined,
    keywords: ["outbound calling", "telemarketing services", "appointment setting", "lead qualification", "cold calling"],
    features: ["Lead Qualification", "Appointment Setting", "Market Research", "Customer Surveys", "Database Reactivation"],
    process: undefined,
    benefits: undefined,
    faqs: undefined
};

export const metadata: Metadata = {
    title: service.title,
    description: service.description,
    openGraph: {
        title: `${service.title} | Interstate Rankers`,
        description: service.description,
        url: `/services/calling`,
        type: "website",
    },
    alternates: {
        canonical: `/services/calling`
    }
};

export default function CallingPage() {
    return <ServicePage slug="calling" service={service} />;
}
