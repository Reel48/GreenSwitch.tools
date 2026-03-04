import type { EvVsGasInput } from "./schema";
import type { YearlyBreakdown, CostBreakdown } from "../types";

export type EvVsGasResult = {
  // Summary
  evTotalCost: number;
  gasTotalCost: number;
  totalSavings: number;
  savingsPerMonth: number;
  breakEvenYear: number | null; // null if EV never breaks even

  // Fuel costs
  evTotalFuelCost: number;
  gasTotalFuelCost: number;
  evMonthlyFuelCost: number;
  gasMonthlyFuelCost: number;
  evCostPerMile: number;
  gasCostPerMile: number;

  // Financing
  evMonthlyPayment: number;
  gasMonthlyPayment: number;
  evTotalInterest: number;
  gasTotalInterest: number;

  // After incentives
  evNetPurchasePrice: number;

  // Residual value
  evResidualValue: number;
  gasResidualValue: number;

  // Breakdowns
  evCostBreakdown: CostBreakdown[];
  gasCostBreakdown: CostBreakdown[];
  yearlyBreakdown: YearlyBreakdown[];

  // CO2
  evAnnualCO2Tons: number;
  gasAnnualCO2Tons: number;
  co2SavingsTons: number;
};

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (annualRate === 0) return principal / (years * 12);
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

function calculateTotalInterest(
  principal: number,
  monthlyPayment: number,
  years: number
): number {
  return monthlyPayment * years * 12 - principal;
}

function calculateResidualValue(
  purchasePrice: number,
  depreciationRate: number,
  years: number
): number {
  return purchasePrice * Math.pow(1 - depreciationRate, years);
}

