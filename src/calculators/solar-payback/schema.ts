import { z } from "zod";

export const solarPaybackSchema = z.object({
  systemSizeKw: z.number().min(1).max(50),
  costPerWatt: z.number().min(1).max(10),
  monthlyElectricBill: z.number().min(10).max(2000),
  electricityRate: z.number().min(0.01).max(1.0),
  annualRateIncrease: z.number().min(0).max(0.15),
  avgSunHours: z.number().min(1).max(10),
  annualProductionPerKw: z.number().min(500).max(2000),
  netMetering: z.boolean(),
  netMeteringRate: z.number().min(0).max(1.0), // rate paid for excess production
  systemDegradation: z.number().min(0).max(0.02), // annual panel degradation ~0.5%
  federalTaxCreditPercent: z.number().min(0).max(0.50),
  stateTaxCredit: z.number().min(0).max(50000),
  srecAnnualValue: z.number().min(0).max(10000),
  roofDirection: z.enum(["south", "southwest", "southeast", "west", "east", "flat"]),
  financingType: z.enum(["cash", "loan", "lease"]),
  loanRate: z.number().min(0).max(20),
  loanTermYears: z.number().min(1).max(30),
  systemLifeYears: z.number().min(10).max(40),
  inverterReplacementCost: z.number().min(0).max(10000),
  inverterReplacementYear: z.number().min(5).max(30),
  stateCode: z.string().length(2),
});

export type SolarPaybackInput = z.infer<typeof solarPaybackSchema>;
