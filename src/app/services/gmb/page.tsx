import type { Metadata } from "next";
import CoreServicePage from "@/components/sections/CoreServicePage";
import { gbpPage as content } from "@/data/core-gbp-answering";

export const metadata: Metadata = {
  title: content.name,
  description: content.description,
  alternates: { canonical: "/services/gmb" },
  openGraph: {
    title: content.name + " | Interstate Rankers",
    description: content.description,
    url: "/services/gmb",
    type: "website",
  },
};

export default function Page() {
  return <CoreServicePage content={content} />;
}
