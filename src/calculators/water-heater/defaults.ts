import type { WaterHeaterInput } from "./schema";

export const waterHeaterDefaults: WaterHeaterInput = {
  householdSize: 3,
  gallonsPerPerson: 15, // DOE estimates roughly 15-20 gal of hot water per person per day

  currentType: "electric_resistance",

  electricityRate: 0.16,
  gasRate: 1.2, // $/therm (US average)
  propaneRate: 2.5, // $/gallon

  hpwhUEF: 3.5, // typical ENERGY STAR heat pump water heater
  electricUEF: 0.92, // standard electric resistance tank
  gasUEF: 0.62, // standard atmospheric-vent gas tank

  hpwhInstalledCost: 3200, // unit + installation
  conventionalInstalledCost: 1400, // comparable replacement tank installed
  rebatesAndIncentives: 0, // 25C federal credit ended Dec 31, 2025 — state/utility rebates may apply

  temperatureRiseF: 70, // ~55°F inlet to 125°F tank setpoint
  lifespanYears: 13,
  electricityEscalation: 0.025,
  fuelEscalation: 0.03,

  stateCode: "CA",
};
