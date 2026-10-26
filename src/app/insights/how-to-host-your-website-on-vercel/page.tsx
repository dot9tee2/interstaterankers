import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/page-hero";
import { LaunchVisual, VisualHandover } from "@/components/guides/VisualHandover";
import styles from "@/components/guides/VisualHandover.module.css";
import { handoverStory } from "@/data/website-handbook";

const title = "Got your website files? Here’s how to launch on Vercel";
const description = "A visual guide for business owners: understand your Next.js website files, publish on Vercel, connect your domain, and test contact-form emails.";
export const metadata: Metadata = {
  title, description,
  authors: [{ name: handoverStory.author }],
  alternates: { canonical: "/insights/how-to-host-your-website-on-vercel" },
  openGraph: { title, description, type: "article", url: "/insights/how-to-host-your-website-on-vercel", publishedTime: "2026-10-26T00:00:00+05:00" },
};

export default function WebsiteHandoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero
          breadcrumbs={[{ label: "Insights", href: "/insights" }, { label: "Website handover guide" }]}
          eyebrow="Client tutorials · Website ownership"
          className={styles.heroOverride}
          aside={<LaunchVisual />}
          title={<>Your website files.<br />Your live website.</>}
          description="A visual, plain-English walkthrough for understanding your delivery, publishing it on Vercel, and making sure enquiries reach your inbox."
        >
          <p className="text-sm text-muted-foreground">By {handoverStory.author} · Interstate Rankers · <time dateTime="2026-10-26">October 26, 2026</time></p>
        </PageHero>
        <article aria-label={title}><VisualHandover /></article>
        <div className="container mx-auto px-4 pb-16 md:px-6">
          <Link href="/insights" className="text-accent-cyan hover:underline">← Back to Insights</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
