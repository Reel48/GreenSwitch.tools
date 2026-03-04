import type { EvTaxCreditInput } from "./schema";

export const evTaxCreditDefaults: EvTaxCreditInput = {
  filingStatus: "married_jointly",
  adjustedGrossIncome: 100000,
  vehicleMake: "",
  vehicleModel: "",
  vehicleMSRP: 45000,
  vehicleYear: 2025,
  purchaseType: "new",
  purchaseDate: new Date().toISOString().split("T")[0],
  stateCode: "CA",
  dealerPurchase: true,
};
