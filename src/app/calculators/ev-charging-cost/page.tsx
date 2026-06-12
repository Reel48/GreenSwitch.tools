"use client";

import { useCalculator } from "@/hooks/use-calculator";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
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
import { evChargingSchema } from "@/calculators/ev-charging/schema";
import { evChargingDefaults } from "@/calculators/ev-charging/defaults";
import { calculateEvCharging } from "@/calculators/ev-charging/calculate";
import {
  Zap,
  DollarSign,
  TrendingUp,
  Leaf,
  Car,
  Sun,
  Clock,
  CreditCard,
  Fuel,
  Plug,
  MapPin,
  RotateCcw,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function EvChargingCostPage() {
  const { form, results, onReset } = useCalculator({
    schema: evChargingSchema,
    defaults: evChargingDefaults,
    calculate: calculateEvCharging,
    storageKey: "ev-charging-cost",
  });

  const hasTouRates = form.watch("hasTouRates");
  const chargerLevel = form.watch("chargerLevel");
  const evWins = results ? results.annualSavingsVsGas > 0 : true;

  return (
    <CalculatorShell
      title="EV Charging Cost Calculator"
      description="Calculate your electric vehicle charging costs at home and on-the-go, compare with gas costs, and estimate your savings with different charging setups."
      lastUpdated="June 2026"
      url="/calculators/ev-charging-cost"
      howToSteps={[
        {
          name: "Enter driving habits",
          text: "Input your annual miles driven and EV efficiency (kWh per 100 miles).",
        },
        {
          name: "Set electricity rates",
          text: "Enter your flat electricity rate, or enable time-of-use pricing with off-peak and on-peak rates.",
        },
        {
          name: "Choose charger setup",
          text: "Select Level 1 or Level 2 home charging and enter any installation costs.",
        },
        {
          name: "Add public charging",
          text: "Set the percentage of charging done at public stations and the public charging rate.",
        },
        {
          name: "Enter gas comparison",
          text: "Input gas price and a comparable gas car's MPG to see fuel cost savings.",
        },
        {
          name: "Review your costs",
          text: "Results update instantly as you adjust any input — see your annual charging cost, gas savings, and cost per mile.",
        },
      ]}
      methodology={`This calculator estimates annual EV charging costs based on your driving habits and electricity rates. Energy consumption is calculated as (annual miles / 100) × EV efficiency (kWh/100mi). Costs are split between home and public charging based on your specified percentages. For time-of-use (TOU) rates, the effective rate is the weighted average of off-peak and on-peak rates. Gas comparison uses standard MPG calculations. Charging times are estimated at 1.4 kW for Level 1 and 7.6 kW for Level 2. CO₂ savings use EPA averages: 0.855 lbs CO₂/kWh for the grid and 19.6 lbs CO₂/gallon of gasoline.`}
      faqs={[
        {
          question: "How much does it cost to charge an EV at home?",
          answer:
            "At the average US electricity rate of ~$0.16/kWh, charging at home costs about $500-700 per year for a typical driver (12,000 miles). That's equivalent to about $1.50 per gallon of gas. With time-of-use rates, you can charge off-peak for even less.",
        },
        {
          question: "Is Level 2 charging worth the installation cost?",
          answer:
            "For most EV owners, yes. Level 2 (240V) chargers deliver 25-30 miles of range per hour vs. 3-5 for Level 1. The $800-2,000 installation cost typically pays for itself through convenience and the ability to take advantage of off-peak electricity rates. Note: the federal 30C charger credit (30% up to $1,000, limited to eligible census tracts) expires June 30, 2026 — equipment placed in service after that date won't qualify — and some utilities offer their own charger rebates.",
        },
        {
          question: "How much more expensive is public charging?",
          answer:
            "Public DC fast charging typically costs $0.30-0.60/kWh — 2-3x more than home charging. However, it adds range quickly (200+ miles per hour). Minimizing public charging and charging at home maximizes your savings.",
        },
        {
          question: "What are time-of-use (TOU) electricity rates?",
          answer:
            "TOU rates vary by time of day. Off-peak hours (usually overnight) can be 50-70% cheaper than peak rates. Since EVs can charge overnight, TOU plans are ideal for EV owners and can cut charging costs significantly.",
        },
      ]}
      relatedCalculators={[
        {
          title: "EV vs Gas Cost",
          href: "/calculators/ev-vs-gas-cost",
          description: "Compare full EV vs gas car ownership costs.",
          icon: Car,
        },
        {
          title: "Solar Payback",
          href: "/calculators/solar-payback",
          description: "Charge your EV with solar for near-free fuel.",
          icon: Sun,
        },
        {
          title: "EV Tax Credit",
          href: "/calculators/ev-tax-credit",
          description: "Check your eligibility for EV tax credits.",
          icon: CreditCard,
        },
      ]}
      mobileSummary={
        results ? (
          <MobileSummaryBar
            label="Annual savings vs gas"
            value={fmt(Math.abs(results.annualSavingsVsGas))}
            tone={results.annualSavingsVsGas > 0 ? "positive" : "negative"}
          />
        ) : undefined
      }
      results={
        results ? (
          <div className="space-y-4">
            <VerdictBanner
              headline={
                evWins ? "Charging beats gas by" : "Charging costs more by"
              }
              amount={Math.abs(results.annualSavingsVsGas)}
              caption="per year vs. a comparable gas car"
              tone={evWins ? "positive" : "negative"}
              detail={
                <>
                  <Badge variant="secondary">
                    ${results.costPerMile.toFixed(2)}/mile vs $
                    {results.gasCostPerMile.toFixed(2)} gas
                  </Badge>
                  {evWins && (
                    <Badge variant="secondary">
                      {fmt(results.monthlySavingsVsGas)}/month
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
                  labelA="EV charging"
                  labelB="Gas fill-ups"
                  breakEvenYear={
                    results.totalSetupCost > 0 && results.setupPaybackMonths > 0
                      ? Math.ceil(results.setupPaybackMonths / 12)
                      : null
                  }
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
                    label="Annual Charging Cost"
                    value={fmt(results.annualChargingCost)}
                    subtext={`${fmt(results.monthlyChargingCost)}/month`}
                    icon={Zap}
                    variant="highlight"
                  />
                  <ResultCard
                    label="Cost per Mile"
                    value={`$${results.costPerMile.toFixed(2)}`}
                    subtext={`vs $${results.gasCostPerMile.toFixed(2)} for gas`}
                    icon={DollarSign}
                  />
                  <ResultCard
                    label="Annual Savings vs Gas"
                    value={fmt(results.annualSavingsVsGas)}
                    subtext={`${fmt(results.monthlySavingsVsGas)}/month`}
                    icon={DollarSign}
                    variant={
                      results.annualSavingsVsGas > 0 ? "savings" : "default"
                    }
                  />
                  <ResultCard
                    label="CO₂ Savings"
                    value={`${results.co2SavingsVsGasTons} tons/yr`}
                    subtext="Compared to gasoline"
                    icon={Leaf}
                    variant="savings"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultCard
                    label="Home Charging Cost"
                    value={`${fmt(results.homeChargingCostAnnual)}/yr`}
                    icon={Zap}
                  />
                  <ResultCard
                    label="Public Charging Cost"
                    value={`${fmt(results.publicChargingCostAnnual)}/yr`}
                    icon={Zap}
                  />
                  <ResultCard
                    label="Effective Rate"
                    value={`$${results.effectiveRate.toFixed(3)}/kWh`}
                    subtext="Blended home + public"
                    icon={DollarSign}
                  />
                  {hasTouRates && results.touSavingsAnnual > 0 && (
                    <ResultCard
                      label="TOU Savings"
                      value={`${fmt(results.touSavingsAnnual)}/yr`}
                      subtext="Savings from off-peak charging"
                      icon={TrendingUp}
                      variant="savings"
                    />
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultCard
                    label="Level 1 Charging Time"
                    value={`${results.level1HoursPerDay} hrs/day`}
                    subtext="120V standard outlet"
                    icon={Clock}
                  />
                  <ResultCard
                    label="Level 2 Charging Time"
                    value={`${results.level2HoursPerDay} hrs/day`}
                    subtext="240V dedicated charger"
                    icon={Clock}
                  />
                </div>

                {results.totalSetupCost > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ResultCard
                      label="Charger Setup Cost"
                      value={fmt(results.totalSetupCost)}
                      subtext="Hardware + installation"
                      icon={DollarSign}
                    />
                    <ResultCard
                      label="Setup Payback"
                      value={`${results.setupPaybackMonths} months`}
                      subtext="Based on gas savings"
                      icon={TrendingUp}
                    />
                  </div>
                )}

                <div>
                  <h3 className="mb-3 text-sm font-semibold">
                    Cost Comparison
                  </h3>
                  <ComparisonBar
                    items={results.costComparison.map((b) => ({
                      label: b.label,
                      value: b.amount,
                      color: b.color ?? "var(--chart-1)",
                    }))}
                    formatValue={(v) => fmt(v)}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultCard
                    label="Annual Energy Used"
                    value={`${results.annualKwhUsed.toLocaleString()} kWh`}
                    subtext={`${results.monthlyKwhUsed} kWh/month`}
                    icon={Zap}
                  />
                  <ResultCard
                    label="Daily Charging Cost"
                    value={`$${results.dailyChargingCost.toFixed(2)}`}
                    subtext={`${results.dailyKwhNeeded} kWh/day`}
                    icon={DollarSign}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6">
        <InputSection title="Driving & Vehicle" icon={Car}>
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
              label="EV Efficiency"
              tooltip="Energy consumption in kWh per 100 miles"
              min={15}
              max={50}
              step={1}
              value={form.watch("evEfficiency")}
              onChange={(v) => form.setValue("evEfficiency", v)}
              unit="kWh/100mi"
            />
          </div>
        </InputSection>

        <InputSection title="Electricity Rates" icon={Zap}>
          <div className="space-y-4">
            <RangeInput
              label="Flat Electricity Rate"
              min={0.01}
              max={1.0}
              step={0.01}
              value={form.watch("electricityRate")}
              onChange={(v) => form.setValue("electricityRate", v)}
              unit="$/kWh"
            />

            <div className="flex items-center gap-3">
              <Switch
                checked={hasTouRates}
                onCheckedChange={(v) => form.setValue("hasTouRates", v)}
              />
              <Label>I have time-of-use (TOU) rates</Label>
            </div>

            {hasTouRates && (
              <div className="grid gap-4 sm:grid-cols-3">
                <RangeInput
                  label="Off-Peak Rate"
                  min={0.01}
                  max={0.5}
                  step={0.01}
                  value={form.watch("touOffPeakRate")}
                  onChange={(v) => form.setValue("touOffPeakRate", v)}
                  unit="$/kWh"
                />
                <RangeInput
                  label="On-Peak Rate"
                  min={0.05}
                  max={1.0}
                  step={0.01}
                  value={form.watch("touOnPeakRate")}
                  onChange={(v) => form.setValue("touOnPeakRate", v)}
                  unit="$/kWh"
                />
                <RangeInput
                  label="Off-Peak Charging"
                  tooltip="Percentage of home charging done during off-peak hours"
                  min={0}
                  max={100}
                  step={5}
                  value={form.watch("offPeakChargePercent")}
                  onChange={(v) => form.setValue("offPeakChargePercent", v)}
                  unit="%"
                />
              </div>
            )}
          </div>
        </InputSection>

        <InputSection title="Gas Comparison" icon={Fuel}>
          <div className="grid gap-4 sm:grid-cols-2">
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
              label="Comparable Gas MPG"
              tooltip="MPG of a comparable gas vehicle for savings comparison"
              min={10}
              max={60}
              step={1}
              value={form.watch("compareMpg")}
              onChange={(v) => form.setValue("compareMpg", v)}
              unit="mpg"
            />
          </div>
        </InputSection>

        <AdvancedSections>
          <AdvancedSection title="Charger Setup" icon={Plug}>
            <div className="space-y-4">
              <InputGroup
                label="Charger Level"
                tooltip="Level 1 uses a standard 120V outlet; Level 2 requires a 240V circuit"
              >
                <Select
                  value={chargerLevel}
                  onValueChange={(v) =>
                    form.setValue("chargerLevel", v as "level1" | "level2")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="level1">
                      Level 1 (120V — Standard Outlet)
                    </SelectItem>
                    <SelectItem value="level2">
                      Level 2 (240V — Dedicated Charger)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </InputGroup>

              {chargerLevel === "level2" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <RangeInput
                    label="Installation Cost"
                    tooltip="Electrical work for 240V circuit"
                    min={0}
                    max={5000}
                    step={100}
                    value={form.watch("level2InstallCost")}
                    onChange={(v) => form.setValue("level2InstallCost", v)}
                    unit="$"
                  />
                  <RangeInput
                    label="Charger Hardware Cost"
                    min={0}
                    max={3000}
                    step={50}
                    value={form.watch("chargerHardwareCost")}
                    onChange={(v) => form.setValue("chargerHardwareCost", v)}
                    unit="$"
                  />
                </div>
              )}
            </div>
          </AdvancedSection>

          <AdvancedSection title="Public Charging" icon={MapPin}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Public Charging"
                tooltip="Percentage of total charging done at public stations"
                min={0}
                max={100}
                step={5}
                value={form.watch("publicChargingPercent")}
                onChange={(v) => form.setValue("publicChargingPercent", v)}
                unit="%"
              />
              <RangeInput
                label="Public Charging Rate"
                min={0.1}
                max={1.0}
                step={0.05}
                value={form.watch("publicChargingRate")}
                onChange={(v) => form.setValue("publicChargingRate", v)}
                unit="$/kWh"
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
