import { z } from "zod";

export const heatPumpSchema = z.object({
  // Climate & home
  climateZone: z.string().min(1).max(4),
  homeSqFt: z.number().min(500).max(10000),

  // Current fuel system
  currentFuelType: z.enum([
    "natural_gas",
    "propane",
    "oil",
    "electric_resistance",
  ]),

  // Fuel rates
  gasRate: z.number().min(0.01).max(10), // $/therm
  propaneRate: z.number().min(0.5).max(10), // $/gallon
  oilRate: z.number().min(1).max(15), // $/gallon
  electricityRate: z.number().min(0.01).max(1.0), // $/kWh

  // Equipment performance
  heatPumpCOP: z.number().min(1.5).max(5), // coefficient of performance
  furnaceEfficiency: z.number().min(0.7).max(0.98), // AFUE

  // Installation costs
  heatPumpInstallCost: z.number().min(0).max(50000),
  furnaceInstallCost: z.number().min(0).max(30000),

  // Cooling savings
  includeACSavings: z.boolean(),
  currentACCost: z.number().min(0).max(5000), // annual AC cost
  heatPumpCoolingCOP: z.number().min(2).max(8), // SEER equivalent COP

  // Ownership
  ownershipYears: z.number().min(1).max(30),

  // Maintenance
  annualMaintenanceHP: z.number().min(0).max(2000),
  annualMaintenanceFurnace: z.number().min(0).max(2000),

  // Escalation rates
  fuelEscalation: z.number().min(0).max(0.15), // annual fuel price increase
  electricityEscalation: z.number().min(0).max(0.15), // annual electricity price increase

  // Location & incentives
  stateCode: z.string().length(2),
  federalTaxCredit: z.number().min(0).max(10000), // IRA heat pump credit
  stateTaxCredit: z.number().min(0).max(10000),
});

export type HeatPumpInput = z.infer<typeof heatPumpSchema>;
