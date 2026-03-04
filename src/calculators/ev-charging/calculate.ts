import type { EvChargingInput } from "./schema";
import type { CostBreakdown } from "../types";

export type EvChargingResult = {
  // Annual costs
  annualChargingCost: number;
  monthlyChargingCost: number;
  dailyChargingCost: number;
  costPerMile: number;

  // Home vs public breakdown
  homeChargingCostAnnual: number;
  publicChargingCostAnnual: number;

  // TOU savings
  touSavingsAnnual: number;
  effectiveRate: number;

  // Comparison to gas
  equivalentGasCostAnnual: number;
  equivalentGasCostMonthly: number;
  gasCostPerMile: number;
  annualSavingsVsGas: number;
  monthlySavingsVsGas: number;

  // Charging time
  dailyKwhNeeded: number;
  level1HoursPerDay: number; // hours needed at ~1.4kW
  level2HoursPerDay: number; // hours needed at ~7.6kW

  // Upfront costs
  totalSetupCost: number;
  setupPaybackMonths: number;

  // Energy usage
  annualKwhUsed: number;
  monthlyKwhUsed: number;

  // Environmental
  co2SavingsVsGasTons: number;

  // Chart data
  costComparison: CostBreakdown[];
};

export function calculateEvCharging(input: EvChargingInput): EvChargingResult {
  const {
    annualMiles,
    evEfficiency,
    electricityRate,
    hasTouRates,
    touOffPeakRate,
    touOnPeakRate,
    offPeakChargePercent,
    chargerLevel,
    level2InstallCost,
    chargerHardwareCost,
    gasPrice,
    compareMpg,
    publicChargingPercent,
    publicChargingRate,
  } = input;

  // Energy consumption
  const annualKwhUsed = (annualMiles / 100) * evEfficiency;
  const monthlyKwhUsed = annualKwhUsed / 12;
  const dailyKwhNeeded = annualKwhUsed / 365;

  // Split between home and public charging
  const homeChargePercent = (100 - publicChargingPercent) / 100;
  const publicPercent = publicChargingPercent / 100;

  const homeKwh = annualKwhUsed * homeChargePercent;
  const publicKwh = annualKwhUsed * publicPercent;

  // Home charging cost (with TOU if applicable)
  let effectiveHomeRate: number;
  let touSavingsAnnual = 0;

  if (hasTouRates) {
    const offPeakFraction = offPeakChargePercent / 100;
    const onPeakFraction = 1 - offPeakFraction;
    effectiveHomeRate = touOffPeakRate * offPeakFraction + touOnPeakRate * onPeakFraction;

    // Savings compared to flat rate
    const flatRateCost = homeKwh * electricityRate;
    const touCost = homeKwh * effectiveHomeRate;
    touSavingsAnnual = Math.max(0, flatRateCost - touCost);
  } else {
    effectiveHomeRate = electricityRate;
  }

  const homeChargingCostAnnual = homeKwh * effectiveHomeRate;
  const publicChargingCostAnnual = publicKwh * publicChargingRate;

  const annualChargingCost = homeChargingCostAnnual + publicChargingCostAnnual;
  const monthlyChargingCost = annualChargingCost / 12;
  const dailyChargingCost = annualChargingCost / 365;
  const costPerMile = annualChargingCost / annualMiles;

  // Gas comparison
  const equivalentGasCostAnnual = (annualMiles / compareMpg) * gasPrice;
  const equivalentGasCostMonthly = equivalentGasCostAnnual / 12;
  const gasCostPerMile = gasPrice / compareMpg;
  const annualSavingsVsGas = equivalentGasCostAnnual - annualChargingCost;
  const monthlySavingsVsGas = annualSavingsVsGas / 12;

  // Charging time estimates
  const level1Power = 1.4; // kW (120V, ~12A)
  const level2Power = 7.6; // kW (240V, ~32A)
  const level1HoursPerDay = dailyKwhNeeded / level1Power;
  const level2HoursPerDay = dailyKwhNeeded / level2Power;

  // Setup costs
  const totalSetupCost = chargerLevel === "level2"
    ? level2InstallCost + chargerHardwareCost
    : 0; // Level 1 uses standard outlet

  const monthlySavings = annualSavingsVsGas / 12;
  const setupPaybackMonths = monthlySavings > 0
    ? Math.ceil(totalSetupCost / monthlySavings)
    : 0;

  // CO2 savings
  const evCO2Lbs = annualKwhUsed * 0.855; // US avg grid
  const gasCO2Lbs = (annualMiles / compareMpg) * 19.6;
  const co2SavingsVsGasTons = (gasCO2Lbs - evCO2Lbs) / 2000;

  const effectiveRate = annualChargingCost / annualKwhUsed;

  const costComparison: CostBreakdown[] = [
    { label: "EV Home Charging", amount: Math.round(homeChargingCostAnnual), color: "#16a34a" },
    { label: "EV Public Charging", amount: Math.round(publicChargingCostAnnual), color: "#22c55e" },
    { label: "Equivalent Gas Cost", amount: Math.round(equivalentGasCostAnnual), color: "#ef4444" },
  ];

  return {
    annualChargingCost: Math.round(annualChargingCost),
    monthlyChargingCost: Math.round(monthlyChargingCost),
    dailyChargingCost: Math.round(dailyChargingCost * 100) / 100,
    costPerMile: Math.round(costPerMile * 100) / 100,
    homeChargingCostAnnual: Math.round(homeChargingCostAnnual),
    publicChargingCostAnnual: Math.round(publicChargingCostAnnual),
    touSavingsAnnual: Math.round(touSavingsAnnual),
    effectiveRate: Math.round(effectiveRate * 1000) / 1000,
    equivalentGasCostAnnual: Math.round(equivalentGasCostAnnual),
    equivalentGasCostMonthly: Math.round(equivalentGasCostMonthly),
    gasCostPerMile: Math.round(gasCostPerMile * 100) / 100,
    annualSavingsVsGas: Math.round(annualSavingsVsGas),
    monthlySavingsVsGas: Math.round(monthlySavingsVsGas),
    dailyKwhNeeded: Math.round(dailyKwhNeeded * 10) / 10,
    level1HoursPerDay: Math.round(level1HoursPerDay * 10) / 10,
    level2HoursPerDay: Math.round(level2HoursPerDay * 10) / 10,
    totalSetupCost,
    setupPaybackMonths,
    annualKwhUsed: Math.round(annualKwhUsed),
    monthlyKwhUsed: Math.round(monthlyKwhUsed),
    co2SavingsVsGasTons: Math.round(co2SavingsVsGasTons * 10) / 10,
    costComparison,
  };
}
