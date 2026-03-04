export interface ClimateZone {
  /** IECC climate zone designation */
  ieccZone: string;
  /** Annual heating degree days (base 65F) */
  heatingDegreeDays: number;
  /** Annual cooling degree days (base 65F) */
  coolingDegreeDays: number;
  /** Heat pump coefficient of performance for heating (seasonal avg) */
  heatPumpCopHeating: number;
  /** Heat pump coefficient of performance for cooling (seasonal avg) */
  heatPumpCopCooling: number;
}

export const climateZones: Record<string, ClimateZone> = {
  AL: { ieccZone: "3A", heatingDegreeDays: 2600, coolingDegreeDays: 2200, heatPumpCopHeating: 3.2, heatPumpCopCooling: 3.8 },
  AK: { ieccZone: "7-8", heatingDegreeDays: 10000, coolingDegreeDays: 100, heatPumpCopHeating: 1.8, heatPumpCopCooling: 4.0 },
  AZ: { ieccZone: "2B", heatingDegreeDays: 1500, coolingDegreeDays: 4000, heatPumpCopHeating: 3.5, heatPumpCopCooling: 3.2 },
  AR: { ieccZone: "3A", heatingDegreeDays: 3200, coolingDegreeDays: 1900, heatPumpCopHeating: 3.0, heatPumpCopCooling: 3.7 },
  CA: { ieccZone: "3B", heatingDegreeDays: 2400, coolingDegreeDays: 1200, heatPumpCopHeating: 3.3, heatPumpCopCooling: 3.9 },
  CO: { ieccZone: "5B", heatingDegreeDays: 6100, coolingDegreeDays: 650, heatPumpCopHeating: 2.3, heatPumpCopCooling: 4.0 },
  CT: { ieccZone: "5A", heatingDegreeDays: 5800, coolingDegreeDays: 700, heatPumpCopHeating: 2.4, heatPumpCopCooling: 3.9 },
  DE: { ieccZone: "4A", heatingDegreeDays: 4600, coolingDegreeDays: 1200, heatPumpCopHeating: 2.7, heatPumpCopCooling: 3.7 },
  DC: { ieccZone: "4A", heatingDegreeDays: 4200, coolingDegreeDays: 1500, heatPumpCopHeating: 2.8, heatPumpCopCooling: 3.6 },
  FL: { ieccZone: "1-2A", heatingDegreeDays: 600, coolingDegreeDays: 3500, heatPumpCopHeating: 3.5, heatPumpCopCooling: 3.3 },
  GA: { ieccZone: "3A", heatingDegreeDays: 2800, coolingDegreeDays: 2000, heatPumpCopHeating: 3.1, heatPumpCopCooling: 3.7 },
  HI: { ieccZone: "1A", heatingDegreeDays: 0, coolingDegreeDays: 4500, heatPumpCopHeating: 3.8, heatPumpCopCooling: 3.2 },
  ID: { ieccZone: "5-6B", heatingDegreeDays: 6200, coolingDegreeDays: 500, heatPumpCopHeating: 2.3, heatPumpCopCooling: 4.0 },
  IL: { ieccZone: "5A", heatingDegreeDays: 6200, coolingDegreeDays: 900, heatPumpCopHeating: 2.3, heatPumpCopCooling: 3.8 },
  IN: { ieccZone: "5A", heatingDegreeDays: 5700, coolingDegreeDays: 950, heatPumpCopHeating: 2.4, heatPumpCopCooling: 3.8 },
  IA: { ieccZone: "5-6A", heatingDegreeDays: 6800, coolingDegreeDays: 800, heatPumpCopHeating: 2.1, heatPumpCopCooling: 3.9 },
  KS: { ieccZone: "4A", heatingDegreeDays: 5000, coolingDegreeDays: 1400, heatPumpCopHeating: 2.6, heatPumpCopCooling: 3.6 },
  KY: { ieccZone: "4A", heatingDegreeDays: 4400, coolingDegreeDays: 1300, heatPumpCopHeating: 2.8, heatPumpCopCooling: 3.7 },
  LA: { ieccZone: "2A", heatingDegreeDays: 1600, coolingDegreeDays: 2800, heatPumpCopHeating: 3.4, heatPumpCopCooling: 3.4 },
  ME: { ieccZone: "6A", heatingDegreeDays: 7500, coolingDegreeDays: 400, heatPumpCopHeating: 2.0, heatPumpCopCooling: 4.0 },
  MD: { ieccZone: "4A", heatingDegreeDays: 4500, coolingDegreeDays: 1400, heatPumpCopHeating: 2.7, heatPumpCopCooling: 3.6 },
  MA: { ieccZone: "5A", heatingDegreeDays: 5900, coolingDegreeDays: 650, heatPumpCopHeating: 2.3, heatPumpCopCooling: 3.9 },
  MI: { ieccZone: "5-6A", heatingDegreeDays: 6700, coolingDegreeDays: 600, heatPumpCopHeating: 2.2, heatPumpCopCooling: 4.0 },
  MN: { ieccZone: "6-7A", heatingDegreeDays: 8000, coolingDegreeDays: 700, heatPumpCopHeating: 2.0, heatPumpCopCooling: 4.0 },
  MS: { ieccZone: "3A", heatingDegreeDays: 2200, coolingDegreeDays: 2400, heatPumpCopHeating: 3.3, heatPumpCopCooling: 3.5 },
  MO: { ieccZone: "4A", heatingDegreeDays: 4800, coolingDegreeDays: 1400, heatPumpCopHeating: 2.7, heatPumpCopCooling: 3.6 },
  MT: { ieccZone: "6B", heatingDegreeDays: 7400, coolingDegreeDays: 350, heatPumpCopHeating: 2.0, heatPumpCopCooling: 4.1 },
  NE: { ieccZone: "5A", heatingDegreeDays: 6300, coolingDegreeDays: 1000, heatPumpCopHeating: 2.2, heatPumpCopCooling: 3.8 },
  NV: { ieccZone: "3-5B", heatingDegreeDays: 2800, coolingDegreeDays: 2800, heatPumpCopHeating: 3.1, heatPumpCopCooling: 3.3 },
  NH: { ieccZone: "6A", heatingDegreeDays: 7200, coolingDegreeDays: 450, heatPumpCopHeating: 2.0, heatPumpCopCooling: 4.0 },
  NJ: { ieccZone: "4-5A", heatingDegreeDays: 5000, coolingDegreeDays: 1100, heatPumpCopHeating: 2.6, heatPumpCopCooling: 3.7 },
  NM: { ieccZone: "3-5B", heatingDegreeDays: 3800, coolingDegreeDays: 1600, heatPumpCopHeating: 2.9, heatPumpCopCooling: 3.6 },
  NY: { ieccZone: "4-6A", heatingDegreeDays: 5800, coolingDegreeDays: 800, heatPumpCopHeating: 2.4, heatPumpCopCooling: 3.9 },
  NC: { ieccZone: "3-4A", heatingDegreeDays: 3400, coolingDegreeDays: 1700, heatPumpCopHeating: 3.0, heatPumpCopCooling: 3.6 },
  ND: { ieccZone: "6-7A", heatingDegreeDays: 8800, coolingDegreeDays: 500, heatPumpCopHeating: 1.9, heatPumpCopCooling: 4.1 },
  OH: { ieccZone: "5A", heatingDegreeDays: 5600, coolingDegreeDays: 850, heatPumpCopHeating: 2.4, heatPumpCopCooling: 3.8 },
  OK: { ieccZone: "3A", heatingDegreeDays: 3600, coolingDegreeDays: 2000, heatPumpCopHeating: 3.0, heatPumpCopCooling: 3.5 },
  OR: { ieccZone: "4-5C", heatingDegreeDays: 4600, coolingDegreeDays: 400, heatPumpCopHeating: 2.7, heatPumpCopCooling: 4.0 },
  PA: { ieccZone: "5A", heatingDegreeDays: 5600, coolingDegreeDays: 800, heatPumpCopHeating: 2.4, heatPumpCopCooling: 3.8 },
  RI: { ieccZone: "5A", heatingDegreeDays: 5700, coolingDegreeDays: 600, heatPumpCopHeating: 2.4, heatPumpCopCooling: 3.9 },
  SC: { ieccZone: "3A", heatingDegreeDays: 2500, coolingDegreeDays: 2200, heatPumpCopHeating: 3.2, heatPumpCopCooling: 3.5 },
  SD: { ieccZone: "5-6A", heatingDegreeDays: 7300, coolingDegreeDays: 700, heatPumpCopHeating: 2.0, heatPumpCopCooling: 4.0 },
  TN: { ieccZone: "4A", heatingDegreeDays: 3700, coolingDegreeDays: 1600, heatPumpCopHeating: 2.9, heatPumpCopCooling: 3.6 },
  TX: { ieccZone: "2-3A", heatingDegreeDays: 1800, coolingDegreeDays: 2800, heatPumpCopHeating: 3.3, heatPumpCopCooling: 3.4 },
  UT: { ieccZone: "5-6B", heatingDegreeDays: 5800, coolingDegreeDays: 800, heatPumpCopHeating: 2.4, heatPumpCopCooling: 3.9 },
  VT: { ieccZone: "6A", heatingDegreeDays: 7600, coolingDegreeDays: 400, heatPumpCopHeating: 2.0, heatPumpCopCooling: 4.0 },
  VA: { ieccZone: "4A", heatingDegreeDays: 4200, coolingDegreeDays: 1400, heatPumpCopHeating: 2.8, heatPumpCopCooling: 3.6 },
  WA: { ieccZone: "4-5B", heatingDegreeDays: 5000, coolingDegreeDays: 350, heatPumpCopHeating: 2.6, heatPumpCopCooling: 4.1 },
  WV: { ieccZone: "4-5A", heatingDegreeDays: 5000, coolingDegreeDays: 900, heatPumpCopHeating: 2.6, heatPumpCopCooling: 3.8 },
  WI: { ieccZone: "6A", heatingDegreeDays: 7300, coolingDegreeDays: 600, heatPumpCopHeating: 2.0, heatPumpCopCooling: 4.0 },
  WY: { ieccZone: "6B", heatingDegreeDays: 7600, coolingDegreeDays: 350, heatPumpCopHeating: 2.0, heatPumpCopCooling: 4.1 },
};
