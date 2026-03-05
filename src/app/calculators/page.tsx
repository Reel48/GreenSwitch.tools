import type { Metadata } from "next";
import Link from "next/link";
import {
  Car,
  Sun,
  Zap,
  Thermometer,
  Receipt,
  Battery,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free Green Energy Calculators",
  description:
    "Free calculators for EV costs, solar payback, heat pump savings, battery storage ROI, and clean energy tax credits. Make smarter green energy decisions with real data.",
  keywords: [
    "green energy calculator",
    "clean energy savings calculator",
    "renewable energy cost calculator",
    "EV cost calculator",
    "solar calculator",
    "heat pump calculator",
  ],
  openGraph: {
    title: "Free Green Energy Calculators | GoGreenCalc",
    description:
      "Free calculators for EV costs, solar payback, heat pump savings, battery storage ROI, and clean energy tax credits.",
    url: "/calculators",
  },
  alternates: {
    canonical: "/calculators",
  },
};

const calculators = [
  {
    title: "EV vs Gas Cost Comparison",
    description:
      "Compare the total cost of owning an electric vehicle vs a gas car over 5–10 years. Includes fuel, maintenance, insurance, depreciation, and tax credits.",
    href: "/calculators/ev-vs-gas-cost",
    icon: Car,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Solar Panel Payback Period",
    description:
      "Calculate your solar panel ROI and see how many years until your system pays for itself. Factor in system size, electricity rates, and incentives.",
    href: "/calculators/solar-payback",
    icon: Sun,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    title: "EV Charging Cost Estimator",
    description:
      "Calculate how much it costs to charge your EV at home and on the road. Compare Level 1, Level 2, and DC fast charging against gas costs.",
    href: "/calculators/ev-charging-cost",
    icon: Zap,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/50",
  },
  {
    title: "Heat Pump Savings Calculator",
    description:
      "Compare heat pump vs furnace costs including installation, annual operating expenses, available rebates, and long-term savings by climate zone.",
    href: "/calculators/heat-pump",
    icon: Thermometer,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/50",
  },
  {
    title: "EV Tax Credit Eligibility",
    description:
      "Check if you qualify for federal EV tax credits worth up to $7,500 for new or $4,000 for used electric vehicles. See income and MSRP limits.",
    href: "/calculators/ev-tax-credit",
    icon: Receipt,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    title: "Home Battery Storage ROI",
    description:
      "Evaluate whether home battery storage makes financial sense. Factor in TOU rate arbitrage, solar pairing, backup power value, and federal tax credits.",
    href: "/calculators/battery-storage",
    icon: Battery,
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/50",
  },
] as const;

export default function CalculatorsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Free Green Energy Calculators
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Make smarter clean energy decisions with real data. Our calculators use
          current rates, government data, and transparent methodology to help you
          estimate costs, savings, and ROI for the most popular green energy
          upgrades.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="group">
            <Card className="h-full transition-shadow duration-200 group-hover:shadow-md">
              <CardHeader>
                <div
                  className={`mb-3 flex size-10 items-center justify-center rounded-lg ${calc.bg}`}
                >
                  <calc.icon className={`size-5 ${calc.color}`} />
                </div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {calc.title}
                  <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {calc.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Which Calculator Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Which Calculator Is Right for You?
        </h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">
              Thinking about switching to an electric vehicle?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Start with the{" "}
              <Link
                href="/calculators/ev-vs-gas-cost"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                EV vs Gas Cost Comparison
              </Link>{" "}
              for a full ownership cost analysis. Then check the{" "}
              <Link
                href="/calculators/ev-tax-credit"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                EV Tax Credit calculator
              </Link>{" "}
              to see if you qualify for up to $7,500 in credits, and use the{" "}
              <Link
                href="/calculators/ev-charging-cost"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Charging Cost Estimator
              </Link>{" "}
              to plan your charging budget.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Considering solar panels?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The{" "}
              <Link
                href="/calculators/solar-payback"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Solar Payback Period calculator
              </Link>{" "}
              shows your break-even timeline and 25-year savings. Pair it with
              the{" "}
              <Link
                href="/calculators/battery-storage"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Battery Storage ROI calculator
              </Link>{" "}
              to see if adding a home battery boosts your savings further.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">
              Want to lower your heating costs?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The{" "}
              <Link
                href="/calculators/heat-pump"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Heat Pump Savings calculator
              </Link>{" "}
              compares heat pump vs furnace costs for your climate zone,
              including IRA rebates that can cover up to $8,000 of installation
              costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
