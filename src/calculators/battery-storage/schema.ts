import { z } from "zod";

export const batteryStorageSchema = z.object({
  // System
  stateCode: z.string().length(2),
  batteryCapacityKwh: z.number().min(5).max(40),
  usableCapacityPercent: z.number().min(80).max(100),
  roundTripEfficiency: z.number().min(80).max(100),
  systemCost: z.number().min(3000).max(60000),
  installationCost: z.number().min(1000).max(15000),
  annualDegradation: z.number().min(0).max(10),
  warrantyYears: z.number().min(5).max(25),

  // Energy usage
  monthlyElectricBill: z.number().min(20).max(1000),
  hasSolar: z.boolean(),
  solarOffsetPercent: z.number().min(0).max(100),

  // Rate structure
  rateStructure: z.enum(["tou", "flat"]),
  onPeakRate: z.number().min(0.01).max(1.0),
  offPeakRate: z.number().min(0.01).max(1.0),
  flatRate: z.number().min(0.01).max(1.0),
  peakHoursPerDay: z.number().min(1).max(12),

  // Financing
  financingType: z.enum(["cash", "loan"]),
  loanTermYears: z.number().min(5).max(25),
  loanInterestRate: z.number().min(0).max(15),

  // Incentives
  applyFederalCredit: z.boolean(),
  applyStateIncentive: z.boolean(),
});

export type BatteryStorageInput = z.infer<typeof batteryStorageSchema>;
