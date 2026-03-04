import { z } from "zod";

export const evVsGasSchema = z.object({
  // Vehicle costs
  evPurchasePrice: z.number().min(10000).max(200000),
  gasPurchasePrice: z.number().min(10000).max(200000),

  // Driving
  annualMiles: z.number().min(1000).max(100000),

  // Energy costs
  electricityRate: z.number().min(0.01).max(1.0),
  gasPrice: z.number().min(1.0).max(10.0),

  // Efficiency
  evEfficiency: z.number().min(15).max(60), // kWh per 100 miles
  gasMpg: z.number().min(10).max(60),

  // Ownership
  ownershipYears: z.number().min(1).max(20),

  // Maintenance
  evAnnualMaintenance: z.number().min(0).max(5000),
  gasAnnualMaintenance: z.number().min(0).max(5000),

  // Insurance
  evAnnualInsurance: z.number().min(0).max(10000),
  gasAnnualInsurance: z.number().min(0).max(10000),

  // Incentives
  federalTaxCredit: z.number().min(0).max(7500),
  stateTaxCredit: z.number().min(0).max(10000),

  // Financing
  downPaymentPercent: z.number().min(0).max(100),
  loanTermYears: z.number().min(1).max(7),
  interestRate: z.number().min(0).max(20),

  // Depreciation
  evDepreciationRate: z.number().min(0).max(0.5), // annual rate
  gasDepreciationRate: z.number().min(0).max(0.5),

  // Annual fuel/electricity price increase
  annualFuelPriceIncrease: z.number().min(0).max(0.2),
  annualElectricityPriceIncrease: z.number().min(0).max(0.2),

  // State for data lookup
  stateCode: z.string().length(2),
});

export type EvVsGasInput = z.infer<typeof evVsGasSchema>;
