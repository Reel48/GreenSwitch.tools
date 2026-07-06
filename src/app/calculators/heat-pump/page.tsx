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
import { heatPumpSchema } from "@/calculators/heat-pump/schema";
import { heatPumpDefaults } from "@/calculators/heat-pump/defaults";
import { calculateHeatPump } from "@/calculators/heat-pump/calculate";
import {
  Thermometer,
  TrendingDown,
  Leaf,
  Zap,
  Sun,
  Car,
  Flame,
  Home,
  Wrench,
  Clock,
  CreditCard,
  RotateCcw,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function HeatPumpPage() {
  const { form, results, onReset } = useCalculator({
    schema: heatPumpSchema,
    defaults: heatPumpDefaults,
    calculate: calculateHeatPump,
    storageKey: "heat-pump-v2",
  });

  const fuelType = form.watch("currentFuelType");
  const includeAC = form.watch("includeACSavings");

  return (
    <CalculatorShell
      title="Heat Pump Savings Calculator"
      description="Compare the cost of heating with a heat pump versus a traditional furnace. Includes installation costs, operating expenses, incentives, and environmental impact."
      lastUpdated="June 2026"
      url="/calculators/heat-pump"
      howToSteps={[
        {
          name: "Select climate and home size",
          text: "Choose your IECC climate zone and enter your home's square footage.",
        },
        {
          name: "Enter current heating system",
          text: "Select your fuel type (gas, propane, oil, or electric) and enter fuel and electricity rates.",
        },
        {
          name: "Set equipment performance",
          text: "Enter the heat pump COP and furnace AFUE efficiency ratings.",
        },
        {
          name: "Input installation costs",
          text: "Enter the installed cost for the heat pump and comparable furnace.",
        },
        {
          name: "Add incentives",
          text: "Enter any state or utility heat pump rebates you qualify for. The federal 25C credit ended December 31, 2025, so it defaults to $0.",
        },
        {
          name: "Review your savings",
          text: "Results update instantly as you adjust any input — compare annual heating costs, lifetime savings, and payback period.",
        },
      ]}
      methodology={`This calculator compares heat pump and furnace heating costs based on your climate zone's Heating Degree Days (HDD). Heating load is estimated from home size and HDD values for your IECC climate zone. Heat pump costs are calculated from the load divided by COP × electricity rate. Furnace costs use the load divided by efficiency × fuel rate. Year-over-year cost escalation is applied to both fuel and electricity. If AC savings are included, the heat pump's cooling COP is used to estimate savings versus conventional AC. Note on incentives: the federal 25C heat pump credit of up to $2,000 ended December 31, 2025 — systems placed in service after that date do not qualify, so the federal credit defaults to $0. Many states and utilities still offer heat pump rebates, including state-administered Home Energy Rebates programs; enter whatever you qualify for.`}
      faqs={[
        {
          question: "Are heat pumps effective in cold climates?",
          answer:
            "Modern cold-climate heat pumps work efficiently down to -15°F. While efficiency decreases in extreme cold, they still outperform resistance heating and can be paired with a backup furnace for the coldest days.",
        },
        {
          question: "What is COP and why does it matter?",
          answer:
            "COP (Coefficient of Performance) measures heat pump efficiency. A COP of 3.0 means the heat pump produces 3 units of heat for every 1 unit of electricity consumed, making it 3x more efficient than electric resistance heating.",
        },
        {
          question: "Are there still incentives for heat pumps?",
          answer:
            "The federal 25C tax credit of up to $2,000 ended December 31, 2025 — heat pumps installed after that date don't qualify (those installed by the deadline can still be claimed on that year's return). What remains: state-administered Home Energy Rebates in participating states (worth up to $8,000 for income-qualifying households), plus state and utility rebate programs such as Mass Save and Efficiency Maine. Check your state energy office and utility for current offerings.",
        },
        {
          question: "Can a heat pump replace both my furnace and AC?",
          answer:
            "Yes. Heat pumps provide both heating and cooling, replacing both a furnace and central AC unit. This dual functionality is one of their biggest advantages.",
        },
      ]}
      byState={<StateLinksSection calculator="heat-pump" />}
      relatedCalculators={[
        {
          title: "Solar Payback",
          href: "/calculators/solar-payback",
          description:
            "Pair solar panels with your heat pump for maximum savings.",
          icon: Sun,
        },
        {
          title: "EV vs Gas Cost",
          href: "/calculators/ev-vs-gas-cost",
          description: "Complete your electrification with an EV comparison.",
          icon: Car,
        },
        {
          title: "EV Charging Cost",
          href: "/calculators/ev-charging-cost",
          description: "Calculate EV charging costs alongside your heat pump.",
          icon: Zap,
        },
      ]}
      mobileSummary={
        results ? (
          <MobileSummaryBar
            label={
              results.totalSavings > 0
                ? `Heat pump savings over ${form.watch("ownershipYears")} years`
                : `Extra heat pump cost`
            }
            value={fmt(Math.abs(results.totalSavings))}
            tone={results.totalSavings > 0 ? "positive" : "negative"}
          />
        ) : undefined
      }
      results={
        results ? (
          <div className="space-y-4">
            <VerdictBanner
              headline={
                results.totalSavings > 0
                  ? "The heat pump saves you"
                  : "The furnace costs less by"
              }
              amount={Math.abs(results.totalSavings)}
              caption={`over ${form.watch("ownershipYears")} years`}
              tone={results.totalSavings > 0 ? "positive" : "negative"}
              detail={
                results.paybackYears ? (
                  <Badge variant="secondary">
                    Pays for itself in {results.paybackYears.toFixed(1)} years
                  </Badge>
                ) : undefined
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
                  labelA="Heat pump"
                  labelB="Furnace"
                  breakEvenYear={results.paybackYears}
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
                    label="Total Heat Pump Cost"
                    value={fmt(results.totalCostHP)}
                    subtext={`Over ${form.watch("ownershipYears")} years`}
                    icon={Thermometer}
                    variant="highlight"
                  />
                  <ResultCard
                    label="Total Furnace Cost"
                    value={fmt(results.totalCostFurnace)}
                    subtext={`Over ${form.watch("ownershipYears")} years`}
                    icon={Flame}
                  />
                  <ResultCard
                    label="Heat Pump Heating Cost"
                    value={`${fmt(results.annualHeatingCostHP)}/yr`}
                    subtext={`${fmt(results.monthlyHeatingCostHP)}/month`}
                    icon={Thermometer}
                  />
                  <ResultCard
                    label="Furnace Heating Cost"
                    value={`${fmt(results.annualHeatingCostFurnace)}/yr`}
                    subtext={`${fmt(results.monthlyHeatingCostFurnace)}/month`}
                    icon={Flame}
                  />
                  {results.annualCoolingSavings > 0 && (
                    <ResultCard
                      label="AC Cooling Savings"
                      value={`${fmt(results.annualCoolingSavings)}/yr`}
                      subtext="Heat pump cooling efficiency"
                      icon={Zap}
                      variant="savings"
                    />
                  )}
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">Cost Breakdown</h3>
                  <ComparisonBar
                    items={results.costBreakdown.map(
                      (b: {
                        label: string;
                        amount: number;
                        color?: string;
                      }) => ({
                        label: b.label,
                        value: b.amount,
                        color: b.color ?? "var(--chart-1)",
                      }),
                    )}
                    formatValue={(v) => fmt(v)}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultCard
                    label="CO₂ Reduction"
                    value={`${results.co2ReductionTons.toFixed(1)} tons/yr`}
                    subtext={`${results.co2ReductionPercent.toFixed(0)}% reduction`}
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
        <InputSection title="Climate & Home" icon={Home}>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputGroup
              label="Climate Zone"
              tooltip="IECC climate zone (e.g. 4A, 5A, 6A)"
            >
              <Select
                value={form.watch("climateZone")}
                onValueChange={(v) => form.setValue("climateZone", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1A">
                    1A - Very Hot Humid (Miami)
                  </SelectItem>
                  <SelectItem value="2A">2A - Hot Humid (Houston)</SelectItem>
                  <SelectItem value="2B">2B - Hot Dry (Phoenix)</SelectItem>
                  <SelectItem value="3A">3A - Warm Humid (Atlanta)</SelectItem>
                  <SelectItem value="3B">3B - Warm Dry (Las Vegas)</SelectItem>
                  <SelectItem value="3C">
                    3C - Warm Marine (San Francisco)
                  </SelectItem>
                  <SelectItem value="4A">4A - Mixed Humid (DC/NYC)</SelectItem>
                  <SelectItem value="4B">
                    4B - Mixed Dry (Albuquerque)
                  </SelectItem>
                  <SelectItem value="4C">
                    4C - Mixed Marine (Seattle)
                  </SelectItem>
                  <SelectItem value="5A">5A - Cool Humid (Chicago)</SelectItem>
                  <SelectItem value="5B">5B - Cool Dry (Denver)</SelectItem>
                  <SelectItem value="6A">
                    6A - Cold Humid (Minneapolis)
                  </SelectItem>
                  <SelectItem value="6B">6B - Cold Dry (Helena)</SelectItem>
                  <SelectItem value="7">7 - Very Cold (Duluth)</SelectItem>
                  <SelectItem value="8">8 - Subarctic (Fairbanks)</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>
            <RangeInput
              label="Home Size"
              min={500}
              max={10000}
              step={100}
              value={form.watch("homeSqFt")}
              onChange={(v) => form.setValue("homeSqFt", v)}
              unit="sq ft"
            />
          </div>
        </InputSection>

        <InputSection title="Current Heating System" icon={Flame}>
          <div className="space-y-4">
            <InputGroup label="Current Fuel Type">
              <Select
                value={fuelType}
                onValueChange={(v) =>
                  form.setValue(
                    "currentFuelType",
                    v as
                      | "natural_gas"
                      | "propane"
                      | "oil"
                      | "electric_resistance",
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural_gas">Natural Gas</SelectItem>
                  <SelectItem value="propane">Propane</SelectItem>
                  <SelectItem value="oil">Heating Oil</SelectItem>
                  <SelectItem value="electric_resistance">
                    Electric Resistance
                  </SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            <div className="grid gap-4 sm:grid-cols-2">
              {fuelType === "natural_gas" && (
                <RangeInput
                  label="Gas Rate"
                  min={0.01}
                  max={10}
                  step={0.1}
                  value={form.watch("gasRate")}
                  onChange={(v) => form.setValue("gasRate", v)}
                  unit="$/therm"
                />
              )}
              {fuelType === "propane" && (
                <RangeInput
                  label="Propane Rate"
                  min={0.5}
                  max={10}
                  step={0.1}
                  value={form.watch("propaneRate")}
                  onChange={(v) => form.setValue("propaneRate", v)}
                  unit="$/gal"
                />
              )}
              {fuelType === "oil" && (
                <RangeInput
                  label="Oil Rate"
                  min={1}
                  max={15}
                  step={0.1}
                  value={form.watch("oilRate")}
                  onChange={(v) => form.setValue("oilRate", v)}
                  unit="$/gal"
                />
              )}
              <RangeInput
                label="Electricity Rate"
                min={0.01}
                max={1.0}
                step={0.01}
                value={form.watch("electricityRate")}
                onChange={(v) => form.setValue("electricityRate", v)}
                unit="$/kWh"
              />
            </div>
          </div>
        </InputSection>

        <InputSection title="Equipment Performance" icon={Thermometer}>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="Heat Pump COP"
              tooltip="Coefficient of Performance (higher = more efficient)"
              min={1.5}
              max={5}
              step={0.1}
              value={form.watch("heatPumpCOP")}
              onChange={(v) => form.setValue("heatPumpCOP", v)}
            />
            <RangeInput
              label="Furnace Efficiency (AFUE)"
              tooltip="Annual Fuel Utilization Efficiency"
              min={0.7}
              max={0.98}
              step={0.01}
              value={form.watch("furnaceEfficiency")}
              onChange={(v) => form.setValue("furnaceEfficiency", v)}
            />
          </div>
        </InputSection>

        <AdvancedSections>
          <AdvancedSection title="Installation Costs" icon={Wrench}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Heat Pump Install Cost"
                min={0}
                max={50000}
                step={500}
                value={form.watch("heatPumpInstallCost")}
                onChange={(v) => form.setValue("heatPumpInstallCost", v)}
                unit="$"
              />
              <RangeInput
                label="Furnace Install Cost"
                min={0}
                max={30000}
                step={500}
                value={form.watch("furnaceInstallCost")}
                onChange={(v) => form.setValue("furnaceInstallCost", v)}
                unit="$"
              />
            </div>
          </AdvancedSection>

          <AdvancedSection title="Cooling Savings" icon={Zap}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={includeAC}
                  onCheckedChange={(v) => form.setValue("includeACSavings", v)}
                />
                <Label>Include AC cooling savings</Label>
              </div>

              {includeAC && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <RangeInput
                    label="Current Annual AC Cost"
                    min={0}
                    max={5000}
                    step={50}
                    value={form.watch("currentACCost")}
                    onChange={(v) => form.setValue("currentACCost", v)}
                    unit="$"
                  />
                  <RangeInput
                    label="Heat Pump Cooling COP"
                    tooltip="Cooling efficiency (higher = better)"
                    min={2}
                    max={8}
                    step={0.1}
                    value={form.watch("heatPumpCoolingCOP")}
                    onChange={(v) => form.setValue("heatPumpCoolingCOP", v)}
                  />
                </div>
              )}
            </div>
          </AdvancedSection>

          <AdvancedSection title="Ownership & Maintenance" icon={Clock}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Ownership Period"
                min={1}
                max={30}
                step={1}
                value={form.watch("ownershipYears")}
                onChange={(v) => form.setValue("ownershipYears", v)}
                unit="years"
              />
              <RangeInput
                label="Heat Pump Maintenance"
                min={0}
                max={2000}
                step={25}
                value={form.watch("annualMaintenanceHP")}
                onChange={(v) => form.setValue("annualMaintenanceHP", v)}
                unit="$/yr"
              />
              <RangeInput
                label="Furnace Maintenance"
                min={0}
                max={2000}
                step={25}
                value={form.watch("annualMaintenanceFurnace")}
                onChange={(v) => form.setValue("annualMaintenanceFurnace", v)}
                unit="$/yr"
              />
            </div>
          </AdvancedSection>

          <AdvancedSection title="Price Escalation" icon={TrendingDown}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Annual Fuel Price Increase"
                min={0}
                max={0.15}
                step={0.005}
                value={form.watch("fuelEscalation")}
                onChange={(v) => form.setValue("fuelEscalation", v)}
                unit="%/yr"
              />
              <RangeInput
                label="Annual Electricity Price Increase"
                min={0}
                max={0.15}
                step={0.005}
                value={form.watch("electricityEscalation")}
                onChange={(v) => form.setValue("electricityEscalation", v)}
                unit="%/yr"
              />
            </div>
          </AdvancedSection>

          <AdvancedSection title="Incentives & Location" icon={CreditCard}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Federal Tax Credit"
                tooltip="The federal 25C credit ended Dec 31, 2025 — leave at $0 unless your system was installed by then"
                min={0}
                max={10000}
                step={100}
                value={form.watch("federalTaxCredit")}
                onChange={(v) => form.setValue("federalTaxCredit", v)}
                unit="$"
              />
              <RangeInput
                label="State Tax Credit"
                min={0}
                max={10000}
                step={100}
                value={form.watch("stateTaxCredit")}
                onChange={(v) => form.setValue("stateTaxCredit", v)}
                unit="$"
              />
              <InputGroup label="State Code" tooltip="Two-letter state code">
                <Input
                  className="w-24"
                  maxLength={2}
                  value={form.watch("stateCode")}
                  onChange={(e) =>
                    form.setValue("stateCode", e.target.value.toUpperCase())
                  }
                />
              </InputGroup>
            </div>
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
