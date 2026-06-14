import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";
import { RelatedArticles } from "@/components/blog/related-articles";
import { getPostsByCalculator } from "@/lib/blog";

export const metadata: Metadata = {
  title: "EV Tax Credit Eligibility",
  description:
    "The federal EV tax credits ended September 30, 2025. Check whether a grandfathered purchase still qualifies for up to $7,500 (new) or $4,000 (used), and see which state EV incentives remain available.",
  keywords: [
    "EV tax credit",
    "is the EV tax credit still available",
    "EV tax credit expired 2025",
    "EV tax credit eligibility",
    "state EV incentives 2026",
  ],
  openGraph: {
    title: "EV Tax Credit Eligibility Calculator | GoGreenCalc",
    description:
      "Federal EV credits ended Sept 30, 2025 — check grandfathered eligibility and current state EV incentives.",
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
        description="Federal EV credits ended Sept 30, 2025 — check grandfathered eligibility and current state EV incentives."
        url="/calculators/ev-tax-credit"
      />
      {children}
      {articles.length > 0 && (
        <div className="px-4 pb-12">
          <RelatedArticles articles={articles} heading="Learn More About EV Tax Credits" />
        </div>
      )}
    </>
  );
}
