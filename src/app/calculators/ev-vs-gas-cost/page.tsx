"use client";

import { useCalculator } from "@/hooks/use-calculator";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { InputGroup } from "@/components/calculator/input-group";
import { RangeInput } from "@/components/calculator/range-input";
import { ResultCard } from "@/components/calculator/result-card";
import { ComparisonBar } from "@/components/calculator/comparison-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evVsGasSchema } from "@/calculators/ev-vs-gas/schema";
import { evVsGasDefaults } from "@/calculators/ev-vs-gas/defaults";
import { calculateEvVsGas } from "@/calculators/ev-vs-gas/calculate";
import {
  Car,
  DollarSign,
  TrendingUp,
  Leaf,
  Zap,
  Fuel,
  Sun,
  CreditCard,
  Thermometer,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function EvVsGasCostPage() {
  const { form, results, isCalculated, onCalculate, onReset } = useCalculator({
    schema: evVsGasSchema,
    defaults: evVsGasDefaults,
    calculate: calculateEvVsGas,
    storageKey: "ev-vs-gas-cost",
  });

  return (
    <CalculatorShell
      title="EV vs Gas Cost Calculator"
      description="Compare the total cost of ownership between an electric vehicle and a gas car over time, including purchase price, fuel, maintenance, insurance, and incentives."
      lastUpdated="March 2025"
      methodology={`This calculator compares EV and gas vehicle total cost of ownership (TCO) over your chosen ownership period. It accounts for purchase price (net of incentives for EVs), loan financing with standard amortization, fuel/electricity costs with annual price escalation, maintenance, insurance, and depreciation. Break-even year is when the EV's cumulative cost drops below the gas car's. CO₂ estimates use EPA averages: 0.855 lbs/kWh for electricity and 19.6 lbs/gallon for gasoline.`}
      faqs={[
        {
          question: "Are EVs really cheaper to own than gas cars?",
          answer:
            "In most cases, yes. While EVs often have a higher upfront cost, they save significantly on fuel and maintenance. Electricity is cheaper per mile than gasoline, and EVs have fewer moving parts — no oil changes, transmission repairs, or exhaust systems. Federal and state incentives further reduce the effective purchase price.",
        },
        {
          question: "What federal tax credits are available for EVs?",
          answer:
            "Under the Inflation Reduction Act, new EVs can qualify for up to $7,500 in federal tax credits, and used EVs for up to $4,000. Eligibility depends on your income, the vehicle's MSRP, and manufacturing requirements.",
        },
        {
          question: "How much does it cost to charge an EV vs filling a gas tank?",
          answer:
            "At average US electricity rates (~$0.16/kWh), it costs about $5-8 to fully charge a typical EV (vs. $40-60+ for a gas fill-up). EV fuel costs work out to roughly $0.04-0.06 per mile compared to $0.10-0.15+ for gas vehicles.",
        },
        {
          question: "Do EVs depreciate faster than gas cars?",
          answer:
            "Early EVs depreciated faster due to battery concerns, but modern EVs with longer-range batteries hold value well. Tesla and other popular models often match or outpace gas car resale values. This calculator lets you customize depreciation rates for each vehicle.",
        },
      ]}
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
      results={
        isCalculated && results ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Comparison Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ResultCard
                    label="EV Total Cost"
                    value={fmt(results.evTotalCost)}
                    subtext={`Over ${form.watch("ownershipYears")} years`}
                    icon={Car}
                    variant="highlight"
                  />
                  <ResultCard
                    label="Gas Car Total Cost"
                    value={fmt(results.gasTotalCost)}
                    subtext={`Over ${form.watch("ownershipYears")} years`}
                    icon={Fuel}
                  />
                  <ResultCard
                    label="Total Savings"
                    value={fmt(results.totalSavings)}
                    subtext={`${fmt(results.savingsPerMonth)}/month`}
                    icon={DollarSign}
                    variant={results.totalSavings > 0 ? "savings" : "default"}
                  />
                  <ResultCard
                    label="Break-Even Year"
                    value={results.breakEvenYear ? `Year ${results.breakEvenYear}` : "N/A"}
                    subtext={results.breakEvenYear ? "EV becomes cheaper" : "EV doesn't break even"}
                    icon={TrendingUp}
                    variant={results.breakEvenYear ? "highlight" : "default"}
                  />
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

                <Separator />

                <div>
                  <h3 className="mb-3 text-lg font-semibold">EV Cost Breakdown</h3>
                  <ComparisonBar
                    items={results.evCostBreakdown.map((b) => ({
                      label: b.label,
                      value: b.amount,
                      color: b.color ?? "#16a34a",
                    }))}
                    formatValue={(v) => fmt(v)}
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold">Gas Car Cost Breakdown</h3>
                  <ComparisonBar
                    items={results.gasCostBreakdown.map((b) => ({
                      label: b.label,
                      value: b.amount,
                      color: b.color ?? "#ef4444",
                    }))}
                    formatValue={(v) => fmt(v)}
                  />
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-3">
                  <ResultCard
                    label="EV Annual CO₂"
                    value={`${results.evAnnualCO2Tons} tons`}
                    icon={Leaf}
                  />
                  <ResultCard
                    label="Gas Annual CO₂"
                    value={`${results.gasAnnualCO2Tons} tons`}
                    icon={Leaf}
                  />
                  <ResultCard
                    label="CO₂ Savings"
                    value={`${results.co2SavingsTons} tons`}
                    subtext={`Over ${form.watch("ownershipYears")} years`}
                    icon={Leaf}
                    variant="savings"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6">
        {/* Vehicle Prices */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Vehicle Prices
          </h3>
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
        </div>

        <Separator />

        {/* Driving & Ownership */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Driving & Ownership
          </h3>
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
        </div>

        <Separator />

        {/* Energy Costs */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Fuel & Energy
          </h3>
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
        </div>

        <Separator />

        {/* Annual Costs */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Annual Costs
          </h3>
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
        </div>

        <Separator />

        {/* EV Incentives */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            EV Incentives
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="Federal Tax Credit"
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
        </div>

        <Separator />

        {/* Financing */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Financing
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
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
        </div>

        <Separator />

        {/* Depreciation & Escalation */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Depreciation & Price Escalation
          </h3>
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
              onChange={(v) => form.setValue("annualElectricityPriceIncrease", v)}
              unit="%/yr"
            />
          </div>
        </div>

        <Separator />

        {/* State */}
        <InputGroup label="State Code" tooltip="Two-letter state code for regional data">
          <Input
            className="w-24"
            maxLength={2}
            value={form.watch("stateCode")}
            onChange={(e) =>
              form.setValue("stateCode", e.target.value.toUpperCase())
            }
          />
        </InputGroup>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button onClick={onCalculate} size="lg">
            <Car className="mr-2 size-4" />
            Calculate
          </Button>
          <Button variant="outline" size="lg" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </CalculatorShell>
  );
}
