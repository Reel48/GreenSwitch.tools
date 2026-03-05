import { states } from "@/data/states";
import { electricityRates } from "@/data/electricity-rates";
import { fuelPrices } from "@/data/fuel-prices";
import { solarData } from "@/data/solar-data";
import { climateZones } from "@/data/climate-zones";
import { stateIncentives } from "@/data/incentives";
import type { Metadata } from "next";

export type CalculatorSlug =
  | "ev-vs-gas-cost"
  | "solar-payback"
  | "ev-charging-cost"
  | "heat-pump"
  | "ev-tax-credit"
  | "battery-storage";

interface CalculatorInfo {
  name: string;
  shortName: string;
  description: (stateName: string) => string;
  relevantDataKeys: ("electricity" | "fuel" | "solar" | "climate")[];
}

export const calculatorInfo: Record<CalculatorSlug, CalculatorInfo> = {
  "ev-vs-gas-cost": {
    name: "EV vs Gas Cost Comparison",
    shortName: "EV vs Gas Cost",
    description: (s) =>
      `Compare the total cost of owning an electric vehicle vs a gas car in ${s}. Uses local electricity rates ($${electricityRates[getStateCode(s)]?.rate ?? "N/A"}/kWh) and gas prices ($${fuelPrices[getStateCode(s)]?.gasRegular ?? "N/A"}/gal) for accurate savings estimates.`,
    relevantDataKeys: ["electricity", "fuel"],
  },
  "solar-payback": {
    name: "Solar Panel Payback Period",
    shortName: "Solar Payback",
    description: (s) =>
      `Calculate your solar panel ROI and payback period in ${s}. Based on ${solarData[getStateCode(s)]?.avgSunHours ?? "N/A"} peak sun hours, $${electricityRates[getStateCode(s)]?.rate ?? "N/A"}/kWh electricity, and available state incentives.`,
    relevantDataKeys: ["electricity", "solar"],
  },
  "ev-charging-cost": {
    name: "EV Charging Cost Estimator",
    shortName: "EV Charging Cost",
    description: (s) =>
      `Calculate EV charging costs in ${s} at home and on the go. Compare charging vs gas costs using local electricity rates ($${electricityRates[getStateCode(s)]?.rate ?? "N/A"}/kWh) and gas prices.`,
    relevantDataKeys: ["electricity", "fuel"],
  },
  "heat-pump": {
    name: "Heat Pump Savings Calculator",
    shortName: "Heat Pump Savings",
    description: (s) =>
      `Compare heat pump and furnace heating costs in ${s}. Uses local climate data (${climateZones[getStateCode(s)]?.heatingDegreeDays ?? "N/A"} HDD), electricity rates, and fuel prices for accurate savings estimates.`,
    relevantDataKeys: ["electricity", "fuel", "climate"],
  },
  "ev-tax-credit": {
    name: "EV Tax Credit Eligibility",
    shortName: "EV Tax Credit",
    description: (s) =>
      `Check your eligibility for federal and ${s} EV tax credits. Up to $7,500 for new EVs and $4,000 for used EVs, plus available state incentives.`,
    relevantDataKeys: [],
  },
  "battery-storage": {
    name: "Home Battery Storage ROI",
    shortName: "Battery Storage ROI",
    description: (s) =>
      `Evaluate home battery storage ROI in ${s}. Factor in ${electricityRates[getStateCode(s)]?.touOnPeak ? "time-of-use rates" : "electricity rates"}, solar pairing potential with ${solarData[getStateCode(s)]?.avgSunHours ?? "N/A"} peak sun hours, and federal incentives.`,
    relevantDataKeys: ["electricity", "solar"],
  },
};

function getStateCode(stateName: string): string {
  return states.find((s) => s.name === stateName)?.code ?? "";
}

export function getStateBySlug(slug: string) {
  return states.find((s) => s.slug === slug);
}

export function stateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export function generateStatePageMetadata(
  params: { state: string },
  calculator: CalculatorSlug
): Metadata {
  const state = getStateBySlug(params.state);
  if (!state) return {};

  const info = calculatorInfo[calculator];
  const title = `${info.name} in ${state.name}`;
  const description = `${info.description(state.name)} Free calculator — no sign-up required.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | GoGreenCalc`,
      description,
      url: `/calculators/${calculator}/${state.slug}`,
    },
    alternates: {
      canonical: `/calculators/${calculator}/${state.slug}`,
    },
  };
}

export function getStateData(stateCode: string) {
  return {
    electricity: electricityRates[stateCode],
    fuel: fuelPrices[stateCode],
    solar: solarData[stateCode],
    climate: climateZones[stateCode],
    incentives: stateIncentives[stateCode] ?? [],
  };
}
