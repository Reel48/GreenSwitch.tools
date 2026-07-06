import Link from "next/link";

/**
 * Long-form, crawlable explainer rendered below the Solar Payback calculator.
 * Targets head terms: "solar payback period", "how to calculate solar payback",
 * "solar break-even", "solar ROI". Server component — no client JS.
 */
export function SolarPaybackContent() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          How solar payback is calculated
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Your <strong>solar payback period</strong> is the time it takes for the
          savings from your panels to equal what the system cost you. The core
          formula is simple:
        </p>
        <p className="rounded-lg border bg-muted/30 p-4 text-center font-medium">
          Payback period = Net system cost ÷ Annual electricity savings
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The details are where estimates get more accurate. Net system cost is
          the installed price after any state or utility incentives (the 30%
          federal credit ended December 31, 2025 for purchased systems). Annual
          savings aren&apos;t flat: utility rates typically rise a few percent a
          year, which <em>shortens</em> payback over time, while panels lose
          roughly 0.5% of output annually, which slightly offsets that. The
          calculator above models both year by year, then finds the year your
          cumulative savings first exceed the system cost — that&apos;s your true
          break-even point.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          What changes your payback period
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Five factors move the number more than anything else:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <strong className="text-foreground">Your electricity rate.</strong>{" "}
            The more you pay per kWh, the more each solar kWh saves you. A home
            paying $0.30/kWh pays back nearly twice as fast as one paying
            $0.15/kWh, all else equal.
          </li>
          <li>
            <strong className="text-foreground">Sun hours and production.</strong>{" "}
            More peak sun hours means more kWh per year from the same system.
            This is why identical systems pay back years apart between, say,
            Arizona and Washington.
          </li>
          <li>
            <strong className="text-foreground">System cost per watt.</strong>{" "}
            Installed prices range from roughly $2.50 to $3.50 per watt. Getting
            multiple quotes is the single biggest lever you control.
          </li>
          <li>
            <strong className="text-foreground">Net metering.</strong> Full
            retail net metering credits every exported kWh at the rate you&apos;d
            pay to buy it. Where net metering is weaker, pairing solar with a{" "}
            <Link
              href="/calculators/battery-storage"
              className="underline underline-offset-2 hover:text-foreground"
            >
              home battery
            </Link>{" "}
            recovers more of that value.
          </li>
          <li>
            <strong className="text-foreground">
              State and utility incentives.
            </strong>{" "}
            Rebates, state tax credits, and SREC income all cut net cost or add
            revenue. See what applies where you live on the{" "}
            <Link
              href="/calculators/solar-payback/compare"
              className="underline underline-offset-2 hover:text-foreground"
            >
              solar payback by state
            </Link>{" "}
            page.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Payback period vs. ROI vs. break-even
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          These three terms describe the same investment from different angles.{" "}
          <strong className="text-foreground">Break-even</strong> and{" "}
          <strong className="text-foreground">payback period</strong> are the
          same thing — the moment cumulative savings cover the cost. <strong className="text-foreground">Return on investment (ROI)</strong>{" "}
          looks past that point: it&apos;s the total lifetime savings expressed
          as a percentage of what you spent. A system that pays back in 9 years
          and then produces for another 16 can deliver a 150–250% ROI over a
          25-year life, because everything after break-even is essentially free
          electricity.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For a deeper walkthrough with worked examples, read{" "}
          <Link
            href="/learn/how-solar-payback-works"
            className="underline underline-offset-2 hover:text-foreground"
          >
            How Solar Payback Works
          </Link>
          , or see whether the math still favors buying in{" "}
          <Link
            href="/learn/is-solar-worth-it-2026-without-tax-credit"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Is Solar Still Worth It in 2026 Without the Tax Credit?
          </Link>
        </p>
      </div>
    </section>
  );
}
