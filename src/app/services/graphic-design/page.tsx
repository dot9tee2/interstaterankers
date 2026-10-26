import type { Metadata } from "next";
import ServicePage, { type ServiceData } from "@/components/sections/ServicePage";

// Service Data
const service: ServiceData = {
    title: "Graphic Design",
    description: "Visuals that speak louder than words. From logos to marketing materials, our designers create stunning graphics that elevate your brand identity.",
    longDescription: undefined,
    keywords: ["graphic design services", "logo design", "branding methodology", "marketing materials", "visual identity"],
    features: ["Logo Design", "Brand Identity", "Marketing Collateral", "Social Media Graphics", "Infographics"],
    process: undefined,
    benefits: undefined,
    faqs: undefined
};

export const metadata: Metadata = {
    title: service.title,
    description: service.description,
    openGraph: {
        title: `${service.title} | InterStateRankers`,
        description: service.description,
        url: `/services/graphic-design`,
        type: "website",
    },
    alternates: {
        canonical: `/services/graphic-design`
    }
};

export default function GraphicDesignPage() {
    return <ServicePage slug="graphic-design" service={service} />;
}
