"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const measurementId = process.env.NEXT_PUBLIC_GA4_ID;

export default function GA4Tracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!measurementId) return;
		const query = searchParams?.toString();
		const pagePath = query ? `${pathname}?${query}` : pathname;
		// @ts-ignore - gtag is injected by GA script in layout
		window.gtag?.("event", "page_view", {
			page_title: document.title,
			page_location: window.location.href,
			page_path: pagePath,
			send_to: measurementId,
		});
	}, [pathname, searchParams]);

	return null;
}