export function calculateEvVsGas(input: EvVsGasInput): EvVsGasResult {
  const {
    evPurchasePrice,
    gasPurchasePrice,
    annualMiles,
    electricityRate,
    gasPrice,
    evEfficiency,
    gasMpg,
    ownershipYears,
    evAnnualMaintenance,
    gasAnnualMaintenance,
    evAnnualInsurance,
    gasAnnualInsurance,
    federalTaxCredit,
    stateTaxCredit,
    downPaymentPercent,
    loanTermYears,
    interestRate,
    evDepreciationRate,
    gasDepreciationRate,
    annualFuelPriceIncrease,
    annualElectricityPriceIncrease,
  } = input;

  // Net EV price after incentives
  const totalIncentives = federalTaxCredit + stateTaxCredit;
  const evNetPurchasePrice = evPurchasePrice - totalIncentives;

  // Loan calculations
  const evDownPayment = evNetPurchasePrice * (downPaymentPercent / 100);
  const gasDownPayment = gasPurchasePrice * (downPaymentPercent / 100);
  const evLoanAmount = evNetPurchasePrice - evDownPayment;
  const gasLoanAmount = gasPurchasePrice - gasDownPayment;

  const evMonthlyPayment = calculateMonthlyPayment(
    evLoanAmount,
    interestRate,
    loanTermYears
  );
  const gasMonthlyPayment = calculateMonthlyPayment(
    gasLoanAmount,
    interestRate,
    loanTermYears
  );
  const evTotalInterest = calculateTotalInterest(
    evLoanAmount,
    evMonthlyPayment,
    loanTermYears
  );
  const gasTotalInterest = calculateTotalInterest(
    gasLoanAmount,
    gasMonthlyPayment,
    loanTermYears
  );

  // Year-by-year fuel costs with price escalation
  let evTotalFuelCost = 0;
  let gasTotalFuelCost = 0;
  const yearlyBreakdown: YearlyBreakdown[] = [];

  let evCumulative = evNetPurchasePrice + evTotalInterest;
  let gasCumulative = gasPurchasePrice + gasTotalInterest;
  let breakEvenYear: number | null = null;

  for (let year = 1; year <= ownershipYears; year++) {
    // Escalated energy prices
    const currentElectricityRate =
      electricityRate *
      Math.pow(1 + annualElectricityPriceIncrease, year - 1);
    const currentGasPrice =
      gasPrice * Math.pow(1 + annualFuelPriceIncrease, year - 1);

    // Annual fuel costs
    const evAnnualFuel =
      (annualMiles / 100) * evEfficiency * currentElectricityRate;
    const gasAnnualFuel = (annualMiles / gasMpg) * currentGasPrice;

    evTotalFuelCost += evAnnualFuel;
    gasTotalFuelCost += gasAnnualFuel;

    // Annual totals (fuel + maintenance + insurance)
    const evAnnualTotal =
      evAnnualFuel + evAnnualMaintenance + evAnnualInsurance;
    const gasAnnualTotal =
      gasAnnualFuel + gasAnnualMaintenance + gasAnnualInsurance;

    evCumulative += evAnnualFuel + evAnnualMaintenance + evAnnualInsurance;
    gasCumulative += gasAnnualFuel + gasAnnualMaintenance + gasAnnualInsurance;

    // Check break-even
    if (breakEvenYear === null && evCumulative <= gasCumulative) {
      breakEvenYear = year;
    }

    yearlyBreakdown.push({
      year,
      cumulativeCostA: Math.round(evCumulative),
      cumulativeCostB: Math.round(gasCumulative),
      annualCostA: Math.round(evAnnualTotal),
      annualCostB: Math.round(gasAnnualTotal),
    });
  }

  // Residual values
  const evResidualValue = calculateResidualValue(
    evPurchasePrice,
    evDepreciationRate,
    ownershipYears
  );
  const gasResidualValue = calculateResidualValue(
    gasPurchasePrice,
    gasDepreciationRate,
    ownershipYears
  );

  // Total cost of ownership (subtract residual value)
  const evTotalMaintenance = evAnnualMaintenance * ownershipYears;
  const gasTotalMaintenance = gasAnnualMaintenance * ownershipYears;
  const evTotalInsurance = evAnnualInsurance * ownershipYears;
  const gasTotalInsurance = gasAnnualInsurance * ownershipYears;

  const evTotalCost =
    evNetPurchasePrice +
    evTotalInterest +
    evTotalFuelCost +
    evTotalMaintenance +
    evTotalInsurance -
    evResidualValue;

  const gasTotalCost =
    gasPurchasePrice +
    gasTotalInterest +
    gasTotalFuelCost +
    gasTotalMaintenance +
    gasTotalInsurance -
    gasResidualValue;

  const totalSavings = gasTotalCost - evTotalCost;
  const savingsPerMonth = totalSavings / (ownershipYears * 12);

  // Cost per mile
  const totalMiles = annualMiles * ownershipYears;
  const evCostPerMile = evTotalFuelCost / totalMiles;
  const gasCostPerMile = gasTotalFuelCost / totalMiles;

  // Monthly fuel
  const evMonthlyFuelCost = evTotalFuelCost / (ownershipYears * 12);
  const gasMonthlyFuelCost = gasTotalFuelCost / (ownershipYears * 12);

  // CO2 calculations
  // Average US grid: ~0.855 lbs CO2 per kWh (EPA 2023)
  // Gas: ~19.6 lbs CO2 per gallon
  const evAnnualCO2Lbs = (annualMiles / 100) * evEfficiency * 0.855;
  const gasAnnualCO2Lbs = (annualMiles / gasMpg) * 19.6;
  const evAnnualCO2Tons = evAnnualCO2Lbs / 2000;
  const gasAnnualCO2Tons = gasAnnualCO2Lbs / 2000;
  const co2SavingsTons =
    (gasAnnualCO2Tons - evAnnualCO2Tons) * ownershipYears;

  // Cost breakdowns for pie charts
  const evCostBreakdown: CostBreakdown[] = [
    {
      label: "Purchase (net)",
      amount: Math.round(evNetPurchasePrice),
      color: "#16a34a",
    },
    {
      label: "Financing",
      amount: Math.round(evTotalInterest),
      color: "#22c55e",
    },
    {
      label: "Electricity",
      amount: Math.round(evTotalFuelCost),
      color: "#4ade80",
    },
    {
      label: "Maintenance",
      amount: Math.round(evTotalMaintenance),
      color: "#86efac",
    },
    {
      label: "Insurance",
      amount: Math.round(evTotalInsurance),
      color: "#bbf7d0",
    },
  ];

  const gasCostBreakdown: CostBreakdown[] = [
    {
      label: "Purchase",
      amount: Math.round(gasPurchasePrice),
      color: "#dc2626",
    },
    {
      label: "Financing",
      amount: Math.round(gasTotalInterest),
      color: "#ef4444",
    },
    {
      label: "Gasoline",
      amount: Math.round(gasTotalFuelCost),
      color: "#f87171",
    },
    {
      label: "Maintenance",
      amount: Math.round(gasTotalMaintenance),
      color: "#fca5a5",
    },
    {
      label: "Insurance",
      amount: Math.round(gasTotalInsurance),
      color: "#fecaca",
    },
  ];

  return {
    evTotalCost: Math.round(evTotalCost),
    gasTotalCost: Math.round(gasTotalCost),
    totalSavings: Math.round(totalSavings),
    savingsPerMonth: Math.round(savingsPerMonth),
    breakEvenYear,
    evTotalFuelCost: Math.round(evTotalFuelCost),
    gasTotalFuelCost: Math.round(gasTotalFuelCost),
    evMonthlyFuelCost: Math.round(evMonthlyFuelCost),
    gasMonthlyFuelCost: Math.round(gasMonthlyFuelCost),
    evCostPerMile: Math.round(evCostPerMile * 100) / 100,
    gasCostPerMile: Math.round(gasCostPerMile * 100) / 100,
    evMonthlyPayment: Math.round(evMonthlyPayment),
    gasMonthlyPayment: Math.round(gasMonthlyPayment),
    evTotalInterest: Math.round(evTotalInterest),
    gasTotalInterest: Math.round(gasTotalInterest),
    evNetPurchasePrice: Math.round(evNetPurchasePrice),
    evResidualValue: Math.round(evResidualValue),
    gasResidualValue: Math.round(gasResidualValue),
    evCostBreakdown,
    gasCostBreakdown,
    yearlyBreakdown,
    evAnnualCO2Tons: Math.round(evAnnualCO2Tons * 10) / 10,
    gasAnnualCO2Tons: Math.round(gasAnnualCO2Tons * 10) / 10,
    co2SavingsTons: Math.round(co2SavingsTons * 10) / 10,
  };
}
