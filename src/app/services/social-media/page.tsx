import type { Metadata } from "next";
import ServicePage, { type ServiceData } from "@/components/sections/ServicePage";

// Service Data
const service: ServiceData = {
    title: "Social Media Marketing",
    description: "Engage your audience where they spend their time. We create authentic content and manage communities across major platforms to build brand loyalty and drive leads.",
    longDescription: undefined,
    keywords: ["social media marketing", "community management", "content creation", "brand awareness", "social strategy"],
    features: ["Content Strategy", "Community Management", "Paid Social Ads", "Influencer Marketing", "Analytics & Reporting"],
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
        url: `/services/social-media`,
        type: "website",
    },
    alternates: {
        canonical: `/services/social-media`
    }
};

export default function SocialMediaPage() {
    return <ServicePage slug="social-media" service={service} />;
}
