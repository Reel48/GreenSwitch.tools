import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";
import { RelatedArticles } from "@/components/blog/related-articles";
import { getPostsByCalculator } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Solar Panel Payback Period Calculator (2026)",
  description:
    "Calculate your solar panel payback period, break-even point, and 25-year ROI for 2026. Free calculator using your electricity rate, sun hours, system cost, net metering, and state incentives.",
  keywords: [
    "solar payback period",
    "solar panel payback calculator",
    "solar panel ROI",
    "how to calculate solar payback",
    "solar break-even",
    "solar savings calculator",
    "is solar worth it",
    "solar panel cost calculator",
  ],
  openGraph: {
    title: "Solar Panel Payback Period Calculator | GoGreenCalc",
    description:
      "Calculate your solar panel ROI and payback period with 25-year savings based on system size and incentives.",
    url: "/calculators/solar-payback",
  },
  alternates: {
    canonical: "/calculators/solar-payback",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const articles = getPostsByCalculator("solar-payback");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Solar Panel Payback Period", href: "/calculators/solar-payback" },
        ]}
      />
      <SoftwareApplicationSchema
        name="Solar Panel Payback Period Calculator"
        description="Calculate your solar panel ROI and payback period with 25-year savings based on system size and incentives."
        url="/calculators/solar-payback"
      />
      {children}
      {articles.length > 0 && (
        <div className="px-4 pb-12">
          <RelatedArticles articles={articles} heading="Learn More About Solar" />
        </div>
      )}
    </>
  );
}
