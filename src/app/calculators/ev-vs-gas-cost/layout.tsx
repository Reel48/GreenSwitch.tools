import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";
import { RelatedArticles } from "@/components/blog/related-articles";
import { getPostsByCalculator } from "@/lib/blog";

export const metadata: Metadata = {
  title: "EV vs Gas Cost Comparison",
  description:
    "Compare the total cost of owning an electric vehicle vs a gas car. Factor in fuel, maintenance, insurance, depreciation, and federal tax credits over 5–10 years.",
  keywords: [
    "EV vs gas cost",
    "electric car vs gas car cost",
    "EV total cost of ownership",
    "electric vehicle savings",
    "EV cost comparison calculator",
  ],
  openGraph: {
    title: "EV vs Gas Cost Comparison Calculator | GoGreenCalc",
    description:
      "Compare total cost of owning an electric vehicle vs gas car including fuel, maintenance, and tax credits.",
    url: "/calculators/ev-vs-gas-cost",
  },
  alternates: {
    canonical: "/calculators/ev-vs-gas-cost",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const articles = getPostsByCalculator("ev-vs-gas-cost");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "EV vs Gas Cost Comparison", href: "/calculators/ev-vs-gas-cost" },
        ]}
      />
      <SoftwareApplicationSchema
        name="EV vs Gas Cost Comparison Calculator"
        description="Compare the total cost of owning an electric vehicle vs a gas car including fuel, maintenance, and tax credits."
        url="/calculators/ev-vs-gas-cost"
      />
      {children}
      {articles.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 pb-12">
          <RelatedArticles articles={articles} heading="Learn More About EV Costs" />
        </div>
      )}
    </>
  );
}
