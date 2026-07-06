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
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
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

      // Paragraph 3 — total cost of ownership beyond fuel
      paragraphs.push(
        `Fuel is only part of the story. EVs skip oil changes and spark plugs and wear brakes far more slowly thanks to regenerative braking, typically saving another $0.04–$0.06 per mile in maintenance — roughly $500–$700 a year at 12,000 miles. The EV case is strongest for ${stateName} drivers who can charge at home and keep the vehicle for several years; if you rely mostly on public fast charging or drive very little, the advantage narrows.`
      );

      // Paragraph 4 — incentives nudge
      const evIncentives = incentives.filter((i) => i.category === "ev");
      if (evIncentives.length > 0) {
        const totalMax = evIncentives.reduce((s, i) => s + i.maxAmount, 0);
        paragraphs.push(
          `${stateName} residents may also be eligible for up to ${formatDollars(totalMax, 0)} in state EV incentives. With the federal clean vehicle credits having ended September 30, 2025, state programs are now the main purchase incentive, and they can still meaningfully shorten the payback period on a new electric vehicle. Use the calculator above to see exactly how long it takes an EV to break even in your situation.`
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
      const simplePayback = Math.round(systemCost / annualValue);

      // Paragraph 1 — Solar resource & cost
      paragraphs.push(
        `${stateName} averages ${solar.avgSunHours} peak sun hours per day, which is ${sunDir} the national average. A typical ${solar.avgSystemSizeKw} kW residential system costs about ${formatDollars(solar.costPerWatt)} per watt installed \u2014 roughly ${formatDollars(systemCost, 0)}. Note that the 30% federal residential solar credit ended December 31, 2025, so purchased systems no longer receive a federal discount; leased and PPA systems may still capture savings indirectly through the commercial credit claimed by the system owner.`
      );

      // Paragraph 2 — Production & payback
      paragraphs.push(
        `At ${stateName}'s electricity rate of ${formatDollars(elec.rate, 3)} per kWh, a ${solar.avgSystemSizeKw} kW system producing roughly ${annualProd.toLocaleString()} kWh per year offsets about ${formatDollars(annualValue, 0)} in annual electricity costs. At full purchase price, the estimated payback period is around ${simplePayback} years, with many years of essentially free electricity after that. Over 25 years, homeowners can expect total savings of ${formatDollars(annualValue * 25 - systemCost, 0)} — state incentives, where available, improve this further.`
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

      // Paragraph 4 — who it's best for + rate-hedge framing
      paragraphs.push(
        `Solar pays off fastest in ${stateName} for homeowners with high electricity usage, an unshaded south-facing roof, and plans to stay put through at least the payback window. Because retail power prices tend to climb a few percent every year, owning panels also locks in today's rate and hedges against future bill increases — a benefit that grows the longer you own the system. Enter your own bill and roof details in the calculator above for a payback estimate tailored to your home.`
      );
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

      // Paragraph 4 — Level 1 vs Level 2 and home-charger payback
      paragraphs.push(
        `Choosing a charging setup matters too. A standard 120-volt outlet (Level 1) adds only 3–5 miles of range per hour, which is fine for low-mileage drivers, while a 240-volt Level 2 charger refills most EVs overnight. A home Level 2 charger runs about $500–$1,200 installed and, at ${stateName}'s savings versus gasoline, usually pays for itself within a year or two of everyday driving.`
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

      // Paragraph 3 — Summer cooling / dual-function value
      paragraphs.push(
        `A heat pump also replaces your air conditioner, and ${stateName}'s ${climate.coolingDegreeDays.toLocaleString()} cooling degree days make that dual-function value real: one system handles both seasons, so you retire a separate AC unit and its maintenance along with the furnace. For homes with an aging furnace-and-AC pair, replacing both at once is usually where a heat pump makes the strongest financial case in ${stateName}.`
      );

      // Paragraph 4 — Incentives
      const hpIncentives = incentives.filter(
        (i) => i.category === "heat-pump"
      );
      if (hpIncentives.length > 0) {
        const totalMax = hpIncentives.reduce((s, i) => s + i.maxAmount, 0);
        paragraphs.push(
          `${stateName} residents can access up to ${formatDollars(totalMax, 0)} in state rebates and incentives for heat pump installations. With the federal 25C credit having ended December 31, 2025, these state and utility programs are now the primary way to reduce the upfront installation cost, which typically ranges from $4,000 to $8,000 depending on system size and complexity. Run the calculator above with your home details to see your personalized payback estimate.`
        );
      } else {
        paragraphs.push(
          `${stateName} does not currently offer dedicated state-level heat pump incentives, and the federal 25C credit ended December 31, 2025. The case for a heat pump now rests on operating savings and the dual heating-cooling functionality — which, in the right climate and at the right fuel prices, can still make it the better long-term investment. Some utilities also offer their own rebates, so check locally. Enter your home details above to see your projected savings.`
        );
      }
    }

    return paragraphs;
  },

  "heat-pump-water-heater": (stateName, data, incentives) => {
    const paragraphs: string[] = [];
    const elec = data.electricity;
    const fuel = data.fuel;

    if (elec && fuel) {
      const elecPct = pct(elec.rate, NAT_ELEC_RATE);
      const elecDir = rateLabel(elecPct);

      // Paragraph 1 — vs electric resistance (the strongest case)
      // Typical 3-person household: ~2,800 kWh/yr of delivered hot-water heat
      const thermalKwh = 2810;
      const resistanceCost = Math.round((thermalKwh / 0.92) * elec.rate);
      const hpwhCost = Math.round((thermalKwh / 3.5) * elec.rate);
      paragraphs.push(
        `Electricity in ${stateName} averages ${formatDollars(elec.rate, 3)} per kWh — ${elecDir} the national average. For a typical three-person household, heating water with a standard electric resistance tank costs roughly ${formatDollars(resistanceCost, 0)} per year, while a heat pump water heater doing the same job draws about a third of the electricity, costing around ${formatDollars(hpwhCost, 0)}. That gap, roughly ${formatDollars(resistanceCost - hpwhCost, 0)} every year, is what pays off the higher upfront price.`
      );

      // Paragraph 2 — vs gas, using the state's gas price
      const gasCost = Math.round((thermalKwh / 0.62 / 29.3) * fuel.naturalGasTherm);
      if (gasCost > hpwhCost) {
        paragraphs.push(
          `Against natural gas the math is closer but still favorable in ${stateName}: at ${formatDollars(fuel.naturalGasTherm)} per therm, a standard gas tank costs roughly ${formatDollars(gasCost, 0)} per year for the same household, versus about ${formatDollars(hpwhCost, 0)} for a heat pump water heater. Whether the difference justifies switching depends on installation cost and how long you plan to stay — run the calculator above with your actual numbers.`
        );
      } else {
        paragraphs.push(
          `Against natural gas, the case is tougher in ${stateName}: at ${formatDollars(fuel.naturalGasTherm)} per therm, a standard gas tank costs roughly ${formatDollars(gasCost, 0)} per year for the same household — close to or below the heat pump water heater's ${formatDollars(hpwhCost, 0)}. If you're on gas, the switch usually only pencils out with meaningful rebates or when paired with rooftop solar. The calculator above models both scenarios with your actual rates.`
        );
      }

      // Paragraph 3 — placement, lifespan, and payback framing
      paragraphs.push(
        `One practical note for ${stateName} homeowners: heat pump water heaters need roughly 700–1,000 cubic feet of surrounding air and run best in a garage, basement, or utility room that stays above about 40°F, since they pull heat from the air around them. With a typical 10–15 year lifespan, the annual savings above usually repay the higher purchase price well within the unit's service life.`
      );

      // Paragraph 4 — incentives
      const hpIncentives = incentives.filter((i) => i.category === "heat-pump");
      if (hpIncentives.length > 0) {
        const totalMax = hpIncentives.reduce((s, i) => s + i.maxAmount, 0);
        paragraphs.push(
          `With the federal 25C credit having ended December 31, 2025, state and utility programs are now the main incentives — ${stateName} residents can access up to ${formatDollars(totalMax, 0)} through state heat pump programs, and many utilities offer their own water heater rebates of $300–$1,500. Heat pump water heaters typically install for $2,500–$4,000, so these rebates meaningfully shorten the payback period.`
        );
      } else {
        paragraphs.push(
          `The federal 25C credit for heat pump water heaters ended December 31, 2025, and ${stateName} does not currently offer dedicated state-level programs — but many utilities still provide water heater rebates of $300–$1,500, so check with yours before buying. Even at full price, replacing an electric resistance tank typically pays back within 4–8 years of a 10–15 year lifespan.`
        );
      }
    }

    return paragraphs;
  },

  "ev-tax-credit": (stateName, _data, incentives) => {
    const paragraphs: string[] = [];

    // Paragraph 1 — Federal overview
    paragraphs.push(
      `The federal EV tax credits ended for vehicles acquired after September 30, 2025, under legislation passed in July 2025. The Clean Vehicle Credit (Section 30D) offered up to $7,500 for new qualifying EVs and the Used Clean Vehicle Credit (Section 25E) up to $4,000 for pre-owned EVs from licensed dealers — ${stateName} buyers who acquired a vehicle by the deadline (including via a binding contract with payment made by then) can still claim the credit for that tax year, subject to the original income and price-cap rules.`
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
        `For purchases today, state programs are the main incentive: ${stateName} offers EV benefits including ${descriptions}, worth up to ${formatDollars(totalState, 0)} combined. These state incentives have their own eligibility requirements and funding cycles, so verify current availability with each program and use the calculator above to estimate your savings.`
      );
    } else {
      paragraphs.push(
        `${stateName} does not currently offer dedicated state-level EV purchase incentives, so with the federal credits ended, the financial case for an EV in ${stateName} now rests on operating savings — cheaper fuel and lower maintenance. Some ${stateName} utilities offer EV-specific electricity rates or charger installation rebates that provide indirect savings; check with your local utility for available programs.`
      );
    }

    // Paragraph 3 — Practical guidance
    paragraphs.push(
      `If you acquired your EV by the September 30, 2025 deadline and are claiming the credit, the original rules apply: income thresholds of $150,000 AGI for single filers and $300,000 for joint filers on new vehicles (lower limits for used), and MSRP caps of $55,000 for sedans and $80,000 for SUVs, vans, and trucks. Enter your details in the calculator above to check a grandfathered purchase, or to see current state-level incentives in ${stateName}.`
    );

    // Paragraph 4 — leasing and used-market paths now that the credit is gone
    paragraphs.push(
      `Missed the deadline? Two paths still soften the cost in ${stateName}. Leasing can help because many lessors access the commercial clean-vehicle credit and pass part of it through as lower payments — always confirm the discount in writing before signing. And the used-EV market has softened prices as off-lease inventory grows, which can offset the loss of the purchase credit for budget-focused buyers.`
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

      // Paragraph 3 — Backup value + virtual power plants
      paragraphs.push(
        `Bill savings are only half the picture. A battery also keeps essential circuits running during outages — an increasingly valuable hedge in ${stateName} as extreme weather strains the grid. A growing number of utilities also run virtual power plant programs that pay battery owners to share stored energy during peak demand; the calculator above does not assume that income, so treat any such payments as upside on top of your estimated ROI.`
      );

      // Paragraph 4 — Incentives + payback
      const batteryIncentives = incentives.filter(
        (i) => i.category === "battery-storage"
      );
      const stateMax = batteryIncentives.reduce((s, i) => s + i.maxAmount, 0);
      if (stateMax > 0) {
        paragraphs.push(
          `${stateName} offers up to ${formatDollars(stateMax, 0)} in state incentives for home battery installations \u2014 now the primary purchase incentive, since the federal 30% Residential Clean Energy Credit ended December 31, 2025. A typical 10\u201313.5 kWh battery system costs $10,000\u2013$15,000 installed, and state incentives plus daily rate savings determine the payback. Use the calculator above to enter your specific electricity usage and see your personalized estimate.`
        );
      } else {
        paragraphs.push(
          `The federal 30% Residential Clean Energy Credit for battery storage ended December 31, 2025, and ${stateName} does not currently offer state-level battery incentives, so the investment case rests on the economics themselves: TOU rate arbitrage or solar self-consumption savings, plus backup power value. Some utilities also pay battery owners through virtual power plant programs. Enter your details above to see your estimated ROI at full price.`
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
