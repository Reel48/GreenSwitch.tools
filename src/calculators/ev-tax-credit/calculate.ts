import type { EvTaxCreditInput } from "./schema";

type EligibilityReason = {
  label: string;
  passed: boolean;
  detail: string;
};

export type EvTaxCreditResult = {
  federalEligible: boolean;
  federalCreditAmount: number;
  eligibilityReasons: EligibilityReason[];
  stateCredit: number;
  totalSavings: number;
  effectivePrice: number;
  savingsPercent: number;
};

// ---------------------------------------------------------------------------
// AGI limits by filing status
// ---------------------------------------------------------------------------

const NEW_AGI_LIMITS: Record<EvTaxCreditInput["filingStatus"], number> = {
  married_jointly: 300000,
  head_of_household: 225000,
  single: 150000,
  married_separately: 150000,
};

const USED_AGI_LIMITS: Record<EvTaxCreditInput["filingStatus"], number> = {
  married_jointly: 150000,
  head_of_household: 112500,
  single: 75000,
  married_separately: 75000,
};

// ---------------------------------------------------------------------------
// Vehicle body types treated as SUV / truck / van for the $80K MSRP cap.
// We match on common substrings in the model name. For a production app this
// would be a proper vehicle-classification lookup.
// ---------------------------------------------------------------------------

const SUV_TRUCK_VAN_KEYWORDS = [
  "suv",
  "truck",
  "pickup",
  "van",
  "crossover",
  "cab",
  "crew",
  "utility",
  "4x4",
  "off-road",
  "wagon",
];

function isSuvTruckOrVan(model: string): boolean {
  const lower = model.toLowerCase();
  return SUV_TRUCK_VAN_KEYWORDS.some((kw) => lower.includes(kw));
}

// ---------------------------------------------------------------------------
// State-level EV incentive estimates (simplified, non-exhaustive)
// ---------------------------------------------------------------------------

const STATE_CREDITS: Record<string, number> = {
  CA: 750, // CVRP base rebate (simplified)
  CO: 5000,
  CT: 2250,
  DE: 2500,
  IL: 4000,
  MA: 3500,
  MD: 3000,
  ME: 2000,
  NJ: 4000,
  NV: 2500,
  NY: 2000,
  OR: 2500,
  PA: 3000,
  RI: 2500,
  VT: 3000,
  WA: 2500,
};

