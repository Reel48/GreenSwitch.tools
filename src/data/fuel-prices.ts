export interface FuelPrices {
  /** Regular unleaded gasoline price in $/gallon */
  gasRegular: number;
  /** Premium gasoline price in $/gallon */
  gasPremium: number;
  /** Diesel price in $/gallon */
  diesel: number;
  /** Natural gas price in $/therm */
  naturalGasTherm: number;
  /** Propane price in $/gallon */
  propaneGallon: number;
  /** Heating oil price in $/gallon */
  heatingOilGallon: number;
}

export const fuelPrices: Record<string, FuelPrices> = {
  AL: { gasRegular: 2.89, gasPremium: 3.49, diesel: 3.29, naturalGasTherm: 1.10, propaneGallon: 2.50, heatingOilGallon: 3.20 },
  AK: { gasRegular: 3.85, gasPremium: 4.35, diesel: 4.10, naturalGasTherm: 1.05, propaneGallon: 3.40, heatingOilGallon: 4.10 },
  AZ: { gasRegular: 3.35, gasPremium: 3.95, diesel: 3.65, naturalGasTherm: 1.30, propaneGallon: 2.80, heatingOilGallon: 3.50 },
  AR: { gasRegular: 2.85, gasPremium: 3.45, diesel: 3.20, naturalGasTherm: 1.00, propaneGallon: 2.40, heatingOilGallon: 3.10 },
  CA: { gasRegular: 4.80, gasPremium: 5.40, diesel: 5.10, naturalGasTherm: 1.80, propaneGallon: 3.60, heatingOilGallon: 4.30 },
  CO: { gasRegular: 3.10, gasPremium: 3.70, diesel: 3.45, naturalGasTherm: 0.95, propaneGallon: 2.60, heatingOilGallon: 3.40 },
  CT: { gasRegular: 3.40, gasPremium: 4.05, diesel: 3.90, naturalGasTherm: 1.70, propaneGallon: 3.30, heatingOilGallon: 3.90 },
  DE: { gasRegular: 3.15, gasPremium: 3.75, diesel: 3.55, naturalGasTherm: 1.35, propaneGallon: 2.90, heatingOilGallon: 3.60 },
  DC: { gasRegular: 3.50, gasPremium: 4.10, diesel: 3.80, naturalGasTherm: 1.50, propaneGallon: 3.20, heatingOilGallon: 3.80 },
  FL: { gasRegular: 3.20, gasPremium: 3.80, diesel: 3.55, naturalGasTherm: 1.85, propaneGallon: 3.00, heatingOilGallon: 3.50 },
  GA: { gasRegular: 2.95, gasPremium: 3.55, diesel: 3.30, naturalGasTherm: 1.15, propaneGallon: 2.55, heatingOilGallon: 3.25 },
  HI: { gasRegular: 4.90, gasPremium: 5.50, diesel: 5.30, naturalGasTherm: 3.50, propaneGallon: 4.50, heatingOilGallon: 5.00 },
  ID: { gasRegular: 3.25, gasPremium: 3.85, diesel: 3.55, naturalGasTherm: 0.90, propaneGallon: 2.60, heatingOilGallon: 3.40 },
  IL: { gasRegular: 3.45, gasPremium: 4.10, diesel: 3.75, naturalGasTherm: 1.10, propaneGallon: 2.70, heatingOilGallon: 3.50 },
  IN: { gasRegular: 3.10, gasPremium: 3.70, diesel: 3.45, naturalGasTherm: 1.00, propaneGallon: 2.50, heatingOilGallon: 3.30 },
  IA: { gasRegular: 3.00, gasPremium: 3.60, diesel: 3.35, naturalGasTherm: 0.95, propaneGallon: 2.30, heatingOilGallon: 3.20 },
  KS: { gasRegular: 2.95, gasPremium: 3.55, diesel: 3.30, naturalGasTherm: 0.95, propaneGallon: 2.35, heatingOilGallon: 3.15 },
  KY: { gasRegular: 2.90, gasPremium: 3.50, diesel: 3.25, naturalGasTherm: 1.05, propaneGallon: 2.45, heatingOilGallon: 3.20 },
  LA: { gasRegular: 2.80, gasPremium: 3.40, diesel: 3.15, naturalGasTherm: 0.90, propaneGallon: 2.30, heatingOilGallon: 3.00 },
  ME: { gasRegular: 3.30, gasPremium: 3.90, diesel: 3.75, naturalGasTherm: 1.75, propaneGallon: 3.20, heatingOilGallon: 3.85 },
  MD: { gasRegular: 3.25, gasPremium: 3.85, diesel: 3.65, naturalGasTherm: 1.40, propaneGallon: 3.00, heatingOilGallon: 3.70 },
  MA: { gasRegular: 3.35, gasPremium: 3.95, diesel: 3.85, naturalGasTherm: 1.80, propaneGallon: 3.40, heatingOilGallon: 4.00 },
  MI: { gasRegular: 3.20, gasPremium: 3.80, diesel: 3.55, naturalGasTherm: 1.05, propaneGallon: 2.60, heatingOilGallon: 3.40 },
  MN: { gasRegular: 3.10, gasPremium: 3.70, diesel: 3.45, naturalGasTherm: 1.00, propaneGallon: 2.40, heatingOilGallon: 3.30 },
  MS: { gasRegular: 2.80, gasPremium: 3.40, diesel: 3.15, naturalGasTherm: 1.05, propaneGallon: 2.40, heatingOilGallon: 3.10 },
  MO: { gasRegular: 2.90, gasPremium: 3.50, diesel: 3.25, naturalGasTherm: 1.00, propaneGallon: 2.40, heatingOilGallon: 3.15 },
  MT: { gasRegular: 3.20, gasPremium: 3.80, diesel: 3.50, naturalGasTherm: 0.90, propaneGallon: 2.55, heatingOilGallon: 3.35 },
  NE: { gasRegular: 3.00, gasPremium: 3.60, diesel: 3.35, naturalGasTherm: 0.90, propaneGallon: 2.30, heatingOilGallon: 3.15 },
  NV: { gasRegular: 3.70, gasPremium: 4.30, diesel: 3.95, naturalGasTherm: 1.20, propaneGallon: 2.85, heatingOilGallon: 3.60 },
  NH: { gasRegular: 3.25, gasPremium: 3.85, diesel: 3.70, naturalGasTherm: 1.65, propaneGallon: 3.15, heatingOilGallon: 3.80 },
  NJ: { gasRegular: 3.30, gasPremium: 3.90, diesel: 3.75, naturalGasTherm: 1.45, propaneGallon: 3.10, heatingOilGallon: 3.75 },
  NM: { gasRegular: 3.05, gasPremium: 3.65, diesel: 3.40, naturalGasTherm: 0.85, propaneGallon: 2.50, heatingOilGallon: 3.30 },
  NY: { gasRegular: 3.50, gasPremium: 4.15, diesel: 3.95, naturalGasTherm: 1.60, propaneGallon: 3.30, heatingOilGallon: 3.95 },
  NC: { gasRegular: 3.05, gasPremium: 3.65, diesel: 3.40, naturalGasTherm: 1.15, propaneGallon: 2.65, heatingOilGallon: 3.35 },
  ND: { gasRegular: 3.05, gasPremium: 3.65, diesel: 3.40, naturalGasTherm: 0.85, propaneGallon: 2.25, heatingOilGallon: 3.20 },
  OH: { gasRegular: 3.10, gasPremium: 3.70, diesel: 3.50, naturalGasTherm: 1.10, propaneGallon: 2.55, heatingOilGallon: 3.35 },
  OK: { gasRegular: 2.85, gasPremium: 3.45, diesel: 3.20, naturalGasTherm: 0.85, propaneGallon: 2.30, heatingOilGallon: 3.05 },
  OR: { gasRegular: 3.65, gasPremium: 4.25, diesel: 3.90, naturalGasTherm: 1.15, propaneGallon: 2.85, heatingOilGallon: 3.60 },
  PA: { gasRegular: 3.40, gasPremium: 4.00, diesel: 3.80, naturalGasTherm: 1.30, propaneGallon: 2.90, heatingOilGallon: 3.70 },
  RI: { gasRegular: 3.35, gasPremium: 3.95, diesel: 3.80, naturalGasTherm: 1.75, propaneGallon: 3.35, heatingOilGallon: 3.95 },
  SC: { gasRegular: 2.90, gasPremium: 3.50, diesel: 3.25, naturalGasTherm: 1.15, propaneGallon: 2.55, heatingOilGallon: 3.25 },
  SD: { gasRegular: 3.05, gasPremium: 3.65, diesel: 3.40, naturalGasTherm: 0.90, propaneGallon: 2.30, heatingOilGallon: 3.20 },
  TN: { gasRegular: 2.90, gasPremium: 3.50, diesel: 3.25, naturalGasTherm: 1.05, propaneGallon: 2.45, heatingOilGallon: 3.20 },
  TX: { gasRegular: 2.85, gasPremium: 3.45, diesel: 3.20, naturalGasTherm: 0.85, propaneGallon: 2.30, heatingOilGallon: 3.05 },
  UT: { gasRegular: 3.15, gasPremium: 3.75, diesel: 3.45, naturalGasTherm: 0.90, propaneGallon: 2.50, heatingOilGallon: 3.30 },
  VT: { gasRegular: 3.30, gasPremium: 3.90, diesel: 3.75, naturalGasTherm: 1.70, propaneGallon: 3.25, heatingOilGallon: 3.85 },
  VA: { gasRegular: 3.10, gasPremium: 3.70, diesel: 3.50, naturalGasTherm: 1.20, propaneGallon: 2.75, heatingOilGallon: 3.45 },
  WA: { gasRegular: 3.80, gasPremium: 4.40, diesel: 4.05, naturalGasTherm: 1.15, propaneGallon: 2.90, heatingOilGallon: 3.65 },
  WV: { gasRegular: 3.00, gasPremium: 3.60, diesel: 3.40, naturalGasTherm: 1.10, propaneGallon: 2.55, heatingOilGallon: 3.30 },
  WI: { gasRegular: 3.10, gasPremium: 3.70, diesel: 3.45, naturalGasTherm: 1.00, propaneGallon: 2.45, heatingOilGallon: 3.30 },
  WY: { gasRegular: 3.15, gasPremium: 3.75, diesel: 3.50, naturalGasTherm: 0.85, propaneGallon: 2.40, heatingOilGallon: 3.25 },
};
