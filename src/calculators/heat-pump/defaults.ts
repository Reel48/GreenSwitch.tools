import type { HeatPumpInput } from "./schema";

export const heatPumpDefaults: HeatPumpInput = {
  // Climate & home
  climateZone: "4A",
  homeSqFt: 2000,

  // Current fuel system
  currentFuelType: "natural_gas",

  // Fuel rates
  gasRate: 1.2, // $/therm (US average)
  propaneRate: 2.5, // $/gallon
  oilRate: 3.5, // $/gallon
  electricityRate: 0.16, // $/kWh

  // Equipment performance
  heatPumpCOP: 3.0,
  furnaceEfficiency: 0.92, // 92% AFUE

  // Installation costs
  heatPumpInstallCost: 12000,
  furnaceInstallCost: 5000,

  // Cooling savings
  includeACSavings: true,
  currentACCost: 600, // annual AC cost
  heatPumpCoolingCOP: 4.0,

  // Ownership
  ownershipYears: 15,

  // Maintenance
  annualMaintenanceHP: 150,
  annualMaintenanceFurnace: 200,

  // Escalation rates
  fuelEscalation: 0.03, // 3% annual fuel price increase
  electricityEscalation: 0.025, // 2.5% annual electricity price increase

  // Location & incentives
  stateCode: "CA",
  federalTaxCredit: 2000, // IRA heat pump credit
  stateTaxCredit: 0,
};
