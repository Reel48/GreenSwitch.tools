import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";
import { RelatedArticles } from "@/components/blog/related-articles";
import { getPostsByCalculator } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Home Battery Storage ROI",
  description:
    "Evaluate home battery storage ROI with time-of-use rate arbitrage, solar pairing, backup power value, and federal tax credits. See your payback period and 15-year savings.",
  keywords: [
    "home battery storage ROI",
    "battery storage calculator",
    "home battery payback period",
    "solar battery storage savings",
    "Tesla Powerwall ROI",
  ],
  openGraph: {
    title: "Home Battery Storage ROI Calculator | GoGreenCalc",
    description:
      "Evaluate home battery ROI with TOU rate arbitrage, solar pairing, and federal incentives.",
    url: "/calculators/battery-storage",
  },
  alternates: {
    canonical: "/calculators/battery-storage",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const articles = getPostsByCalculator("battery-storage");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Home Battery Storage ROI", href: "/calculators/battery-storage" },
        ]}
      />
      <SoftwareApplicationSchema
        name="Home Battery Storage ROI Calculator"
        description="Evaluate home battery ROI with TOU rate arbitrage, solar pairing, and federal incentives."
        url="/calculators/battery-storage"
      />
      {children}
      {articles.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 pb-12">
          <RelatedArticles articles={articles} heading="Learn More About Battery Storage" />
        </div>
      )}
    </>
  );
}
