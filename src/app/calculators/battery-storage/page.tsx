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
import { batteryStorageSchema } from "@/calculators/battery-storage/schema";
import { batteryStorageDefaults } from "@/calculators/battery-storage/defaults";
import { calculateBatteryStorage } from "@/calculators/battery-storage/calculate";
import {
  Battery,
  DollarSign,
  TrendingUp,
  Leaf,
  Zap,
  Sun,
  CreditCard,
  Clock,
  ShieldCheck,
  Thermometer,
  Car,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function BatteryStoragePage() {
  const { form, results, isCalculated, onCalculate, onReset } = useCalculator({
    schema: batteryStorageSchema,
    defaults: batteryStorageDefaults,
    calculate: calculateBatteryStorage,
    storageKey: "battery-storage",
  });

  const financingType = form.watch("financingType");
  const rateStructure = form.watch("rateStructure");
  const hasSolar = form.watch("hasSolar");

  return (
    <CalculatorShell
      title="Battery Storage Calculator"
      description="Evaluate home battery ROI with TOU rate arbitrage, solar pairing, federal and state incentives, and degradation modeling over 15 years."
      lastUpdated="March 2026"
      methodology={`This calculator models home battery storage savings over 15 years. For time-of-use (TOU) rate structures, savings come from charging the battery at off-peak rates and discharging during on-peak hours (rate arbitrage). For flat-rate plans with solar, the battery captures excess solar generation for later self-consumption instead of exporting at a lower net metering rate. Battery capacity degrades annually (default 3%/year), while utility rates escalate at 3%/year. The federal Investment Tax Credit (ITC) of 30% applies to standalone battery storage under the Inflation Reduction Act. State incentives (e.g., California's SGIP) are applied when available. Net system cost equals the gross cost minus all applicable incentives. The payback period is the year when cumulative net savings first exceed zero.`}
      faqs={[
        {
          question: "How does battery storage save money?",
          answer:
            "With time-of-use rates, batteries charge when electricity is cheap (off-peak) and discharge when it's expensive (on-peak). This rate arbitrage can save $30–$100+/month depending on rate differentials. With solar, batteries store excess daytime generation for evening use instead of exporting at lower net metering rates.",
        },
        {
          question: "What size battery do I need?",
          answer:
            "Most homes use 10–15 kWh batteries (e.g., Tesla Powerwall at 13.5 kWh). Larger homes or those wanting full backup may need 20+ kWh. Battery size should match your peak-hour energy consumption for maximum TOU savings.",
        },
        {
          question: "How long do home batteries last?",
          answer:
            "Most lithium-ion home batteries are warranted for 10 years and typically last 15+ years. Capacity degrades 2–3% per year, so after 10 years you'll have roughly 70–80% of original capacity.",
        },
        {
          question: "Can I add a battery to my existing solar system?",
          answer:
            "Yes. Batteries can be retrofitted to most existing solar systems, though some may require an additional inverter. Adding storage to solar increases self-consumption and can provide backup power during outages.",
        },
        {
          question: "What is the federal battery tax credit?",
          answer:
            "The Inflation Reduction Act extended the 30% Investment Tax Credit (ITC) to standalone battery storage starting in 2023. Previously, batteries only qualified if installed with solar. The credit applies through 2032 and covers equipment and installation costs.",
        },
        {
          question: "Are batteries worth it with flat-rate electricity?",
          answer:
            "Batteries provide the most savings with TOU rates where there's a large peak/off-peak price difference. With flat rates, savings are smaller and come mainly from solar self-consumption optimization. Consider switching to a TOU plan if your utility offers one.",
        },
      ]}
      relatedCalculators={[
        {
          title: "Solar Payback",
          href: "/calculators/solar-payback",
          description: "Pair your battery with solar for maximum savings.",
          icon: Sun,
        },
        {
          title: "EV Charging Cost",
          href: "/calculators/ev-charging-cost",
          description: "Charge your EV with stored solar energy.",
          icon: Zap,
        },
        {
          title: "Heat Pump vs Furnace",
          href: "/calculators/heat-pump",
          description: "Electrify your heating with battery backup.",
          icon: Thermometer,
        },
      ]}
      results={
        isCalculated && results ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Battery Storage Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ResultCard
                    label="Payback Period"
                    value={
                      results.paybackPeriodYears > 15
                        ? "15+ years"
                        : `${results.paybackPeriodYears} years`
                    }
                    subtext="When investment breaks even"
                    icon={TrendingUp}
                    variant="highlight"
                  />
                  <ResultCard
                    label="Net System Cost"
                    value={fmt(results.netSystemCost)}
                    subtext={`Gross: ${fmt(results.grossSystemCost)}`}
                    icon={DollarSign}
                  />
                  <ResultCard
                    label="Year 1 Savings"
                    value={`${fmt(results.annualSavingsYear1)}/yr`}
                    subtext={`${fmt(results.monthlySavingsYear1)}/month`}
                    icon={DollarSign}
                    variant="savings"
                  />
                  <ResultCard
                    label="15-Year ROI"
                    value={`${results.roi}%`}
                    subtext={`Lifetime savings: ${fmt(results.lifetimeSavings)}`}
                    icon={TrendingUp}
                    variant={results.roi > 0 ? "savings" : undefined}
                  />
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <ResultCard
                    label="Warranty-Period Savings"
                    value={fmt(results.warrantySavings)}
                    subtext={`Over ${form.watch("warrantyYears")} year warranty`}
                    icon={ShieldCheck}
                  />
                  <ResultCard
                    label="Daily Energy Shift"
                    value={`${results.dailyEnergyShiftKwh} kWh`}
                    subtext={`${fmt(results.dailySavings)}/day in savings`}
                    icon={Battery}
                  />
                  <ResultCard
                    label="CO₂ Offset Per Year"
                    value={`${results.co2OffsetTonsPerYear} tons`}
                    subtext="From displaced grid energy"
                    icon={Leaf}
                    variant="savings"
                  />
                </div>

                {results.federalTaxCredit > 0 || results.stateIncentive > 0 ? (
                  <>
                    <Separator />
                    <div className="grid gap-4 sm:grid-cols-2">
                      {results.federalTaxCredit > 0 && (
                        <ResultCard
                          label="Federal Tax Credit"
                          value={fmt(results.federalTaxCredit)}
                          subtext="30% ITC"
                          icon={CreditCard}
                          variant="savings"
                        />
                      )}
                      {results.stateIncentive > 0 && (
                        <ResultCard
                          label="State Incentive"
                          value={fmt(results.stateIncentive)}
                          subtext="State rebate/credit"
                          icon={CreditCard}
                          variant="savings"
                        />
                      )}
                    </div>
                  </>
                ) : null}

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
                    items={results.costBreakdown.map(
                      (b: {
                        label: string;
                        amount: number;
                        color?: string;
                      }) => ({
                        label: b.label,
                        value: b.amount,
                        color: b.color ?? "#0891b2",
                      }),
                    )}
                    formatValue={(v) => fmt(v)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6">
        {/* System Details */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            System Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label="Battery Capacity"
              tooltip="Total battery capacity in kWh"
              min={5}
              max={40}
              step={0.5}
              value={form.watch("batteryCapacityKwh")}
              onChange={(v) => form.setValue("batteryCapacityKwh", v)}
              unit="kWh"
            />
            <RangeInput
              label="Usable Capacity"
              tooltip="Depth of discharge — percentage of capacity actually usable"
              min={80}
              max={100}
              step={1}
              value={form.watch("usableCapacityPercent")}
              onChange={(v) => form.setValue("usableCapacityPercent", v)}
              unit="%"
            />
            <RangeInput
              label="Round-Trip Efficiency"
              tooltip="Energy retained after charge/discharge cycle"
              min={80}
              max={100}
              step={1}
              value={form.watch("roundTripEfficiency")}
              onChange={(v) => form.setValue("roundTripEfficiency", v)}
              unit="%"
            />
            <RangeInput
              label="Annual Degradation"
              tooltip="Battery capacity loss per year"
              min={0}
              max={10}
              step={0.5}
              value={form.watch("annualDegradation")}
              onChange={(v) => form.setValue("annualDegradation", v)}
              unit="%"
            />
            <RangeInput
              label="System Cost"
              tooltip="Battery equipment cost before installation"
              min={3000}
              max={60000}
              step={500}
              value={form.watch("systemCost")}
              onChange={(v) => form.setValue("systemCost", v)}
              unit="$"
            />
            <RangeInput
              label="Installation Cost"
              min={1000}
              max={15000}
              step={250}
              value={form.watch("installationCost")}
              onChange={(v) => form.setValue("installationCost", v)}
              unit="$"
            />
            <RangeInput
              label="Warranty Period"
              min={5}
              max={25}
              step={1}
              value={form.watch("warrantyYears")}
              onChange={(v) => form.setValue("warrantyYears", v)}
              unit="years"
            />
          </div>
        </div>

        <Separator />

        {/* Energy Usage */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Energy Usage
          </h3>
          <div className="space-y-4">
            <RangeInput
              label="Monthly Electric Bill"
              min={20}
              max={1000}
              step={10}
              value={form.watch("monthlyElectricBill")}
              onChange={(v) => form.setValue("monthlyElectricBill", v)}
              unit="$"
            />
            <div className="flex items-center gap-3">
              <Switch
                checked={hasSolar}
                onCheckedChange={(v) => form.setValue("hasSolar", v)}
              />
              <Label>I have solar panels</Label>
            </div>
            {hasSolar && (
              <RangeInput
                label="Solar Offset"
                tooltip="Percentage of electricity usage covered by solar"
                min={0}
                max={100}
                step={5}
                value={form.watch("solarOffsetPercent")}
                onChange={(v) => form.setValue("solarOffsetPercent", v)}
                unit="%"
              />
            )}
          </div>
        </div>

        <Separator />

        {/* Rate Structure */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Rate Structure
          </h3>
          <div className="space-y-4">
            <InputGroup
              label="Rate Type"
              tooltip="Time-of-use (TOU) rates have different prices at different times of day"
            >
              <Select
                value={rateStructure}
                onValueChange={(v) =>
                  form.setValue("rateStructure", v as "tou" | "flat")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tou">Time-of-Use (TOU)</SelectItem>
                  <SelectItem value="flat">Flat Rate</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            {rateStructure === "tou" ? (
              <div className="grid gap-4 sm:grid-cols-3">
                <RangeInput
                  label="On-Peak Rate"
                  tooltip="Electricity rate during peak hours"
                  min={0.01}
                  max={1.0}
                  step={0.01}
                  value={form.watch("onPeakRate")}
                  onChange={(v) => form.setValue("onPeakRate", v)}
                  unit="$/kWh"
                />
                <RangeInput
                  label="Off-Peak Rate"
                  tooltip="Electricity rate during off-peak hours"
                  min={0.01}
                  max={1.0}
                  step={0.01}
                  value={form.watch("offPeakRate")}
                  onChange={(v) => form.setValue("offPeakRate", v)}
                  unit="$/kWh"
                />
                <RangeInput
                  label="Peak Hours/Day"
                  tooltip="Number of on-peak hours per day"
                  min={1}
                  max={12}
                  step={1}
                  value={form.watch("peakHoursPerDay")}
                  onChange={(v) => form.setValue("peakHoursPerDay", v)}
                  unit="hrs"
                />
              </div>
            ) : (
              <RangeInput
                label="Flat Rate"
                min={0.01}
                max={1.0}
                step={0.01}
                value={form.watch("flatRate")}
                onChange={(v) => form.setValue("flatRate", v)}
                unit="$/kWh"
              />
            )}
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
                  form.setValue("financingType", v as "cash" | "loan")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash Purchase</SelectItem>
                  <SelectItem value="loan">Loan</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            {financingType === "loan" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <RangeInput
                  label="Loan Interest Rate"
                  min={0}
                  max={15}
                  step={0.25}
                  value={form.watch("loanInterestRate")}
                  onChange={(v) => form.setValue("loanInterestRate", v)}
                  unit="%"
                />
                <RangeInput
                  label="Loan Term"
                  min={5}
                  max={25}
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

        {/* Incentives */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Incentives
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Switch
                checked={form.watch("applyFederalCredit")}
                onCheckedChange={(v) => form.setValue("applyFederalCredit", v)}
              />
              <Label>Apply 30% federal tax credit (ITC)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.watch("applyStateIncentive")}
                onCheckedChange={(v) => form.setValue("applyStateIncentive", v)}
              />
              <Label>Apply state incentive (if available)</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* State */}
        <InputGroup
          label="State Code"
          tooltip="Two-letter state code for regional rates and incentives"
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

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button onClick={onCalculate} size="lg">
            <Battery className="mr-2 size-4" />
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
