import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";

export const metadata: Metadata = {
  title: "EV Charging Cost Estimator",
  description:
    "Calculate EV charging costs at home and on the go. Compare Level 1, Level 2, and DC fast charging expenses against gas costs to find your annual savings.",
  keywords: [
    "EV charging cost",
    "electric car charging cost",
    "home EV charging calculator",
    "EV charging vs gas cost",
    "electric vehicle charging savings",
  ],
  openGraph: {
    title: "EV Charging Cost Estimator | GoGreenCalc",
    description:
      "Calculate EV charging costs at home and on the go. Compare charging vs gas costs and find annual savings.",
    url: "/calculators/ev-charging-cost",
  },
  alternates: {
    canonical: "/calculators/ev-charging-cost",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "EV Charging Cost Estimator", href: "/calculators/ev-charging-cost" },
        ]}
      />
      <SoftwareApplicationSchema
        name="EV Charging Cost Estimator"
        description="Calculate EV charging costs at home and on the go. Compare charging vs gas costs and find annual savings."
        url="/calculators/ev-charging-cost"
      />
      {children}
    </>
  );
}
