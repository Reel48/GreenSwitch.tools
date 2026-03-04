import type { BatteryStorageInput } from "./schema";

export const batteryStorageDefaults: BatteryStorageInput = {
  stateCode: "CA",
  batteryCapacityKwh: 13.5,
  usableCapacityPercent: 90,
  roundTripEfficiency: 90,
  systemCost: 12000,
  installationCost: 3500,
  annualDegradation: 3,
  warrantyYears: 10,

  monthlyElectricBill: 184,
  hasSolar: false,
  solarOffsetPercent: 80,

  rateStructure: "tou",
  onPeakRate: 0.52,
  offPeakRate: 0.20,
  flatRate: 0.302,
  peakHoursPerDay: 5,

  financingType: "cash",
  loanTermYears: 10,
  loanInterestRate: 6.5,

  applyFederalCredit: true,
  applyStateIncentive: true,
};
