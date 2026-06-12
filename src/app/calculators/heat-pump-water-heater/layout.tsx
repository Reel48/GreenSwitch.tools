import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";
import { RelatedArticles } from "@/components/blog/related-articles";
import { getPostsByCalculator } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Heat Pump Water Heater Calculator",
  description:
    "Are heat pump water heaters worth it? Compare operating costs against your electric, gas, or propane water heater and see annual savings, payback period, and lifetime cost.",
  keywords: [
    "heat pump water heater calculator",
    "heat pump water heater worth it",
    "heat pump water heater savings",
    "hybrid water heater cost",
    "heat pump water heater vs gas",
  ],
  openGraph: {
    title: "Heat Pump Water Heater Calculator | GoGreenCalc",
    description:
      "Compare heat pump water heater costs against electric, gas, or propane and see your payback period.",
    url: "/calculators/heat-pump-water-heater",
  },
  alternates: {
    canonical: "/calculators/heat-pump-water-heater",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const articles = getPostsByCalculator("heat-pump-water-heater");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          {
            name: "Heat Pump Water Heater Calculator",
            href: "/calculators/heat-pump-water-heater",
          },
        ]}
      />
      <SoftwareApplicationSchema
        name="Heat Pump Water Heater Calculator"
        description="Compare heat pump water heater costs against electric, gas, or propane and see your payback period."
        url="/calculators/heat-pump-water-heater"
      />
      {children}
      {articles.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 pb-12">
          <RelatedArticles
            articles={articles}
            heading="Learn More About Water Heating"
          />
        </div>
      )}
    </>
  );
}
