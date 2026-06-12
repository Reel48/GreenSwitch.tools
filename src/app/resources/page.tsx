import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Official Resources",
  description:
    "Authoritative sources for clean energy data and incentives: IRS guidance, Congress.gov legislation, EIA energy prices, DSIRE incentive database, and DOE programs.",
  alternates: {
    canonical: "/resources",
  },
};

interface Resource {
  name: string;
  url: string;
  source: string;
  description: string;
}

interface ResourceSection {
  title: string;
  blurb: string;
  resources: Resource[];
}

const sections: ResourceSection[] = [
  {
    title: "IRS Guidance on Tax Credits",
    blurb:
      "The IRS is the final authority on federal tax credit eligibility. These pages reflect the 2025 law changes that ended most federal clean energy credits.",
    resources: [
      {
        name: "Clean Vehicle Tax Credits",
        url: "https://www.irs.gov/clean-vehicle-tax-credits",
        source: "irs.gov",
        description:
          "Official guidance on the new (30D) and used (25E) clean vehicle credits, including the September 30, 2025 acquisition deadline and rules for claiming a grandfathered purchase.",
      },
      {
        name: "Residential Clean Energy Credit",
        url: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit",
        source: "irs.gov",
        description:
          "The 30% credit for solar panels, battery storage, and geothermal that ended December 31, 2025 — including carryforward rules for systems installed before the deadline.",
      },
      {
        name: "Energy Efficient Home Improvement Credit",
        url: "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit",
        source: "irs.gov",
        description:
          "The 25C credit covering heat pumps (up to $2,000) and other efficiency upgrades, which ended for property placed in service after December 31, 2025.",
      },
    ],
  },
  {
    title: "Legislation & Legal Text",
    blurb:
      "Primary sources for the law itself — useful when you want the exact rules rather than a summary.",
    resources: [
      {
        name: "H.R. 1 — One Big Beautiful Bill Act (119th Congress)",
        url: "https://www.congress.gov/bill/119th-congress/house-bill/1",
        source: "congress.gov",
        description:
          "The July 2025 budget reconciliation law that terminated the federal clean vehicle, residential clean energy, and home improvement credits.",
      },
      {
        name: "CRS Report: Expiration of the Residential Clean Energy Credit",
        url: "https://www.congress.gov/crs-product/IN12611",
        source: "congress.gov",
        description:
          "Congressional Research Service analysis of the 25D credit's expiration and carryforward rules — the clearest official explainer of what changed for solar and battery buyers.",
      },
      {
        name: "26 U.S. Code § 25D — Residential Clean Energy Credit",
        url: "https://www.law.cornell.edu/uscode/text/26/25D",
        source: "law.cornell.edu",
        description:
          "The current statutory text from Cornell's Legal Information Institute, reflecting the termination date.",
      },
    ],
  },
  {
    title: "Energy Prices & Vehicle Data",
    blurb:
      "The official datasets behind our calculators' default rates and efficiency figures.",
    resources: [
      {
        name: "EIA Weekly Gasoline & Diesel Prices",
        url: "https://www.eia.gov/petroleum/gasdiesel/",
        source: "eia.gov",
        description:
          "The U.S. Energy Information Administration's weekly retail fuel price survey — the standard source for national and regional gas prices.",
      },
      {
        name: "EIA Electricity Data Browser",
        url: "https://www.eia.gov/electricity/data/browser/",
        source: "eia.gov",
        description:
          "Residential electricity rates by state, updated monthly. This is where our state electricity rate data originates.",
      },
      {
        name: "FuelEconomy.gov",
        url: "https://www.fueleconomy.gov",
        source: "fueleconomy.gov",
        description:
          "EPA/DOE vehicle efficiency ratings for every EV, hybrid, and gas model — including kWh per 100 miles, MPG, and historical tax credit eligibility lists.",
      },
    ],
  },
  {
    title: "Incentive Databases",
    blurb:
      "With federal credits ended, state and utility programs are the main incentives — these databases track what's active where you live.",
    resources: [
      {
        name: "DSIRE — Database of State Incentives for Renewables & Efficiency",
        url: "https://www.dsireusa.org",
        source: "dsireusa.org",
        description:
          "The most comprehensive directory of state, local, and utility clean energy incentives, maintained by NC State University. Our state incentive data is sourced from DSIRE.",
      },
      {
        name: "AFDC State Laws & Incentives",
        url: "https://afdc.energy.gov/laws/state",
        source: "afdc.energy.gov",
        description:
          "The DOE Alternative Fuels Data Center's state-by-state directory of EV and alternative fuel incentives, laws, and utility programs.",
      },
      {
        name: "AFDC Federal EV Tax Credit Reference",
        url: "https://afdc.energy.gov/laws/409",
        source: "afdc.energy.gov",
        description:
          "DOE's plain-language reference page for the federal EV tax credit rules and their expiration.",
      },
      {
        name: "DOE Home Energy Rebates Programs",
        url: "https://www.energy.gov/scep/home-energy-rebates-programs",
        source: "energy.gov",
        description:
          "The state-administered HOMES and HEEHRA rebate programs for heat pumps and efficiency upgrades — up to $8,000 for income-qualifying households in participating states.",
      },
      {
        name: "ENERGY STAR Federal Tax Credit Reference",
        url: "https://www.energystar.gov/about/federal-tax-credits",
        source: "energystar.gov",
        description:
          "ENERGY STAR's equipment-by-equipment reference for which products qualified for federal credits and current efficiency requirements.",
      },
    ],
  },
  {
    title: "Technology Guides",
    blurb: "Plain-English explainers from the Department of Energy.",
    resources: [
      {
        name: "DOE Guide to Heat Pump Systems",
        url: "https://www.energy.gov/energysaver/heat-pump-systems",
        source: "energy.gov",
        description:
          "How air-source, ductless, and geothermal heat pumps work, and what to consider when choosing one for your climate.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Official Resources
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The primary sources behind our numbers. When our calculators and your
        installer disagree, these are the authorities to check.
      </p>

      <Separator className="my-8" />

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {section.blurb}
            </p>
            <ul className="mt-4 space-y-3">
              {section.resources.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border p-4 transition-colors hover:border-primary/50 hover:bg-muted/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-medium group-hover:text-primary">
                        {resource.name}
                      </span>
                      <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-primary/80">
                      {resource.source}
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Separator className="my-10" />

      <p className="text-sm text-muted-foreground">
        We link only to government, academic, and official program sources. No
        link on this page is sponsored or affiliated. Found a broken link or a
        source we should add? <Link href="/contact" className="text-primary hover:underline">Let us know</Link>.
        For how we use these sources in our calculations, see our{" "}
        <Link href="/methodology" className="text-primary hover:underline">
          methodology
        </Link>
        .
      </p>
    </div>
  );
}
