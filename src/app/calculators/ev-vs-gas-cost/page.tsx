"use client";

import { useCalculator } from "@/hooks/use-calculator";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { StateLinksSection } from "@/components/seo/state-links-section";
import { InputGroup } from "@/components/calculator/input-group";
import {
  InputSection,
  AdvancedSections,
  AdvancedSection,
} from "@/components/calculator/input-section";
import { RangeInput } from "@/components/calculator/range-input";
import { ResultCard } from "@/components/calculator/result-card";
import { ComparisonBar } from "@/components/calculator/comparison-bar";
import { VerdictBanner } from "@/components/calculator/verdict-banner";
import { CostOverTimeChart } from "@/components/calculator/cost-over-time-chart";
import { MobileSummaryBar } from "@/components/calculator/mobile-summary-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evVsGasSchema } from "@/calculators/ev-vs-gas/schema";
import { evVsGasDefaults } from "@/calculators/ev-vs-gas/defaults";
import { calculateEvVsGas } from "@/calculators/ev-vs-gas/calculate";
import {
  Car,
  DollarSign,
  Leaf,
  Zap,
  Fuel,
  Sun,
  CreditCard,
  Gauge,
  Wrench,
  Percent,
  TrendingDown,
  MapPin,
  RotateCcw,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function EvVsGasCostPage() {
  const { form, results, onReset } = useCalculator({
    schema: evVsGasSchema,
    defaults: evVsGasDefaults,
    calculate: calculateEvVsGas,
    storageKey: "ev-vs-gas-cost-v2",
  });

  const ownershipYears = form.watch("ownershipYears");
  const evWins = results ? results.totalSavings > 0 : true;

  return (
    <CalculatorShell
      title="EV vs Gas Cost Calculator"
      description="Compare the total cost of ownership between an electric vehicle and a gas car over time, including purchase price, fuel, maintenance, insurance, and incentives."
      lastUpdated="June 2026"
      url="/calculators/ev-vs-gas-cost"
      howToSteps={[
        {
          name: "Enter vehicle prices",
          text: "Enter the purchase price for the EV and gas vehicle you want to compare.",
        },
        {
          name: "Set driving details",
          text: "Enter your annual miles driven and how long you plan to own the vehicles.",
        },
        {
          name: "Input energy costs",
          text: "Set your local electricity rate ($/kWh) and gas price ($/gallon).",
        },
        {
          name: "Add vehicle efficiency",
          text: "Enter the EV efficiency (kWh/100 mi) and gas car fuel economy (MPG).",
        },
        {
          name: "Include ownership costs",
          text: "Add annual maintenance, insurance, and any available tax credits or incentives.",
        },
        {
          name: "Compare your results",
          text: "Results update instantly as you adjust any input — see a side-by-side total cost comparison, break-even year, and lifetime savings.",
        },
      ]}
      methodology={`This calculator compares EV and gas vehicle total cost of ownership (TCO) over your chosen ownership period. It accounts for purchase price (net of incentives for EVs), loan financing with standard amortization, fuel/electricity costs with annual price escalation, maintenance, insurance, and depreciation. Break-even year is when the EV's cumulative cost drops below the gas car's. CO₂ estimates use EPA averages: 0.855 lbs/kWh for electricity and 19.6 lbs/gallon for gasoline.`}
      faqs={[
        {
          question: "Are EVs really cheaper to own than gas cars?",
          answer:
            "Often, yes — though the math is closer since federal credits ended. EVs save significantly on fuel and maintenance: electricity is cheaper per mile than gasoline, and EVs have fewer moving parts — no oil changes, transmission repairs, or exhaust systems. State incentives, where available, can further reduce the effective purchase price.",
        },
        {
          question: "Are there still federal tax credits for EVs?",
          answer:
            "No. The federal clean vehicle credits (up to $7,500 for new EVs and $4,000 for used) ended for vehicles acquired after September 30, 2025, under legislation passed in July 2025. Buyers who acquired a vehicle by that deadline can still claim the credit for that tax year. Several states continue to offer their own EV rebates, tax credits, or sales tax exemptions — this calculator's incentive fields let you enter whatever you qualify for.",
        },
        {
          question:
            "How much does it cost to charge an EV vs filling a gas tank?",
          answer:
            "At average US electricity rates (~$0.16/kWh), it costs about $5-8 to fully charge a typical EV (vs. $40-60+ for a gas fill-up). EV fuel costs work out to roughly $0.04-0.06 per mile compared to $0.10-0.15+ for gas vehicles.",
        },
        {
          question: "Do EVs depreciate faster than gas cars?",
          answer:
            "Early EVs depreciated faster due to battery concerns, but modern EVs with longer-range batteries hold value well. Tesla and other popular models often match or outpace gas car resale values. This calculator lets you customize depreciation rates for each vehicle.",
        },
      ]}
      byState={<StateLinksSection calculator="ev-vs-gas-cost" />}
      relatedCalculators={[
        {
          title: "EV Charging Cost",
          href: "/calculators/ev-charging-cost",
          description: "Calculate your EV charging costs in detail.",
          icon: Zap,
        },
        {
          title: "EV Tax Credit",
          href: "/calculators/ev-tax-credit",
          description: "Check your eligibility for EV tax credits.",
          icon: CreditCard,
        },
        {
          title: "Solar Payback",
          href: "/calculators/solar-payback",
          description: "Power your EV with solar and save even more.",
          icon: Sun,
        },
      ]}
      mobileSummary={
        results ? (
          <MobileSummaryBar
            label={
              evWins
                ? `EV savings over ${ownershipYears} years`
                : `Extra EV cost over ${ownershipYears} years`
            }
            value={fmt(Math.abs(results.totalSavings))}
            tone={evWins ? "positive" : "negative"}
          />
        ) : undefined
      }
      results={
        results ? (
          <div className="space-y-4">
            <VerdictBanner
              headline={
                evWins
                  ? "Choosing the EV saves you"
                  : "The gas car costs less by"
              }
              amount={Math.abs(results.totalSavings)}
              caption={`over ${ownershipYears} years of ownership`}
              tone={evWins ? "positive" : "negative"}
              detail={
                <>
                  {results.breakEvenYear && (
                    <Badge variant="secondary">
                      Breaks even in year {results.breakEvenYear}
                    </Badge>
                  )}
                  {evWins && (
                    <Badge variant="secondary">
                      {fmt(results.savingsPerMonth)}/month
                    </Badge>
                  )}
                </>
              }
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Cumulative cost over time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CostOverTimeChart
                  data={results.yearlyBreakdown}
                  labelA="Electric vehicle"
                  labelB="Gas car"
                  breakEvenYear={results.breakEvenYear}
                  formatValue={fmt}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">The numbers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultCard
                    label="EV Total Cost"
                    value={fmt(results.evTotalCost)}
                    subtext={`Over ${ownershipYears} years`}
                    icon={Car}
                    variant="highlight"
                  />
                  <ResultCard
                    label="Gas Car Total Cost"
                    value={fmt(results.gasTotalCost)}
                    subtext={`Over ${ownershipYears} years`}
                    icon={Fuel}
                  />
                  <ResultCard
                    label="EV Fuel Cost/Mile"
                    value={`$${results.evCostPerMile.toFixed(2)}`}
                    subtext={`${fmt(results.evMonthlyFuelCost)}/month`}
                    icon={Zap}
                  />
                  <ResultCard
                    label="Gas Fuel Cost/Mile"
                    value={`$${results.gasCostPerMile.toFixed(2)}`}
                    subtext={`${fmt(results.gasMonthlyFuelCost)}/month`}
                    icon={Fuel}
                  />
                  <ResultCard
                    label="EV Monthly Payment"
                    value={fmt(results.evMonthlyPayment)}
                    subtext={`${fmt(results.evTotalInterest)} interest`}
                    icon={DollarSign}
                  />
                  <ResultCard
                    label="Gas Monthly Payment"
                    value={fmt(results.gasMonthlyPayment)}
                    subtext={`${fmt(results.gasTotalInterest)} interest`}
                    icon={DollarSign}
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">
                    EV cost breakdown
                  </h3>
                  <ComparisonBar
                    items={results.evCostBreakdown.map((b) => ({
                      label: b.label,
                      value: b.amount,
                      color: b.color ?? "var(--chart-1)",
                    }))}
                    formatValue={fmt}
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">
                    Gas car cost breakdown
                  </h3>
                  <ComparisonBar
                    items={results.gasCostBreakdown.map((b) => ({
                      label: b.label,
                      value: b.amount,
                      color: b.color ?? "var(--chart-4)",
                    }))}
                    formatValue={fmt}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultCard
                    label="CO₂ Savings"
                    value={`${results.co2SavingsTons} tons`}
                    subtext={`Over ${ownershipYears} years`}
                    icon={Leaf}
                    variant="savings"
                  />
                  <ResultCard
                    label="EV vs Gas Annual CO₂"
                    value={`${results.evAnnualCO2Tons} vs ${results.gasAnnualCO2Tons} tons`}
                    subtext="Per year of driving"
                    icon={Leaf}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6">
        <InputSection title="Vehicle Prices" icon={Car}>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="EV Purchase Price"
              min={15000}
              max={150000}
              step={1000}
              value={form.watch("evPurchasePrice")}
              onChange={(v) => form.setValue("evPurchasePrice", v)}
              unit="$"
            />
            <RangeInput
              label="Gas Car Purchase Price"
              min={15000}
              max={150000}
              step={1000}
              value={form.watch("gasPurchasePrice")}
              onChange={(v) => form.setValue("gasPurchasePrice", v)}
              unit="$"
            />
          </div>
        </InputSection>

        <InputSection title="Driving & Ownership" icon={Gauge}>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="Annual Miles"
              min={1000}
              max={50000}
              step={500}
              value={form.watch("annualMiles")}
              onChange={(v) => form.setValue("annualMiles", v)}
              unit="miles"
            />
            <RangeInput
              label="Ownership Period"
              min={1}
              max={20}
              step={1}
              value={form.watch("ownershipYears")}
              onChange={(v) => form.setValue("ownershipYears", v)}
              unit="years"
            />
          </div>
        </InputSection>

        <InputSection title="Fuel & Energy" icon={Fuel}>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="Electricity Rate"
              min={0.01}
              max={1.0}
              step={0.01}
              value={form.watch("electricityRate")}
              onChange={(v) => form.setValue("electricityRate", v)}
              unit="$/kWh"
            />
            <RangeInput
              label="Gas Price"
              min={1}
              max={10}
              step={0.1}
              value={form.watch("gasPrice")}
              onChange={(v) => form.setValue("gasPrice", v)}
              unit="$/gal"
            />
            <RangeInput
              label="EV Efficiency"
              tooltip="Energy consumption in kWh per 100 miles"
              min={15}
              max={50}
              step={1}
              value={form.watch("evEfficiency")}
              onChange={(v) => form.setValue("evEfficiency", v)}
              unit="kWh/100mi"
            />
            <RangeInput
              label="Gas Car MPG"
              min={10}
              max={60}
              step={1}
              value={form.watch("gasMpg")}
              onChange={(v) => form.setValue("gasMpg", v)}
              unit="mpg"
            />
          </div>
        </InputSection>

        <AdvancedSections>
          <AdvancedSection title="Annual Costs" icon={Wrench}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="EV Annual Maintenance"
                min={0}
                max={5000}
                step={50}
                value={form.watch("evAnnualMaintenance")}
                onChange={(v) => form.setValue("evAnnualMaintenance", v)}
                unit="$"
              />
              <RangeInput
                label="Gas Annual Maintenance"
                min={0}
                max={5000}
                step={50}
                value={form.watch("gasAnnualMaintenance")}
                onChange={(v) => form.setValue("gasAnnualMaintenance", v)}
                unit="$"
              />
              <RangeInput
                label="EV Annual Insurance"
                min={0}
                max={5000}
                step={50}
                value={form.watch("evAnnualInsurance")}
                onChange={(v) => form.setValue("evAnnualInsurance", v)}
                unit="$"
              />
              <RangeInput
                label="Gas Annual Insurance"
                min={0}
                max={5000}
                step={50}
                value={form.watch("gasAnnualInsurance")}
                onChange={(v) => form.setValue("gasAnnualInsurance", v)}
                unit="$"
              />
            </div>
          </AdvancedSection>

          <AdvancedSection title="EV Incentives" icon={CreditCard}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Federal Tax Credit"
                tooltip="The federal 30D credit ended for vehicles acquired after Sept 30, 2025 — leave at $0 unless your purchase was grandfathered"
                min={0}
                max={7500}
                step={500}
                value={form.watch("federalTaxCredit")}
                onChange={(v) => form.setValue("federalTaxCredit", v)}
                unit="$"
              />
              <RangeInput
                label="State Tax Credit"
                min={0}
                max={10000}
                step={500}
                value={form.watch("stateTaxCredit")}
                onChange={(v) => form.setValue("stateTaxCredit", v)}
                unit="$"
              />
            </div>
          </AdvancedSection>

          <AdvancedSection title="Financing" icon={Percent}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Down Payment"
                min={0}
                max={100}
                step={5}
                value={form.watch("downPaymentPercent")}
                onChange={(v) => form.setValue("downPaymentPercent", v)}
                unit="%"
              />
              <RangeInput
                label="Loan Term"
                min={1}
                max={8}
                step={1}
                value={form.watch("loanTermYears")}
                onChange={(v) => form.setValue("loanTermYears", v)}
                unit="years"
              />
              <RangeInput
                label="Interest Rate"
                min={0}
                max={20}
                step={0.25}
                value={form.watch("interestRate")}
                onChange={(v) => form.setValue("interestRate", v)}
                unit="%"
              />
            </div>
          </AdvancedSection>

          <AdvancedSection
            title="Depreciation & Price Escalation"
            icon={TrendingDown}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="EV Depreciation Rate"
                tooltip="Annual depreciation as a percentage of remaining value"
                min={0.05}
                max={0.3}
                step={0.01}
                value={form.watch("evDepreciationRate")}
                onChange={(v) => form.setValue("evDepreciationRate", v)}
                unit="%/yr"
              />
              <RangeInput
                label="Gas Depreciation Rate"
                min={0.05}
                max={0.3}
                step={0.01}
                value={form.watch("gasDepreciationRate")}
                onChange={(v) => form.setValue("gasDepreciationRate", v)}
                unit="%/yr"
              />
              <RangeInput
                label="Fuel Price Increase"
                tooltip="Expected annual increase in gas prices"
                min={0}
                max={0.15}
                step={0.005}
                value={form.watch("annualFuelPriceIncrease")}
                onChange={(v) => form.setValue("annualFuelPriceIncrease", v)}
                unit="%/yr"
              />
              <RangeInput
                label="Electricity Price Increase"
                tooltip="Expected annual increase in electricity rates"
                min={0}
                max={0.15}
                step={0.005}
                value={form.watch("annualElectricityPriceIncrease")}
                onChange={(v) =>
                  form.setValue("annualElectricityPriceIncrease", v)
                }
                unit="%/yr"
              />
            </div>
          </AdvancedSection>

          <AdvancedSection title="Location" icon={MapPin}>
            <InputGroup
              label="State Code"
              tooltip="Two-letter state code for regional data"
            >
              <Input
                className="w-24"
                maxLength={2}
                value={form.watch("stateCode")}
                onChange={(e) =>
                  form.setValue("stateCode", e.target.value.toUpperCase())
                }
              />
            </InputGroup>
          </AdvancedSection>
        </AdvancedSections>

        {/* Actions */}
        <div className="flex justify-end pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground"
          >
            <RotateCcw className="mr-2 size-3.5" />
            Reset to defaults
          </Button>
        </div>
      </div>
    </CalculatorShell>
  );
}
