import type { SolarPaybackInput } from "./schema";

export const solarPaybackDefaults: SolarPaybackInput = {
  systemSizeKw: 8,
  costPerWatt: 2.85,
  monthlyElectricBill: 150,
  electricityRate: 0.16,
  annualRateIncrease: 0.03,
  avgSunHours: 5.0,
  annualProductionPerKw: 1300,
  netMetering: true,
  netMeteringRate: 0.08,
  systemDegradation: 0.005,
  federalTaxCreditPercent: 0, // 25D credit ended Dec 31, 2025 for purchased systems
  stateTaxCredit: 0,
  srecAnnualValue: 0,
  roofDirection: "south",
  financingType: "cash",
  loanRate: 5.0,
  loanTermYears: 15,
  systemLifeYears: 25,
  inverterReplacementCost: 2000,
  inverterReplacementYear: 12,
  stateCode: "CA",
};
