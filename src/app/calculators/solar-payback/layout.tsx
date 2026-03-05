import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";

export const metadata: Metadata = {
  title: "Solar Panel Payback Period",
  description:
    "Calculate your solar panel ROI and payback period. See 25-year savings projections based on system size, electricity rates, incentives, and net metering.",
  keywords: [
    "solar payback period",
    "solar panel ROI",
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
    </>
  );
}
