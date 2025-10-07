"use client";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, Suspense } from "react";
import GA4Tracker from "@/components/analytics/GA4Tracker";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Suspense fallback={null}>
					<GA4Tracker />
				</Suspense>
				{children}
			</TooltipProvider>
		</QueryClientProvider>
	);
}



