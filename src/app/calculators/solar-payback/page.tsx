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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { solarPaybackSchema } from "@/calculators/solar-payback/schema";
import { solarPaybackDefaults } from "@/calculators/solar-payback/defaults";
import { calculateSolarPayback } from "@/calculators/solar-payback/calculate";
import {
  Sun,
  DollarSign,
  TrendingUp,
  Leaf,
  Zap,
  Battery,
  Car,
  CreditCard,
  Thermometer,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function SolarPaybackPage() {
  const { form, results, isCalculated, onCalculate, onReset } = useCalculator({
    schema: solarPaybackSchema,
    defaults: solarPaybackDefaults,
    calculate: calculateSolarPayback,
    storageKey: "solar-payback",
  });

  const financingType = form.watch("financingType");

  return (
    <CalculatorShell
      title="Solar Payback Calculator"
      description="Estimate your solar panel payback period, lifetime savings, and return on investment based on your system size, electricity costs, and available incentives."
      lastUpdated="March 2025"
      methodology={`This calculator estimates solar savings over the system's lifetime. Year-one production is based on system size × annual production per kW, adjusted for roof direction. Each subsequent year accounts for panel degradation (typically 0.5%/year) and rising electricity rates. The payback period is when cumulative savings exceed the net system cost (after tax credits). For loan financing, monthly payments are calculated using standard amortization. CO₂ offset uses the EPA average of 1.22 lbs CO₂ per kWh avoided. The 30% federal Investment Tax Credit (ITC) under the Inflation Reduction Act is applied by default.`}
      faqs={[
        {
          question: "How long does it take for solar panels to pay for themselves?",
          answer:
            "The average solar payback period in the US is 6-10 years, depending on your electricity rate, sun exposure, system cost, and available incentives. After payback, you're essentially getting free electricity.",
        },
        {
          question: "What is the federal solar tax credit?",
          answer:
            "The federal Investment Tax Credit (ITC) allows you to deduct 30% of solar installation costs from your federal taxes through 2032. It steps down to 26% in 2033 and 22% in 2034.",
        },
        {
          question: "Does roof direction matter for solar panels?",
          answer:
            "Yes — south-facing roofs produce the most energy in the Northern Hemisphere. Southwest and southeast are close behind. West and east-facing roofs produce about 15-20% less energy.",
        },
        {
          question: "What is net metering?",
          answer:
            "Net metering lets you sell excess solar energy back to the grid. Your meter runs backward when you're producing more than you use, effectively crediting you at the retail or a specified rate.",
        },
        {
          question: "How long do solar panels last?",
          answer:
            "Modern solar panels typically last 25-30+ years with a degradation rate of about 0.5% per year. Most manufacturers warranty at least 80% production at 25 years.",
        },
      ]}
      relatedCalculators={[
        {
          title: "EV Charging Cost",
          href: "/calculators/ev-charging-cost",
          description: "Pair solar with EV charging to maximize savings.",
          icon: Zap,
        },
        {
          title: "Heat Pump",
          href: "/calculators/heat-pump",
          description: "Combine solar with a heat pump for all-electric savings.",
          icon: Thermometer,
        },
        {
          title: "EV vs Gas Cost",
          href: "/calculators/ev-vs-gas-cost",
          description: "Compare EV and gas car total cost of ownership.",
          icon: Car,
        },
      ]}
      results={
        isCalculated && results ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Solar Investment Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ResultCard
                    label="Payback Period"
                    value={`${results.paybackPeriodYears.toFixed(1)} years`}
                    subtext="When investment breaks even"
                    icon={TrendingUp}
                    variant="highlight"
                  />
                  <ResultCard
                    label="25-Year Savings"
                    value={fmt(results.totalSavings25Year)}
                    subtext={`${results.roi25Year.toFixed(0)}% ROI`}
                    icon={DollarSign}
                    variant="savings"
                  />
                  <ResultCard
                    label="Net System Cost"
                    value={fmt(results.netSystemCost)}
                    subtext={`Gross: ${fmt(results.grossSystemCost)}`}
                    icon={DollarSign}
                  />
                  <ResultCard
                    label="Federal Tax Credit"
                    value={fmt(results.federalTaxCredit)}
                    subtext={`${(form.watch("federalTaxCreditPercent") * 100).toFixed(0)}% ITC`}
                    icon={CreditCard}
                    variant="savings"
                  />
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <ResultCard
                    label="Year 1 Savings"
                    value={`${fmt(results.annualSavingsYear1)}/yr`}
                    subtext={`${fmt(results.monthlySavingsYear1)}/month`}
                    icon={DollarSign}
                  />
                  <ResultCard
                    label="Year 1 Production"
                    value={`${results.yearOneProduction.toLocaleString()} kWh`}
                    subtext={`${results.monthlyProduction.toLocaleString()} kWh/month`}
                    icon={Sun}
                  />
                  <ResultCard
                    label="Bill Offset"
                    value={`${results.annualBillOffset.toFixed(0)}%`}
                    subtext="Of your electricity bill"
                    icon={Zap}
                  />
                </div>

                {financingType === "loan" && (
                  <>
                    <Separator />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <ResultCard
                        label="Monthly Loan Payment"
                        value={fmt(results.monthlyLoanPayment)}
                        icon={DollarSign}
                      />
                      <ResultCard
                        label="Total Interest Paid"
                        value={fmt(results.totalInterestPaid)}
                        icon={DollarSign}
                      />
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Cost Breakdown
                  </h3>
                  <ComparisonBar
                    items={results.costBreakdown.map((b: { label: string; amount: number; color?: string }) => ({
                      label: b.label,
                      value: b.amount,
                      color: b.color ?? "#16a34a",
                    }))}
                    formatValue={(v) => fmt(v)}
                  />
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-3">
                  <ResultCard
                    label="CO₂ Offset Per Year"
                    value={`${results.co2OffsetTonsPerYear.toFixed(1)} tons`}
                    icon={Leaf}
                    variant="savings"
                  />
                  <ResultCard
                    label="Lifetime CO₂ Offset"
                    value={`${results.co2OffsetTonsLifetime.toFixed(0)} tons`}
                    icon={Leaf}
                    variant="savings"
                  />
                  <ResultCard
                    label="Equivalent Trees"
                    value={`${results.treesEquivalent.toLocaleString()}`}
                    subtext="Trees planted equivalent"
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
        {/* System Size & Cost */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            System Size & Cost
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="System Size"
              min={1}
              max={50}
              step={0.5}
              value={form.watch("systemSizeKw")}
              onChange={(v) => form.setValue("systemSizeKw", v)}
              unit="kW"
            />
            <RangeInput
              label="Cost per Watt"
              tooltip="Installed cost per watt (before incentives)"
              min={1}
              max={10}
              step={0.05}
              value={form.watch("costPerWatt")}
              onChange={(v) => form.setValue("costPerWatt", v)}
              unit="$/W"
            />
          </div>
        </div>

        <Separator />

        {/* Electricity & Production */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Electricity & Production
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="Monthly Electric Bill"
              min={10}
              max={2000}
              step={10}
              value={form.watch("monthlyElectricBill")}
              onChange={(v) => form.setValue("monthlyElectricBill", v)}
              unit="$"
            />
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
              label="Average Sun Hours"
              tooltip="Peak sun hours per day in your area"
              min={1}
              max={10}
              step={0.5}
              value={form.watch("avgSunHours")}
              onChange={(v) => form.setValue("avgSunHours", v)}
              unit="hrs/day"
            />
            <RangeInput
              label="Annual Production per kW"
              tooltip="kWh produced per kW of system capacity per year"
              min={500}
              max={2000}
              step={50}
              value={form.watch("annualProductionPerKw")}
              onChange={(v) => form.setValue("annualProductionPerKw", v)}
              unit="kWh/kW"
            />
            <RangeInput
              label="Annual Rate Increase"
              tooltip="Expected annual increase in electricity rates"
              min={0}
              max={0.15}
              step={0.005}
              value={form.watch("annualRateIncrease")}
              onChange={(v) => form.setValue("annualRateIncrease", v)}
              unit="%/yr"
            />
            <RangeInput
              label="Panel Degradation"
              tooltip="Annual panel output degradation (typically ~0.5%)"
              min={0}
              max={0.02}
              step={0.001}
              value={form.watch("systemDegradation")}
              onChange={(v) => form.setValue("systemDegradation", v)}
              unit="%/yr"
            />
          </div>
        </div>

        <Separator />

        {/* Roof & Net Metering */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Roof & Net Metering
          </h3>
          <div className="space-y-4">
            <InputGroup label="Roof Direction" tooltip="The direction your main roof faces">
              <Select
                value={form.watch("roofDirection")}
                onValueChange={(v) =>
                  form.setValue("roofDirection", v as "south" | "southwest" | "southeast" | "west" | "east" | "flat")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="south">South (Optimal)</SelectItem>
                  <SelectItem value="southwest">Southwest</SelectItem>
                  <SelectItem value="southeast">Southeast</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="flat">Flat Roof</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            <div className="flex items-center gap-3">
              <Switch
                checked={form.watch("netMetering")}
                onCheckedChange={(v) => form.setValue("netMetering", v)}
              />
              <Label>Net metering available</Label>
            </div>

            {form.watch("netMetering") && (
              <RangeInput
                label="Net Metering Rate"
                tooltip="Rate paid for excess solar energy sent to the grid"
                min={0}
                max={1.0}
                step={0.01}
                value={form.watch("netMeteringRate")}
                onChange={(v) => form.setValue("netMeteringRate", v)}
                unit="$/kWh"
              />
            )}
          </div>
        </div>

        <Separator />

        {/* Incentives */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Incentives
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <RangeInput
              label="Federal Tax Credit"
              tooltip="ITC percentage (currently 30%)"
              min={0}
              max={0.5}
              step={0.01}
              value={form.watch("federalTaxCreditPercent")}
              onChange={(v) => form.setValue("federalTaxCreditPercent", v)}
              unit="%"
            />
            <RangeInput
              label="State Tax Credit"
              min={0}
              max={50000}
              step={500}
              value={form.watch("stateTaxCredit")}
              onChange={(v) => form.setValue("stateTaxCredit", v)}
              unit="$"
            />
            <RangeInput
              label="SREC Annual Value"
              tooltip="Annual solar renewable energy certificate value"
              min={0}
              max={10000}
              step={100}
              value={form.watch("srecAnnualValue")}
              onChange={(v) => form.setValue("srecAnnualValue", v)}
              unit="$/yr"
            />
          </div>
        </div>

        <Separator />

        {/* Financing */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Financing
          </h3>
          <div className="space-y-4">
            <InputGroup label="Financing Type">
              <Select
                value={financingType}
                onValueChange={(v) =>
                  form.setValue("financingType", v as "cash" | "loan" | "lease")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash Purchase</SelectItem>
                  <SelectItem value="loan">Solar Loan</SelectItem>
                  <SelectItem value="lease">Lease / PPA</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            {financingType === "loan" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <RangeInput
                  label="Loan Interest Rate"
                  min={0}
                  max={20}
                  step={0.25}
                  value={form.watch("loanRate")}
                  onChange={(v) => form.setValue("loanRate", v)}
                  unit="%"
                />
                <RangeInput
                  label="Loan Term"
                  min={1}
                  max={30}
                  step={1}
                  value={form.watch("loanTermYears")}
                  onChange={(v) => form.setValue("loanTermYears", v)}
                  unit="years"
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* System Lifetime & Maintenance */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            System Lifetime
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <RangeInput
              label="System Life"
              min={10}
              max={40}
              step={1}
              value={form.watch("systemLifeYears")}
              onChange={(v) => form.setValue("systemLifeYears", v)}
              unit="years"
            />
            <RangeInput
              label="Inverter Replacement Cost"
              min={0}
              max={10000}
              step={100}
              value={form.watch("inverterReplacementCost")}
              onChange={(v) => form.setValue("inverterReplacementCost", v)}
              unit="$"
            />
            <RangeInput
              label="Inverter Replacement Year"
              min={5}
              max={30}
              step={1}
              value={form.watch("inverterReplacementYear")}
              onChange={(v) => form.setValue("inverterReplacementYear", v)}
              unit="year"
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
            <Sun className="mr-2 size-4" />
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
