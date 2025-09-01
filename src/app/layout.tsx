import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import Providers from "./providers";
import Preloader from "@/components/layout/Preloader";

export const metadata: Metadata = {
	title: "InterStateRankers",
	description: "AI-driven answering services and SEO solutions",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Preloader />
				<div className="site-root">
					<Providers>
						{children}
					</Providers>
				</div>
			</body>
		</html>
	);
}


