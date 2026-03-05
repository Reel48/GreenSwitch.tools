import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Learn how GoGreenCalc calculators work. Our transparent methodology uses current rates, government data, and peer-reviewed research.",
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Our Methodology
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Every GoGreenCalc calculator is built on transparent, verifiable data.
        Here&rsquo;s how we ensure accuracy.
      </p>

      <Separator className="my-8" />

      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Data Sources</h2>
        <p>
          We pull data from official government and industry sources including
          the U.S. Energy Information Administration (EIA), the Environmental
          Protection Agency (EPA), the Department of Energy (DOE), and state
          utility commission rate filings. Fuel prices are updated regularly
          using EIA weekly averages. Electricity rates reflect current national
          and state-level averages.
        </p>

        <h2>Calculation Approach</h2>
        <p>
          Each calculator uses a total-cost-of-ownership (TCO) model that
          accounts for upfront costs, ongoing operating expenses, maintenance,
          financing costs, available incentives, and projected savings over the
          analysis period. We apply standard financial formulas for present
          value, loan amortization, and payback period calculations.
        </p>

        <h2>Assumptions &amp; Defaults</h2>
        <p>
          All calculators pre-fill sensible default values based on national
          averages. Users can adjust every input to match their specific
          situation. Key assumptions (such as annual rate escalation, equipment
          degradation, and maintenance costs) are stated in each
          calculator&rsquo;s methodology section.
        </p>

        <h2>Incentives &amp; Tax Credits</h2>
        <p>
          Federal incentives reflect current Inflation Reduction Act (IRA)
          provisions. State-level incentives are sourced from the Database of
          State Incentives for Renewables &amp; Efficiency (DSIRE). We update
          incentive data as legislation changes.
        </p>

        <h2>Limitations</h2>
        <p>
          Our calculators provide estimates based on the inputs you provide and
          general assumptions. Actual costs and savings will vary based on your
          specific location, usage patterns, equipment choices, installer
          pricing, and local regulations. Results should be used as a starting
          point for research, not as financial advice.
        </p>

        <h2>Per-Calculator Details</h2>
        <p>
          Each calculator page includes a detailed &ldquo;How We Calculate
          This&rdquo; section explaining the specific formulas, assumptions, and
          data sources used for that calculation. We encourage you to review
          these before making decisions.
        </p>
      </div>
    </div>
  );
}
