import type { HeatPumpInput } from "./schema";
import type { YearlyBreakdown, CostBreakdown } from "../types";

// ---------------------------------------------------------------------------
// Result type
// ---------------------------------------------------------------------------
export type HeatPumpResult = {
  // Annual costs
  annualHeatingCostHP: number;
  annualHeatingCostFurnace: number;
  annualCoolingSavings: number;

  // Lifetime totals
  totalCostHP: number;
  totalCostFurnace: number;
  totalSavings: number;

  // Payback
  paybackYears: number | null; // null if HP never pays back

  // Environmental
  co2ReductionTons: number;
  co2ReductionPercent: number;

  // Monthly averages (year-1 values)
  monthlyHeatingCostHP: number;
  monthlyHeatingCostFurnace: number;

  // Breakdowns
  yearlyBreakdown: YearlyBreakdown[];
  costBreakdown: CostBreakdown[];
};

// ---------------------------------------------------------------------------
// Heating Degree Days by IECC climate zone
// Source: ASHRAE / DOE climate zone HDD65 representative values
// ---------------------------------------------------------------------------
const HEATING_DEGREE_DAYS: Record<string, number> = {
  "1A": 200,
  "2A": 1500,
  "2B": 1000,
  "3A": 3000,
  "3B": 2000,
  "3C": 2500,
  "4A": 4500,
  "4B": 4000,
  "4C": 4800,
  "5A": 6000,
  "5B": 5500,
  "6A": 7500,
  "6B": 7000,
  "7": 9000,
  "8": 12000,
};

// ---------------------------------------------------------------------------
// Fuel energy content & emission factors
// ---------------------------------------------------------------------------

// BTU per unit of fuel
const FUEL_BTU_PER_UNIT: Record<string, number> = {
  natural_gas: 100000, // 1 therm = 100,000 BTU
  propane: 91500, // 1 gallon propane ~ 91,500 BTU
  oil: 138500, // 1 gallon #2 heating oil ~ 138,500 BTU
  electric_resistance: 3412, // 1 kWh = 3,412 BTU
};

// CO2 lbs per unit of fuel burned
const FUEL_CO2_LBS_PER_UNIT: Record<string, number> = {
  natural_gas: 11.7, // lbs CO2 per therm
  propane: 12.7, // lbs CO2 per gallon
  oil: 22.4, // lbs CO2 per gallon
  electric_resistance: 0, // handled via grid emissions
};

// Grid electricity emission factor: lbs CO2 per kWh (US average, EPA 2023)
const GRID_CO2_LBS_PER_KWH = 0.855;

// Heating load factor: BTU per sq-ft per heating-degree-day
// Typical range 15-25; we use 20 as a reasonable default for average insulation
const BTU_PER_SQFT_PER_HDD = 20;

