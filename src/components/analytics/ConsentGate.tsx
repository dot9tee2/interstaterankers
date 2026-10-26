"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { COOKIE_CONSENT_EVENT, getCookieConsent } from "@/components/ui/cookie-consent";

export function AnalyticsScripts({ measurementId }: { measurementId?: string }) {
	const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);

	useEffect(() => {
		setConsent(getCookieConsent());
		const handler = () => setConsent(getCookieConsent());
		window.addEventListener(COOKIE_CONSENT_EVENT, handler);
		return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handler);
	}, []);

	if (!measurementId || consent !== "accepted") return null;

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
				strategy="afterInteractive"
			/>
			<Script id="ga4-init" strategy="afterInteractive">
				{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){window.dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${measurementId}', { send_page_view: false });
			`}
			</Script>
		</>
	);
}
