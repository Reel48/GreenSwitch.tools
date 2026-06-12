import { z } from "zod";

export const waterHeaterSchema = z.object({
  // Household hot water demand
  householdSize: z.number().min(1).max(10),
  gallonsPerPerson: z.number().min(5).max(40),

  // Current system
  currentType: z.enum(["electric_resistance", "gas_tank", "propane_tank"]),

  // Energy rates
  electricityRate: z.number().min(0.01).max(1.0),
  gasRate: z.number().min(0.1).max(10), // $/therm
  propaneRate: z.number().min(0.5).max(10), // $/gallon

  // Equipment efficiency (UEF)
  hpwhUEF: z.number().min(1.5).max(5),
  electricUEF: z.number().min(0.8).max(1.0),
  gasUEF: z.number().min(0.4).max(0.95),

  // Costs
  hpwhInstalledCost: z.number().min(500).max(10000),
  conventionalInstalledCost: z.number().min(300).max(6000),
  rebatesAndIncentives: z.number().min(0).max(5000),

  // Assumptions
  temperatureRiseF: z.number().min(40).max(100),
  lifespanYears: z.number().min(5).max(20),
  electricityEscalation: z.number().min(0).max(0.15),
  fuelEscalation: z.number().min(0).max(0.15),

  stateCode: z.string().length(2).default("CA"),
});

export type WaterHeaterInput = z.infer<typeof waterHeaterSchema>;
