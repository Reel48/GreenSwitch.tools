import { z } from "zod";

export const evTaxCreditSchema = z.object({
  filingStatus: z.enum(["single", "married_jointly", "married_separately", "head_of_household"]),
  adjustedGrossIncome: z.number().min(0).max(10000000),
  vehicleMake: z.string(),
  vehicleModel: z.string(),
  vehicleMSRP: z.number().min(0).max(500000),
  vehicleYear: z.number().min(2023).max(2027),
  purchaseType: z.enum(["new", "used"]),
  purchaseDate: z.string(), // ISO date format
  stateCode: z.string().length(2).default("CA"),
  dealerPurchase: z.boolean().default(true),
});

export type EvTaxCreditInput = z.infer<typeof evTaxCreditSchema>;
