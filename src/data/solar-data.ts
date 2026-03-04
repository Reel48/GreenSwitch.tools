export interface SolarData {
  /** Average peak sun hours per day */
  avgSunHours: number;
  /** Installed cost per watt in $ */
  costPerWatt: number;
  /** Average residential system size in kW */
  avgSystemSizeKw: number;
  /** Whether net metering is available statewide */
  netMetering: boolean;
  /** SREC value in $/MWh, null if no SREC market */
  srecValue: number | null;
  /** Annual production per kW installed in kWh */
  annualProductionPerKw: number;
}

export const solarData: Record<string, SolarData> = {
  AL: { avgSunHours: 4.8, costPerWatt: 2.85, avgSystemSizeKw: 7.5, netMetering: false, srecValue: null, annualProductionPerKw: 1350 },
  AK: { avgSunHours: 3.0, costPerWatt: 3.20, avgSystemSizeKw: 5.0, netMetering: true, srecValue: null, annualProductionPerKw: 850 },
  AZ: { avgSunHours: 6.5, costPerWatt: 2.60, avgSystemSizeKw: 8.5, netMetering: true, srecValue: null, annualProductionPerKw: 1650 },
  AR: { avgSunHours: 4.7, costPerWatt: 2.90, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1320 },
  CA: { avgSunHours: 5.8, costPerWatt: 2.85, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1550 },
  CO: { avgSunHours: 5.5, costPerWatt: 2.95, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1500 },
  CT: { avgSunHours: 4.0, costPerWatt: 3.10, avgSystemSizeKw: 8.5, netMetering: true, srecValue: null, annualProductionPerKw: 1150 },
  DE: { avgSunHours: 4.3, costPerWatt: 2.90, avgSystemSizeKw: 7.5, netMetering: true, srecValue: 30, annualProductionPerKw: 1220 },
  DC: { avgSunHours: 4.2, costPerWatt: 3.30, avgSystemSizeKw: 6.0, netMetering: true, srecValue: 380, annualProductionPerKw: 1200 },
  FL: { avgSunHours: 5.5, costPerWatt: 2.65, avgSystemSizeKw: 9.0, netMetering: true, srecValue: null, annualProductionPerKw: 1480 },
  GA: { avgSunHours: 5.0, costPerWatt: 2.80, avgSystemSizeKw: 8.0, netMetering: false, srecValue: null, annualProductionPerKw: 1380 },
  HI: { avgSunHours: 5.5, costPerWatt: 3.15, avgSystemSizeKw: 7.0, netMetering: false, srecValue: null, annualProductionPerKw: 1500 },
  ID: { avgSunHours: 4.7, costPerWatt: 2.95, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1350 },
  IL: { avgSunHours: 4.2, costPerWatt: 3.05, avgSystemSizeKw: 8.0, netMetering: true, srecValue: 65, annualProductionPerKw: 1180 },
  IN: { avgSunHours: 4.2, costPerWatt: 2.95, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1180 },
  IA: { avgSunHours: 4.4, costPerWatt: 3.00, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1250 },
  KS: { avgSunHours: 5.0, costPerWatt: 2.95, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1400 },
  KY: { avgSunHours: 4.3, costPerWatt: 2.85, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1200 },
  LA: { avgSunHours: 4.9, costPerWatt: 2.85, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1360 },
  ME: { avgSunHours: 4.0, costPerWatt: 3.10, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1130 },
  MD: { avgSunHours: 4.5, costPerWatt: 2.95, avgSystemSizeKw: 8.5, netMetering: true, srecValue: 60, annualProductionPerKw: 1260 },
  MA: { avgSunHours: 4.0, costPerWatt: 3.15, avgSystemSizeKw: 8.5, netMetering: true, srecValue: 280, annualProductionPerKw: 1150 },
  MI: { avgSunHours: 3.8, costPerWatt: 3.05, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1080 },
  MN: { avgSunHours: 4.2, costPerWatt: 3.05, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1200 },
  MS: { avgSunHours: 4.8, costPerWatt: 2.90, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1340 },
  MO: { avgSunHours: 4.6, costPerWatt: 2.90, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1290 },
  MT: { avgSunHours: 4.5, costPerWatt: 3.10, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1280 },
  NE: { avgSunHours: 4.8, costPerWatt: 3.00, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1360 },
  NV: { avgSunHours: 6.4, costPerWatt: 2.65, avgSystemSizeKw: 8.5, netMetering: true, srecValue: null, annualProductionPerKw: 1620 },
  NH: { avgSunHours: 4.0, costPerWatt: 3.15, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1130 },
  NJ: { avgSunHours: 4.3, costPerWatt: 2.85, avgSystemSizeKw: 9.0, netMetering: true, srecValue: 220, annualProductionPerKw: 1220 },
  NM: { avgSunHours: 6.3, costPerWatt: 2.75, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1600 },
  NY: { avgSunHours: 3.8, costPerWatt: 3.20, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1100 },
  NC: { avgSunHours: 4.8, costPerWatt: 2.75, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1340 },
  ND: { avgSunHours: 4.4, costPerWatt: 3.10, avgSystemSizeKw: 6.5, netMetering: true, srecValue: null, annualProductionPerKw: 1260 },
  OH: { avgSunHours: 3.9, costPerWatt: 2.95, avgSystemSizeKw: 8.0, netMetering: true, srecValue: 30, annualProductionPerKw: 1100 },
  OK: { avgSunHours: 5.2, costPerWatt: 2.90, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1430 },
  OR: { avgSunHours: 3.6, costPerWatt: 2.95, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1020 },
  PA: { avgSunHours: 4.0, costPerWatt: 3.00, avgSystemSizeKw: 8.5, netMetering: true, srecValue: 40, annualProductionPerKw: 1130 },
  RI: { avgSunHours: 4.0, costPerWatt: 3.15, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1140 },
  SC: { avgSunHours: 5.0, costPerWatt: 2.75, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1380 },
  SD: { avgSunHours: 4.8, costPerWatt: 3.05, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1360 },
  TN: { avgSunHours: 4.5, costPerWatt: 2.85, avgSystemSizeKw: 7.5, netMetering: false, srecValue: null, annualProductionPerKw: 1280 },
  TX: { avgSunHours: 5.3, costPerWatt: 2.70, avgSystemSizeKw: 8.5, netMetering: false, srecValue: null, annualProductionPerKw: 1450 },
  UT: { avgSunHours: 5.5, costPerWatt: 2.80, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1500 },
  VT: { avgSunHours: 3.8, costPerWatt: 3.20, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1080 },
  VA: { avgSunHours: 4.5, costPerWatt: 2.85, avgSystemSizeKw: 8.0, netMetering: true, srecValue: null, annualProductionPerKw: 1270 },
  WA: { avgSunHours: 3.5, costPerWatt: 2.90, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1000 },
  WV: { avgSunHours: 4.0, costPerWatt: 3.00, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1120 },
  WI: { avgSunHours: 4.0, costPerWatt: 3.10, avgSystemSizeKw: 7.5, netMetering: true, srecValue: null, annualProductionPerKw: 1130 },
  WY: { avgSunHours: 5.0, costPerWatt: 3.05, avgSystemSizeKw: 7.0, netMetering: true, srecValue: null, annualProductionPerKw: 1400 },
};
