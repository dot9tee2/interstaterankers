import type { Metadata } from "next";
import ServicePage, { type ServiceData } from "@/components/sections/ServicePage";

// Service Data
const service: ServiceData = {
    title: "Content Marketing",
    description: "Tell your story with compelling content. From blog posts to whitepapers, we produce high-quality assets that establish authority and nurture prospects.",
    longDescription: undefined,
    keywords: ["content marketing services", "blog writing", "copywriting", "brand storytelling", "content strategy"],
    features: ["Blog Production", "Copywriting", "Email Newsletters", "Video Scripts", "Distribution Strategy"],
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
        url: `/services/content-marketing`,
        type: "website",
    },
    alternates: {
        canonical: `/services/content-marketing`
    }
};

export default function ContentMarketingPage() {
    return <ServicePage slug="content-marketing" service={service} />;
}
