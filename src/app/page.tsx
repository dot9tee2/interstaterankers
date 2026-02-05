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

// Revalidate the home page periodically to show new featured projects/insights
export const revalidate = 60;

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import KeyDifferentiators from "@/components/sections/KeyDifferentiators";
import ProblemSolution from "@/components/sections/ProblemSolution";
import ValueProps from "@/components/sections/ValueProps";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import StatsResults from "@/components/sections/StatsResultsWrapper";
import PricingPreview from "@/components/sections/PricingPreview";
import CRMPreview from "@/components/sections/CRMPreview";
import Testimonials from "@/components/sections/TestimonialsWrapper";
import InsightsPreview from "@/components/sections/InsightsPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
// import PrankOverlay from "@/components/PrankOverlay";
import HomeScrollNarrative from "@/components/sections/HomeScrollNarrativeWrapper";

export default function HomePage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main>
				<Hero />
				<KeyDifferentiators />
				<ProblemSolution />
				<CRMPreview />
				<HomeScrollNarrative />
				<ValueProps />
				<FeaturedProjects />
				<StatsResults />
				<Testimonials />
				<PricingPreview />
				<InsightsPreview />
				<FinalCTA />
			</main>
			<Footer />
			{/* <PrankOverlay /> */}
		</div>
	);
}



