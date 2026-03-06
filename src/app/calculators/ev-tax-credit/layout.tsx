import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";
import { RelatedArticles } from "@/components/blog/related-articles";
import { getPostsByCalculator } from "@/lib/blog";

export const metadata: Metadata = {
  title: "EV Tax Credit Eligibility",
  description:
    "Check your eligibility for federal EV tax credits worth up to $7,500 for new or $4,000 for used electric vehicles. See income limits, MSRP caps, and qualifying models.",
  keywords: [
    "EV tax credit",
    "federal EV tax credit 2026",
    "EV tax credit eligibility",
    "electric vehicle tax credit calculator",
    "7500 EV tax credit",
  ],
  openGraph: {
    title: "EV Tax Credit Eligibility Calculator | GoGreenCalc",
    description:
      "Check eligibility for federal EV tax credits up to $7,500 new or $4,000 used with income and MSRP limits.",
    url: "/calculators/ev-tax-credit",
  },
  alternates: {
    canonical: "/calculators/ev-tax-credit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const articles = getPostsByCalculator("ev-tax-credit");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "EV Tax Credit Eligibility", href: "/calculators/ev-tax-credit" },
        ]}
      />
      <SoftwareApplicationSchema
        name="EV Tax Credit Eligibility Calculator"
        description="Check eligibility for federal EV tax credits up to $7,500 new or $4,000 used with income and MSRP limits."
        url="/calculators/ev-tax-credit"
      />
      {children}
      {articles.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 pb-12">
          <RelatedArticles articles={articles} heading="Learn More About EV Tax Credits" />
        </div>
      )}
    </>
  );
}
