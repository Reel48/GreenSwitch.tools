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
import { heatPumpSchema } from "@/calculators/heat-pump/schema";
import { heatPumpDefaults } from "@/calculators/heat-pump/defaults";
import { calculateHeatPump } from "@/calculators/heat-pump/calculate";
import {
  Thermometer,
  DollarSign,
  TrendingDown,
  Leaf,
  Zap,
  Sun,
  Car,
  CreditCard,
  Flame,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function HeatPumpPage() {
  const { form, results, isCalculated, onCalculate, onReset } = useCalculator({
    schema: heatPumpSchema,
    defaults: heatPumpDefaults,
    calculate: calculateHeatPump,
    storageKey: "heat-pump",
  });

  const fuelType = form.watch("currentFuelType");
  const includeAC = form.watch("includeACSavings");

  return (
    <CalculatorShell
      title="Heat Pump Savings Calculator"
      description="Compare the cost of heating with a heat pump versus a traditional furnace. Includes installation costs, operating expenses, incentives, and environmental impact."
      lastUpdated="March 2025"
      url="/calculators/heat-pump"
      howToSteps={[
        { name: "Select climate and home size", text: "Choose your IECC climate zone and enter your home's square footage." },
        { name: "Enter current heating system", text: "Select your fuel type (gas, propane, oil, or electric) and enter fuel and electricity rates." },
        { name: "Set equipment performance", text: "Enter the heat pump COP and furnace AFUE efficiency ratings." },
        { name: "Input installation costs", text: "Enter the installed cost for the heat pump and comparable furnace." },
        { name: "Add incentives", text: "Apply the federal heat pump tax credit (up to $2,000) and any state credits." },
        { name: "Calculate savings", text: "Click Calculate to compare annual heating costs, lifetime savings, and payback period." },
      ]}
      methodology={`This calculator compares heat pump and furnace heating costs based on your climate zone's Heating Degree Days (HDD). Heating load is estimated from home size and HDD values for your IECC climate zone. Heat pump costs are calculated from the load divided by COP × electricity rate. Furnace costs use the load divided by efficiency × fuel rate. Year-over-year cost escalation is applied to both fuel and electricity. If AC savings are included, the heat pump's cooling COP is used to estimate savings versus conventional AC. The federal IRA heat pump tax credit of up to $2,000 is available for qualifying installations.`}
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
          question: "What federal incentives are available for heat pumps?",
          answer:
            "The Inflation Reduction Act provides a tax credit of up to $2,000 for qualifying heat pump installations. Additional rebates of up to $8,000 may be available through the HOMES program for income-qualifying households.",
        },
        {
          question: "Can a heat pump replace both my furnace and AC?",
          answer:
            "Yes. Heat pumps provide both heating and cooling, replacing both a furnace and central AC unit. This dual functionality is one of their biggest advantages.",
        },
      ]}
      relatedCalculators={[
        {
          title: "Solar Payback",
          href: "/calculators/solar-payback",
          description: "Pair solar panels with your heat pump for maximum savings.",
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
      results={
        isCalculated && results ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Heat Pump vs Furnace Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    label="Total Savings"
                    value={fmt(results.totalSavings)}
                    subtext={results.totalSavings > 0 ? "By choosing a heat pump" : "Furnace is cheaper"}
                    icon={DollarSign}
                    variant={results.totalSavings > 0 ? "savings" : "default"}
                  />
                  <ResultCard
                    label="Payback Period"
                    value={
                      results.paybackYears
                        ? `${results.paybackYears.toFixed(1)} years`
                        : "N/A"
                    }
                    subtext={
                      results.paybackYears
                        ? "When heat pump breaks even"
                        : "Doesn't break even in this period"
                    }
                    icon={TrendingDown}
                  />
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

                <div className="grid gap-4 sm:grid-cols-2">
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
        {/* Climate & Home */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Climate & Home
          </h3>
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
                  <SelectItem value="1A">1A - Very Hot Humid (Miami)</SelectItem>
                  <SelectItem value="2A">2A - Hot Humid (Houston)</SelectItem>
                  <SelectItem value="2B">2B - Hot Dry (Phoenix)</SelectItem>
                  <SelectItem value="3A">3A - Warm Humid (Atlanta)</SelectItem>
                  <SelectItem value="3B">3B - Warm Dry (Las Vegas)</SelectItem>
                  <SelectItem value="3C">3C - Warm Marine (San Francisco)</SelectItem>
                  <SelectItem value="4A">4A - Mixed Humid (DC/NYC)</SelectItem>
                  <SelectItem value="4B">4B - Mixed Dry (Albuquerque)</SelectItem>
                  <SelectItem value="4C">4C - Mixed Marine (Seattle)</SelectItem>
                  <SelectItem value="5A">5A - Cool Humid (Chicago)</SelectItem>
                  <SelectItem value="5B">5B - Cool Dry (Denver)</SelectItem>
                  <SelectItem value="6A">6A - Cold Humid (Minneapolis)</SelectItem>
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
        </div>

        <Separator />

        {/* Current Fuel System */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Current Heating System
          </h3>
          <div className="space-y-4">
            <InputGroup label="Current Fuel Type">
              <Select
                value={fuelType}
                onValueChange={(v) =>
                  form.setValue(
                    "currentFuelType",
                    v as "natural_gas" | "propane" | "oil" | "electric_resistance"
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
        </div>

        <Separator />

        {/* Equipment Performance */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Equipment Performance
          </h3>
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
        </div>

        <Separator />

        {/* Installation Costs */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Installation Costs
          </h3>
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
        </div>

        <Separator />

        {/* Cooling Savings */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Cooling Savings
          </h3>
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
        </div>

        <Separator />

        {/* Ownership & Maintenance */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Ownership & Maintenance
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
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
        </div>

        <Separator />

        {/* Escalation Rates */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Price Escalation
          </h3>
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
        </div>

        <Separator />

        {/* Incentives & Location */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Incentives & Location
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <RangeInput
              label="Federal Tax Credit"
              tooltip="IRA heat pump credit (up to $2,000)"
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
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button onClick={onCalculate} size="lg">
            <Thermometer className="mr-2 size-4" />
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
