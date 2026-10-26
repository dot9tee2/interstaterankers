import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Answering & Local SEO for US Businesses",
	description: "Interstate Rankers delivers Human-led answering with AI backup and SEO solutions across the United States.",
	openGraph: {
		title: "Answering & Local SEO for US Businesses",
		description: "Interstate Rankers delivers Human-led answering with AI backup and SEO solutions across the United States.",
		url: "/",
		locale: "en_US",
		images: [
			{ url: "/favicon.ico", width: 1200, height: 630, alt: "Interstate Rankers" }
		]
	},
	alternates: { canonical: "/" },
	robots: { index: true, follow: true }
};

// Revalidate the home page periodically to show new insights
export const revalidate = 60;

import Navbar from "@/components/layout/Navbar";
import MobileCTABar from "@/components/layout/MobileCTABar";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import HomeScrollNarrative from "@/components/sections/HomeScrollNarrativeWrapper";
import HQShowcase from "@/components/sections/HQShowcase";
import WebsiteShowcase from "@/components/sections/WebsiteShowcase";
import Results from "@/components/sections/Results";
import PricingPreview from "@/components/sections/PricingPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import InsightsPreview from "@/components/sections/InsightsPreview";
import Footer from "@/components/layout/Footer";
// import PrankOverlay from "@/components/PrankOverlay";

export default function HomePage() {
	return (
		// pb-20 below md keeps MobileCTABar from covering the end of the footer
		<div className="min-h-screen pb-20 md:pb-0">
			<Navbar />
			{/* divide-y draws one hairline between every section, so sections don't set their own top/bottom borders.
			    Shared section rhythm: py-20 sm:py-24, container px-4 md:px-6, header block mb-12 md:mb-16.
			    The order follows the questions a buyer asks before getting in touch: what is this and is it for me (hero), do they get my problem,
			    what do they do, how does it work, what do I get, can they deliver (work, results), what does it cost, what now (final CTA).
			    Insights comes after the close, for visitors who aren't ready yet. Surfaces rise toward the decision: supporting sections sit on
			    background, the proof and pricing sections are raised card bands, and the final CTA is the page's only violet band. */}
			<main className="divide-y divide-border">
				<Hero />
				<ServicesShowcase />
				<ProblemSolution />
				<HomeScrollNarrative />
				<HQShowcase />
				<WebsiteShowcase />
				<Results />
				<PricingPreview />
				<FinalCTA />
				<InsightsPreview />
			</main>
			<Footer />
			<MobileCTABar />
			{/* <PrankOverlay /> */}
		</div>
	);
}
