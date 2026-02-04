import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import Preloader from "@/components/layout/Preloader";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CookieConsent } from "@/components/ui/cookie-consent";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.SITE_URL || "https://interstaterankers.com"),
	title: {
		default: "InterStateRankers",
		template: "%s | InterStateRankers",
	},
	description: "AI-driven answering services and SEO solutions for US businesses.",
	openGraph: {
		title: "InterStateRankers",
		description: "AI-driven answering services and SEO solutions for US businesses.",
		url: (process.env.SITE_URL || "https://interstaterankers.com") + "/",
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
	other: { "sitemap": "/sitemap.xml" },
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
						<CookieConsent />
					</Providers>
				</div>
				{process.env.NEXT_PUBLIC_GA4_ID ? (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
							strategy="afterInteractive"
						/>
						<Script id="ga4-init" strategy="afterInteractive">
							{`
							window.dataLayer = window.dataLayer || [];
							function gtag(){window.dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', { send_page_view: false });
						`}
						</Script>
					</>
				) : null}
				<Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
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
								telephone: "+1-281-619-5295",
								email: "info@interstaterankers.com",
								areaServed: "US",
								availableLanguage: "English"
							}
						})
					}} />
				<Script id="website-jsonld" type="application/ld+json" strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							"@id": "https://interstaterankers.com/#website",
							url: "https://interstaterankers.com/",
							name: "InterStateRankers",
							inLanguage: "en-US",
							publisher: {
								"@id": "https://interstaterankers.com/#organization"
							}
						})
					}} />
			</body>
		</html>
	);
}


