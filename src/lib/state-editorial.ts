import type { CalculatorSlug } from "./state-pages";
import type { ElectricityRate } from "@/data/electricity-rates";
import type { FuelPrices } from "@/data/fuel-prices";
import type { SolarData } from "@/data/solar-data";
import type { ClimateZone } from "@/data/climate-zones";
import type { StateIncentive } from "@/data/incentives";

/* ------------------------------------------------------------------ */
/*  National averages (approximate) — used for relative comparisons   */
/* ------------------------------------------------------------------ */

const NAT_ELEC_RATE = 0.16; // $/kWh
const NAT_GAS_PRICE = 3.3; // $/gal
const NAT_SUN_HOURS = 4.5; // hrs/day
const NAT_HDD = 4500;
const NAT_MONTHLY_BILL = 140; // $

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function pct(value: number, baseline: number): number {
  return Math.round(((value - baseline) / baseline) * 100);
}

function rateLabel(pctDiff: number): string {
  if (pctDiff <= -15) return "well below";
  if (pctDiff < -5) return "below";
  if (pctDiff <= 5) return "near";
  if (pctDiff <= 15) return "above";
  return "well above";
}

function formatDollars(n: number, decimals = 2): string {
  return `$${n.toFixed(decimals)}`;
}

/* ------------------------------------------------------------------ */
/*  Per-calculator editorial generators                               */
/* ------------------------------------------------------------------ */

interface StateData {
  electricity?: ElectricityRate;
  fuel?: FuelPrices;
  solar?: SolarData;
  climate?: ClimateZone;
  incentives: StateIncentive[];
}

type EditorialGenerator = (
  stateName: string,
  data: StateData,
  stateIncentives: StateIncentive[]
) => string[];

