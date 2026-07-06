import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  StateComparisonTable,
  type ComparisonColumn,
  type ComparisonRow,
} from "@/components/seo/state-comparison-table";
import { states } from "@/data/states";
import { solarData } from "@/data/solar-data";
import { electricityRates } from "@/data/electricity-rates";

export const metadata: Metadata = {
  title: "Solar Payback by State (2026): Compare All 50 States",
  description:
    "Compare estimated solar panel payback periods across every U.S. state for 2026 — sortable by payback years, electricity rate, peak sun hours, net metering, and SREC value. Find the cheapest states for solar.",
  keywords: [
    "solar payback by state",
    "cheapest states for solar",
    "best states for solar",
    "solar payback period by state",
    "solar ROI by state",
  ],
  alternates: {
    canonical: "/calculators/solar-payback/compare",
  },
  openGraph: {
    title: "Solar Payback by State (2026) | GoGreenCalc",
    description:
      "Compare estimated solar payback periods across all 50 states — sortable by payback, rate, sun hours, net metering, and SRECs.",
    url: "/calculators/solar-payback/compare",
  },
};

interface StateRow extends ComparisonRow {
  payback: number;
}

function buildRows(): StateRow[] {
  const rows: StateRow[] = [];
  for (const s of states) {
    const solar = solarData[s.code];
    const elec = electricityRates[s.code];
    if (!solar || !elec) continue;

    const systemCost = solar.costPerWatt * solar.avgSystemSizeKw * 1000;
    const annualProd = solar.annualProductionPerKw * solar.avgSystemSizeKw;
    const annualValue = annualProd * elec.rate;
    const payback = Math.round((systemCost / annualValue) * 10) / 10;

    const srec = solar.srecValue ?? 0;
    rows.push({
      slug: s.slug,
      name: s.name,
      href: `/calculators/solar-payback/${s.slug}`,
      payback,
      values: {
        payback,
        rate: elec.rate,
        sun: solar.avgSunHours,
        netMetering: solar.netMetering,
        srec,
      },
      display: {
        payback: `${payback} yrs`,
        rate: `$${elec.rate.toFixed(2)}/kWh`,
        sun: `${solar.avgSunHours}/day`,
        netMetering: solar.netMetering ? "Yes" : "No",
        srec: srec > 0 ? `$${srec}/MWh` : "—",
      },
    });
  }
  return rows;
}

const columns: ComparisonColumn[] = [
  { key: "payback", label: "Payback", numeric: true },
  { key: "rate", label: "Elec. rate", numeric: true },
  { key: "sun", label: "Sun hours", numeric: true },
  { key: "netMetering", label: "Net metering" },
  { key: "srec", label: "SREC value", numeric: true },
];

export default function SolarPaybackComparePage() {
  const rows = buildRows();
  const byPayback = [...rows].sort((a, b) => a.payback - b.payback);
  const fastest = byPayback.slice(0, 3);
  const slowest = byPayback.slice(-3).reverse();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          {
            name: "Solar Panel Payback Period",
            href: "/calculators/solar-payback",
          },
          {
            name: "By State",
            href: "/calculators/solar-payback/compare",
          },
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Solar Payback by State (2026)
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Estimated solar panel payback period for a typical residential system
          in every U.S. state, using each state&apos;s average electricity rate,
          peak sun hours, and installed cost. Sort by any column, and click a
          state for local incentives and a tailored estimate.
        </p>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The fastest payback today is in{" "}
          {fastest.map((r, i) => (
            <span key={r.slug}>
              <Link
                href={r.href}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {r.name}
              </Link>{" "}
              (~{r.payback} yrs){i < fastest.length - 1 ? ", " : ""}
            </span>
          ))}
          , driven by high electricity rates and strong incentives. The longest
          payback is in{" "}
          {slowest.map((r, i) => (
            <span key={r.slug}>
              <Link
                href={r.href}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {r.name}
              </Link>{" "}
              (~{r.payback} yrs){i < slowest.length - 1 ? ", " : ""}
            </span>
          ))}
          , where cheap power and weaker net metering stretch the timeline.
        </p>

        <div className="mt-8">
          <StateComparisonTable
            columns={columns}
            rows={rows}
            defaultSortKey="payback"
            defaultSortDir="asc"
            nameLabel="State"
          />
        </div>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">How these estimates work</h2>
          <p className="text-muted-foreground leading-relaxed">
            Payback is the net system cost divided by first-year electricity
            savings, using a typical system size at each state&apos;s average
            installed cost and rate. Actual figures depend on your usage, roof,
            financing, and the incentives you qualify for — the 30% federal
            credit ended December 31, 2025 for purchased systems, so these
            numbers reflect full price. For the full methodology, see{" "}
            <Link
              href="/learn/how-solar-payback-works"
              className="underline underline-offset-2 hover:text-foreground"
            >
              How Solar Payback Works
            </Link>
            .
          </p>
        </section>

        <section className="mt-8 rounded-lg border bg-muted/30 p-6 text-center">
          <h2 className="text-xl font-semibold">Run your own numbers</h2>
          <p className="mt-2 text-muted-foreground">
            Enter your bill, roof, and system details for a personalized payback
            period, 25-year savings, and ROI.
          </p>
          <Link
            href="/calculators/solar-payback"
            className="mt-4 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Open the Solar Payback Calculator
          </Link>
        </section>
      </div>
    </>
  );
}
