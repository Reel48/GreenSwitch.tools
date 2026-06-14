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
  Database,
  RefreshCw,
  Battery,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerGrid, StaggerItem } from "./_components/home-sections";
import { calculatorInfo } from "@/lib/state-pages";
import { getAllPosts, type BlogPostMeta } from "@/lib/blog";

// Single source of truth — every calculator is registered in calculatorInfo,
// so this count stays correct as new ones are added
const CALCULATOR_COUNT = Object.keys(calculatorInfo).length;

// Curated, hand-picked articles to spotlight on the homepage (order matters).
// Edit this list to change what's featured; missing slugs are skipped safely.
const FEATURED_ARTICLE_SLUGS = [
  "2026-ev-tax-credit-guide",
  "ev-charger-tax-credit-deadline-2026",
  "which-evs-still-qualify-tax-credit-2026",
  "are-evs-still-worth-it-2026",
] as const;

const ARTICLE_TAG_COLORS: Record<string, string> = {
  ev: "bg-blue-100 text-blue-800",
  solar: "bg-amber-100 text-amber-800",
  "heat-pump": "bg-red-100 text-red-800",
  battery: "bg-purple-100 text-purple-800",
  "tax-credit": "bg-green-100 text-green-800",
};

// The six featured on the homepage; the full list lives at /calculators
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
    href: "/calculators/heat-pump",
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
  {
    icon: Calculator,
    value: String(CALCULATOR_COUNT),
    label: "Free calculators",
  },
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

export default function Home() {
  const allPosts = getAllPosts();
  const featuredArticles = FEATURED_ARTICLE_SLUGS.map((slug) =>
    allPosts.find((p) => p.slug === slug)
  ).filter((p): p is BlogPostMeta => Boolean(p));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Leaf className="size-3.5" />
              Free clean energy calculators
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Make smarter green energy decisions with{" "}
              <span className="text-primary">real data</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
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
          </div>
        </div>
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </section>

      {/* Quick Stats Banner */}
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <StaggerGrid className="grid grid-cols-2 divide-y divide-border/60 sm:divide-y-0 sm:divide-x sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem
                  key={stat.label}
                  className="flex flex-col items-center gap-1.5 py-5 sm:py-8"
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
      <section id="calculators" className="py-14 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Calculators for every green upgrade
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you&rsquo;re considering solar panels, an electric
              vehicle, or a new heating system, we have {CALCULATOR_COUNT} free
              calculators to help you decide. Here are the most popular six.
            </p>
          </FadeIn>

          <StaggerGrid className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <StaggerItem key={calc.href}>
                  <Link
                    href={calc.href}
                    className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
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
          </StaggerGrid>

          <FadeIn className="mt-8 text-center sm:mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/calculators">
                View all {CALCULATOR_COUNT} calculators
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Featured Guides */}
      {featuredArticles.length > 0 && (
        <section className="border-y border-border/60 bg-muted/30 py-14 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <BookOpen className="size-3.5" />
                From our guides
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Make sense of the 2026 EV tax credit changes
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clear, up-to-date explainers on what changed, what&rsquo;s left,
                and how to make a smart call — backed by the same data as our
                calculators.
              </p>
            </FadeIn>

            <StaggerGrid className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredArticles.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/learn/${post.slug}`}
                    className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${ARTICLE_TAG_COLORS[tag] || "bg-muted text-muted-foreground"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-xs text-muted-foreground">
                        {post.readingTime}
                      </span>
                      <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        Read article
                        <ArrowRight className="ml-1 size-3.5" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <FadeIn className="mt-8 text-center sm:mt-10">
              <Button asChild variant="outline" size="lg">
                <Link href="/learn">
                  Browse all guides
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-14 sm:py-28">
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
                <StaggerItem key={step.title} className="relative text-left sm:text-center">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 sm:mx-auto">
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
    </>
  );
}
