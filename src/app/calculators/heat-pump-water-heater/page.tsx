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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { waterHeaterSchema } from "@/calculators/water-heater/schema";
import { waterHeaterDefaults } from "@/calculators/water-heater/defaults";
import { calculateWaterHeater } from "@/calculators/water-heater/calculate";
import {
  Droplets,
  Flame,
  DollarSign,
  Leaf,
  Zap,
  Sun,
  Battery,
  Thermometer,
  Gauge,
  CreditCard,
  MapPin,
  RotateCcw,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function HeatPumpWaterHeaterPage() {
  const { form, results, onReset } = useCalculator({
    schema: waterHeaterSchema,
    defaults: waterHeaterDefaults,
    calculate: calculateWaterHeater,
    storageKey: "heat-pump-water-heater",
  });

  const currentType = form.watch("currentType");
  const lifespanYears = form.watch("lifespanYears");
  const hpwhWins = results ? results.lifetimeSavings > 0 : true;

  return (
    <CalculatorShell
      title="Heat Pump Water Heater Calculator"
      description="Find out whether a heat pump water heater is worth it for your home. Compare operating costs against your current electric, gas, or propane water heater and see your payback period."
      lastUpdated="June 2026"
      url="/calculators/heat-pump-water-heater"
      howToSteps={[
        {
          name: "Describe your hot water use",
          text: "Enter your household size — hot water demand scales with the number of people.",
        },
        {
          name: "Select your current water heater",
          text: "Choose electric resistance, natural gas, or propane, and confirm your local energy rates.",
        },
        {
          name: "Enter equipment costs",
          text: "Set the installed cost of the heat pump water heater and a like-for-like conventional replacement.",
        },
        {
          name: "Add rebates",
          text: "Enter any state or utility rebates you qualify for — the federal 25C credit ended December 31, 2025.",
        },
        {
          name: "Fine-tune assumptions",
          text: "Optionally adjust efficiency ratings, temperature rise, lifespan, and rate escalation in Advanced settings.",
        },
        {
          name: "Review your savings",
          text: "Results update instantly as you adjust any input — see annual savings, payback year, and lifetime cost comparison.",
        },
      ]}
      methodology={`This calculator estimates the thermal energy needed to heat your household's hot water (gallons per day × 8.34 BTU per gallon-°F × temperature rise, converted to kWh), then divides by each unit's Uniform Energy Factor (UEF) to get the energy it draws. A heat pump water heater moves heat rather than generating it, so its UEF of roughly 3.0–4.0 means it uses about a third of the electricity of a standard electric resistance tank (UEF ~0.92). Gas comparisons convert thermal demand into therms at the gas tank's UEF (~0.62 for standard atmospheric models). Both replacement paths assume your current unit is due for replacement, so the heat pump's investment is compared against installing a like-for-like conventional unit, with energy rates escalating annually. Note on incentives: the federal 25C credit that covered heat pump water heaters (30% up to $2,000) ended December 31, 2025; many state and utility rebates remain — enter what you qualify for in the Rebates field. CO₂ estimates use 0.855 lbs/kWh for grid electricity, 11.7 lbs/therm for natural gas, and 12.7 lbs/gallon for propane.`}
      faqs={[
        {
          question: "Are heat pump water heaters worth it in 2026?",
          answer:
            "Usually yes if you're replacing an electric resistance tank: a heat pump water heater uses roughly one-third the electricity, typically saving $200–$500 per year, which pays back the higher purchase price in 4–8 years of a 10–15 year lifespan. Against cheap natural gas the savings are smaller and payback can exceed the unit's life, so run your actual rates. The federal 25C credit ended December 31, 2025, but state and utility rebates of $300–$1,500+ are still common and meaningfully change the math.",
        },
        {
          question: "How does a heat pump water heater work?",
          answer:
            "It works like a refrigerator in reverse: a small compressor pulls heat from the surrounding air and moves it into the water tank. Moving heat takes far less energy than generating it with a heating element, which is why efficiency ratings (UEF) of 3.0–4.0 are possible — three to four units of heat delivered per unit of electricity consumed. Most models include backup resistance elements for periods of very high demand.",
        },
        {
          question: "Where can a heat pump water heater be installed?",
          answer:
            "They need roughly 700–1,000 cubic feet of surrounding air (about a 10×12 room) or ducting, and they cool and dehumidify the space they're in — a bonus in a warm garage or basement, a drawback in conditioned living space in cold climates. They also need a condensate drain and about 7 feet of ceiling height for most models. Garages, basements, and utility rooms are the typical spots; closets usually require ducting kits.",
        },
        {
          question: "Are heat pump water heaters noisy?",
          answer:
            "They produce a low fan-and-compressor hum, typically 45–55 dB — comparable to a modern dishwasher or a window AC on low. In a basement or garage most owners stop noticing it; next to a bedroom wall it may be worth considering placement, scheduling quiet hours (many models support this), or a ducted installation.",
        },
        {
          question: "What rebates are available for heat pump water heaters?",
          answer:
            "The federal 25C tax credit (30% up to $2,000) ended for units placed in service after December 31, 2025. What remains: state-administered Home Energy Rebates in participating states (income-qualified households can receive up to $1,750 for a heat pump water heater), plus many state and utility programs offering $300–$1,500. Check your utility and state energy office, and enter what you qualify for in the calculator's Rebates field.",
        },
      ]}
      relatedCalculators={[
        {
          title: "Heat Pump vs Furnace",
          href: "/calculators/heat-pump",
          description: "Compare heat pump and furnace costs for space heating.",
          icon: Thermometer,
        },
        {
          title: "Solar Payback",
          href: "/calculators/solar-payback",
          description: "Power your water heating with solar electricity.",
          icon: Sun,
        },
        {
          title: "Battery Storage",
          href: "/calculators/battery-storage",
          description: "Run your water heater on stored off-peak power.",
          icon: Battery,
        },
      ]}
      mobileSummary={
        results ? (
          <MobileSummaryBar
            label={
              hpwhWins
                ? `Savings over ${lifespanYears} years`
                : `Extra cost over ${lifespanYears} years`
            }
            value={fmt(Math.abs(results.lifetimeSavings))}
            tone={hpwhWins ? "positive" : "negative"}
          />
        ) : undefined
      }
      results={
        results ? (
          <div className="space-y-4">
            <VerdictBanner
              headline={
                hpwhWins
                  ? "Switching to a heat pump water heater saves you"
                  : "Sticking with your current type saves you"
              }
              amount={Math.abs(results.lifetimeSavings)}
              caption={`over ${lifespanYears} years vs. a like-for-like replacement`}
              tone={hpwhWins ? "positive" : "negative"}
              detail={
                <>
                  {results.paybackYears !== null && hpwhWins && (
                    <Badge variant="secondary">
                      Pays back in {results.paybackYears}{" "}
                      {results.paybackYears === 1 ? "year" : "years"}
                    </Badge>
                  )}
                  {hpwhWins && (
                    <Badge variant="secondary">
                      {fmt(results.annualSavings)}/year on energy
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
                  labelA="Heat pump water heater"
                  labelB="Conventional water heater"
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
                    label="HPWH Operating Cost"
                    value={`${fmt(results.annualCostHpwh)}/yr`}
                    subtext={`${results.annualKwhHpwh.toLocaleString()} kWh/year`}
                    icon={Droplets}
                    variant="highlight"
                  />
                  <ResultCard
                    label="Current System Cost"
                    value={`${fmt(results.annualCostCurrent)}/yr`}
                    subtext={`${results.annualEnergyCurrent.toLocaleString()} ${results.currentEnergyUnit}/year`}
                    icon={Flame}
                  />
                  <ResultCard
                    label="Annual Savings"
                    value={fmt(results.annualSavings)}
                    subtext={`${fmt(results.monthlySavings)}/month`}
                    icon={DollarSign}
                    variant={results.annualSavings > 0 ? "savings" : "default"}
                  />
                  <ResultCard
                    label="Extra Upfront Cost"
                    value={fmt(results.incrementalCost)}
                    subtext={`Net HPWH cost: ${fmt(results.netHpwhCost)}`}
                    icon={DollarSign}
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">
                    Upfront cost comparison
                  </h3>
                  <ComparisonBar
                    items={results.costBreakdown.map((b) => ({
                      label: b.label,
                      value: b.amount,
                      color: b.color ?? "var(--chart-1)",
                    }))}
                    formatValue={fmt}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultCard
                    label="CO₂ Savings"
                    value={`${results.co2SavingsTonsPerYear} tons/yr`}
                    subtext="From higher efficiency"
                    icon={Leaf}
                    variant="savings"
                  />
                  <ResultCard
                    label="Hot Water Energy Need"
                    value={`${results.annualThermalKwh.toLocaleString()} kWh/yr`}
                    subtext="Heat delivered to your water"
                    icon={Zap}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6">
        <InputSection title="Your Hot Water Use" icon={Droplets}>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="Household Size"
              min={1}
              max={10}
              step={1}
              value={form.watch("householdSize")}
              onChange={(v) => form.setValue("householdSize", v)}
              unit="people"
            />
            <RangeInput
              label="Hot Water per Person"
              tooltip="DOE estimates roughly 15-20 gallons of hot water per person per day"
              min={5}
              max={40}
              step={1}
              value={form.watch("gallonsPerPerson")}
              onChange={(v) => form.setValue("gallonsPerPerson", v)}
              unit="gal/day"
            />
          </div>
        </InputSection>

        <InputSection title="Current Water Heater" icon={Flame}>
          <div className="space-y-4">
            <InputGroup label="Current Fuel Type">
              <Select
                value={currentType}
                onValueChange={(v) =>
                  form.setValue(
                    "currentType",
                    v as "electric_resistance" | "gas_tank" | "propane_tank",
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electric_resistance">
                    Electric Resistance Tank
                  </SelectItem>
                  <SelectItem value="gas_tank">Natural Gas Tank</SelectItem>
                  <SelectItem value="propane_tank">Propane Tank</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Electricity Rate"
                tooltip="Used for the heat pump water heater (and your current tank if electric)"
                min={0.01}
                max={1.0}
                step={0.01}
                value={form.watch("electricityRate")}
                onChange={(v) => form.setValue("electricityRate", v)}
                unit="$/kWh"
              />
              {currentType === "gas_tank" && (
                <RangeInput
                  label="Gas Rate"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={form.watch("gasRate")}
                  onChange={(v) => form.setValue("gasRate", v)}
                  unit="$/therm"
                />
              )}
              {currentType === "propane_tank" && (
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
            </div>
          </div>
        </InputSection>

        <InputSection title="Equipment Costs" icon={DollarSign}>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="HPWH Installed Cost"
              tooltip="Heat pump water heater unit plus installation, before rebates"
              min={500}
              max={10000}
              step={100}
              value={form.watch("hpwhInstalledCost")}
              onChange={(v) => form.setValue("hpwhInstalledCost", v)}
              unit="$"
            />
            <RangeInput
              label="Conventional Replacement"
              tooltip="Installed cost of replacing your current tank like-for-like"
              min={300}
              max={6000}
              step={100}
              value={form.watch("conventionalInstalledCost")}
              onChange={(v) => form.setValue("conventionalInstalledCost", v)}
              unit="$"
            />
          </div>
        </InputSection>

        <AdvancedSections>
          <AdvancedSection title="Rebates & Incentives" icon={CreditCard}>
            <RangeInput
              label="Rebates & Incentives"
              tooltip="The federal 25C credit ended Dec 31, 2025 — enter state, utility, or Home Energy Rebates you qualify for"
              min={0}
              max={5000}
              step={50}
              value={form.watch("rebatesAndIncentives")}
              onChange={(v) => form.setValue("rebatesAndIncentives", v)}
              unit="$"
            />
          </AdvancedSection>

          <AdvancedSection title="Efficiency Ratings" icon={Gauge}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Heat Pump UEF"
                tooltip="Uniform Energy Factor — ENERGY STAR models are typically 3.0-4.0"
                min={1.5}
                max={5}
                step={0.1}
                value={form.watch("hpwhUEF")}
                onChange={(v) => form.setValue("hpwhUEF", v)}
              />
              {currentType === "electric_resistance" ? (
                <RangeInput
                  label="Electric Tank UEF"
                  tooltip="Standard electric resistance tanks are ~0.90-0.95"
                  min={0.8}
                  max={1.0}
                  step={0.01}
                  value={form.watch("electricUEF")}
                  onChange={(v) => form.setValue("electricUEF", v)}
                />
              ) : (
                <RangeInput
                  label="Gas/Propane Tank UEF"
                  tooltip="Standard atmospheric-vent gas tanks are ~0.60-0.65"
                  min={0.4}
                  max={0.95}
                  step={0.01}
                  value={form.watch("gasUEF")}
                  onChange={(v) => form.setValue("gasUEF", v)}
                />
              )}
            </div>
          </AdvancedSection>

          <AdvancedSection title="Assumptions" icon={Thermometer}>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeInput
                label="Temperature Rise"
                tooltip="Difference between incoming water and tank setpoint (~55°F inlet to 125°F)"
                min={40}
                max={100}
                step={5}
                value={form.watch("temperatureRiseF")}
                onChange={(v) => form.setValue("temperatureRiseF", v)}
                unit="°F"
              />
              <RangeInput
                label="Equipment Lifespan"
                min={5}
                max={20}
                step={1}
                value={form.watch("lifespanYears")}
                onChange={(v) => form.setValue("lifespanYears", v)}
                unit="years"
              />
              <RangeInput
                label="Electricity Price Increase"
                min={0}
                max={0.15}
                step={0.005}
                value={form.watch("electricityEscalation")}
                onChange={(v) => form.setValue("electricityEscalation", v)}
                unit="%/yr"
              />
              <RangeInput
                label="Fuel Price Increase"
                min={0}
                max={0.15}
                step={0.005}
                value={form.watch("fuelEscalation")}
                onChange={(v) => form.setValue("fuelEscalation", v)}
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
