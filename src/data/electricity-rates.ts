export interface ElectricityRate {
  /** Average retail electricity rate in $/kWh */
  rate: number;
  /** Time-of-use off-peak rate in $/kWh, null if TOU not common */
  touOffPeak: number | null;
  /** Time-of-use on-peak rate in $/kWh, null if TOU not common */
  touOnPeak: number | null;
  /** Average monthly residential electricity bill in $ */
  avgMonthlyBill: number;
}

export const electricityRates: Record<string, ElectricityRate> = {
  AL: { rate: 0.1340, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 163 },
  AK: { rate: 0.2450, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 148 },
  AZ: { rate: 0.1380, touOffPeak: 0.08, touOnPeak: 0.24, avgMonthlyBill: 149 },
  AR: { rate: 0.1190, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 126 },
  CA: { rate: 0.3020, touOffPeak: 0.20, touOnPeak: 0.52, avgMonthlyBill: 184 },
  CO: { rate: 0.1480, touOffPeak: 0.09, touOnPeak: 0.22, avgMonthlyBill: 115 },
  CT: { rate: 0.2680, touOffPeak: 0.18, touOnPeak: 0.35, avgMonthlyBill: 192 },
  DE: { rate: 0.1520, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 132 },
  DC: { rate: 0.1580, touOffPeak: 0.10, touOnPeak: 0.24, avgMonthlyBill: 112 },
  FL: { rate: 0.1420, touOffPeak: 0.07, touOnPeak: 0.22, avgMonthlyBill: 163 },
  GA: { rate: 0.1340, touOffPeak: 0.07, touOnPeak: 0.21, avgMonthlyBill: 148 },
  HI: { rate: 0.4300, touOffPeak: 0.30, touOnPeak: 0.57, avgMonthlyBill: 220 },
  ID: { rate: 0.1080, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 110 },
  IL: { rate: 0.1610, touOffPeak: 0.10, touOnPeak: 0.24, avgMonthlyBill: 117 },
  IN: { rate: 0.1440, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 143 },
  IA: { rate: 0.1410, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 127 },
  KS: { rate: 0.1450, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 135 },
  KY: { rate: 0.1200, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 133 },
  LA: { rate: 0.1030, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 129 },
  ME: { rate: 0.2350, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 128 },
  MD: { rate: 0.1620, touOffPeak: 0.10, touOnPeak: 0.25, avgMonthlyBill: 148 },
  MA: { rate: 0.2810, touOffPeak: 0.18, touOnPeak: 0.38, avgMonthlyBill: 170 },
  MI: { rate: 0.1840, touOffPeak: 0.10, touOnPeak: 0.27, avgMonthlyBill: 131 },
  MN: { rate: 0.1470, touOffPeak: 0.08, touOnPeak: 0.22, avgMonthlyBill: 120 },
  MS: { rate: 0.1260, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 145 },
  MO: { rate: 0.1280, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 131 },
  MT: { rate: 0.1240, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 104 },
  NE: { rate: 0.1230, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 118 },
  NV: { rate: 0.1350, touOffPeak: 0.08, touOnPeak: 0.23, avgMonthlyBill: 127 },
  NH: { rate: 0.2540, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 152 },
  NJ: { rate: 0.1820, touOffPeak: 0.12, touOnPeak: 0.28, avgMonthlyBill: 134 },
  NM: { rate: 0.1410, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 104 },
  NY: { rate: 0.2200, touOffPeak: 0.14, touOnPeak: 0.34, avgMonthlyBill: 142 },
  NC: { rate: 0.1250, touOffPeak: 0.08, touOnPeak: 0.20, avgMonthlyBill: 131 },
  ND: { rate: 0.1180, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 120 },
  OH: { rate: 0.1480, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 128 },
  OK: { rate: 0.1190, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 132 },
  OR: { rate: 0.1260, touOffPeak: 0.07, touOnPeak: 0.18, avgMonthlyBill: 118 },
  PA: { rate: 0.1680, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 138 },
  RI: { rate: 0.2720, touOffPeak: 0.17, touOnPeak: 0.36, avgMonthlyBill: 150 },
  SC: { rate: 0.1370, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 155 },
  SD: { rate: 0.1310, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 130 },
  TN: { rate: 0.1220, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 140 },
  TX: { rate: 0.1400, touOffPeak: 0.08, touOnPeak: 0.22, avgMonthlyBill: 154 },
  UT: { rate: 0.1140, touOffPeak: 0.07, touOnPeak: 0.18, avgMonthlyBill: 98 },
  VT: { rate: 0.2180, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 120 },
  VA: { rate: 0.1360, touOffPeak: 0.08, touOnPeak: 0.21, avgMonthlyBill: 143 },
  WA: { rate: 0.1120, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 108 },
  WV: { rate: 0.1280, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 136 },
  WI: { rate: 0.1620, touOffPeak: 0.09, touOnPeak: 0.24, avgMonthlyBill: 118 },
  WY: { rate: 0.1160, touOffPeak: null, touOnPeak: null, avgMonthlyBill: 102 },
};
