import Link from "next/link";
import {
  Zap,
  Sun,
  Calculator,
  Flame,
  DollarSign,
  ArrowRight,
  BarChart3,
  Sliders,
  TrendingDown,
  Leaf,
  ShieldCheck,
  Clock,
  Database,
  RefreshCw,
  Battery,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerGrid, StaggerItem } from "./_components/home-sections";

const calculators = [
  {
    title: "EV vs Gas Cost",
    description:
      "Compare the total cost of ownership between electric and gas vehicles over time, including fuel, maintenance, and depreciation.",
    href: "/calculators/ev-vs-gas-cost",
    icon: Zap,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Solar Payback",
    description:
      "Estimate your solar panel ROI, payback period, and 25-year savings based on your location and energy usage.",
    href: "/calculators/solar-payback",
    icon: Sun,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "EV Charging Cost",
    description:
      "Calculate your monthly and annual EV charging costs at home and at public stations vs. gasoline.",
    href: "/calculators/ev-charging-cost",
    icon: Calculator,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Heat Pump vs Furnace",
    description:
      "Compare heating system costs including installation, energy bills, maintenance, and long-term savings.",
    href: "/calculators/heat-pump-vs-furnace",
    icon: Flame,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "EV Tax Credit",
    description:
      "Check your eligibility for federal and state EV tax credits based on income, vehicle, and filing status.",
    href: "/calculators/ev-tax-credit",
    icon: DollarSign,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    title: "Battery Storage",
    description:
      "Evaluate home battery ROI with TOU rate arbitrage, solar pairing, incentives, and degradation over time.",
    href: "/calculators/battery-storage",
    icon: Battery,
    color: "bg-cyan-500/10 text-cyan-600",
  },
] as const;

const stats = [
  { icon: Calculator, value: "6", label: "Free calculators" },
  { icon: Database, value: "50+", label: "Data sources" },
  { icon: RefreshCw, value: "2026", label: "Rates & incentives" },
  { icon: DollarSign, value: "$0", label: "Always free" },
] as const;

const steps = [
  {
    icon: Sliders,
    title: "Enter your details",
    description:
      "Input your location, energy usage, and preferences. We pre-fill sensible defaults so you can get results fast.",
  },
  {
    icon: BarChart3,
    title: "Get instant results",
    description:
      "See a detailed cost comparison with yearly breakdowns, savings projections, and environmental impact.",
  },
  {
    icon: TrendingDown,
    title: "Make a smarter switch",
    description:
      "Use real numbers to decide when to go solar, switch to an EV, or upgrade your heating system.",
  },
] as const;

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Transparent methodology",
    description:
      "Every calculator shows its formulas and data sources. No black boxes.",
  },
  {
    icon: Clock,
    title: "Up-to-date data",
    description:
      "We use current electricity rates, fuel prices, and incentive programs.",
  },
  {
    icon: Leaf,
    title: "100% free, no sign-up",
    description:
      "All calculators are free to use with no account required. Ever.",
  },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Leaf className="size-3.5" />
              Free clean energy calculators
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Make smarter green energy decisions with{" "}
              <span className="text-primary">real data</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Stop guessing. Our free calculators use current rates, local
              incentives, and transparent methodology to show you exactly how
              much you can save by going green.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/calculators/ev-vs-gas-cost">
                  Try a Calculator
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="#calculators">See All Calculators</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </section>

      {/* Quick Stats Banner */}
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <StaggerGrid className="grid grid-cols-2 divide-x divide-border/60 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem
                  key={stat.label}
                  className="flex flex-col items-center gap-1.5 py-8"
                >
                  <Icon className="mb-1 size-5 text-primary" />
                  <span className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Calculator Showcase */}
      <section id="calculators" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Calculators for every green upgrade
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you&rsquo;re considering solar panels, an electric
              vehicle, or a new heating system, we have a calculator for you.
            </p>
          </FadeIn>

          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <StaggerItem key={calc.href}>
                  <Link
                    href={calc.href}
                    className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div
                      className={`mb-4 inline-flex size-11 items-center justify-center rounded-xl ${calc.color}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {calc.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {calc.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Try it now
                      <ArrowRight className="ml-1 size-3.5" />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}

            {/* "More coming" card */}
            <StaggerItem>
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border/60 p-6">
                <div className="text-center">
                  <div className="mx-auto mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-muted">
                    <Calculator className="size-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    More calculators coming soon
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/60 bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get personalized cost comparisons in under a minute.
            </p>
          </FadeIn>

          <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.title} className="relative text-center">
                  <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div className="mb-2 text-sm font-semibold text-primary">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Trust / Why Us */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for trust, not clicks
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No affiliate links, no hidden agendas. Just honest numbers to help
              you make the right call.
            </p>
          </FadeIn>

          <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-3">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.title}>
                  <div className="rounded-2xl border border-border/60 bg-card p-6 text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
