import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 pb-20 pt-32 text-center md:px-6">
				<p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">404</p>
				<h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Page not found</h1>
				<p className="mt-6 max-w-md text-lg text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
				<Button asChild className="mt-8 h-12 rounded-xl px-6 text-base font-semibold">
					<Link href="/">
						Return to home
						<ArrowRight className="h-4 w-4" />
					</Link>
				</Button>
			</main>
			<Footer />
		</div>
	);
}