// ---------------------------------------------------------------------------
// Helper: get fuel rate for the current fuel type
// ---------------------------------------------------------------------------
function getFuelRate(input: HeatPumpInput): number {
  switch (input.currentFuelType) {
    case "natural_gas":
      return input.gasRate;
    case "propane":
      return input.propaneRate;
    case "oil":
      return input.oilRate;
    case "electric_resistance":
      return input.electricityRate;
  }
}

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------
export function calculateHeatPump(input: HeatPumpInput): HeatPumpResult {
  const {
    climateZone,
    homeSqFt,
    currentFuelType,
    electricityRate,
    heatPumpCOP,
    furnaceEfficiency,
    heatPumpInstallCost,
    furnaceInstallCost,
    includeACSavings,
    currentACCost,
    heatPumpCoolingCOP,
    ownershipYears,
    annualMaintenanceHP,
    annualMaintenanceFurnace,
    fuelEscalation,
    electricityEscalation,
    federalTaxCredit,
    stateTaxCredit,
  } = input;

  // ----- Heating load -----
  const hdd = HEATING_DEGREE_DAYS[climateZone] ?? 4500;
  const annualHeatingBTU = homeSqFt * BTU_PER_SQFT_PER_HDD * hdd;

  // ----- Year-1 furnace heating cost -----
  const fuelRate = getFuelRate(input);
  const btuPerFuelUnit = FUEL_BTU_PER_UNIT[currentFuelType];

  // Fuel units consumed = total BTU / (BTU per unit * furnace efficiency)
  const furnaceFuelUnits = annualHeatingBTU / (btuPerFuelUnit * furnaceEfficiency);

  let annualHeatingCostFurnace: number;
  if (currentFuelType === "electric_resistance") {
    // Electric resistance: kWh = BTU / (3412 * efficiency=1.0 assumed for resistance)
    const kWhResistance = annualHeatingBTU / (3412 * furnaceEfficiency);
    annualHeatingCostFurnace = kWhResistance * electricityRate;
  } else {
    annualHeatingCostFurnace = furnaceFuelUnits * fuelRate;
  }

  // ----- Year-1 heat pump heating cost (electric) -----
  // kWh needed = BTU / (3412 BTU/kWh * COP)
  const hpHeatingKWh = annualHeatingBTU / (3412 * heatPumpCOP);
  const annualHeatingCostHP = hpHeatingKWh * electricityRate;

  // ----- Cooling savings -----
  // If the heat pump replaces a separate AC unit, the cooling electricity
  // cost may change. We estimate the improvement from a higher-efficiency
  // heat pump in cooling mode vs the existing AC.
  // Assumption: existing AC SEER corresponds roughly to COP ~3.0 (SEER 10-12).
  const existingACCOP = 3.0;
  let annualCoolingSavings = 0;
  if (includeACSavings && currentACCost > 0) {
    // The fraction of cooling cost saved by improved COP
    const coolingEfficiencyGain = 1 - existingACCOP / heatPumpCoolingCOP;
    annualCoolingSavings = Math.max(0, currentACCost * coolingEfficiencyGain);
  }

  // ----- Net install cost after incentives -----
  const totalIncentives = federalTaxCredit + stateTaxCredit;
  const netHPInstallCost = Math.max(0, heatPumpInstallCost - totalIncentives);

  // ----- Year-by-year cost comparison -----
  const yearlyBreakdown: YearlyBreakdown[] = [];
  let cumulativeCostHP = netHPInstallCost;
  let cumulativeCostFurnace = furnaceInstallCost;
  let paybackYears: number | null = null;

  let totalFuelCostHP = 0;
  let totalFuelCostFurnace = 0;
  let totalMaintenanceHP = 0;
  let totalMaintenanceFurnace = 0;
  let totalCoolingSavings = 0;

  for (let year = 1; year <= ownershipYears; year++) {
    // Escalated rates
    const elecMultiplier = Math.pow(1 + electricityEscalation, year - 1);
    const fuelMultiplier = Math.pow(1 + fuelEscalation, year - 1);

    // Annual heating costs this year
    const yearHPHeating = annualHeatingCostHP * elecMultiplier;
    let yearFurnaceHeating: number;
    if (currentFuelType === "electric_resistance") {
      yearFurnaceHeating = annualHeatingCostFurnace * elecMultiplier;
    } else {
      yearFurnaceHeating = annualHeatingCostFurnace * fuelMultiplier;
    }

    // Cooling savings this year (escalated at electricity rate since AC is electric)
    const yearCoolingSavings = annualCoolingSavings * elecMultiplier;

    // Annual operating cost
    const yearAnnualCostHP =
      yearHPHeating + annualMaintenanceHP - yearCoolingSavings;
    const yearAnnualCostFurnace =
      yearFurnaceHeating + annualMaintenanceFurnace;

    // Accumulate totals
    totalFuelCostHP += yearHPHeating;
    totalFuelCostFurnace += yearFurnaceHeating;
    totalMaintenanceHP += annualMaintenanceHP;
    totalMaintenanceFurnace += annualMaintenanceFurnace;
    totalCoolingSavings += yearCoolingSavings;

    cumulativeCostHP += yearAnnualCostHP;
    cumulativeCostFurnace += yearAnnualCostFurnace;

    // Check payback: heat pump cumulative becomes cheaper than furnace
    if (paybackYears === null && cumulativeCostHP <= cumulativeCostFurnace) {
      paybackYears = year;
    }

    yearlyBreakdown.push({
      year,
      cumulativeCostA: Math.round(cumulativeCostHP),
      cumulativeCostB: Math.round(cumulativeCostFurnace),
      annualCostA: Math.round(yearAnnualCostHP),
      annualCostB: Math.round(yearAnnualCostFurnace),
    });
  }

  // ----- Lifetime totals -----
  const totalCostHP =
    netHPInstallCost + totalFuelCostHP + totalMaintenanceHP - totalCoolingSavings;
  const totalCostFurnace =
    furnaceInstallCost + totalFuelCostFurnace + totalMaintenanceFurnace;
  const totalSavings = totalCostFurnace - totalCostHP;

  // ----- Monthly averages (year-1) -----
  const monthlyHeatingCostHP = annualHeatingCostHP / 12;
  const monthlyHeatingCostFurnace = annualHeatingCostFurnace / 12;

  // ----- CO2 calculations -----
  // Heat pump annual CO2 (from grid electricity for heating)
  const hpAnnualCO2Lbs = hpHeatingKWh * GRID_CO2_LBS_PER_KWH;

  // Furnace annual CO2
  let furnaceAnnualCO2Lbs: number;
  if (currentFuelType === "electric_resistance") {
    const kWhResistance = annualHeatingBTU / (3412 * furnaceEfficiency);
    furnaceAnnualCO2Lbs = kWhResistance * GRID_CO2_LBS_PER_KWH;
  } else {
    furnaceAnnualCO2Lbs =
      furnaceFuelUnits * FUEL_CO2_LBS_PER_UNIT[currentFuelType];
  }

  const annualCO2ReductionLbs = furnaceAnnualCO2Lbs - hpAnnualCO2Lbs;
  const co2ReductionTons =
    (annualCO2ReductionLbs * ownershipYears) / 2000; // short tons
  const co2ReductionPercent =
    furnaceAnnualCO2Lbs > 0
      ? (annualCO2ReductionLbs / furnaceAnnualCO2Lbs) * 100
      : 0;

  // ----- Cost breakdown (for pie/bar charts) -----
  const costBreakdown: CostBreakdown[] = [
    {
      label: "Heat Pump Install (net)",
      amount: Math.round(netHPInstallCost),
      color: "#16a34a",
    },
    {
      label: "HP Electricity (heating)",
      amount: Math.round(totalFuelCostHP),
      color: "#22c55e",
    },
    {
      label: "HP Maintenance",
      amount: Math.round(totalMaintenanceHP),
      color: "#4ade80",
    },
    {
      label: "Cooling Savings",
      amount: -Math.round(totalCoolingSavings),
      color: "#86efac",
    },
    {
      label: "Furnace Install",
      amount: Math.round(furnaceInstallCost),
      color: "#dc2626",
    },
    {
      label: "Furnace Fuel",
      amount: Math.round(totalFuelCostFurnace),
      color: "#ef4444",
    },
    {
      label: "Furnace Maintenance",
      amount: Math.round(totalMaintenanceFurnace),
      color: "#f87171",
    },
  ];

  return {
    annualHeatingCostHP: Math.round(annualHeatingCostHP),
    annualHeatingCostFurnace: Math.round(annualHeatingCostFurnace),
    annualCoolingSavings: Math.round(annualCoolingSavings),
    totalCostHP: Math.round(totalCostHP),
    totalCostFurnace: Math.round(totalCostFurnace),
    totalSavings: Math.round(totalSavings),
    paybackYears,
    co2ReductionTons: Math.round(co2ReductionTons * 10) / 10,
    co2ReductionPercent: Math.round(co2ReductionPercent * 10) / 10,
    monthlyHeatingCostHP: Math.round(monthlyHeatingCostHP),
    monthlyHeatingCostFurnace: Math.round(monthlyHeatingCostFurnace),
    yearlyBreakdown,
    costBreakdown,
  };
}
