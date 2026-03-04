import type { EvChargingInput } from "./schema";

export const evChargingDefaults: EvChargingInput = {
  annualMiles: 12000,
  evEfficiency: 28,
  electricityRate: 0.16,
  hasTouRates: false,
  touOffPeakRate: 0.08,
  touOnPeakRate: 0.30,
  offPeakChargePercent: 80,
  chargerLevel: "level2",
  level2InstallCost: 800,
  chargerHardwareCost: 500,
  gasPrice: 3.30,
  compareMpg: 30,
  publicChargingPercent: 10,
  publicChargingRate: 0.40,
  stateCode: "CA",
};
