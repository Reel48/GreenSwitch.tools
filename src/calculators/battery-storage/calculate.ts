import type { BatteryStorageInput } from "./schema";
import type { YearlyBreakdown, CostBreakdown } from "../types";
import { electricityRates } from "@/data/electricity-rates";
import { stateIncentives } from "@/data/incentives";

export type BatteryStorageResult = {
  // Costs
  grossSystemCost: number;
  federalTaxCredit: number;
  stateIncentive: number;
  netSystemCost: number;

  // Energy
  dailyEnergyShiftKwh: number;
  dailySavings: number;

  // Savings
  annualSavingsYear1: number;
  monthlySavingsYear1: number;
  paybackPeriodYears: number;
  warrantySavings: number;
  lifetimeSavings: number;
  roi: number;

  // Financing
  monthlyLoanPayment: number;
  totalInterestPaid: number;

  // Environmental
  co2OffsetTonsPerYear: number;

  // Charts
  yearlyBreakdown: YearlyBreakdown[];
  costBreakdown: CostBreakdown[];
};

const ANALYSIS_YEARS = 15;
const UTILITY_ESCALATION = 0.03; // 3% annual rate increase
const CO2_LBS_PER_KWH = 0.855;

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number,
): number {
  if (annualRate === 0) return principal / (years * 12);
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

export function calculateBatteryStorage(
  input: BatteryStorageInput,
): BatteryStorageResult {
  const {
    stateCode,
    batteryCapacityKwh,
    usableCapacityPercent,
    roundTripEfficiency,
    systemCost,
    installationCost,
    annualDegradation,
    warrantyYears,
    monthlyElectricBill,
    hasSolar,
    solarOffsetPercent,
    rateStructure,
    onPeakRate,
    offPeakRate,
    flatRate,
    peakHoursPerDay,
    financingType,
    loanTermYears,
    loanInterestRate,
    applyFederalCredit,
    applyStateIncentive,
  } = input;

  // ---------- System cost ----------
  const grossSystemCost = systemCost + installationCost;

  // Federal ITC: 30% of total cost
  const federalTaxCredit = applyFederalCredit
    ? Math.round(grossSystemCost * 0.3)
    : 0;

  // State incentive lookup
  let stateIncentiveAmount = 0;
  if (applyStateIncentive) {
    const statePrograms = stateIncentives[stateCode] ?? [];
    const batteryProgram = statePrograms.find(
      (p) => p.category === "battery-storage",
    );
    if (batteryProgram) {
      stateIncentiveAmount = batteryProgram.maxAmount;
    }
  }

  const netSystemCost = Math.max(
    0,
    grossSystemCost - federalTaxCredit - stateIncentiveAmount,
  );

  // ---------- Daily energy shift ----------
  const usableKwh =
    batteryCapacityKwh * (usableCapacityPercent / 100) * (roundTripEfficiency / 100);

  // ---------- Daily savings ----------
  let dailySavingsBase: number;

  if (rateStructure === "tou") {
    // TOU arbitrage: charge at off-peak, discharge at on-peak
    const rateDelta = onPeakRate - offPeakRate;
    // We can shift up to usableKwh of energy; savings = shifted kWh * rate delta
    // But we also lose energy to round-trip efficiency, so cost of charging is higher
    const chargingCost = (batteryCapacityKwh * (usableCapacityPercent / 100)) * offPeakRate;
    const dischargingValue = usableKwh * onPeakRate;
    dailySavingsBase = dischargingValue - chargingCost;
  } else {
    // Flat rate: savings mainly come from solar self-consumption
    if (hasSolar) {
      // Battery stores excess solar to use later instead of exporting at low rate
      // Assume net metering pays ~30% of retail for excess
      const selfConsumptionValue = usableKwh * flatRate * 0.7; // value of shifting solar
      dailySavingsBase = selfConsumptionValue;
    } else {
      // Flat rate without solar: minimal savings (demand charge avoidance, backup value)
      dailySavingsBase = usableKwh * flatRate * 0.05;
    }
  }

  // If has solar, additional value from increased self-consumption
  if (hasSolar && rateStructure === "tou") {
    // Solar offsets grid draw; battery captures excess solar for peak use
    const solarBonus = usableKwh * onPeakRate * (solarOffsetPercent / 100) * 0.15;
    dailySavingsBase += solarBonus;
  }

  dailySavingsBase = Math.max(0, dailySavingsBase);

  // ---------- Financing ----------
  let monthlyLoanPayment = 0;
  let totalInterestPaid = 0;

  if (financingType === "loan") {
    monthlyLoanPayment = calculateMonthlyPayment(
      netSystemCost,
      loanInterestRate,
      loanTermYears,
    );
    totalInterestPaid = Math.round(
      monthlyLoanPayment * loanTermYears * 12 - netSystemCost,
    );
  }

  // ---------- Year-by-year analysis ----------
  const yearlyBreakdown: YearlyBreakdown[] = [];
  let cumulativeSavings = financingType === "cash" ? -netSystemCost : 0;
  let cumulativeWithBattery = financingType === "cash" ? netSystemCost : 0;
  let cumulativeWithoutBattery = 0;
  let paybackPeriodYears = ANALYSIS_YEARS + 1;
  let paybackFound = false;
  let warrantySavings = 0;
  let totalSavingsSum = 0;

  const stateRate = electricityRates[stateCode];
  const baseAnnualBill = monthlyElectricBill * 12;

  for (let year = 1; year <= ANALYSIS_YEARS; year++) {
    // Degraded capacity
    const degradationFactor = Math.pow(1 - annualDegradation / 100, year - 1);
    // Escalated rates
    const escalationFactor = Math.pow(1 + UTILITY_ESCALATION, year - 1);

    const dailySavingsYear = dailySavingsBase * degradationFactor * escalationFactor;
    const annualSavings = dailySavingsYear * 365;

    // Loan cost
    let annualLoanCost = 0;
    if (financingType === "loan" && year <= loanTermYears) {
      annualLoanCost = monthlyLoanPayment * 12;
    }

    const netAnnualSavings = annualSavings - annualLoanCost;
    cumulativeSavings += netAnnualSavings;
    totalSavingsSum += annualSavings;

    if (year <= warrantyYears) {
      warrantySavings += annualSavings;
    }

    // For chart: cost with and without battery
    const annualBillEscalated = baseAnnualBill * escalationFactor;
    cumulativeWithoutBattery += annualBillEscalated;

    const annualBillWithBattery =
      annualBillEscalated - annualSavings + annualLoanCost;
    cumulativeWithBattery += annualBillWithBattery;

    if (!paybackFound && cumulativeSavings >= 0) {
      paybackPeriodYears = year;
      paybackFound = true;
    }

    yearlyBreakdown.push({
      year,
      cumulativeCostA: Math.round(cumulativeWithBattery),
      cumulativeCostB: Math.round(cumulativeWithoutBattery),
      annualCostA: Math.round(annualBillWithBattery),
      annualCostB: Math.round(annualBillEscalated),
    });
  }

  // Year 1 savings
  const annualSavingsYear1 = Math.round(dailySavingsBase * 365);
  const monthlySavingsYear1 = Math.round(annualSavingsYear1 / 12);

  // Lifetime savings (total savings minus total cost)
  const totalCost =
    financingType === "loan"
      ? netSystemCost + totalInterestPaid
      : netSystemCost;
  const lifetimeSavings = Math.round(totalSavingsSum - totalCost);

  // ROI
  const roi =
    totalCost > 0
      ? Math.round(((totalSavingsSum - totalCost) / totalCost) * 100)
      : 0;

  // CO2 offset
  const co2OffsetTonsPerYear =
    Math.round(((usableKwh * 365 * CO2_LBS_PER_KWH) / 2000) * 10) / 10;

  // Cost breakdown
  const costBreakdown: CostBreakdown[] = [
    { label: "Battery System", amount: systemCost, color: "#0891b2" },
    { label: "Installation", amount: installationCost, color: "#06b6d4" },
    ...(federalTaxCredit > 0
      ? [{ label: "Federal Tax Credit", amount: -federalTaxCredit, color: "#22d3ee" }]
      : []),
    ...(stateIncentiveAmount > 0
      ? [{ label: "State Incentive", amount: -stateIncentiveAmount, color: "#67e8f9" }]
      : []),
    ...(totalInterestPaid > 0
      ? [{ label: "Loan Interest", amount: Math.round(totalInterestPaid), color: "#a5f3fc" }]
      : []),
  ];

  return {
    grossSystemCost: Math.round(grossSystemCost),
    federalTaxCredit,
    stateIncentive: stateIncentiveAmount,
    netSystemCost: Math.round(netSystemCost),
    dailyEnergyShiftKwh: Math.round(usableKwh * 10) / 10,
    dailySavings: Math.round(dailySavingsBase * 100) / 100,
    annualSavingsYear1,
    monthlySavingsYear1,
    paybackPeriodYears: paybackFound ? paybackPeriodYears : ANALYSIS_YEARS + 1,
    warrantySavings: Math.round(warrantySavings),
    lifetimeSavings,
    roi,
    monthlyLoanPayment: Math.round(monthlyLoanPayment),
    totalInterestPaid: Math.round(totalInterestPaid),
    co2OffsetTonsPerYear,
    yearlyBreakdown,
    costBreakdown,
  };
}
