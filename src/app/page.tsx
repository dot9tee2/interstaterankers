import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "AI Answering & SEO for US Businesses",
	description: "InterStateRankers delivers AI-driven answering services and SEO solutions across the United States.",
	openGraph: {
		title: "AI Answering & SEO for US Businesses",
		description: "InterStateRankers delivers AI-driven answering services and SEO solutions across the United States.",
		url: "/",
		locale: "en_US",
		images: [
			{ url: "/favicon.ico", width: 1200, height: 630, alt: "InterStateRankers" }
		]
	},
	alternates: { canonical: "/" },
	robots: { index: true, follow: true }
};
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import KeyDifferentiators from "@/components/sections/KeyDifferentiators";
import ValueProps from "@/components/sections/ValueProps";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import StatsResults from "@/components/sections/StatsResults";
// import PricingPreview from "@/components/sections/PricingPreview";
import Testimonials from "@/components/sections/Testimonials";
import InsightsPreview from "@/components/sections/InsightsPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const HomeScrollNarrative = dynamic(() => import("@/components/sections/HomeScrollNarrative"), { ssr: false });

export default function HomePage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main>
				<Hero />
				<KeyDifferentiators />
				<HomeScrollNarrative />
				<ValueProps />
				<FeaturedProjects />
				<StatsResults />
				{/* <PricingPreview /> */}
				<Testimonials />
				<InsightsPreview />
				<FinalCTA />
			</main>
			<Footer />
		</div>
	);
}



