import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";
import { RelatedArticles } from "@/components/blog/related-articles";
import { getPostsByCalculator } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Heat Pump Savings",
  description:
    "Compare heat pump vs furnace heating costs. Calculate installation costs, annual operating expenses, available rebates, and long-term savings by climate zone.",
  keywords: [
    "heat pump vs furnace cost",
    "heat pump savings calculator",
    "heat pump ROI",
    "heat pump vs gas furnace",
    "heat pump cost comparison",
  ],
  openGraph: {
    title: "Heat Pump Savings Calculator | GoGreenCalc",
    description:
      "Compare heat pump and furnace heating costs including installation, operating costs, and incentives.",
    url: "/calculators/heat-pump",
  },
  alternates: {
    canonical: "/calculators/heat-pump",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const articles = getPostsByCalculator("heat-pump");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Heat Pump Savings", href: "/calculators/heat-pump" },
        ]}
      />
      <SoftwareApplicationSchema
        name="Heat Pump Savings Calculator"
        description="Compare heat pump and furnace heating costs including installation, operating costs, and incentives."
        url="/calculators/heat-pump"
      />
      {children}
      {articles.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 pb-12">
          <RelatedArticles articles={articles} heading="Learn More About Heat Pumps" />
        </div>
      )}
    </>
  );
}
