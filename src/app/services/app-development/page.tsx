import type { Metadata } from "next";
import ServicePage, { type ServiceData } from "@/components/sections/ServicePage";

// Service Data
const service: ServiceData = {
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
    title: service.title,
    description: service.description,
    openGraph: {
        title: `${service.title} | Interstate Rankers`,
        description: service.description,
        url: `/services/app-development`,
        type: "website",
    },
    alternates: {
        canonical: `/services/app-development`
    }
};

export default function AppDevelopmentPage() {
    return <ServicePage slug="app-development" service={service} />;
}
