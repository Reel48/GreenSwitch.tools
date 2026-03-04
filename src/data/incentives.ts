export interface Incentive {
  /** Unique identifier */
  id: string;
  /** Incentive name */
  name: string;
  /** Category of incentive */
  category: "ev" | "solar" | "heat-pump" | "battery-storage" | "efficiency" | "used-ev";
  /** Description of the incentive */
  description: string;
  /** Maximum amount in $ */
  maxAmount: number;
  /** Type of incentive */
  type: "tax-credit" | "rebate" | "grant" | "exemption";
  /** Income limit for single filers, null if none */
  incomeLimitSingle: number | null;
  /** Income limit for joint filers, null if none */
  incomeLimitJoint: number | null;
  /** MSRP cap for vehicle eligibility, null if N/A */
  msrpCap: number | null;
  /** Percentage of cost covered (e.g., 30 for 30%), null if flat amount */
  percentageCovered: number | null;
  /** Expiration date, null if no set expiration */
  expirationDate: string | null;
}

export const federalIncentives: Incentive[] = [
  {
    id: "fed-new-ev-30d",
    name: "New Clean Vehicle Tax Credit (30D)",
    category: "ev",
    description: "Tax credit for purchasing a new qualifying electric vehicle. Vehicle must be assembled in North America and meet battery component and critical mineral requirements. Credit is split into $3,750 for battery components and $3,750 for critical minerals.",
    maxAmount: 7500,
    type: "tax-credit",
    incomeLimitSingle: 150000,
    incomeLimitJoint: 300000,
    msrpCap: 55000,
    percentageCovered: null,
    expirationDate: "2032-12-31",
  },
  {
    id: "fed-used-ev-25e",
    name: "Used Clean Vehicle Tax Credit (25E)",
    category: "used-ev",
    description: "Tax credit for purchasing a qualifying used electric vehicle from a licensed dealer. Vehicle must be at least 2 model years old and priced at $25,000 or less. Credit is 30% of the sale price, up to $4,000.",
    maxAmount: 4000,
    type: "tax-credit",
    incomeLimitSingle: 75000,
    incomeLimitJoint: 150000,
    msrpCap: 25000,
    percentageCovered: 30,
    expirationDate: "2032-12-31",
  },
  {
    id: "fed-solar-itc",
    name: "Residential Clean Energy Credit (Solar ITC)",
    category: "solar",
    description: "Tax credit for installing solar panels on your primary or secondary residence. Covers 30% of the total system cost including installation. No maximum amount and no income limit.",
    maxAmount: 0,
    type: "tax-credit",
    incomeLimitSingle: null,
    incomeLimitJoint: null,
    msrpCap: null,
    percentageCovered: 30,
    expirationDate: "2034-12-31",
  },
  {
    id: "fed-heat-pump-25c",
    name: "Energy Efficient Home Improvement Credit (Heat Pump - 25C)",
    category: "heat-pump",
    description: "Tax credit for installing a qualifying heat pump, heat pump water heater, or biomass stove. Covers 30% of the cost up to $2,000 per year. Can be combined with other 25C credits up to $3,200 annual limit.",
    maxAmount: 2000,
    type: "tax-credit",
    incomeLimitSingle: null,
    incomeLimitJoint: null,
    msrpCap: null,
    percentageCovered: 30,
    expirationDate: "2032-12-31",
  },
  {
    id: "fed-battery-storage",
    name: "Residential Battery Storage Tax Credit",
    category: "battery-storage",
    description: "Tax credit for installing battery storage systems with a capacity of at least 3 kWh. Covers 30% of the total cost of the battery system and installation. Part of the Residential Clean Energy Credit.",
    maxAmount: 0,
    type: "tax-credit",
    incomeLimitSingle: null,
    incomeLimitJoint: null,
    msrpCap: null,
    percentageCovered: 30,
    expirationDate: "2034-12-31",
  },
];

export interface StateIncentive {
  id: string;
  name: string;
  category: "ev" | "solar" | "heat-pump" | "battery-storage" | "efficiency" | "used-ev";
  description: string;
  maxAmount: number;
  type: "rebate" | "tax-credit" | "grant" | "exemption" | "loan";
}

