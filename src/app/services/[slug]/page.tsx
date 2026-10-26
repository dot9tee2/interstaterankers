import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage, { type ServiceData } from "@/components/sections/ServicePage";

const services: Record<string, ServiceData> = {
    "seo": {
        title: "Search Engine Optimization (SEO)",
        description: "Dominate search results with our data-driven SEO strategies tailored for US businesses. We focus on technical SEO, content optimization, and high-quality backlinks to drive organic traffic.",
        keywords: ["SEO services US", "technical SEO", "link building", "organic traffic", "keyword research"],
        features: ["Technical Audit & Fixes", "Keyword Strategy", "On-Page Optimization", "Link Building", "Local SEO"]
    },
    "web-development": {
        title: "Custom Web Development",
        description: "Build a digital presence that converts. Our US-based developers craft responsive, fast, and accessible websites using modern frameworks like Next.js and React.",
        keywords: ["web development agency", "custom websites", "Next.js developers", "responsive web design", "US web dev"],
        features: ["Custom Design", "Mobile-First Development", "Speed Optimization", "CMS Integration", "Accessibility Compliance"]
    },
    "social-media": {
        title: "Social Media Marketing",
        description: "Engage your audience where they spend their time. We create authentic content and manage communities across major platforms to build brand loyalty and drive leads.",
        keywords: ["social media marketing", "community management", "content creation", "brand awareness", "social strategy"],
        features: ["Content Strategy", "Community Management", "Paid Social Ads", "Influencer Marketing", "Analytics & Reporting"]
    },
    "ppc": {
        title: "Pay-Per-Click Advertising (PPC)",
        description: "Get immediate results with targeted ad campaigns. We manage Google Ads and social media advertising to maximize your ROI and capture high-intent leads.",
        longDescription: "In the competitive digital landscape, waiting for organic growth isn't always an option. Our Pay-Per-Click (PPC) advertising services are designed to deliver instant visibility and high-quality traffic to your website. We don't just set up campaigns; we engineer profit-generating systems. \n\n Our team of certified Google Ads and social media advertising experts meticulously crafts every aspect of your campaign—from keyword selection and ad copy to landing page optimization and bid management. We focus on 'High-Intent' keywords that signal a readiness to buy, ensuring that your budget is spent on clicks that are likely to convert into paying customers. Whether you need to dominate local search results, retarget past visitors, or scale your e-commerce sales, our data-driven PPC strategies provide the measurable ROI you need to grow.",
        keywords: ["PPC management", "Google Ads", "paid search", "ad campaign optimization", "ROI focused advertising", "remarketing services", "display advertising"],
        features: ["Campaign Setup", "Keyword Bidding", "Ad Copywriting", "Landing Page Optimization", "Conversion Tracking"],
        process: [
            {
                title: "Discovery & Strategy",
                description: "We start by understanding your business goals, target audience, and competitive landscape to build a custom PPC strategy."
            },
            {
                title: "Account Setup & Structuring",
                description: "We build or restructure your ad accounts with granular ad groups, ensuring high relevance and Quality Scores."
            },
            {
                title: "Ad Creation & Launch",
                description: "Our copywriters and designers create compelling ads that demand attention and drive clicks."
            },
            {
                title: "Optimization & Management",
                description: "We monitor campaigns daily, adjusting bids, negative keywords, and targeting to lower CPC and increase ROAS."
            },
            {
                title: "Reporting & Scaling",
                description: "Receive transparent monthly reports. We identify winning strategies and scale your budget for maximum growth."
            }
        ],
        benefits: [
            {
                title: "Immediate Traffic",
                description: "Skip the wait. Your ads can appear at the top of search results within hours of launch."
            },
            {
                title: "Precisely Targeted",
                description: "Reach your ideal customer by location, demographics, interests, and even time of day."
            },
            {
                title: "Measurable ROI",
                description: "Track every dollar. Know exactly how many leads and sales your campaigns are generating."
            },
            {
                title: "Budget Control",
                description: "You set the limits. We ensure your budget is allocated efficiently to maximize results."
            }
        ],
        faqs: [
            {
                question: "What is the difference between SEO and PPC?",
                answer: "SEO (Search Engine Optimization) focuses on earning organic traffic over time by optimizing your site to rank higher. PPC (Pay-Per-Click) allows you to buy visits to your site immediately. Both are valuable, but PPC offers faster results while SEO provides long-term sustainable growth."
            },
            {
                question: "How much should I spend on Google Ads?",
                answer: "Your budget depends on your industry, competition, and goals. We recommend starting with a budget you're comfortable with to test and gather data. As we optimize and prove ROI, you can scale up. We can provide a recommended starting budget based on our initial keyword research."
            },
            {
                question: "Do you charge a setup fee?",
                answer: "Yes, we typically have a one-time setup fee to cover the initial research, account structuring, and campaign creation. This ensures your campaigns are built on a solid foundation for success."
            },
            {
                question: "How do you track conversions?",
                answer: "We implement robust conversion tracking using Google Tag Manager and Google Analytics. We track form submissions, phone calls, and e-commerce transactions so you can see exactly which ads are driving revenue."
            }
        ]
    },
    "content-marketing": {
        title: "Content Marketing",
        description: "Tell your story with compelling content. From blog posts to whitepapers, we produce high-quality assets that establish authority and nurture prospects.",
        keywords: ["content marketing services", "blog writing", "copywriting", "brand storytelling", "content strategy"],
        features: ["Blog Production", "Copywriting", "Email Newsletters", "Video Scripts", "Distribution Strategy"]
    },
    "answering": {
        title: "24/7 Answering Services",
        description: "Never miss a lead again. Our AI-driven and human-supported answering services ensure every caller gets a professional response, day or night.",
        keywords: ["answering service", "24/7 call support", "virtual receptionist", "lead capture", "after-hours answering"],
        features: ["24/7 Availability", "appointment Scheduling", "Emergency Dispatch", "Bilingual Support", "Call Recording"]
    },
    "calling": {
        title: "Outbound Calling Services",
        description: "Proactive growth through targeted outreach. We handle lead qualification, appointment setting, and follow-ups so your sales team focuses on closing.",
        keywords: ["outbound calling", "telemarketing", "appointment setting", "lead qualification", "cold calling services"],
        features: ["Lead Qualification", "Appointment Setting", "Customer Surveys", "Event Reminders", "Database Cleanup"]
    },
    "graphic-design": {
        title: "Graphic Designing",
        description: "Visuals that captivate and convert. From logos to marketing materials, our designers create cohesive brand identities that stand out in a crowded market.",
        keywords: ["graphic design services", "logo design", "brand identity", "marketing materials", "creative design"],
        features: ["Logo Design", "Brand Identity", "Marketing Collateral", "Social Media Graphics", "Infographics"]
    },
    "app-development": {
        title: "Mobile App Development",
        description: "Turn your idea into a powerful mobile experience. We build native iOS and Android apps that are intuitive, fast, and built to scale with your business.",
        keywords: ["app development", "iOS development", "Android development", "mobile apps", "custom software"],
        features: ["iOS & Android", "UI/UX Design", "Cross-Platform", "App Store Optimization", "Maintenance & Support"]
    },
    "gmb": {
        title: "Google Business Profile Optimization",
        description: "Dominate the 'Map Pack' and get found locally. We optimize your Google Business Profile to drive calls, clicks, and visits from high-intent local searchers.",
        keywords: ["google my business", "local seo", "map pack ranking", "gbp optimization", "local search"],
        features: ["Profile Setup", "Review Management", "Post Updates", "Q&A Management", "Spam Fighting"]
    }
};

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return Object.keys(services).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = services[slug];

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: service.title,
        description: service.description,
        openGraph: {
            title: `${service.title} | InterStateRankers`,
            description: service.description,
            url: `/services/${slug}`,
            type: "website",
        },
        alternates: {
            canonical: `/services/${slug}`
        }
    };
}

export default async function ServiceSlugPage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = services[slug];

    if (!service) {
        notFound();
    }

    return <ServicePage slug={slug} service={service} />;
}
