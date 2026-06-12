"use client";

import { useCalculator } from "@/hooks/use-calculator";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { InputGroup } from "@/components/calculator/input-group";
import { InputSection } from "@/components/calculator/input-section";
import { RangeInput } from "@/components/calculator/range-input";
import { ResultCard } from "@/components/calculator/result-card";
import { ComparisonBar } from "@/components/calculator/comparison-bar";
import { VerdictBanner } from "@/components/calculator/verdict-banner";
import { MobileSummaryBar } from "@/components/calculator/mobile-summary-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { evTaxCreditSchema } from "@/calculators/ev-tax-credit/schema";
import { evTaxCreditDefaults } from "@/calculators/ev-tax-credit/defaults";
import { calculateEvTaxCredit } from "@/calculators/ev-tax-credit/calculate";
import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  XCircle,
  Percent,
  Car,
  Zap,
  Sun,
  MapPin,
  RotateCcw,
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function EvTaxCreditPage() {
  const { form, results, onReset } = useCalculator({
    schema: evTaxCreditSchema,
    defaults: evTaxCreditDefaults,
    calculate: calculateEvTaxCredit,
    storageKey: "ev-tax-credit-v2",
  });

  const purchaseType = form.watch("purchaseType");

  return (
    <CalculatorShell
      title="EV Tax Credit Calculator"
      description="The federal EV tax credits (up to $7,500 new / $4,000 used) ended September 30, 2025. Check whether a vehicle you acquired in time still qualifies, and see which state incentives remain available today."
      lastUpdated="June 2026"
      url="/calculators/ev-tax-credit"
      howToSteps={[
        {
          name: "Enter filing status and income",
          text: "Select your tax filing status and enter your adjusted gross income (AGI).",
        },
        {
          name: "Choose purchase type and date",
          text: "Select new or used, confirm it is a dealer purchase, and enter when you acquired the vehicle — the federal credit only applies to vehicles acquired by September 30, 2025.",
        },
        {
          name: "Enter vehicle details",
          text: "Input the vehicle make, model, MSRP or sale price, and model year.",
        },
        {
          name: "Select your state",
          text: "Choose your state to include any available state-level EV incentives.",
        },
        {
          name: "Review your eligibility",
          text: "Your eligibility updates instantly as you adjust any input — see your federal credit amount, income and MSRP qualification, and total savings.",
        },
      ]}
      methodology={`The federal clean vehicle credits under IRC 30D (new vehicles, up to $7,500) and IRC 25E (used vehicles, lesser of $4,000 or 30% of sale price) were terminated by the One Big Beautiful Bill Act of July 2025 for vehicles acquired after September 30, 2025. This calculator applies that acquisition deadline first, then the original eligibility rules for vehicles that beat it: income limits by filing status, MSRP caps of $55,000 for sedans and $80,000 for SUVs/trucks/vans (new) or $25,000 (used), and the dealer-purchase requirement. A binding written contract with payment made on or before September 30, 2025 counts as acquiring the vehicle, even if delivery came later. State incentives are governed separately from federal law and many remain active; our state amounts are simplified estimates. Always verify with the IRS and your state's program before relying on any credit.`}
      faqs={[
        {
          question: "Is the federal EV tax credit still available in 2026?",
          answer:
            "No. The One Big Beautiful Bill Act, signed July 4, 2025, terminated both the new vehicle credit (IRC 30D, up to $7,500) and the used vehicle credit (IRC 25E, up to $4,000) for vehicles acquired after September 30, 2025. If you acquired your EV on or before that date — including via a binding written contract with payment made by then — you can still claim the credit on the tax return for the year you took delivery.",
        },
        {
          question: "I bought my EV before September 30, 2025. Can I still claim the credit?",
          answer:
            "Yes, if you met the original eligibility rules: income under the AGI limits ($300,000 married filing jointly / $150,000 single for new vehicles), the vehicle under its MSRP cap ($55,000 sedans, $80,000 SUVs/trucks/vans, or $25,000 sale price for used), purchased from a licensed dealer, and on the IRS qualifying vehicle list. Use this calculator with your actual acquisition date to check, and consult a tax professional for your specific situation.",
        },
        {
          question: "What EV incentives are still available in 2026?",
          answer:
            "State and local programs are unaffected by the federal change, and many remain active — for example, Colorado's state tax credit and several state rebate and sales tax exemption programs. Utility rebates for home chargers and discounted EV charging rates also continue. Enter your state in the calculator to see estimated state-level incentives, and verify current details with the program directly.",
        },
        {
          question: "Do EVs still make financial sense without the federal credit?",
          answer:
            "Often, yes — the credit accelerated the payback but was never the whole story. EVs still save on fuel (electricity per mile typically runs a third to half the cost of gasoline) and maintenance. Without the credit the break-even point comes later, so the math depends more on your annual mileage, local electricity rates, and the price gap between the EV and a comparable gas car. Our EV vs Gas Cost Calculator models it with your numbers.",
        },
      ]}
      relatedCalculators={[
        {
          title: "EV vs Gas Cost",
          href: "/calculators/ev-vs-gas-cost",
          description: "Compare total ownership costs of EV vs gas vehicles.",
          icon: Car,
        },
        {
          title: "EV Charging Cost",
          href: "/calculators/ev-charging-cost",
          description: "Calculate your home and public EV charging costs.",
          icon: Zap,
        },
        {
          title: "Solar Payback",
          href: "/calculators/solar-payback",
          description: "Pair solar with your EV for near-free charging.",
          icon: Sun,
        },
      ]}
      mobileSummary={
        results ? (
          <MobileSummaryBar
            label="Estimated incentives"
            value={fmt(results.totalSavings)}
            tone={
              results.federalEligible
                ? "positive"
                : results.stateCredit > 0
                  ? "neutral"
                  : "negative"
            }
          />
        ) : undefined
      }
      results={
        results ? (
          <div className="space-y-4">
            {results.federalEligible ? (
              <VerdictBanner
                headline="You likely qualify for"
                amount={results.totalSavings}
                caption={`${results.savingsPercent}% off the purchase price`}
                tone="positive"
                detail={
                  <>
                    <Badge variant="secondary">
                      Federal: {fmt(results.federalCreditAmount)}
                    </Badge>
                    <Badge variant="secondary">
                      State: {fmt(results.stateCredit)}
                    </Badge>
                  </>
                }
              />
            ) : results.stateCredit > 0 ? (
              <VerdictBanner
                headline="Federal credit unavailable — state incentives could still save you"
                amount={results.stateCredit}
                caption="see the checklist below for why"
                tone="neutral"
              />
            ) : (
              <VerdictBanner
                headline="Estimated incentives"
                amount={0}
                caption="you don't appear to qualify — see the checklist below"
                tone="negative"
              />
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Price after incentives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ComparisonBar
                  items={[
                    {
                      label: "Vehicle price",
                      value: form.watch("vehicleMSRP"),
                      color: "var(--chart-4)",
                    },
                    {
                      label: "Federal credit",
                      value: -results.federalCreditAmount,
                      color: "var(--chart-1)",
                    },
                    {
                      label: "State incentive",
                      value: -results.stateCredit,
                      color: "var(--chart-2)",
                    },
                    {
                      label: "You pay",
                      value: results.effectivePrice,
                      color: "var(--chart-3)",
                    },
                  ]}
                  formatValue={fmt}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Eligibility checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.eligibilityReasons.map(
                    (
                      reason: {
                        label: string;
                        passed: boolean;
                        detail: string;
                      },
                      i: number,
                    ) => (
                      <div key={i} className="flex items-start gap-3">
                        {reason.passed ? (
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" />
                        ) : (
                          <XCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">{reason.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {reason.detail}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">The numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultCard
                    label="Federal Credit"
                    value={fmt(results.federalCreditAmount)}
                    subtext={
                      purchaseType === "new"
                        ? "IRC 30D new vehicle"
                        : "IRC 25E used vehicle"
                    }
                    icon={CreditCard}
                    variant="highlight"
                  />
                  <ResultCard
                    label="State Incentive"
                    value={fmt(results.stateCredit)}
                    subtext={`Estimated for ${form.watch("stateCode")}`}
                    icon={DollarSign}
                  />
                  <ResultCard
                    label="Total Savings"
                    value={fmt(results.totalSavings)}
                    subtext={`${results.savingsPercent}% of MSRP`}
                    icon={DollarSign}
                    variant={results.totalSavings > 0 ? "savings" : "default"}
                  />
                  <ResultCard
                    label="Effective Price"
                    value={fmt(results.effectivePrice)}
                    subtext="After all credits"
                    icon={Percent}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6">
        <InputSection title="Filing & Income" icon={DollarSign}>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputGroup label="Filing Status">
              <Select
                value={form.watch("filingStatus")}
                onValueChange={(v) =>
                  form.setValue(
                    "filingStatus",
                    v as
                      | "single"
                      | "married_jointly"
                      | "married_separately"
                      | "head_of_household",
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married_jointly">
                    Married Filing Jointly
                  </SelectItem>
                  <SelectItem value="married_separately">
                    Married Filing Separately
                  </SelectItem>
                  <SelectItem value="head_of_household">
                    Head of Household
                  </SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            <RangeInput
              label="Adjusted Gross Income"
              tooltip="Your modified AGI from your most recent tax return"
              min={0}
              max={500000}
              step={5000}
              value={form.watch("adjustedGrossIncome")}
              onChange={(v) => form.setValue("adjustedGrossIncome", v)}
              unit="$"
            />
          </div>
        </InputSection>

        <InputSection title="Purchase Details" icon={Car}>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputGroup label="Purchase Type">
              <Select
                value={purchaseType}
                onValueChange={(v) =>
                  form.setValue("purchaseType", v as "new" | "used")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Vehicle</SelectItem>
                  <SelectItem value="used">Used Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            <InputGroup
              label="Acquisition Date"
              tooltip="When you acquired the vehicle (or signed a binding contract with payment). The federal credit ended for vehicles acquired after September 30, 2025."
            >
              <Input
                type="date"
                value={form.watch("purchaseDate")}
                onChange={(e) => form.setValue("purchaseDate", e.target.value)}
              />
            </InputGroup>

            <div className="flex items-center gap-3 sm:pt-6">
              <Switch
                checked={form.watch("dealerPurchase")}
                onCheckedChange={(v) => form.setValue("dealerPurchase", v)}
              />
              <Label>Purchased from a licensed dealer</Label>
            </div>
          </div>
        </InputSection>

        <InputSection title="Vehicle Information" icon={CreditCard}>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputGroup
              label="Vehicle Make"
              tooltip="e.g. Tesla, Chevrolet, Ford"
            >
              <Input
                value={form.watch("vehicleMake")}
                onChange={(e) => form.setValue("vehicleMake", e.target.value)}
                placeholder="e.g. Tesla"
              />
            </InputGroup>

            <InputGroup
              label="Vehicle Model"
              tooltip="Include body type (e.g. 'Model Y SUV') for accurate MSRP cap"
            >
              <Input
                value={form.watch("vehicleModel")}
                onChange={(e) => form.setValue("vehicleModel", e.target.value)}
                placeholder="e.g. Model Y SUV"
              />
            </InputGroup>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <RangeInput
              label={purchaseType === "new" ? "Vehicle MSRP" : "Sale Price"}
              tooltip={
                purchaseType === "new"
                  ? "Manufacturer's suggested retail price"
                  : "Actual purchase price of the used vehicle"
              }
              min={0}
              max={purchaseType === "new" ? 150000 : 50000}
              step={1000}
              value={form.watch("vehicleMSRP")}
              onChange={(v) => form.setValue("vehicleMSRP", v)}
              unit="$"
            />
            <RangeInput
              label="Model Year"
              min={2023}
              max={2027}
              step={1}
              value={form.watch("vehicleYear")}
              onChange={(v) => form.setValue("vehicleYear", v)}
              unit=""
            />
          </div>
        </InputSection>

        <InputSection title="Location" icon={MapPin}>
          <InputGroup
            label="State Code"
            tooltip="Two-letter state code for state incentive lookup"
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
        </InputSection>

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