export const stateIncentives: Record<string, StateIncentive[]> = {
  CA: [
    { id: "ca-cvrp", name: "Clean Vehicle Rebate Project (CVRP)", category: "ev", description: "Rebate for purchasing or leasing a new qualifying zero-emission or plug-in hybrid vehicle. Standard rebate of $2,000 for BEVs, with increased rebates for low-income applicants up to $7,500.", maxAmount: 7500, type: "rebate" },
    { id: "ca-sgip", name: "Self-Generation Incentive Program (SGIP)", category: "battery-storage", description: "Incentive for installing battery storage systems, providing per-watt-hour incentives that can cover a significant portion of the cost. Higher rebates for equity and low-income customers.", maxAmount: 5500, type: "rebate" },
    { id: "ca-tech-clean", name: "Technology and Equipment for Clean Heating (TECH)", category: "heat-pump", description: "Statewide incentive program for heat pump water heaters and space heating systems. Provides rebates of $1,000-$3,000 for qualifying heat pump installations.", maxAmount: 3000, type: "rebate" },
    { id: "ca-nem", name: "Net Energy Metering 3.0", category: "solar", description: "Updated net metering program for solar customers. Exports are valued based on avoided cost pricing with adders for battery storage pairing.", maxAmount: 0, type: "exemption" },
  ],
  NY: [
    { id: "ny-drive-clean", name: "Drive Clean Rebate", category: "ev", description: "Point-of-sale rebate for new EV purchases or leases. Rebate amount is $2,000 for eligible battery electric vehicles with MSRP under $42,000.", maxAmount: 2000, type: "rebate" },
    { id: "ny-nyserda-solar", name: "NY-Sun Incentive Program", category: "solar", description: "Upfront incentive reducing the cost of installing solar. Residential incentive varies by region with ConEd territory typically receiving the highest rates.", maxAmount: 5000, type: "rebate" },
    { id: "ny-heat-pump", name: "EmPower+ Heat Pump Program", category: "heat-pump", description: "Rebates for air-source and ground-source heat pumps, ranging from $1,000 to $15,000 depending on system type and household income level.", maxAmount: 15000, type: "rebate" },
  ],
  NJ: [
    { id: "nj-ev-rebate", name: "Charge Up New Jersey", category: "ev", description: "Rebate of up to $4,000 for purchasing or leasing a new EV with MSRP under $55,000. Additional $1,500 available for income-qualified applicants.", maxAmount: 5500, type: "rebate" },
    { id: "nj-srec-ii", name: "SREC-II Program", category: "solar", description: "Successor Solar Renewable Energy Certificate program providing ongoing income for solar production. Fixed 15-year SREC-II price schedule at approximately $220/MWh.", maxAmount: 0, type: "exemption" },
    { id: "nj-sales-tax", name: "EV Sales Tax Exemption", category: "ev", description: "Zero-emission vehicles are exempt from New Jersey sales tax, saving approximately 6.625% of the purchase price.", maxAmount: 0, type: "exemption" },
  ],
  CO: [
    { id: "co-ev-credit", name: "Colorado EV Tax Credit", category: "ev", description: "State income tax credit for new EV purchases. Credit amount is $5,000 for vehicles with MSRP under $80,000.", maxAmount: 5000, type: "tax-credit" },
    { id: "co-solar-rebate", name: "Xcel Energy Solar Rewards", category: "solar", description: "Per-kWh payment for energy produced by rooftop solar systems in Xcel Energy territory, providing ongoing production incentive.", maxAmount: 3000, type: "rebate" },
    { id: "co-heat-pump", name: "Colorado Heat Pump Rebate", category: "heat-pump", description: "Rebates for qualifying heat pump installations through Colorado's utility programs. Covers $1,500-$3,000 based on system type.", maxAmount: 3000, type: "rebate" },
  ],
  CT: [
    { id: "ct-cheapr", name: "Connecticut CHEAPR Program", category: "ev", description: "Rebate for new EV purchases through the Connecticut Hydrogen and Electric Automobile Purchase Rebate. Up to $2,250 for BEVs and $750 for PHEVs.", maxAmount: 2250, type: "rebate" },
    { id: "ct-solar-incentive", name: "Residential Solar Investment Program", category: "solar", description: "Performance-based incentive for residential solar installations, providing payments based on system production over a 6-year period.", maxAmount: 4800, type: "rebate" },
  ],
  MA: [
    { id: "ma-mor-ev", name: "MOR-EV Program", category: "ev", description: "Rebate of up to $3,500 for the purchase or lease of qualifying EVs with MSRP under $55,000. Additional rebates for income-eligible households.", maxAmount: 3500, type: "rebate" },
    { id: "ma-smart", name: "SMART Solar Program", category: "solar", description: "Solar Massachusetts Renewable Target program providing a per-kWh incentive for solar energy production under a 10-year declining block tariff.", maxAmount: 0, type: "rebate" },
    { id: "ma-heat-pump", name: "Mass Save Heat Pump Rebate", category: "heat-pump", description: "Rebates for whole-home and partial-home heat pump installations. Up to $10,000 for whole-home systems with enhanced incentives for income-eligible customers.", maxAmount: 10000, type: "rebate" },
  ],
  MD: [
    { id: "md-ev-excise", name: "Maryland EV Excise Tax Credit", category: "ev", description: "Excise tax credit of up to $3,000 for new EV purchases. Available until funding is exhausted each fiscal year.", maxAmount: 3000, type: "tax-credit" },
    { id: "md-solar-grant", name: "Maryland Solar Energy Grant", category: "solar", description: "State grant for residential solar installations providing a flat $1,000 incentive per system.", maxAmount: 1000, type: "grant" },
  ],
  OR: [
    { id: "or-cea", name: "Oregon Clean Energy Acceptance (CEA)", category: "ev", description: "Rebate of up to $5,000 for new EVs and $2,500 for used EVs. Higher amounts available for low- and moderate-income applicants.", maxAmount: 5000, type: "rebate" },
    { id: "or-solar-incentive", name: "Oregon Solar + Storage Rebate Program", category: "solar", description: "Rebate for solar and solar+storage installations. Up to $5,000 for solar and $2,500 for battery storage, with enhanced incentives for low-income households.", maxAmount: 7500, type: "rebate" },
    { id: "or-heat-pump", name: "Oregon Heat Pump Rebate", category: "heat-pump", description: "Utility and state rebates for heat pump installations. Combined incentives up to $3,000 for qualifying systems.", maxAmount: 3000, type: "rebate" },
  ],
  WA: [
    { id: "wa-ev-sales-tax", name: "Washington EV Sales Tax Exemption", category: "ev", description: "Sales and use tax exemption for new EVs with MSRP up to $45,000. Saves approximately 6.5-10.5% depending on local tax rate.", maxAmount: 0, type: "exemption" },
    { id: "wa-solar-incentive", name: "Washington State Solar Production Incentive", category: "solar", description: "Production-based incentive for solar energy systems installed in Washington, with enhanced rates for systems using Washington-manufactured components.", maxAmount: 5000, type: "rebate" },
  ],
  VT: [
    { id: "vt-ev-incentive", name: "Replace Your Ride", category: "ev", description: "Incentive of up to $5,000 for purchasing a new EV when replacing an older internal combustion vehicle. Income-eligible households may receive up to $7,500.", maxAmount: 7500, type: "rebate" },
    { id: "vt-heat-pump", name: "Efficiency Vermont Heat Pump Rebate", category: "heat-pump", description: "Rebates for cold-climate heat pump installations through Efficiency Vermont. Up to $1,500 for qualifying ductless and central systems.", maxAmount: 1500, type: "rebate" },
  ],
  RI: [
    { id: "ri-drive-ev", name: "DRIVE EV Rebate", category: "ev", description: "Rebate of up to $2,500 for new EV purchases and $1,500 for used EVs. Available to Rhode Island residents with MSRP cap of $60,000 for new vehicles.", maxAmount: 2500, type: "rebate" },
    { id: "ri-ren-energy", name: "Rhode Island Renewable Energy Fund", category: "solar", description: "Incentive for residential solar installations funded through a small surcharge on electric bills. Provides per-watt capacity-based incentive.", maxAmount: 7000, type: "rebate" },
  ],
  IL: [
    { id: "il-ev-rebate", name: "Illinois EV Rebate", category: "ev", description: "Rebate of up to $4,000 for new EV purchases registered in Illinois. Available for vehicles with MSRP under $80,000.", maxAmount: 4000, type: "rebate" },
    { id: "il-shines", name: "Illinois Shines (Adjustable Block Program)", category: "solar", description: "Renewable energy credit program offering per-kWh incentives for solar production over a 15-year contract term.", maxAmount: 0, type: "rebate" },
    { id: "il-heat-pump", name: "Illinois Home Weatherization Assistance", category: "heat-pump", description: "Utility rebates for heat pump installations through ComEd and Ameren territories. Up to $2,500 for qualifying installations.", maxAmount: 2500, type: "rebate" },
  ],
  PA: [
    { id: "pa-ev-rebate", name: "Pennsylvania Alternative Fuel Vehicle Rebate", category: "ev", description: "Rebate of up to $2,000 for new EVs and $1,000 for used EVs. Income cap of $200,000 for household applicants.", maxAmount: 2000, type: "rebate" },
    { id: "pa-solar-srec", name: "Pennsylvania SREC Program", category: "solar", description: "Solar Renewable Energy Certificate market providing additional income for solar production at approximately $40/MWh.", maxAmount: 0, type: "exemption" },
  ],
  MN: [
    { id: "mn-ev-rebate", name: "Minnesota EV Rebate", category: "ev", description: "Rebate of up to $2,500 for purchasing a new EV. Enhanced incentives of $3,500 available for income-qualifying households.", maxAmount: 3500, type: "rebate" },
    { id: "mn-solar-incentive", name: "Minnesota Solar Incentive Program", category: "solar", description: "Utility-based solar incentive programs offering per-kWh production payments and upfront rebates through Xcel Energy and other utilities.", maxAmount: 4000, type: "rebate" },
  ],
  ME: [
    { id: "me-ev-rebate", name: "Maine EV Accelerator", category: "ev", description: "Rebate of up to $2,000 for new EVs and $2,500 for used EVs purchased by income-qualifying Maine residents.", maxAmount: 2500, type: "rebate" },
    { id: "me-heat-pump", name: "Efficiency Maine Heat Pump Rebate", category: "heat-pump", description: "Rebates for heat pump installations through Efficiency Maine. Up to $2,400 for ductless mini-splits (multiple units) and $4,000 for whole-home systems.", maxAmount: 4000, type: "rebate" },
  ],
};
