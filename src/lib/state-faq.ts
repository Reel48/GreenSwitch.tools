import type { CalculatorSlug } from "./state-pages";
import type { FaqItem } from "./blog";
import type { ElectricityRate } from "@/data/electricity-rates";
import type { FuelPrices } from "@/data/fuel-prices";
import type { SolarData } from "@/data/solar-data";
import type { ClimateZone } from "@/data/climate-zones";
import type { StateIncentive } from "@/data/incentives";

/* ------------------------------------------------------------------ */
/*  State-specific FAQ generators                                     */
/*                                                                    */
/*  Each calculator gets 4-6 questions whose answers are computed     */
/*  from the state's own data, so every state page carries unique     */
/*  Q&A that is eligible for FAQ rich results and AI-answer citation. */
/*  Mirrors the generator pattern in state-editorial.ts.              */
/* ------------------------------------------------------------------ */

interface StateData {
  electricity?: ElectricityRate;
  fuel?: FuelPrices;
  solar?: SolarData;
  climate?: ClimateZone;
  incentives: StateIncentive[];
}

type FaqGenerator = (
  stateName: string,
  data: StateData,
  incentives: StateIncentive[]
) => FaqItem[];

function usd(n: number, decimals = 0): string {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function incentiveNames(incentives: StateIncentive[]): string {
  if (incentives.length === 0) return "";
  if (incentives.length === 1) return incentives[0].name;
  if (incentives.length === 2)
    return `${incentives[0].name} and ${incentives[1].name}`;
  return `${incentives
    .slice(0, -1)
    .map((i) => i.name)
    .join(", ")}, and ${incentives[incentives.length - 1].name}`;
}

const faqGenerators: Record<CalculatorSlug, FaqGenerator> = {
  "solar-payback": (stateName, data, incentives) => {
    const items: FaqItem[] = [];
    const elec = data.electricity;
    const solar = data.solar;
    if (!elec || !solar) return items;

    const systemCost = solar.costPerWatt * solar.avgSystemSizeKw * 1000;
    const annualProd = solar.annualProductionPerKw * solar.avgSystemSizeKw;
    const annualValue = annualProd * elec.rate;
    const payback = Math.round(systemCost / annualValue);
    const savings25 = annualValue * 25 - systemCost;
    const solarIncentives = incentives.filter((i) => i.category === "solar");

    items.push({
      q: `How long does it take for solar panels to pay off in ${stateName}?`,
      a: `In ${stateName}, a typical ${solar.avgSystemSizeKw} kW system costing about ${usd(
        systemCost
      )} offsets roughly ${usd(
        annualValue
      )} of electricity per year at the state's ${usd(
        elec.rate,
        3
      )}/kWh rate, for an estimated payback of about ${payback} years at full purchase price. Your actual timeline depends on your usage, financing, and any state or utility incentives.`,
    });

    items.push({
      q: `How much do solar panels cost in ${stateName}?`,
      a: `Installed residential solar in ${stateName} averages about ${usd(
        solar.costPerWatt,
        2
      )} per watt, so a typical ${solar.avgSystemSizeKw} kW system runs around ${usd(
        systemCost
      )} before any incentives. The 30% federal residential solar credit ended December 31, 2025, so purchased systems no longer receive a federal discount.`,
    });

    items.push({
      q: `Does ${stateName} have net metering?`,
      a: solar.netMetering
        ? `Yes. ${stateName} supports net metering, so excess electricity your panels send to the grid is credited to your bill${
            solar.srecValue
              ? `, and the state also has an SREC market worth about ${usd(
                  solar.srecValue,
                  0
                )}/MWh, which further shortens payback`
              : ""
          }.`
        : `${stateName} does not currently offer statewide net metering, so exported solar energy may earn little or no credit. Pairing panels with a home battery lets you store and use more of your own production to improve ROI.`,
    });

    items.push({
      q: `How much can solar save over 25 years in ${stateName}?`,
      a: `Over a 25-year system life, a ${solar.avgSystemSizeKw} kW system in ${stateName} can save roughly ${usd(
        savings25
      )} net of its upfront cost, assuming electricity prices keep rising. State incentives, where available, improve this further.`,
    });

    if (solarIncentives.length > 0) {
      items.push({
        q: `Are there solar incentives in ${stateName}?`,
        a: `Yes. ${stateName} offers ${incentiveNames(
          solarIncentives
        )}. Program funding and eligibility change over time, so verify current details before you buy.`,
      });
    }

    return items;
  },

  "ev-vs-gas-cost": (stateName, data, incentives) => {
    const items: FaqItem[] = [];
    const elec = data.electricity;
    const fuel = data.fuel;
    if (!elec || !fuel) return items;

    const perMileEV = elec.rate * 0.3;
    const perMileGas = fuel.gasRegular / 30;
    const annualSavings = (perMileGas - perMileEV) * 12000;
    const evIncentives = incentives.filter((i) => i.category === "ev");

    items.push({
      q: `Is it cheaper to drive an EV or a gas car in ${stateName}?`,
      a: `At ${stateName}'s ${usd(elec.rate, 3)}/kWh electricity and ${usd(
        fuel.gasRegular,
        2
      )}/gal gas, an EV costs about ${usd(
        perMileEV,
        2
      )} per mile versus roughly ${usd(
        perMileGas,
        2
      )} per mile for a 30-mpg gas car — so driving electric is ${
        annualSavings > 0 ? "cheaper" : "comparable"
      } for most drivers.`,
    });

    items.push({
      q: `How much can I save per year driving an EV in ${stateName}?`,
      a: `Over 12,000 miles a year, an EV owner in ${stateName} saves roughly ${usd(
        Math.max(annualSavings, 0)
      )} in fuel compared with a gas car, before factoring in lower maintenance costs.`,
    });

    items.push({
      q: `What is the average electricity rate in ${stateName}?`,
      a: `Residential electricity in ${stateName} averages about ${usd(
        elec.rate,
        3
      )} per kWh, and the typical monthly bill is around ${usd(
        elec.avgMonthlyBill
      )}.`,
    });

    if (evIncentives.length > 0) {
      const total = evIncentives.reduce((s, i) => s + i.maxAmount, 0);
      items.push({
        q: `Are there EV incentives in ${stateName}?`,
        a: `Yes. ${stateName} offers ${incentiveNames(
          evIncentives
        )}${
          total > 0 ? `, worth up to ${usd(total)} combined` : ""
        }. Federal clean-vehicle credits ended September 30, 2025, so state programs are now the main purchase incentive.`,
      });
    } else {
      items.push({
        q: `Are there EV incentives in ${stateName}?`,
        a: `${stateName} does not currently offer statewide EV purchase incentives, and the federal clean-vehicle credits ended September 30, 2025. Some local utilities offer EV rate plans or charger rebates, so check with yours.`,
      });
    }

    return items;
  },

  "ev-charging-cost": (stateName, data) => {
    const items: FaqItem[] = [];
    const elec = data.electricity;
    const fuel = data.fuel;
    if (!elec || !fuel) return items;

    const perMileHome = elec.rate * 0.3;
    const perMileGas = fuel.gasRegular / 30;

    items.push({
      q: `How much does it cost to charge an EV at home in ${stateName}?`,
      a: `At ${stateName}'s average ${usd(
        elec.rate,
        3
      )}/kWh rate, home charging costs about ${usd(
        perMileHome,
        2
      )} per mile — roughly ${usd(
        elec.rate * 60
      )}–${usd(elec.rate * 75)} for a full overnight charge that adds 200–250 miles of range.`,
    });

    items.push({
      q: `Is home charging cheaper than gas in ${stateName}?`,
      a: `Yes. Home charging in ${stateName} costs about ${usd(
        perMileHome,
        2
      )} per mile versus roughly ${usd(
        perMileGas,
        2
      )} per mile for a 30-mpg gas car at ${usd(
        fuel.gasRegular,
        2
      )}/gal — typically a large monthly saving for anyone driving 1,000+ miles.`,
    });

    if (elec.touOffPeak) {
      items.push({
        q: `Can time-of-use rates lower my charging cost in ${stateName}?`,
        a: `Yes. ${stateName} utilities with time-of-use plans offer off-peak rates as low as ${usd(
          elec.touOffPeak,
          3
        )}/kWh, dropping the cost of overnight charging to about ${usd(
          elec.touOffPeak * 0.3,
          2
        )} per mile.`,
      });
    }

    items.push({
      q: `How much will an EV add to my electric bill in ${stateName}?`,
      a: `Adding an EV in ${stateName} typically raises the monthly electric bill by ${usd(
        elec.rate * 300
      )}–${usd(
        elec.rate * 400
      )} for 1,000–1,300 miles of driving — far less than the equivalent gasoline cost.`,
    });

    return items;
  },

  "heat-pump": (stateName, data, incentives) => {
    const items: FaqItem[] = [];
    const elec = data.electricity;
    const fuel = data.fuel;
    const climate = data.climate;
    if (!elec || !fuel || !climate) return items;

    const gasAnnual = Math.round(
      fuel.naturalGasTherm * climate.heatingDegreeDays * 0.015
    );
    const hpAnnual = Math.round(
      (elec.rate / climate.heatPumpCopHeating) * climate.heatingDegreeDays * 0.44
    );
    const savings = gasAnnual - hpAnnual;
    const hpIncentives = incentives.filter((i) => i.category === "heat-pump");

    items.push({
      q: `Are heat pumps worth it in ${stateName}?`,
      a:
        savings > 0
          ? `In ${stateName}, a heat pump can save around ${usd(
              savings
            )} per year versus a gas furnace while also providing air conditioning, which usually makes it worthwhile for homeowners replacing aging heating or cooling equipment.`
          : `In ${stateName}, low natural-gas prices mean a heat pump may not beat a gas furnace on heating cost alone, but its combined heating-and-cooling in one system, plus efficiency in mild months, can still make it the better long-term choice.`,
    });

    items.push({
      q: `Do heat pumps work in ${stateName}'s climate?`,
      a: `${stateName} sits in IECC climate zone ${climate.ieccZone} with about ${climate.heatingDegreeDays.toLocaleString()} heating degree days per year. Modern heat pumps there average a heating COP of ${climate.heatPumpCopHeating}, meaning they deliver ${climate.heatPumpCopHeating} units of heat per unit of electricity.`,
    });

    if (hpIncentives.length > 0) {
      const total = hpIncentives.reduce((s, i) => s + i.maxAmount, 0);
      items.push({
        q: `Are there heat pump rebates in ${stateName}?`,
        a: `Yes. ${stateName} residents can access ${incentiveNames(
          hpIncentives
        )}${
          total > 0 ? `, worth up to ${usd(total)}` : ""
        }. The federal 25C credit ended December 31, 2025, so these state and utility programs are now the main way to cut installation cost.`,
      });
    } else {
      items.push({
        q: `Are there heat pump rebates in ${stateName}?`,
        a: `${stateName} does not currently offer dedicated statewide heat pump rebates, and the federal 25C credit ended December 31, 2025. Many local utilities still offer their own rebates, so check with yours before buying.`,
      });
    }

    return items;
  },

  "heat-pump-water-heater": (stateName, data, incentives) => {
    const items: FaqItem[] = [];
    const elec = data.electricity;
    if (!elec) return items;

    const thermalKwh = 2810;
    const resistanceCost = Math.round((thermalKwh / 0.92) * elec.rate);
    const hpwhCost = Math.round((thermalKwh / 3.5) * elec.rate);
    const hpIncentives = incentives.filter((i) => i.category === "heat-pump");

    items.push({
      q: `Is a heat pump water heater worth it in ${stateName}?`,
      a: `For a typical household in ${stateName}, a heat pump water heater uses about a third of the electricity of a standard electric tank — roughly ${usd(
        hpwhCost
      )} a year versus ${usd(
        resistanceCost
      )} — saving about ${usd(
        resistanceCost - hpwhCost
      )} annually, which is what pays back the higher purchase price.`,
    });

    items.push({
      q: `How much does a heat pump water heater cost to run in ${stateName}?`,
      a: `At ${stateName}'s ${usd(
        elec.rate,
        3
      )}/kWh rate, a heat pump water heater costs roughly ${usd(
        hpwhCost
      )} per year to run for a three-person household.`,
    });

    if (hpIncentives.length > 0) {
      items.push({
        q: `Are there rebates for heat pump water heaters in ${stateName}?`,
        a: `Yes. ${stateName} programs including ${incentiveNames(
          hpIncentives
        )} can help, and many utilities add water-heater rebates of $300–$1,500. The federal 25C credit ended December 31, 2025.`,
      });
    } else {
      items.push({
        q: `Are there rebates for heat pump water heaters in ${stateName}?`,
        a: `${stateName} has no dedicated statewide program, and the federal 25C credit ended December 31, 2025, but many utilities still offer water-heater rebates of $300–$1,500 — check with yours.`,
      });
    }

    return items;
  },

  "ev-tax-credit": (stateName, _data, incentives) => {
    const items: FaqItem[] = [];
    const evIncentives = incentives.filter(
      (i) => i.category === "ev" || i.category === "used-ev"
    );

    items.push({
      q: `Is the federal EV tax credit still available in 2026?`,
      a: `No. The federal Clean Vehicle Credit (30D, up to $7,500) and Used Clean Vehicle Credit (25E, up to $4,000) ended for vehicles acquired after September 30, 2025. Buyers who acquired a qualifying vehicle by that deadline may still claim it for that tax year.`,
    });

    if (evIncentives.length > 0) {
      const total = evIncentives.reduce((s, i) => s + i.maxAmount, 0);
      items.push({
        q: `What EV incentives does ${stateName} offer?`,
        a: `${stateName} offers ${incentiveNames(
          evIncentives
        )}${
          total > 0 ? `, worth up to ${usd(total)} combined` : ""
        }. Each program has its own eligibility rules and funding cycle, so confirm availability before purchasing.`,
      });
    } else {
      items.push({
        q: `What EV incentives does ${stateName} offer?`,
        a: `${stateName} does not currently offer statewide EV purchase incentives. With federal credits ended, the case for an EV here rests on fuel and maintenance savings; some utilities offer EV rate plans or charger rebates.`,
      });
    }

    items.push({
      q: `Can I still claim the EV tax credit for a 2025 purchase in ${stateName}?`,
      a: `If you acquired the vehicle by September 30, 2025 (including under a binding contract with payment made by then), the original rules apply: income caps of $150,000 single / $300,000 joint for new EVs, and MSRP caps of $55,000 for cars and $80,000 for SUVs, vans, and trucks.`,
    });

    return items;
  },

  "battery-storage": (stateName, data, incentives) => {
    const items: FaqItem[] = [];
    const elec = data.electricity;
    const solar = data.solar;
    if (!elec) return items;

    const batteryIncentives = incentives.filter(
      (i) => i.category === "battery-storage"
    );

    if (elec.touOnPeak && elec.touOffPeak) {
      const spread = elec.touOnPeak - elec.touOffPeak;
      const arbitrage = Math.round(spread * 10 * 365);
      items.push({
        q: `Is a home battery worth it in ${stateName}?`,
        a: `${stateName}'s time-of-use rates create a strong case: with a ${usd(
          spread,
          3
        )}/kWh spread between off-peak and on-peak power, a typical battery can save about ${usd(
          arbitrage
        )} a year through rate arbitrage, on top of backup-power value.`,
      });
    } else {
      items.push({
        q: `Is a home battery worth it in ${stateName}?`,
        a: `${stateName} does not widely offer time-of-use rates, so a battery's value here comes mainly from backup power and, when paired with solar, from using more of your own production instead of buying grid power at ${usd(
          elec.rate,
          3
        )}/kWh.`,
      });
    }

    if (solar) {
      const dailyProd = Math.round(
        (solar.annualProductionPerKw * solar.avgSystemSizeKw) / 365
      );
      items.push({
        q: `Should I pair a battery with solar in ${stateName}?`,
        a: `A ${solar.avgSystemSizeKw} kW solar system in ${stateName} produces about ${dailyProd} kWh a day. A battery lets you store that midday production for evening use${
          solar.netMetering ? "" : ", which matters here since the state lacks full net metering"
        }, maximizing the value of every kWh your panels make.`,
      });
    }

    if (batteryIncentives.length > 0) {
      const total = batteryIncentives.reduce((s, i) => s + i.maxAmount, 0);
      items.push({
        q: `Are there battery storage incentives in ${stateName}?`,
        a: `Yes. ${stateName} offers ${incentiveNames(
          batteryIncentives
        )}${
          total > 0 ? `, worth up to ${usd(total)}` : ""
        }. The federal 30% credit for battery storage ended December 31, 2025, so state programs are now the primary incentive.`,
      });
    } else {
      items.push({
        q: `Are there battery storage incentives in ${stateName}?`,
        a: `${stateName} does not currently offer statewide battery incentives, and the federal 30% credit ended December 31, 2025. The investment case rests on rate savings, solar self-consumption, and backup value; some utilities pay battery owners through virtual power plant programs.`,
      });
    }

    return items;
  },
};

/**
 * Generate 3-6 state-specific FAQ items for a state calculator page.
 */
export function getStateFaq(
  calculator: CalculatorSlug,
  stateName: string,
  data: StateData,
  stateIncentives: StateIncentive[]
): FaqItem[] {
  const generator = faqGenerators[calculator];
  return generator(stateName, data, stateIncentives);
}
