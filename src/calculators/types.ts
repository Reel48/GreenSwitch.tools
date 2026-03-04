export type YearlyBreakdown = {
  year: number;
  cumulativeCostA: number;
  cumulativeCostB: number;
  annualCostA: number;
  annualCostB: number;
};

export type CostBreakdown = {
  label: string;
  amount: number;
  color?: string;
};

export type CalculatorMeta = {
  title: string;
  description: string;
  slug: string;
  icon: string;
  category: string;
};
