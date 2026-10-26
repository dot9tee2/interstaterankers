import type { Metadata } from "next";
import CoreServicePage from "@/components/sections/CoreServicePage";
import { seoPage as content } from "@/data/core-seo-ads";

export const metadata: Metadata = {
  title: content.name,
  description: content.description,
  alternates: { canonical: "/services/seo" },
  openGraph: {
    title: content.name + " | Interstate Rankers",
    description: content.description,
    url: "/services/seo",
    type: "website",
  },
};

export default function Page() {
  return <CoreServicePage content={content} />;
}