const editorialGenerators: Record<CalculatorSlug, EditorialGenerator> = {
  "ev-vs-gas-cost": (stateName, data, incentives) => {
    const paragraphs: string[] = [];
    const elec = data.electricity;
    const fuel = data.fuel;

    if (elec && fuel) {
      const elecPct = pct(elec.rate, NAT_ELEC_RATE);
      const gasPct = pct(fuel.gasRegular, NAT_GAS_PRICE);
      const elecDir = rateLabel(elecPct);
      const gasDir = rateLabel(gasPct);

      // Paragraph 1 — Cost landscape
      const costPerMileEV = (elec.rate * 0.3).toFixed(2); // ~30 kWh/100mi = 0.3 kWh/mi
      const costPerMileGas = (fuel.gasRegular / 30).toFixed(2); // ~30 mpg
      paragraphs.push(
        `Electricity in ${stateName} averages ${formatDollars(elec.rate, 3)} per kWh \u2014 ${elecDir} the national average \u2014 while regular gasoline runs ${formatDollars(fuel.gasRegular)} per gallon, which is ${gasDir} the U.S. mean. At these rates, an average EV costs roughly ${formatDollars(Number(costPerMileEV))} per mile to drive compared to about ${formatDollars(Number(costPerMileGas))} per mile for a 30-mpg gas car. Over 12,000 miles a year, that translates to approximately ${formatDollars((Number(costPerMileGas) - Number(costPerMileEV)) * 12000, 0)} in annual fuel savings for the EV owner.`
      );

      // Paragraph 2 — TOU + charging strategy
      if (elec.touOffPeak && elec.touOnPeak) {
        const touSavings = Math.round(
          ((elec.touOnPeak - elec.touOffPeak) / elec.touOnPeak) * 100
        );
        paragraphs.push(
          `${stateName} utilities offer time-of-use rates with off-peak pricing as low as ${formatDollars(elec.touOffPeak, 3)} per kWh. Charging overnight during off-peak hours can cut your per-mile EV cost by up to ${touSavings}% compared to peak rates. If you pair off-peak charging with a Level 2 home charger, you can keep annual fuel costs well under ${formatDollars(elec.touOffPeak * 0.3 * 12000, 0)} \u2014 a fraction of what most gas vehicles cost to fuel.`
        );
      } else {
        paragraphs.push(
          `While ${stateName} does not widely offer time-of-use electricity plans, the flat residential rate still makes EV ownership cost-effective for most drivers. Charging at home with a Level 2 charger takes about 8 hours for a full battery, and the average monthly electricity increase is roughly ${formatDollars(elec.rate * 0.3 * 1000, 0)} for every 1,000 miles driven. Many EV owners find that their overall transportation costs drop substantially even without TOU incentives.`
        );
      }

      // Paragraph 3 — incentives nudge
      const evIncentives = incentives.filter((i) => i.category === "ev");
      if (evIncentives.length > 0) {
        const totalMax = evIncentives.reduce((s, i) => s + i.maxAmount, 0);
        paragraphs.push(
          `${stateName} residents may also be eligible for up to ${formatDollars(totalMax, 0)} in state EV incentives on top of the federal tax credit. Combined, these can significantly shorten the payback period on a new electric vehicle, often offsetting the higher sticker price within the first few years of ownership. Use the calculator above to see exactly how long it takes an EV to break even in your situation.`
        );
      }
    }

    return paragraphs;
  },

  "solar-payback": (stateName, data, incentives) => {
    const paragraphs: string[] = [];
    const elec = data.electricity;
    const solar = data.solar;

    if (elec && solar) {
      const sunPct = pct(solar.avgSunHours, NAT_SUN_HOURS);
      const sunDir = rateLabel(sunPct);
      const systemCost = solar.costPerWatt * solar.avgSystemSizeKw * 1000;
      const annualProd = solar.annualProductionPerKw * solar.avgSystemSizeKw;
      const annualValue = annualProd * elec.rate;
      const federalCredit = systemCost * 0.3;
      const netCost = systemCost - federalCredit;
      const simplePayback = Math.round(netCost / annualValue);

      // Paragraph 1 — Solar resource & cost
      paragraphs.push(
        `${stateName} averages ${solar.avgSunHours} peak sun hours per day, which is ${sunDir} the national average. A typical ${solar.avgSystemSizeKw} kW residential system costs about ${formatDollars(solar.costPerWatt)} per watt installed \u2014 roughly ${formatDollars(systemCost, 0)} before incentives. With the 30% federal solar tax credit, the net cost drops to about ${formatDollars(netCost, 0)}, making solar accessible for a wide range of homeowners.`
      );

      // Paragraph 2 — Production & payback
      paragraphs.push(
        `At ${stateName}'s electricity rate of ${formatDollars(elec.rate, 3)} per kWh, a ${solar.avgSystemSizeKw} kW system producing roughly ${annualProd.toLocaleString()} kWh per year offsets about ${formatDollars(annualValue, 0)} in annual electricity costs. After the federal credit, the estimated payback period is around ${simplePayback} years, with 15+ years of essentially free electricity after that. Over 25 years, homeowners can expect total savings of ${formatDollars(annualValue * 25 - netCost, 0)}.`
      );

      // Paragraph 3 — Net metering + SREC
      if (solar.netMetering && solar.srecValue) {
        paragraphs.push(
          `${stateName} supports net metering, allowing solar owners to earn credits for excess electricity sent back to the grid. The state also has an SREC market valued at approximately ${formatDollars(solar.srecValue)}/MWh, providing an additional revenue stream that can shorten the payback period even further. These policies make ${stateName} one of the more solar-friendly states in the country.`
        );
      } else if (solar.netMetering) {
        paragraphs.push(
          `${stateName} supports net metering, which means excess energy your panels generate is credited back to your utility bill. This policy is a key factor in maximizing solar ROI, as it ensures you get full value for every kilowatt-hour your system produces, even when you are not home to use it.`
        );
      } else {
        paragraphs.push(
          `${stateName} does not currently offer statewide net metering, which means excess solar energy may not be fully credited. However, many utilities have their own buyback programs, and pairing solar with a home battery system can help you store and use more of your own production, improving overall ROI regardless of net metering policy.`
        );
      }
    }

    return paragraphs;
  },

  "ev-charging-cost": (stateName, data) => {
    const paragraphs: string[] = [];
    const elec = data.electricity;
    const fuel = data.fuel;

    if (elec && fuel) {
      const homeChargeCost = elec.rate * 0.3; // per mile
      const gasCost = fuel.gasRegular / 30; // per mile at 30 mpg
      const monthlySavings = (gasCost - homeChargeCost) * 1000; // 1000 mi/mo

      // Paragraph 1 — Home charging economics
      paragraphs.push(
        `Home charging is where EV owners in ${stateName} see the biggest savings. At the state average of ${formatDollars(elec.rate, 3)} per kWh, a Level 2 home charger costs roughly ${formatDollars(homeChargeCost)} per mile. Compare that to ${formatDollars(gasCost)} per mile for a 30-mpg gas car fueled at ${formatDollars(fuel.gasRegular)} per gallon, and you are looking at roughly ${formatDollars(monthlySavings, 0)} in monthly savings if you drive about 1,000 miles.`
      );

      // Paragraph 2 — TOU or public charging
      if (elec.touOffPeak && elec.touOnPeak) {
        const offPeakPerMile = elec.touOffPeak * 0.3;
        paragraphs.push(
          `${stateName} utilities with time-of-use plans offer off-peak rates as low as ${formatDollars(elec.touOffPeak, 3)} per kWh. Scheduling your charge for overnight hours drops the cost to just ${formatDollars(offPeakPerMile)} per mile. Public DC fast chargers, on the other hand, typically cost $0.30\u2013$0.50 per kWh and should be reserved for road trips rather than everyday charging to keep costs down.`
        );
      } else {
        paragraphs.push(
          `Even without time-of-use pricing, home charging in ${stateName} remains significantly cheaper than gasoline. A full overnight charge on a Level 2 charger adds only ${formatDollars(elec.rate * 60, 0)}\u2013${formatDollars(elec.rate * 75, 0)} to your electricity bill for 200\u2013250 miles of range. Public DC fast charging is convenient on the road but typically costs 2\u20133 times more per kWh, so home charging should be your default whenever possible.`
        );
      }

      // Paragraph 3 — Monthly bill impact
      paragraphs.push(
        `${stateName} households currently pay an average of ${formatDollars(elec.avgMonthlyBill, 0)} per month for electricity. Adding an EV to the household typically raises the bill by ${formatDollars(elec.rate * 300, 0)}\u2013${formatDollars(elec.rate * 400, 0)} per month (for 1,000\u20131,300 miles of driving), which is still far less than the ${formatDollars(fuel.gasRegular * 33, 0)}\u2013${formatDollars(fuel.gasRegular * 43, 0)} per month you would spend on gasoline for the same distance. Use the calculator above to enter your exact driving habits and see how much you could save.`
      );
    }

    return paragraphs;
  },

  "heat-pump": (stateName, data, incentives) => {
    const paragraphs: string[] = [];
    const elec = data.electricity;
    const fuel = data.fuel;
    const climate = data.climate;

    if (elec && fuel && climate) {
      const hddPct = pct(climate.heatingDegreeDays, NAT_HDD);
      const hddDir = rateLabel(hddPct);

      // Paragraph 1 — Climate suitability
      const copNote =
        climate.heatPumpCopHeating >= 3.0
          ? `With an average heating COP of ${climate.heatPumpCopHeating}, heat pumps in ${stateName} operate at high efficiency, producing ${climate.heatPumpCopHeating} units of heat for every unit of electricity consumed.`
          : climate.heatPumpCopHeating >= 2.5
          ? `Modern cold-climate heat pumps achieve an average COP of ${climate.heatPumpCopHeating} in ${stateName}'s conditions, making them competitive with gas furnaces for most of the heating season.`
          : `${stateName}'s cold winters mean heat pump COP averages ${climate.heatPumpCopHeating} during the heating season. While this is lower than milder states, modern cold-climate heat pumps with inverter compressors can still deliver meaningful savings over traditional heating systems, especially when paired with a backup for the coldest days.`;

      paragraphs.push(
        `${stateName} falls in IECC climate zone ${climate.ieccZone} with ${climate.heatingDegreeDays.toLocaleString()} heating degree days per year \u2014 ${hddDir} the national average. ${copNote}`
      );

      // Paragraph 2 — Cost comparison
      const annualGasHeat = (climate.heatingDegreeDays / 100000) * fuel.naturalGasTherm * 1000;
      const annualHPHeat = (climate.heatingDegreeDays / 100000) * (elec.rate / climate.heatPumpCopHeating) * 1000 * 29.3; // rough BTU conversion
      // Simplified annual cost estimates
      const gasAnnual = Math.round(fuel.naturalGasTherm * climate.heatingDegreeDays * 0.015);
      const hpAnnual = Math.round(
        (elec.rate / climate.heatPumpCopHeating) * climate.heatingDegreeDays * 0.44
      );
      const savings = gasAnnual - hpAnnual;

      if (savings > 0) {
        paragraphs.push(
          `At ${stateName}'s natural gas price of ${formatDollars(fuel.naturalGasTherm)} per therm and electricity at ${formatDollars(elec.rate, 3)} per kWh, a heat pump can save roughly ${formatDollars(savings, 0)} per year in heating costs compared to a gas furnace. Heat pumps also provide cooling in summer, potentially replacing both your furnace and central AC in a single system and eliminating separate maintenance contracts.`
        );
      } else {
        paragraphs.push(
          `With natural gas at ${formatDollars(fuel.naturalGasTherm)} per therm in ${stateName}, a gas furnace may have lower operating costs in the coldest months. However, heat pumps provide both heating and cooling in one system, which can offset the difference when you factor in AC savings. In shoulder seasons (spring and fall), a heat pump is significantly more efficient, often making the overall annual cost competitive with gas.`
        );
      }

      // Paragraph 3 — Incentives
      const hpIncentives = incentives.filter(
        (i) => i.category === "heat-pump"
      );
      if (hpIncentives.length > 0) {
        const totalMax = hpIncentives.reduce((s, i) => s + i.maxAmount, 0);
        paragraphs.push(
          `${stateName} residents can access up to ${formatDollars(totalMax, 0)} in state rebates and incentives for heat pump installations, in addition to the federal 25C energy efficient home improvement credit. These incentives can significantly reduce the upfront installation cost, which typically ranges from $4,000 to $8,000 depending on system size and complexity. Run the calculator above with your home details to see your personalized payback estimate.`
        );
      } else {
        paragraphs.push(
          `While ${stateName} does not currently offer state-level heat pump incentives, the federal 25C energy efficient home improvement tax credit covers up to $2,000 for qualifying heat pump systems. This credit, combined with long-term energy savings and the dual heating-cooling functionality, makes heat pumps an investment worth evaluating for most homeowners. Enter your home details above to see your projected savings.`
        );
      }
    }

    return paragraphs;
  },

  "ev-tax-credit": (stateName, _data, incentives) => {
    const paragraphs: string[] = [];

    // Paragraph 1 — Federal overview
    paragraphs.push(
      `Federal EV tax credits remain one of the biggest financial incentives for ${stateName} residents considering an electric vehicle. The Clean Vehicle Credit (Section 30D) offers up to $7,500 for new qualifying EVs, while the Used Clean Vehicle Credit (Section 25E) provides up to $4,000 for qualifying pre-owned EVs purchased from a licensed dealer. Both credits have income limits and vehicle price caps that vary by filing status.`
    );

    // Paragraph 2 — State-specific incentives
    const evIncentives = incentives.filter(
      (i) => i.category === "ev" || i.category === "used-ev"
    );
    if (evIncentives.length > 0) {
      const descriptions = evIncentives
        .map((i) => `the ${i.name} (up to ${formatDollars(i.maxAmount, 0)})`)
        .join(", ");
      const totalState = evIncentives.reduce((s, i) => s + i.maxAmount, 0);
      paragraphs.push(
        `Beyond federal incentives, ${stateName} offers additional EV benefits including ${descriptions}. When stacked with the federal credit, ${stateName} buyers could receive up to ${formatDollars(totalState + 7500, 0)} in total savings on a new EV. These state incentives may have their own eligibility requirements, so use the calculator above to check whether you qualify for each program.`
      );
    } else {
      paragraphs.push(
        `${stateName} does not currently offer dedicated state-level EV purchase incentives beyond the federal credits. However, the federal program alone can save you up to $7,500 on a new EV or $4,000 on a used one. Some ${stateName} utilities also offer EV-specific electricity rates or charger installation rebates that provide indirect savings. Check with your local utility for any available programs.`
      );
    }

    // Paragraph 3 — Practical guidance
    paragraphs.push(
      `Keep in mind that the federal EV tax credit has income thresholds: $150,000 AGI for single filers and $300,000 for joint filers on new vehicles, with lower limits for used EVs. The vehicle MSRP cap is $55,000 for sedans and $80,000 for SUVs, vans, and trucks. Starting in 2024, buyers can also transfer the credit to the dealer at the point of sale for an instant price reduction. Enter your details in the calculator above to verify your eligibility and estimate your total savings in ${stateName}.`
    );

    return paragraphs;
  },

  "battery-storage": (stateName, data, incentives) => {
    const paragraphs: string[] = [];
    const elec = data.electricity;
    const solar = data.solar;

    if (elec) {
      // Paragraph 1 — TOU arbitrage or backup value
      if (elec.touOnPeak && elec.touOffPeak) {
        const spread = elec.touOnPeak - elec.touOffPeak;
        const annualArbitrage = Math.round(spread * 10 * 365); // ~10 kWh shifted/day
        paragraphs.push(
          `${stateName}'s time-of-use rate structure creates a strong case for home battery storage. With a spread of ${formatDollars(spread, 3)} per kWh between off-peak (${formatDollars(elec.touOffPeak, 3)}) and on-peak (${formatDollars(elec.touOnPeak, 3)}) rates, a typical battery can save roughly ${formatDollars(annualArbitrage, 0)} per year through rate arbitrage alone \u2014 charging during cheap hours and discharging when electricity is most expensive.`
        );
      } else {
        paragraphs.push(
          `While ${stateName} does not widely offer time-of-use electricity plans, home battery storage still provides value through backup power during outages and, if paired with solar, through increased self-consumption. At ${stateName}'s average rate of ${formatDollars(elec.rate, 3)} per kWh, every kilowatt-hour you store and use from your solar panels instead of buying from the grid saves you money over time.`
        );
      }

      // Paragraph 2 — Solar pairing
      if (solar) {
        const dailyProd = (solar.annualProductionPerKw * solar.avgSystemSizeKw) / 365;
        paragraphs.push(
          `Pairing a battery with solar panels amplifies the benefits. A ${solar.avgSystemSizeKw} kW solar system in ${stateName} produces roughly ${Math.round(dailyProd)} kWh per day on average. Without a battery, excess daytime production goes back to the grid${solar.netMetering ? " at net metering rates" : " for little or no credit"}. A battery lets you store that energy for evening use when rates are highest, maximizing the value of every kWh your panels produce.`
        );
      }

      // Paragraph 3 — Incentives + payback
      const batteryIncentives = incentives.filter(
        (i) => i.category === "battery-storage"
      );
      const stateMax = batteryIncentives.reduce((s, i) => s + i.maxAmount, 0);
      if (stateMax > 0) {
        paragraphs.push(
          `${stateName} offers up to ${formatDollars(stateMax, 0)} in state incentives for home battery installations, on top of the federal 30% Residential Clean Energy Credit. A typical 10\u201313.5 kWh battery system costs $10,000\u2013$15,000 installed, and with combined federal and state incentives, the net cost can drop below $8,000. Use the calculator above to enter your specific electricity usage and see your personalized payback estimate.`
        );
      } else {
        paragraphs.push(
          `The federal 30% Residential Clean Energy Credit applies to battery storage systems paired with solar, bringing a $12,000 battery system down to about $8,400 out of pocket. While ${stateName} does not currently offer state-level battery incentives, the combination of federal credits, TOU savings or solar self-consumption, and backup power value can still make the investment worthwhile over a 10\u201315 year horizon. Enter your details above to see your estimated ROI.`
        );
      }
    }

    return paragraphs;
  },
};

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

/**
 * Generate 2-3 paragraphs of unique editorial content for a state page.
 * Returns an array of strings, each a single paragraph.
 */
export function getStateEditorial(
  calculator: CalculatorSlug,
  stateName: string,
  data: StateData,
  stateIncentives: StateIncentive[]
): string[] {
  const generator = editorialGenerators[calculator];
  return generator(stateName, data, stateIncentives);
}
