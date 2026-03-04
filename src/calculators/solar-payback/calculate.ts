import type { SolarPaybackInput } from "./schema";
import type { YearlyBreakdown, CostBreakdown } from "../types";

export type SolarPaybackResult = {
  // System costs
  grossSystemCost: number;
  federalTaxCredit: number;
  netSystemCost: number;
  costPerWattInstalled: number;

  // Production
  yearOneProduction: number;
  monthlyProduction: number;
  annualBillOffset: number; // percentage of bill offset

  // Savings
  paybackPeriodYears: number;
  totalSavings25Year: number;
  roi25Year: number; // percentage
  annualSavingsYear1: number;
  monthlySavingsYear1: number;
  lifetimeSavings: number;

  // Financing
  monthlyLoanPayment: number;
  totalInterestPaid: number;

  // Environmental
  co2OffsetTonsPerYear: number;
  co2OffsetTonsLifetime: number;
  treesEquivalent: number;

  // Charts
  yearlyBreakdown: YearlyBreakdown[];
  costBreakdown: CostBreakdown[];
};

function getRoofDirectionMultiplier(direction: string): number {
  const multipliers: Record<string, number> = {
    south: 1.0,
    southwest: 0.95,
    southeast: 0.95,
    west: 0.85,
    east: 0.85,
    flat: 0.90,
  };
  return multipliers[direction] ?? 1.0;
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (annualRate === 0) return principal / (years * 12);
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateSolarPayback(input: SolarPaybackInput): SolarPaybackResult {
  const {
    systemSizeKw,
    costPerWatt,
    monthlyElectricBill,
    electricityRate,
    annualRateIncrease,
    annualProductionPerKw,
    netMetering,
    netMeteringRate,
    systemDegradation,
    federalTaxCreditPercent,
    stateTaxCredit,
    srecAnnualValue,
    roofDirection,
    financingType,
    loanRate,
    loanTermYears,
    systemLifeYears,
    inverterReplacementCost,
    inverterReplacementYear,
  } = input;

  // System cost
  const grossSystemCost = systemSizeKw * 1000 * costPerWatt;
  const federalTaxCredit = Math.round(grossSystemCost * federalTaxCreditPercent);
  const netSystemCost = grossSystemCost - federalTaxCredit - stateTaxCredit;

  // Direction multiplier
  const dirMultiplier = getRoofDirectionMultiplier(roofDirection);

  // Year 1 production
  const yearOneProduction = Math.round(systemSizeKw * annualProductionPerKw * dirMultiplier);
  const monthlyProduction = Math.round(yearOneProduction / 12);

  // Annual bill
  const annualBill = monthlyElectricBill * 12;
  const annualConsumptionKwh = annualBill / electricityRate;

  // Financing
  let monthlyLoanPayment = 0;
  let totalInterestPaid = 0;
  let financedAmount = 0;

  if (financingType === "loan") {
    financedAmount = netSystemCost;
    monthlyLoanPayment = calculateMonthlyPayment(financedAmount, loanRate, loanTermYears);
    totalInterestPaid = Math.round(monthlyLoanPayment * loanTermYears * 12 - financedAmount);
  }

  // Year-by-year analysis
  const yearlyBreakdown: YearlyBreakdown[] = [];
  let cumulativeSavings = financingType === "cash" ? -netSystemCost : 0;
  let cumulativeCostWithoutSolar = 0;
  let cumulativeCostWithSolar = financingType === "cash" ? netSystemCost : 0;
  let paybackPeriodYears = systemLifeYears; // default if never pays back
  let paybackFound = false;
  let totalSavings = 0;

  for (let year = 1; year <= systemLifeYears; year++) {
    // Degraded production
    const yearProduction = yearOneProduction * Math.pow(1 - systemDegradation, year - 1);

    // Escalated electricity rate
    const currentRate = electricityRate * Math.pow(1 + annualRateIncrease, year - 1);

    // Energy savings (value of electricity generated)
    const selfConsumptionKwh = Math.min(yearProduction, annualConsumptionKwh);
    const excessKwh = Math.max(0, yearProduction - annualConsumptionKwh);

    let annualEnergySavings = selfConsumptionKwh * currentRate;
    if (netMetering && excessKwh > 0) {
      annualEnergySavings += excessKwh * netMeteringRate;
    }

    // SREC income
    const srecIncome = srecAnnualValue;

    // Total annual benefit
    let annualBenefit = annualEnergySavings + srecIncome;

    // Subtract loan payment if applicable
    let annualCostWithSolar = 0;
    if (financingType === "loan" && year <= loanTermYears) {
      annualCostWithSolar = monthlyLoanPayment * 12;
    }

    // Inverter replacement
    if (year === inverterReplacementYear) {
      annualCostWithSolar += inverterReplacementCost;
    }

    // Net annual savings
    const netAnnualSavings = annualBenefit - annualCostWithSolar;

    // Without solar cost
    const annualBillNoSolar = annualConsumptionKwh * currentRate;
    cumulativeCostWithoutSolar += annualBillNoSolar;

    // With solar cost
    const remainingBill = Math.max(0, annualBillNoSolar - annualEnergySavings);
    cumulativeCostWithSolar += remainingBill + annualCostWithSolar;

    cumulativeSavings += netAnnualSavings;
    totalSavings += annualBenefit;

    // Check payback
    if (!paybackFound && cumulativeSavings >= 0) {
      paybackPeriodYears = year;
      paybackFound = true;
    }

    yearlyBreakdown.push({
      year,
      cumulativeCostA: Math.round(cumulativeCostWithSolar),
      cumulativeCostB: Math.round(cumulativeCostWithoutSolar),
      annualCostA: Math.round(remainingBill + annualCostWithSolar),
      annualCostB: Math.round(annualBillNoSolar),
    });
  }

  // Year 1 savings
  const currentRate1 = electricityRate;
  const selfConsumption1 = Math.min(yearOneProduction, annualConsumptionKwh);
  const excess1 = Math.max(0, yearOneProduction - annualConsumptionKwh);
  let annualSavingsYear1 = selfConsumption1 * currentRate1;
  if (netMetering && excess1 > 0) {
    annualSavingsYear1 += excess1 * netMeteringRate;
  }
  annualSavingsYear1 += srecAnnualValue;

  const monthlySavingsYear1 = annualSavingsYear1 / 12;
  const annualBillOffset = Math.min(100, (yearOneProduction / annualConsumptionKwh) * 100);

  // ROI
  const totalSystemCostWithInterest = financingType === "loan"
    ? netSystemCost + totalInterestPaid + inverterReplacementCost
    : netSystemCost + inverterReplacementCost;
  const lifetimeSavings = totalSavings - totalSystemCostWithInterest;
  const roi25Year = ((totalSavings - totalSystemCostWithInterest) / totalSystemCostWithInterest) * 100;
  const totalSavings25Year = totalSavings;

  // CO2 offset (~0.855 lbs CO2/kWh US avg grid)
  const co2OffsetLbsPerYear = yearOneProduction * 0.855;
  const co2OffsetTonsPerYear = co2OffsetLbsPerYear / 2000;

  // Sum degraded production over lifetime for total CO2
  let totalProduction = 0;
  for (let y = 0; y < systemLifeYears; y++) {
    totalProduction += yearOneProduction * Math.pow(1 - systemDegradation, y);
  }
  const co2OffsetTonsLifetime = (totalProduction * 0.855) / 2000;
  const treesEquivalent = Math.round(co2OffsetTonsLifetime * 16.5); // ~16.5 trees per ton CO2/year

  const costBreakdown: CostBreakdown[] = [
    { label: "Equipment & Install", amount: Math.round(grossSystemCost), color: "#16a34a" },
    { label: "Federal Tax Credit", amount: -federalTaxCredit, color: "#22c55e" },
    { label: "State Incentives", amount: -stateTaxCredit, color: "#4ade80" },
    { label: "Inverter Replacement", amount: inverterReplacementCost, color: "#86efac" },
    ...(totalInterestPaid > 0 ? [{ label: "Loan Interest", amount: Math.round(totalInterestPaid), color: "#bbf7d0" }] : []),
  ];

  return {
    grossSystemCost: Math.round(grossSystemCost),
    federalTaxCredit,
    netSystemCost: Math.round(netSystemCost),
    costPerWattInstalled: Math.round((netSystemCost / (systemSizeKw * 1000)) * 100) / 100,
    yearOneProduction,
    monthlyProduction,
    annualBillOffset: Math.round(annualBillOffset),
    paybackPeriodYears,
    totalSavings25Year: Math.round(totalSavings25Year),
    roi25Year: Math.round(roi25Year),
    annualSavingsYear1: Math.round(annualSavingsYear1),
    monthlySavingsYear1: Math.round(monthlySavingsYear1),
    lifetimeSavings: Math.round(lifetimeSavings),
    monthlyLoanPayment: Math.round(monthlyLoanPayment),
    totalInterestPaid: Math.round(totalInterestPaid),
    co2OffsetTonsPerYear: Math.round(co2OffsetTonsPerYear * 10) / 10,
    co2OffsetTonsLifetime: Math.round(co2OffsetTonsLifetime),
    treesEquivalent,
    yearlyBreakdown,
    costBreakdown,
  };
}
