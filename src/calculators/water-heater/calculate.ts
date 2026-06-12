import type { WaterHeaterInput } from "./schema";
import type { YearlyBreakdown, CostBreakdown } from "../types";

export type WaterHeaterResult = {
  // Annual operating costs
  annualCostHpwh: number;
  annualCostCurrent: number;
  annualSavings: number;
  monthlySavings: number;

  // Energy
  annualThermalKwh: number; // heat actually delivered to the water
  annualKwhHpwh: number; // electricity the HPWH draws
  annualEnergyCurrent: number; // kWh, therms, or gallons depending on fuel
  currentEnergyUnit: string;

  // Investment
  netHpwhCost: number;
  incrementalCost: number; // vs. replacing with a like-for-like conventional unit
  paybackYears: number | null; // null if never within lifespan
  lifetimeSavings: number;

  // Environmental
  co2SavingsTonsPerYear: number;

  // Charts
  yearlyBreakdown: YearlyBreakdown[]; // A = HPWH, B = conventional replacement
  costBreakdown: CostBreakdown[];
};

const KWH_PER_THERM = 29.3;
const PROPANE_KWH_PER_GALLON = 26.8; // ~91,500 BTU/gal
const GRID_LBS_CO2_PER_KWH = 0.855;
const GAS_LBS_CO2_PER_THERM = 11.7;
const PROPANE_LBS_CO2_PER_GALLON = 12.7;

export function calculateWaterHeater(
  input: WaterHeaterInput,
): WaterHeaterResult {
  const {
    householdSize,
    gallonsPerPerson,
    currentType,
    electricityRate,
    gasRate,
    propaneRate,
    hpwhUEF,
    electricUEF,
    gasUEF,
    hpwhInstalledCost,
    conventionalInstalledCost,
    rebatesAndIncentives,
    temperatureRiseF,
    lifespanYears,
    electricityEscalation,
    fuelEscalation,
  } = input;

  // Thermal energy needed to heat the water:
  // gallons × 8.34 BTU/(gal·°F) × temperature rise, converted to kWh
  const gallonsPerYear = householdSize * gallonsPerPerson * 365;
  const annualThermalKwh = (gallonsPerYear * 8.34 * temperatureRiseF) / 3412;

  // HPWH consumption and cost (always electric)
  const annualKwhHpwh = annualThermalKwh / hpwhUEF;

  // Current system consumption, cost, and emissions
  let annualEnergyCurrent: number;
  let currentEnergyUnit: string;
  let currentRate: number; // $ per unit of that fuel
  let currentEscalation: number;
  let co2LbsCurrent: number;

  if (currentType === "electric_resistance") {
    annualEnergyCurrent = annualThermalKwh / electricUEF;
    currentEnergyUnit = "kWh";
    currentRate = electricityRate;
    currentEscalation = electricityEscalation;
    co2LbsCurrent = annualEnergyCurrent * GRID_LBS_CO2_PER_KWH;
  } else if (currentType === "gas_tank") {
    annualEnergyCurrent = annualThermalKwh / gasUEF / KWH_PER_THERM;
    currentEnergyUnit = "therms";
    currentRate = gasRate;
    currentEscalation = fuelEscalation;
    co2LbsCurrent = annualEnergyCurrent * GAS_LBS_CO2_PER_THERM;
  } else {
    annualEnergyCurrent = annualThermalKwh / gasUEF / PROPANE_KWH_PER_GALLON;
    currentEnergyUnit = "gallons";
    currentRate = propaneRate;
    currentEscalation = fuelEscalation;
    co2LbsCurrent = annualEnergyCurrent * PROPANE_LBS_CO2_PER_GALLON;
  }

  const annualCostHpwh = annualKwhHpwh * electricityRate;
  const annualCostCurrent = annualEnergyCurrent * currentRate;
  const annualSavings = annualCostCurrent - annualCostHpwh;

  const co2LbsHpwh = annualKwhHpwh * GRID_LBS_CO2_PER_KWH;
  const co2SavingsTonsPerYear = (co2LbsCurrent - co2LbsHpwh) / 2000;

  // Investment comparison: both paths assume the old unit needs replacing,
  // so the HPWH competes against the cost of a like-for-like conventional unit
  const netHpwhCost = Math.max(0, hpwhInstalledCost - rebatesAndIncentives);
  const incrementalCost = netHpwhCost - conventionalInstalledCost;

  // Year-by-year cumulative cost with escalating rates
  const yearlyBreakdown: YearlyBreakdown[] = [];
  let cumulativeHpwh = netHpwhCost;
  let cumulativeConventional = conventionalInstalledCost;
  let paybackYears: number | null = null;

  for (let year = 1; year <= lifespanYears; year++) {
    const hpwhYearCost =
      annualCostHpwh * Math.pow(1 + electricityEscalation, year - 1);
    const conventionalYearCost =
      annualCostCurrent * Math.pow(1 + currentEscalation, year - 1);

    cumulativeHpwh += hpwhYearCost;
    cumulativeConventional += conventionalYearCost;

    if (paybackYears === null && cumulativeHpwh <= cumulativeConventional) {
      paybackYears = year;
    }

    yearlyBreakdown.push({
      year,
      cumulativeCostA: Math.round(cumulativeHpwh),
      cumulativeCostB: Math.round(cumulativeConventional),
      annualCostA: Math.round(hpwhYearCost),
      annualCostB: Math.round(conventionalYearCost),
    });
  }

  const lifetimeSavings = cumulativeConventional - cumulativeHpwh;

  const costBreakdown: CostBreakdown[] = [
    {
      label: "HPWH installed cost",
      amount: Math.round(hpwhInstalledCost),
      color: "var(--chart-1)",
    },
    ...(rebatesAndIncentives > 0
      ? [
          {
            label: "Rebates & incentives",
            amount: -Math.round(rebatesAndIncentives),
            color: "var(--chart-2)",
          },
        ]
      : []),
    {
      label: "Conventional replacement",
      amount: Math.round(conventionalInstalledCost),
      color: "var(--chart-4)",
    },
  ];

  return {
    annualCostHpwh: Math.round(annualCostHpwh),
    annualCostCurrent: Math.round(annualCostCurrent),
    annualSavings: Math.round(annualSavings),
    monthlySavings: Math.round(annualSavings / 12),
    annualThermalKwh: Math.round(annualThermalKwh),
    annualKwhHpwh: Math.round(annualKwhHpwh),
    annualEnergyCurrent: Math.round(annualEnergyCurrent),
    currentEnergyUnit,
    netHpwhCost: Math.round(netHpwhCost),
    incrementalCost: Math.round(incrementalCost),
    paybackYears,
    lifetimeSavings: Math.round(lifetimeSavings),
    co2SavingsTonsPerYear: Math.round(co2SavingsTonsPerYear * 100) / 100,
    yearlyBreakdown,
    costBreakdown,
  };
}
