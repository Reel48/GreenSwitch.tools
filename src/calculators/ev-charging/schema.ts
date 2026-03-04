import { z } from "zod";

export const evChargingSchema = z.object({
  annualMiles: z.number().min(1000).max(100000),
  evEfficiency: z.number().min(15).max(60), // kWh per 100 miles
  electricityRate: z.number().min(0.01).max(1.0),
  hasTouRates: z.boolean(),
  touOffPeakRate: z.number().min(0.01).max(1.0),
  touOnPeakRate: z.number().min(0.01).max(1.0),
  offPeakChargePercent: z.number().min(0).max(100), // % of charging done off-peak
  chargerLevel: z.enum(["level1", "level2"]),
  level2InstallCost: z.number().min(0).max(5000),
  chargerHardwareCost: z.number().min(0).max(2000),
  gasPrice: z.number().min(1.0).max(10.0),
  compareMpg: z.number().min(10).max(60),
  publicChargingPercent: z.number().min(0).max(100), // % done at public stations
  publicChargingRate: z.number().min(0.10).max(1.0), // $/kWh at public chargers
  stateCode: z.string().length(2),
});

export type EvChargingInput = z.infer<typeof evChargingSchema>;
