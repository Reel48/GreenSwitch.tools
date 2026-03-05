"use client";

import { useCalculator } from "@/hooks/use-calculator";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { InputGroup } from "@/components/calculator/input-group";
import { RangeInput } from "@/components/calculator/range-input";
import { ResultCard } from "@/components/calculator/result-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString();

export default function EvTaxCreditPage() {
  const { form, results, isCalculated, onCalculate, onReset } = useCalculator({
    schema: evTaxCreditSchema,
    defaults: evTaxCreditDefaults,
    calculate: calculateEvTaxCredit,
    storageKey: "ev-tax-credit",
  });

  const purchaseType = form.watch("purchaseType");

  return (
    <CalculatorShell
      title="EV Tax Credit Calculator"
      description="Check your eligibility for the federal EV tax credit (up to $7,500 for new or $4,000 for used EVs) and estimate your total savings including state incentives."
      lastUpdated="March 2025"
      methodology={`This calculator evaluates eligibility for the federal clean vehicle tax credit under IRC 30D (new vehicles, up to $7,500) and IRC 25E (used vehicles, lesser of $4,000 or 30% of sale price). Income limits vary by filing status. MSRP caps are $55,000 for sedans and $80,000 for SUVs/trucks/vans (new vehicles) or $25,000 (used vehicles). Vehicle classification uses keyword matching on the model name. State credits are simplified estimates based on publicly available incentive programs. Always verify eligibility with the IRS clean vehicle list and your state's incentive program.`}
      faqs={[
        {
          question: "How much is the federal EV tax credit?",
          answer:
            "For new EVs, the credit is up to $7,500 — split into $3,750 for critical minerals sourcing and $3,750 for battery component manufacturing. For used EVs, it's the lesser of $4,000 or 30% of the sale price.",
        },
        {
          question: "What are the income limits for the EV tax credit?",
          answer:
            "For new EVs: $300,000 (married filing jointly), $225,000 (head of household), or $150,000 (single/married filing separately). For used EVs: $150,000 (married filing jointly), $112,500 (head of household), or $75,000 (single/married filing separately).",
        },
        {
          question: "What is the MSRP cap for the EV tax credit?",
          answer:
            "For new vehicles: $55,000 for sedans and $80,000 for SUVs, trucks, and vans. For used EVs: the sale price must be $25,000 or less.",
        },
        {
          question: "Can I get the EV tax credit at the point of sale?",
          answer:
            "Yes, starting in 2024 you can transfer the credit to the dealer and get it as a discount at the time of purchase, rather than waiting to claim it on your tax return. The vehicle must be purchased from a licensed dealer.",
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
      results={
        isCalculated && results ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Credit Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={results.federalEligible ? "default" : "destructive"}
                    className="text-sm px-3 py-1"
                  >
                    {results.federalEligible
                      ? "Likely Eligible"
                      : "Not Eligible"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Federal Clean Vehicle Credit
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

                <Separator />

                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Eligibility Checklist
                  </h3>
                  <div className="space-y-3">
                    {results.eligibilityReasons.map(
                      (
                        reason: {
                          label: string;
                          passed: boolean;
                          detail: string;
                        },
                        i: number
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
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-6">
        {/* Filing & Income */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Filing & Income
          </h3>
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
                      | "head_of_household"
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
        </div>

        <Separator />

        {/* Purchase Details */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Purchase Details
          </h3>
          <div className="space-y-4">
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

              <div className="flex items-center gap-3 pt-6">
                <Switch
                  checked={form.watch("dealerPurchase")}
                  onCheckedChange={(v) => form.setValue("dealerPurchase", v)}
                />
                <Label>Purchased from a licensed dealer</Label>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Vehicle Information */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Vehicle Information
          </h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputGroup label="Vehicle Make" tooltip="e.g. Tesla, Chevrolet, Ford">
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
          </div>
        </div>

        <Separator />

        {/* Location */}
        <InputGroup label="State Code" tooltip="Two-letter state code for state incentive lookup">
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
            <CreditCard className="mr-2 size-4" />
            Check Eligibility
          </Button>
          <Button variant="outline" size="lg" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </CalculatorShell>
  );
}
