import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import Providers from "./providers";
import Preloader from "@/components/layout/Preloader";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
	metadataBase: new URL("https://interstaterankers.com"),
	title: {
		default: "InterStateRankers",
		template: "%s | InterStateRankers",
	},
	description: "AI-driven answering services and SEO solutions for US businesses.",
	keywords: ["answering services", "SEO", "US", "digital marketing", "web development"],
	applicationName: "InterStateRankers",
	openGraph: {
		title: "InterStateRankers",
		description: "AI-driven answering services and SEO solutions for US businesses.",
		url: "https://interstaterankers.com/",
		siteName: "InterStateRankers",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/favicon.ico",
				width: 1200,
				height: 630,
				alt: "InterStateRankers"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "InterStateRankers",
		description: "AI-driven answering services and SEO solutions for US businesses.",
		images: ["/favicon.ico"]
	},
	alternates: {
		canonical: "/"
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		}
	},
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en-US">
			<body>
				<Preloader />
				<div className="site-root">
					<Providers>
						<SpeedInsights />
						{children}
					</Providers>
				</div>
				<Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive"
					dangerouslySetInnerHTML={{ __html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Organization",
						"@id": "https://interstaterankers.com/#organization",
						name: "InterStateRankers",
						url: "https://interstaterankers.com/",
						logo: "/InterStateRankerLogo.png",
						areaServed: { "@type": "Country", name: "United States" },
						contactPoint: {
							"@type": "ContactPoint",
							contactType: "customer support",
							telephone: "+1-225-326-1269",
							email: "info@interstaterankers.com",
							areaServed: "US",
							availableLanguage: "English"
						}
					}) }} />
				<Script id="website-jsonld" type="application/ld+json" strategy="afterInteractive"
					dangerouslySetInnerHTML={{ __html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebSite",
						"@id": "https://interstaterankers.com/#website",
						url: "https://interstaterankers.com/",
						name: "InterStateRankers",
						inLanguage: "en-US",
						publisher: {
							"@id": "https://interstaterankers.com/#organization"
						}
					}) }} />
			</body>
		</html>
	);
}


