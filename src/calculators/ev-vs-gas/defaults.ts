import type { EvVsGasInput } from "./schema";

export const evVsGasDefaults: EvVsGasInput = {
  evPurchasePrice: 35000,
  gasPurchasePrice: 30000,
  annualMiles: 12000,
  electricityRate: 0.16,
  gasPrice: 3.3,
  evEfficiency: 28, // kWh per 100 miles (typical for Model 3, Ioniq 5, etc.)
  gasMpg: 30,
  ownershipYears: 10,
  evAnnualMaintenance: 600,
  gasAnnualMaintenance: 1200,
  evAnnualInsurance: 1800,
  gasAnnualInsurance: 1600,
  federalTaxCredit: 7500,
  stateTaxCredit: 0,
  downPaymentPercent: 20,
  loanTermYears: 5,
  interestRate: 6.5,
  evDepreciationRate: 0.15,
  gasDepreciationRate: 0.12,
  annualFuelPriceIncrease: 0.03,
  annualElectricityPriceIncrease: 0.02,
  stateCode: "CA",
};