function getStateCredit(stateCode: string, purchaseType: "new" | "used"): number {
  // Most state programs are for new vehicles only; halve for used as a rough estimate
  const base = STATE_CREDITS[stateCode.toUpperCase()] ?? 0;
  return purchaseType === "used" ? Math.round(base * 0.5) : base;
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function fmtMoney(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function filingLabel(status: EvTaxCreditInput["filingStatus"]): string {
  const map: Record<EvTaxCreditInput["filingStatus"], string> = {
    single: "Single",
    married_jointly: "Married Filing Jointly",
    married_separately: "Married Filing Separately",
    head_of_household: "Head of Household",
  };
  return map[status];
}

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------

export function calculateEvTaxCredit(input: EvTaxCreditInput): EvTaxCreditResult {
  const {
    filingStatus,
    adjustedGrossIncome,
    vehicleModel,
    vehicleMSRP,
    vehicleYear,
    purchaseType,
    dealerPurchase,
    stateCode,
  } = input;

  const reasons: EligibilityReason[] = [];
  let federalCreditAmount = 0;

  if (purchaseType === "new") {
    // -----------------------------------------------------------------------
    // NEW vehicle rules (IRC 30D)
    // -----------------------------------------------------------------------

    // 1. Income eligibility
    const agiLimit = NEW_AGI_LIMITS[filingStatus];
    const incomeOk = adjustedGrossIncome <= agiLimit;
    reasons.push({
      label: "Income eligibility",
      passed: incomeOk,
      detail: incomeOk
        ? `Your AGI (${fmtMoney(adjustedGrossIncome)}) is within the ${fmtMoney(agiLimit)} limit for ${filingLabel(filingStatus)} filers`
        : `Your AGI (${fmtMoney(adjustedGrossIncome)}) exceeds the ${fmtMoney(agiLimit)} limit for ${filingLabel(filingStatus)} filers`,
    });

    // 2. MSRP cap
    const isLargeVehicle = isSuvTruckOrVan(vehicleModel);
    const msrpCap = isLargeVehicle ? 80000 : 55000;
    const msrpOk = vehicleMSRP <= msrpCap;
    const vehicleCategory = isLargeVehicle ? "SUVs, trucks & vans" : "sedans & other vehicles";
    reasons.push({
      label: "Vehicle price cap",
      passed: msrpOk,
      detail: msrpOk
        ? `MSRP (${fmtMoney(vehicleMSRP)}) is within the ${fmtMoney(msrpCap)} cap for ${vehicleCategory}`
        : `MSRP (${fmtMoney(vehicleMSRP)}) exceeds the ${fmtMoney(msrpCap)} cap for ${vehicleCategory}`,
    });

    // 3. Dealer purchase
    reasons.push({
      label: "Dealer purchase",
      passed: dealerPurchase,
      detail: dealerPurchase
        ? "Vehicle purchased from a licensed dealer"
        : "Vehicle must be purchased from a licensed dealer to qualify",
    });

    // 4. Final assembly in North America
    reasons.push({
      label: "North American assembly",
      passed: true,
      detail: "Verify with dealer that final assembly is in North America (required for eligibility)",
    });

    // 5. Battery component requirements
    reasons.push({
      label: "Battery & critical mineral requirements",
      passed: true,
      detail:
        "Verify with IRS clean vehicle list \u2014 up to $3,750 for critical minerals sourcing and up to $3,750 for battery component manufacturing",
    });

    // Determine credit amount
    const coreEligible = incomeOk && msrpOk && dealerPurchase;
    federalCreditAmount = coreEligible ? 7500 : 0;
  } else {
    // -----------------------------------------------------------------------
    // USED vehicle rules (IRC 25E)
    // -----------------------------------------------------------------------

    // 1. Income eligibility
    const agiLimit = USED_AGI_LIMITS[filingStatus];
    const incomeOk = adjustedGrossIncome <= agiLimit;
    reasons.push({
      label: "Income eligibility",
      passed: incomeOk,
      detail: incomeOk
        ? `Your AGI (${fmtMoney(adjustedGrossIncome)}) is within the ${fmtMoney(agiLimit)} limit for ${filingLabel(filingStatus)} filers (used vehicle)`
        : `Your AGI (${fmtMoney(adjustedGrossIncome)}) exceeds the ${fmtMoney(agiLimit)} limit for ${filingLabel(filingStatus)} filers (used vehicle)`,
    });

    // 2. Price cap ($25,000)
    const priceCap = 25000;
    const priceOk = vehicleMSRP <= priceCap;
    reasons.push({
      label: "Vehicle price cap",
      passed: priceOk,
      detail: priceOk
        ? `Sale price (${fmtMoney(vehicleMSRP)}) is within the ${fmtMoney(priceCap)} cap for used EVs`
        : `Sale price (${fmtMoney(vehicleMSRP)}) exceeds the ${fmtMoney(priceCap)} cap for used EVs`,
    });

    // 3. Dealer purchase
    reasons.push({
      label: "Dealer purchase",
      passed: dealerPurchase,
      detail: dealerPurchase
        ? "Vehicle purchased from a licensed dealer"
        : "Used EV credit requires purchase from a licensed dealer",
    });

    // 4. Vehicle age (must be at least 2 model years old)
    const currentYear = new Date().getFullYear();
    const ageOk = currentYear - vehicleYear >= 2;
    reasons.push({
      label: "Vehicle age",
      passed: ageOk,
      detail: ageOk
        ? `${vehicleYear} model year is at least 2 years old (required for used EV credit)`
        : `${vehicleYear} model year is not at least 2 model years old \u2014 used credit requires the vehicle to be at least 2 years old`,
    });

    // 5. Assembly location (informational)
    reasons.push({
      label: "North American assembly",
      passed: true,
      detail: "Verify with dealer that the vehicle meets eligibility requirements",
    });

    // Determine credit amount: lesser of $4,000 or 30% of sale price
    const coreEligible = incomeOk && priceOk && dealerPurchase && ageOk;
    if (coreEligible) {
      federalCreditAmount = Math.min(4000, Math.round(vehicleMSRP * 0.3));
    }
  }

  const federalEligible = federalCreditAmount > 0;

  // State credit
  const stateCredit = getStateCredit(stateCode, purchaseType);

  // Totals
  const totalSavings = federalCreditAmount + stateCredit;
  const effectivePrice = Math.max(0, vehicleMSRP - totalSavings);
  const savingsPercent = vehicleMSRP > 0
    ? Math.round((totalSavings / vehicleMSRP) * 10000) / 100
    : 0;

  return {
    federalEligible,
    federalCreditAmount,
    eligibilityReasons: reasons,
    stateCredit,
    totalSavings,
    effectivePrice,
    savingsPercent,
  };
}
