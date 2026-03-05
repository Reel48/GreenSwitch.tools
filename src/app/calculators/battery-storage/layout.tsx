import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SoftwareApplicationSchema } from "@/components/seo/software-application-schema";

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
    </>
  );
}
