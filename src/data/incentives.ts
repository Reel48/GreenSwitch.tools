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
    description: "Federal tax credit of up to $7,500 for new qualifying EVs. Ended September 30, 2025 — vehicles acquired after that date do not qualify. Buyers with a binding contract and payment made by the deadline may still claim it for 2025.",
    maxAmount: 7500,
    type: "tax-credit",
    incomeLimitSingle: 150000,
    incomeLimitJoint: 300000,
    msrpCap: 55000,
    percentageCovered: null,
    expirationDate: "2025-09-30",
  },
  {
    id: "fed-used-ev-25e",
    name: "Used Clean Vehicle Tax Credit (25E)",
    category: "used-ev",
    description: "Federal tax credit of up to $4,000 (30% of sale price) for qualifying used EVs bought from licensed dealers. Ended September 30, 2025 — vehicles acquired after that date do not qualify.",
    maxAmount: 4000,
    type: "tax-credit",
    incomeLimitSingle: 75000,
    incomeLimitJoint: 150000,
    msrpCap: 25000,
    percentageCovered: 30,
    expirationDate: "2025-09-30",
  },
  {
    id: "fed-solar-itc",
    name: "Residential Clean Energy Credit (25D Solar ITC)",
    category: "solar",
    description: "30% federal tax credit for purchased home solar systems. Ended December 31, 2025 — installations completed after that date do not qualify. Leased and PPA systems may still benefit indirectly through the commercial (48E) credit claimed by the system owner.",
    maxAmount: 0,
    type: "tax-credit",
    incomeLimitSingle: null,
    incomeLimitJoint: null,
    msrpCap: null,
    percentageCovered: 30,
    expirationDate: "2025-12-31",
  },
  {
    id: "fed-heat-pump-25c",
    name: "Energy Efficient Home Improvement Credit (Heat Pump - 25C)",
    category: "heat-pump",
    description: "Federal tax credit of 30% up to $2,000 for qualifying heat pumps. Ended December 31, 2025 — systems placed in service after that date do not qualify. State and utility heat pump rebates remain available in many states.",
    maxAmount: 2000,
    type: "tax-credit",
    incomeLimitSingle: null,
    incomeLimitJoint: null,
    msrpCap: null,
    percentageCovered: 30,
    expirationDate: "2025-12-31",
  },
  {
    id: "fed-battery-storage",
    name: "Residential Battery Storage Tax Credit (25D)",
    category: "battery-storage",
    description: "30% federal tax credit for battery storage systems of at least 3 kWh, part of the Residential Clean Energy Credit. Ended December 31, 2025 — installations completed after that date do not qualify. State programs like California's SGIP remain available.",
    maxAmount: 0,
    type: "tax-credit",
    incomeLimitSingle: null,
    incomeLimitJoint: null,
    msrpCap: null,
    percentageCovered: 30,
    expirationDate: "2025-12-31",
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
  // --- States below researched July 2026 from DSIRE, state energy offices, and major-utility program pages. Verify current details before purchasing. ---
  AL: [
    { id: "al-solar-property-tax-exemption", name: "Alabama Renewable Energy Property Tax Exemption", category: "solar", description: "Statewide 100% property-tax exemption on the added home value from a residential solar system, so going solar does not raise your assessed value. In effect through 2028.", maxAmount: 0, type: "exemption" }, // SOURCE: https://www.energysage.com/local-data/solar-rebates-incentives/al/
    { id: "al-alabama-power-heat-pump-rebate", name: "Alabama Power High-Efficiency Heat Pump Rebate", category: "heat-pump", description: "$1,000 rebate for installing a high-efficiency heat pump (18 SEER2+) when converting from a gas furnace. Alabama Power residential customers only.", maxAmount: 1000, type: "rebate" }, // SOURCE: https://www.alabamapower.com/residential/save-money-and-energy/rebates-and-incentives.html
    { id: "al-alabama-power-hpwh-rebate", name: "Alabama Power Hybrid Water Heater Rebate", category: "heat-pump", description: "$600 rebate for a hybrid heat-pump water heater when converting from a gas water heater. Alabama Power residential customers.", maxAmount: 600, type: "rebate" }, // SOURCE: https://www.alabamapower.com/residential/save-money-and-energy/rebates-and-incentives.html
    { id: "al-alabama-power-ev-charger-rebate", name: "Alabama Power EV Home Charger Rebate", category: "ev", description: "$500 rebate for installing a Level 2 (240V) home EV charger on a dedicated circuit for EV owners. Alabama Power single-family customers.", maxAmount: 500, type: "rebate" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/22739/alabama-power-ev-home-charger-rebate
  ],
  AK: [],
  AZ: [
    { id: "az-state-solar-credit", name: "Arizona Credit for Solar Energy Devices", category: "solar", description: "State income-tax credit of 25% of a residential solar system cost, capped at $1,000 per residence, with a 5-year carryforward (Form 310).", maxAmount: 1000, type: "tax-credit" }, // SOURCE: https://azdor.gov/forms/tax-credits-forms/credit-solar-energy-devices
    { id: "az-solar-sales-tax-exemption", name: "Arizona Solar Sales Tax Exemption", category: "solar", description: "Solar energy devices, including panels, inverters, and installation, are exempt from Arizona transaction privilege (sales) tax.", maxAmount: 0, type: "exemption" }, // SOURCE: https://www.energysage.com/local-data/solar-rebates-incentives/az/
    { id: "az-energy-equipment-property-tax-exemption", name: "Arizona Energy Equipment Property Tax Exemption", category: "solar", description: "The added value of solar and battery storage equipment is 100% excluded from property-tax assessment (A.R.S. 42-11054), so the system does not raise your property tax.", maxAmount: 0, type: "exemption" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/1683
    { id: "az-srp-heat-pump-rebate", name: "SRP Cool Cash Heat Pump Rebate", category: "heat-pump", description: "Salt River Project pays up to $225 per ton of cooling capacity for a qualifying high-efficiency variable-capacity heat pump (15 SEER2+).", maxAmount: 225, type: "rebate" }, // SOURCE: https://www.srpnet.com/energy-savings-rebates/home/rebates/residential-rebates
    { id: "az-srp-hpwh-rebate", name: "SRP Heat Pump Water Heater Rebate", category: "heat-pump", description: "Salt River Project offers a $500 rebate for a qualifying ENERGY STAR heat-pump water heater (UEF 2.8+), once per residence every 10 years.", maxAmount: 500, type: "rebate" }, // SOURCE: https://www.srpnet.com/energy-savings-rebates/home/rebates/heat-pump-water-heater
    { id: "az-srp-ev-charger-rebate", name: "SRP Residential EV Charger Rebate", category: "ev", description: "Salt River Project offers a $250 rebate for a qualifying Level 2 EV charging station (instant via the SRP Marketplace or by application).", maxAmount: 250, type: "rebate" }, // SOURCE: https://afdc.energy.gov/laws/13007
  ],
  AR: [
    { id: "ar-entergy-hpwh-rebate", name: "Entergy Arkansas Heat Pump Water Heater Rebate", category: "heat-pump", description: "Up to $500 per unit on qualifying ENERGY STAR heat-pump (hybrid) water heaters at participating retailers, under Entergy Arkansas's 2026 residential program.", maxAmount: 500, type: "rebate" }, // SOURCE: https://www.entergyarkansas.com/wp-content/uploads/2025/06/residential-program-manual.pdf
  ],
  DE: [
    { id: "de-green-energy-program-solar", name: "Delaware Green Energy Program Solar Grant", category: "solar", description: "DNREC grant of $0.80/watt for residential solar PV (up to 50 kW), capped at $10,000, for Delmarva Power customers who assign their SRECs to the state.", maxAmount: 10000, type: "grant" }, // SOURCE: https://documents.dnrec.delaware.gov/energy/services/GreenEnergy/Documents/DPL/GEP-Incentives.pdf
    { id: "de-green-energy-program-geothermal", name: "Delaware Green Energy Program Geothermal Grant", category: "heat-pump", description: "DNREC grant of $900 per ton for a residential geothermal (ground-source) heat pump, capped at $10,000, for Delmarva Power customers.", maxAmount: 10000, type: "grant" }, // SOURCE: https://documents.dnrec.delaware.gov/energy/services/GreenEnergy/Documents/DPL/GEP-Incentives.pdf
    { id: "de-energize-delaware-heat-pump-rebate", name: "Energize Delaware Heat Pump Rebate", category: "heat-pump", description: "Rebate of up to $1,400 for a qualifying high-efficiency air-source heat pump under Home Performance with ENERGY STAR.", maxAmount: 1400, type: "rebate" }, // SOURCE: https://energizedelaware.org/residential/residential-grants-rebates/
    { id: "de-energize-delaware-hpwh-rebate", name: "Energize Delaware Heat Pump Water Heater Rebate", category: "heat-pump", description: "Rebate of up to $1,100 for a qualifying heat-pump water heater under Home Performance with ENERGY STAR.", maxAmount: 1100, type: "rebate" }, // SOURCE: https://energizedelaware.org/residential/residential-grants-rebates/
    { id: "de-clean-vehicle-rebate", name: "Delaware Clean Vehicle Rebate", category: "ev", description: "DNREC rebate of $2,500 for a new battery-electric vehicle with base MSRP under $40,000 ($1,500 for $40,000-$50,000); apply within 90 days of purchase.", maxAmount: 2500, type: "rebate" }, // SOURCE: https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/
    { id: "de-clean-vehicle-rebate-used", name: "Delaware Clean Vehicle Rebate (Used EV)", category: "used-ev", description: "DNREC rebate of $2,500 for a used battery-electric vehicle with fair-market price of $40,000 or less; apply within 90 days of purchase.", maxAmount: 2500, type: "rebate" }, // SOURCE: https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/
  ],
  DC: [
    { id: "dc-solar-for-all", name: "DC Solar for All", category: "solar", description: "DOEE program providing income-qualified households (at or below 80% of area median income) a no-cost rooftop system or a community-solar subscription, targeting about 50% bill savings.", maxAmount: 0, type: "grant" }, // SOURCE: https://doee.dc.gov/solarforall
    { id: "dc-srec", name: "DC Solar Renewable Energy Credits (SREC)", category: "solar", description: "DC's strong solar RPS creates an SREC market where owners earn one tradable credit per MWh generated; early-2026 prices run roughly $350-$380 each.", maxAmount: 0, type: "rebate" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/5686
    { id: "dc-solar-property-tax-exemption", name: "DC Solar Property Tax Exemption", category: "solar", description: "The District exempts 100% of the added property value from an installed residential solar energy system.", maxAmount: 0, type: "exemption" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/5245
    { id: "dc-dcseu-heat-pump-rebate", name: "DCSEU Heat Pump Rebate", category: "heat-pump", description: "DC Sustainable Energy Utility rebates of $1,000-$1,500 for an electric-to-electric air-source or ductless heat pump, and $4,000-$5,000 for a gas-to-electric conversion.", maxAmount: 5000, type: "rebate" }, // SOURCE: https://www.dcseu.com/residential-rebates/heating-cooling
    { id: "dc-dcseu-hpwh-rebate", name: "DCSEU Heat Pump Water Heater Rebate", category: "heat-pump", description: "DCSEU rebates of $750-$1,000 for an electric-to-electric heat-pump water heater and $1,200-$1,600 for a gas-to-electric conversion.", maxAmount: 1600, type: "rebate" }, // SOURCE: https://www.dcseu.com/residential-rebates/heating-cooling
  ],
  FL: [
    { id: "fl-solar-sales-tax-exemption", name: "Florida Solar Sales Tax Exemption", category: "solar", description: "Solar energy systems and components are exempt from Florida's 6% sales and use tax (Fla. Stat. 212.08).", maxAmount: 0, type: "exemption" }, // SOURCE: https://floridarevenue.com/taxes/tips/documents/TIP_19A01-09.pdf
    { id: "fl-solar-property-tax-exemption", name: "Florida Solar Property Tax Exemption", category: "solar", description: "The added home value from a residential solar PV or battery system is 100% exempt from property-tax assessment (Fla. Stat. 193.624).", maxAmount: 0, type: "exemption" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/5426
    { id: "fl-jea-solar-rebate", name: "JEA Solar Incentive (Jacksonville)", category: "solar", description: "JEA offers residential customers $0.50 per watt for rooftop solar PV, up to $4,000. Municipal-utility program; JEA customers only.", maxAmount: 4000, type: "rebate" }, // SOURCE: https://www.jea.com/ways_to_save/residential_rebates/solar_battery_incentive_program/
    { id: "fl-jea-battery-rebate", name: "JEA Solar Battery Incentive (Jacksonville)", category: "battery-storage", description: "JEA offers a $4,000 rebate for a battery (6 kWh+) paired with rooftop solar. JEA customers only.", maxAmount: 4000, type: "rebate" }, // SOURCE: https://www.jea.com/ways_to_save/residential_rebates/solar_battery_incentive_program/
    { id: "fl-ouc-battery-rebate", name: "OUC Battery Storage Rebate (Orlando)", category: "battery-storage", description: "Orlando Utilities Commission offers $150 per kWh of storage, up to $2,000, for a battery paired with an interconnected solar system.", maxAmount: 2000, type: "rebate" }, // SOURCE: https://www.ouc.com/solutions-programs/savings/rebates/battery-storage/
    { id: "fl-jea-hpwh-rebate", name: "JEA Heat Pump Water Heater Rebate (Jacksonville)", category: "heat-pump", description: "JEA offers residential electric customers a $350 rebate for a qualifying heat-pump (hybrid) water heater.", maxAmount: 350, type: "rebate" }, // SOURCE: https://www.jea.com/residential_customers/residential_rebates/
    { id: "fl-ouc-ev-rebate", name: "OUC Electric Vehicle Rebate (Orlando)", category: "ev", description: "Orlando Utilities Commission offers a $200 bill-credit rebate for buying or leasing an eligible new or used EV (under $80,000). OUC customers only.", maxAmount: 200, type: "rebate" }, // SOURCE: https://www.ouc.com/solutions-programs/savings/rebates/electric-vehicle-purchase-lease/
  ],
  GA: [
    { id: "ga-georgia-power-heat-pump-rebate", name: "Georgia Power Heat Pump Rebate", category: "heat-pump", description: "Up to $1,000 for converting to a qualifying high-efficiency air-source heat pump, under the Home Energy Improvement Program. Georgia Power customers.", maxAmount: 1000, type: "rebate" }, // SOURCE: https://www.georgiapower.com/residential/save-money-and-energy/rebates-and-discounts.html
    { id: "ga-georgia-power-ev-charger-rebate", name: "Georgia Power EV Charger Rebate", category: "ev", description: "Rebate of up to $250 (instant via the Georgia Power Marketplace) for a Level 2 home EV charger, through Dec 31, 2026, subject to funding.", maxAmount: 250, type: "rebate" }, // SOURCE: https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html
  ],
  HI: [
    { id: "hi-retitc-solar-pv", name: "Hawaii Renewable Energy Technologies Income Tax Credit (Solar PV)", category: "solar", description: "State income-tax credit of 35% of a residential solar PV system cost, capped at $5,000 per system. Active for 2026; begins phasing down afterward.", maxAmount: 5000, type: "tax-credit" }, // SOURCE: https://energy.hawaii.gov/retitc/
    { id: "hi-retitc-solar-water-heating", name: "Hawaii RETITC (Solar Water Heating)", category: "heat-pump", description: "State income-tax credit of 35% of a residential solar water-heating system cost, capped at $2,250 per system.", maxAmount: 2250, type: "tax-credit" }, // SOURCE: https://energy.hawaii.gov/retitc/
    { id: "hi-hawaii-energy-hpwh-rebate", name: "Hawaii Energy Heat Pump Water Heater Rebate", category: "heat-pump", description: "Instant rebate of $500 (40-54 gal) or $700 (55-82 gal) for an ENERGY STAR heat-pump water heater for electric ratepayers (excludes Kauai).", maxAmount: 700, type: "rebate" }, // SOURCE: https://hawaiienergy.com/for-homes/rebates/water-heating/
  ],
  ID: [
    { id: "id-residential-alternative-energy-deduction", name: "Idaho Residential Alternative Energy Tax Deduction", category: "solar", description: "State income-tax DEDUCTION (not a credit) for solar, wind, or geothermal: 40% of cost the first year then 20% for three years, capped at $5,000/year and $20,000 total (Idaho Code 63-3022C).", maxAmount: 0, type: "tax-credit" }, // SOURCE: https://legislature.idaho.gov/statutesrules/idstat/title63/t63ch30/sect63-3022c/
    { id: "id-idaho-power-heat-pump-rebate", name: "Idaho Power Ductless Heat Pump Rebate", category: "heat-pump", description: "$400 rebate for a qualifying ductless heat pump when converting from electric baseboard or forced-air heat in an existing home.", maxAmount: 400, type: "rebate" }, // SOURCE: https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/ductless-heat-pump-existing-homes/
    { id: "id-idaho-power-hpwh-rebate", name: "Idaho Power Heat Pump Water Heater Rebate", category: "heat-pump", description: "$300 rebate for a qualifying (NEEA Tier 2+) heat-pump water heater replacing an electric resistance tank.", maxAmount: 300, type: "rebate" }, // SOURCE: https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/heat-pump-water-heater/
  ],
  IN: [
    { id: "in-aes-indiana-heat-pump-rebate", name: "AES Indiana Heat Pump Rebate", category: "heat-pump", description: "Rebates of $275-$725 for a qualifying air-source or mini-split heat pump, based on efficiency. AES Indiana customers using a network contractor.", maxAmount: 725, type: "rebate" }, // SOURCE: https://www.aesindiana.com/home-improvement-rebates
    { id: "in-aes-indiana-hpwh-rebate", name: "AES Indiana Heat Pump Water Heater Rebate", category: "heat-pump", description: "$600 rebate for a qualifying heat-pump water heater. AES Indiana customers using a network contractor.", maxAmount: 600, type: "rebate" }, // SOURCE: https://www.aesindiana.com/home-improvement-rebates
  ],
  IA: [
    { id: "ia-solar-sales-tax-exemption", name: "Iowa Solar Sales Tax Exemption", category: "solar", description: "Solar energy equipment (panels, inverters, solar shingles) is exempt from Iowa sales and use tax (Iowa Code 423.3(90)).", maxAmount: 0, type: "exemption" }, // SOURCE: https://www.legis.iowa.gov/docs/code/423.3.pdf
    { id: "ia-renewable-energy-property-tax-exemption", name: "Iowa Renewable Energy Property Tax Exemption", category: "solar", description: "The added market value of a solar or wind system is exempt from property tax for five assessment years (Iowa Code 441.21(8)).", maxAmount: 0, type: "exemption" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/184
  ],
  KS: [
    { id: "ks-renewable-property-tax-exemption", name: "Kansas Renewable Energy Property Tax Exemption", category: "solar", description: "The added value of residential renewable-energy property, including solar PV, is exempt from property tax for 10 years (K.S.A. 79-201 Eleventh).", maxAmount: 0, type: "exemption" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/75
    { id: "ks-evergy-heating-cooling-rebate", name: "Evergy Kansas Heating & Cooling Rebate", category: "heat-pump", description: "Residential rebates up to $1,000 for high-efficiency heating and cooling equipment, tiered by SEER2, for installs on or after Jan 1, 2026. Evergy Kansas customers.", maxAmount: 1000, type: "rebate" }, // SOURCE: https://www.evergy.com/ways-to-save/discounts-link/heating-and-cooling
  ],
  KY: [
    { id: "ky-lge-ku-heat-pump-rebate", name: "LG&E and KU Air Source Heat Pump Rebate", category: "heat-pump", description: "$400 rebate for a qualifying ENERGY STAR air-source or ductless heat pump for residential customers on eligible rate plans.", maxAmount: 400, type: "rebate" }, // SOURCE: https://lge-ku.com/residential-rebates
    { id: "ky-lge-ku-hpwh-rebate", name: "LG&E and KU Heat Pump Water Heater Rebate", category: "heat-pump", description: "$300 rebate for a qualifying ENERGY STAR heat-pump water heater for residential customers on eligible rate plans.", maxAmount: 300, type: "rebate" }, // SOURCE: https://lge-ku.com/residential-rebates
  ],
  LA: [
    { id: "la-solar-property-tax-exemption", name: "Louisiana Solar Property Tax Exemption", category: "solar", description: "Solar energy equipment on owner-occupied homes is classified as exempt personal property and not counted in ad valorem (property) tax (La. R.S. 47:1706).", maxAmount: 0, type: "exemption" }, // SOURCE: https://legis.la.gov/Legis/Law.aspx?p=y&d=101337
  ],
  MI: [
    { id: "mi-dte-heat-pump-rebate", name: "DTE Energy Heat Pump Rebate", category: "heat-pump", description: "Up to $1,200 for a qualifying cold-climate air-source, ground-source, or ductless heat pump, tiered by efficiency. DTE Energy residential customers.", maxAmount: 1200, type: "rebate" }, // SOURCE: https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/air-conditioners.html
    { id: "mi-consumers-heating-cooling-rebate", name: "Consumers Energy Heating & Cooling Rebate", category: "heat-pump", description: "Residential rebates on qualifying high-efficiency heat pumps and heat-pump water heaters, valid through Dec 31, 2026. Consumers Energy customers.", maxAmount: 0, type: "rebate" }, // SOURCE: https://www.consumersenergy.com/residential/save-money-and-energy/rebates/heating-and-cooling
  ],
  MS: [
    { id: "ms-entergy-heat-pump-rebate", name: "Entergy Mississippi Heat Pump Rebate", category: "heat-pump", description: "Up to $1,100 for a qualifying high-efficiency ENERGY STAR heat pump (tiered $500/$750/$1,100). Entergy Mississippi customers.", maxAmount: 1100, type: "rebate" }, // SOURCE: https://www.entergymississippi.com/energyefficiency/residential/heating-cooling
    { id: "ms-mississippi-power-hpwh-rebate", name: "Mississippi Power Heat Pump Water Heater Rebate", category: "heat-pump", description: "$350 rebate for a qualifying heat-pump water heater. Mississippi Power customers.", maxAmount: 350, type: "rebate" }, // SOURCE: https://www.mississippipower.com/residential/ways-to-save/rebates---incentives.html
  ],
  MO: [
    { id: "mo-evergy-solar-rebate", name: "Evergy Missouri Solar Rebate", category: "solar", description: "Statutory solar rebate of $0.25 per watt of installed capacity for Missouri residential customers of Evergy.", maxAmount: 0, type: "rebate" }, // SOURCE: https://www.evergy.com/help-center/saving-energy-at-home/what-is-the-solar-power-rebate
    { id: "mo-ameren-air-source-heat-pump-rebate", name: "Ameren Missouri Air Source Heat Pump Rebate", category: "heat-pump", description: "Up to $2,000 for a qualifying air-source heat pump (15.2 SEER2+); rebates valid through Dec 31, 2026 while funding lasts. Ameren Missouri customers.", maxAmount: 2000, type: "rebate" }, // SOURCE: https://www.callsmarthouse.com/best-hvac-deals-ameren-fasttrack-tax-credits/
    { id: "mo-ameren-geothermal-heat-pump-rebate", name: "Ameren Missouri Geothermal Heat Pump Rebate", category: "heat-pump", description: "Up to $5,000 for a qualifying ground-source (geothermal) heat pump (23 EER2+); valid through Dec 31, 2026 while funding lasts. Ameren Missouri customers.", maxAmount: 5000, type: "rebate" }, // SOURCE: https://www.callsmarthouse.com/best-hvac-deals-ameren-fasttrack-tax-credits/
  ],
  MT: [
    { id: "mt-aerlp-loan", name: "Montana Alternative Energy Revolving Loan Program", category: "solar", description: "Montana DEQ low-interest loan of up to $40,000 (fixed 3.5% for 2026, up to 10-year term) for residential solar, solar thermal, or ground-source heat pumps.", maxAmount: 40000, type: "loan" }, // SOURCE: https://deq.mt.gov/energy/Programs/AERLP
    { id: "mt-renewable-energy-property-tax-exemption", name: "Montana Renewable Energy Property Tax Exemption", category: "solar", description: "The assessed value of a residential non-fossil energy system (up to $20,000 for a single-family home) is exempt from property tax for 10 years.", maxAmount: 0, type: "exemption" }, // SOURCE: https://deq.mt.gov/energy/Programs/tax-credits
  ],
  NE: [
    { id: "ne-oppd-solar-rebate", name: "OPPD Residential Solar Rebate (Omaha)", category: "solar", description: "Omaha Public Power District offers a one-time $2,000 rebate for a qualifying solar PV system installed through an OPPD Solar Trade Ally.", maxAmount: 2000, type: "rebate" }, // SOURCE: https://www.oppd.com/residential/residential-rates/customer-owned-generation/solar-rebate-program/
    { id: "ne-nppd-air-source-heat-pump", name: "NPPD EnergyWise Air-Source Heat Pump Incentive", category: "heat-pump", description: "Tiered residential incentives of $400-$1,200 for a qualifying air-source heat pump used primarily for space heating. NPPD EnergyWise communities.", maxAmount: 1200, type: "rebate" }, // SOURCE: https://nppd.energywisenebraska.com/residential/
    { id: "ne-nppd-geothermal-heat-pump", name: "NPPD EnergyWise Geothermal Heat Pump Incentive", category: "heat-pump", description: "Residential incentives of $2,400 (standard) to $3,300 (variable-capacity) for a qualifying geothermal heat pump. NPPD EnergyWise communities.", maxAmount: 3300, type: "rebate" }, // SOURCE: https://nppd.energywisenebraska.com/residential/
    { id: "ne-nppd-ev-charger-rebate", name: "NPPD goEV Home Charger Rebate", category: "ev", description: "50% of installation cost up to $500 for a qualifying Level 2 home EV charger, plus a separate make-ready incentive. NPPD customers.", maxAmount: 500, type: "rebate" }, // SOURCE: https://nppd.energywisenebraska.goev.com/residential-incentives/
  ],
  NV: [
    { id: "nv-energy-ev-charging-incentive", name: "NV Energy Residential EV Charging Incentive", category: "ev", description: "$100 per port (up to $500 for income-qualified customers) toward a Level 2 smart charger, with a managed-charging commitment. NV Energy customers.", maxAmount: 500, type: "rebate" }, // SOURCE: https://www.nvenergy.com/cleanenergy/electric-vehicles/ev-charging-incentives
  ],
  NH: [
    { id: "nh-eversource-battery-rebate", name: "Eversource NH Home Battery Storage Rebate", category: "battery-storage", description: "One-time rebate of $230 per usable kWh, up to $3,000, for a qualifying home battery enrolled in the demand-response program for three years. Funded by the NH Clean Energy Fund.", maxAmount: 3000, type: "rebate" }, // SOURCE: https://www.eversource.com/residential/save-money-energy/energy-efficiency-programs/demand-response/nhcef-home-battery
    { id: "nh-local-solar-property-tax-exemption", name: "New Hampshire Local Solar Property Tax Exemption", category: "solar", description: "Municipalities may exempt the added assessed value of a residential solar system from local property tax (RSA 72:61-72); roughly two-thirds of towns have adopted it.", maxAmount: 0, type: "exemption" }, // SOURCE: NH RSA 72:61-72
  ],
  NM: [
    { id: "nm-solar-market-development-credit", name: "New Mexico Solar Market Development Tax Credit", category: "solar", description: "Refundable state income-tax credit of 10% of a residential solar PV or thermal system cost, capped at $6,000, with a 5-year carryforward.", maxAmount: 6000, type: "tax-credit" }, // SOURCE: https://www.emnrd.nm.gov/ecmd/tax-incentives/solar-market-development-tax-credit-smdtc/
    { id: "nm-clean-car-tax-credit-new-ev", name: "New Mexico Clean Car Tax Credit (New EV)", category: "ev", description: "Income-tax credit of up to $3,000 for a new EV (MSRP $55,000 or less); available for vehicles acquired through Dec 31, 2029. Excess is refundable.", maxAmount: 3000, type: "tax-credit" }, // SOURCE: https://clean.energy.nm.gov/clean-car-state-tax-credit/
    { id: "nm-clean-car-tax-credit-used-ev", name: "New Mexico Clean Car Tax Credit (Used EV)", category: "used-ev", description: "Income-tax credit of up to $2,500 for a used EV (market value $25,000 or less); available through Dec 31, 2029. Excess is refundable.", maxAmount: 2500, type: "tax-credit" }, // SOURCE: https://clean.energy.nm.gov/clean-car-state-tax-credit/
    { id: "nm-sbtc-heat-pump", name: "New Mexico Heat Pump Tax Credit", category: "heat-pump", description: "Sustainable Building Tax Credit of $1,000 per air- or ground-source heat pump in an existing home ($2,000 for low-income taxpayers); through 2027.", maxAmount: 1000, type: "tax-credit" }, // SOURCE: https://clean.energy.nm.gov/heat-pump-incentives/
    { id: "nm-sbtc-hpwh", name: "New Mexico Heat Pump Water Heater Tax Credit", category: "heat-pump", description: "Tax credit of 50% of a heat-pump water heater cost up to $350 (100% up to $700 for low-income taxpayers); through 2027.", maxAmount: 350, type: "tax-credit" }, // SOURCE: https://clean.energy.nm.gov/heat-pump-water-heater-incentives/
  ],
  NC: [
    { id: "nc-duke-powerpair", name: "Duke Energy PowerPair (Solar + Battery)", category: "battery-storage", description: "Upfront incentive of $0.36/W-AC for solar (up to $3,600) plus $400/kWh for paired storage (up to $5,400), capped at $9,000, for a same-time solar-plus-battery install. Enrollment is capacity-limited (waitlist in 2026).", maxAmount: 9000, type: "rebate" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/22607/duke-energy-powerpair
    { id: "nc-solar-property-tax-abatement", name: "North Carolina Solar Property Tax Abatement", category: "solar", description: "80% of the appraised value of a residential solar electric system is excluded from property tax (G.S. 105-275(45)).", maxAmount: 0, type: "exemption" }, // SOURCE: https://programs.dsireusa.org/system/program/detail/3036
  ],
  ND: [
    { id: "nd-renewable-property-tax-exemption", name: "North Dakota Solar/Wind/Geothermal Property Tax Exemption", category: "solar", description: "Locally-assessed solar, wind, or geothermal devices are exempt from local property tax for the 5 years following installation; apply annually to the local assessor.", maxAmount: 0, type: "exemption" }, // SOURCE: https://www.tax.nd.gov/solar-wind-or-geothermal-device-property-tax-exemption
  ],
  OH: [
    { id: "oh-aep-help", name: "AEP Ohio HELP Heat Pump Program", category: "heat-pump", description: "Income-qualified AEP Ohio program (households at or under ~150% of the federal poverty level) offering heat-pump upgrades of roughly $800 per system.", maxAmount: 800, type: "rebate" }, // SOURCE: https://homeenergybasics.com/heat-pumps/states/oh
  ],
  OK: [],
  SC: [
    { id: "sc-solar-energy-tax-credit", name: "South Carolina Solar Energy Tax Credit", category: "solar", description: "State income-tax credit of 25% of a solar, solar water-heating, or geothermal system cost, capped at $3,500 per year (or 50% of tax liability), with a 10-year carryforward (SC Code 12-6-3587).", maxAmount: 3500, type: "tax-credit" }, // SOURCE: https://law.justia.com/codes/south-carolina/title-12/chapter-6/section-12-6-3587/
    { id: "sc-solar-property-tax-exemption", name: "South Carolina Solar Property Tax Exemption", category: "solar", description: "Residential solar systems are exempt from property tax on the added home value, so installing solar does not raise your property tax bill.", maxAmount: 0, type: "exemption" }, // SOURCE: https://www.energysage.com/local-data/solar-rebates-incentives/sc/
  ],
  SD: [
    { id: "sd-renewable-property-tax-exemption", name: "South Dakota Renewable Energy Property Tax Exemption", category: "solar", description: "Renewable systems under 5 MW receive a property-tax exemption on the first $50,000 or 70% of assessed value, whichever is greater (SDCL 10-4-44).", maxAmount: 0, type: "exemption" }, // SOURCE: https://puc.sd.gov/energyefficiency/default.aspx
  ],
  TN: [
    { id: "tn-green-energy-property-tax-assessment", name: "Tennessee Green Energy Property Tax Assessment", category: "solar", description: "Certified green-energy systems are assessed at a reduced value (about 12.5% of installed cost for solar), lowering the property-tax impact of installing a system.", maxAmount: 0, type: "exemption" }, // SOURCE: https://openei.org/wiki/Green_Energy_Property_Tax_Assessment_(Tennessee)
    { id: "tn-tva-energyright-heat-pump-rebate", name: "TVA EnergyRight Heat Pump Rebate", category: "heat-pump", description: "Up to $800 for a qualifying air-source or dual-fuel heat pump (17 SEER2+), delivered through local power companies via a Quality Contractor Network member.", maxAmount: 800, type: "rebate" }, // SOURCE: https://energyright.com/residential/rebates/heat-pump/
  ],
  TX: [
    { id: "tx-solar-property-tax-exemption", name: "Texas Solar Property Tax Exemption", category: "solar", description: "The added home value from a solar or wind energy device is 100% exempt from property tax (Tax Code 11.27); file Form 50-123 with the county appraisal district.", maxAmount: 0, type: "exemption" }, // SOURCE: https://comptroller.texas.gov/taxes/property-tax/exemptions/
    { id: "tx-austin-energy-solar-rebate", name: "Austin Energy Solar Rebate", category: "solar", description: "Up to $4,000 for a qualifying home solar PV system installed by a participating contractor, after a solar education course. Austin Energy customers only.", maxAmount: 4000, type: "rebate" }, // SOURCE: https://austinenergy.com/green-power/solar-solutions/for-your-home
    { id: "tx-oncor-solar-battery-incentive", name: "Oncor Take a Load Off Texas Solar + Storage", category: "battery-storage", description: "Incentive for residential solar PV installed with a battery (battery required), passed through as a discount and varying by system size; roughly $9,000 combined maximum. Oncor service area, seasonal and funding-limited.", maxAmount: 9000, type: "rebate" }, // SOURCE: https://www.oncor.com/content/oncorwww/talot/en/home/get-started/residential/residentialsolar.html
    { id: "tx-cps-energy-heat-pump-rebate", name: "CPS Energy Heat Pump Rebate (San Antonio)", category: "heat-pump", description: "Residential rebates of $90-$310 per ton for a qualifying heat pump based on efficiency. CPS Energy customers.", maxAmount: 1550, type: "rebate" }, // SOURCE: https://resi-savenow.cpsenergy.com/cps-energy/en/savings/hvac-rebates/
  ],
  UT: [
    { id: "ut-evrap-ev-replacement", name: "Utah EV Replacement Assistance Program (EVRAP)", category: "ev", description: "Income-qualified assistance of up to $10,000 (tiered by income) to replace an older high-polluting vehicle with a new or used EV priced up to $48,125. Availability varies by county.", maxAmount: 10000, type: "rebate" }, // SOURCE: https://deq.utah.gov/air-quality/electric-vehicle-replacement-assistance-program-evrap
    { id: "ut-renewable-energy-tax-credit-geothermal", name: "Utah Renewable Energy Systems Tax Credit (Geothermal)", category: "heat-pump", description: "Non-refundable state income-tax credit of 25% up to $2,000 for a residential geothermal (ground-source) heat pump; expires for systems placed in service after Jan 1, 2028.", maxAmount: 2000, type: "tax-credit" }, // SOURCE: https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/
    { id: "ut-rmp-wattsmart-heat-pump", name: "Rocky Mountain Power Wattsmart Heat Pump Rebate", category: "heat-pump", description: "Up to $1,600 cash back for a qualifying air-source heat pump (up to $1,450 for dual-fuel) in an existing home. Rocky Mountain Power Utah customers.", maxAmount: 1600, type: "rebate" }, // SOURCE: https://wattsmarthomes.com/rebate-categories/heating-and-cooling/
    { id: "ut-rmp-wattsmart-hpwh", name: "Rocky Mountain Power Heat Pump Water Heater Rebate", category: "heat-pump", description: "$350 rebate for a qualifying heat-pump water heater replacing an electric or gas storage water heater. Rocky Mountain Power Utah customers.", maxAmount: 350, type: "rebate" }, // SOURCE: https://wattsmarthomes.com/rebates/heat-pump-water-heaters-ut/
  ],
  VA: [
    { id: "va-net-metering", name: "Virginia Net Metering", category: "solar", description: "Dominion Energy and Appalachian Power residential solar customers receive full retail-rate bill credits for exported electricity (systems up to 25 kW); 1:1 structure preserved by an April 2026 SCC ruling.", maxAmount: 0, type: "exemption" }, // SOURCE: https://www.energysage.com/local-data/solar-rebates-incentives/va/
    { id: "va-solar-property-tax-exemption", name: "Virginia Local Solar Property Tax Exemption", category: "solar", description: "Localities may exempt certified residential solar equipment up to 25 kW from local property tax (Va. Code 58.1-3661); many jurisdictions offer a full exemption.", maxAmount: 0, type: "exemption" }, // SOURCE: https://law.lis.virginia.gov/vacode/title58.1/chapter36/section58.1-3661/
    { id: "va-dominion-hpwh-rebate", name: "Dominion Energy Virginia Heat Pump Water Heater Rebate", category: "heat-pump", description: "Rebate of $250 (40-59 gal) or $400 (60+ gal) for a qualifying ENERGY STAR heat-pump water heater replacing an electric unit. Dominion residential customers.", maxAmount: 400, type: "rebate" }, // SOURCE: https://www.domsavings.com/home-program/water-energy-rebate
  ],
  WV: [
    { id: "wv-net-metering", name: "West Virginia Net Metering", category: "solar", description: "Appalachian Power and Mon Power must offer residential net metering for systems up to 25 kW, crediting exported solar against consumption.", maxAmount: 0, type: "exemption" }, // SOURCE: https://www.energysage.com/local-data/solar-rebates-incentives/wv/
  ],
  WI: [
    { id: "wi-focus-on-energy-solar", name: "Focus on Energy Solar Rebate", category: "solar", description: "Prescriptive rebate of $600 per kW of residential solar PV, up to $2,400 per household, for 2026 installs (first-come, first-served). Participating Wisconsin utilities.", maxAmount: 2400, type: "rebate" }, // SOURCE: https://focusonenergy.com/residential/solar-for-homes
    { id: "wi-focus-on-energy-air-source-heat-pump", name: "Focus on Energy Air-Source Heat Pump Discount", category: "heat-pump", description: "Instant discounts of roughly $400-$900 on qualifying residential air-source heat pumps at participating distributors. Participating Wisconsin utilities.", maxAmount: 900, type: "rebate" }, // SOURCE: https://focusonenergy.com/residential/heating-and-cooling
    { id: "wi-focus-on-energy-geothermal", name: "Focus on Energy Geothermal Heat Pump Rebate", category: "heat-pump", description: "Mail-in rebate of $1,000 (homes with gas service) or $750 (without) for a certified residential geothermal heat pump. Participating Wisconsin utilities.", maxAmount: 1000, type: "rebate" }, // SOURCE: https://focusonenergy.com/residential/heating-and-cooling
    { id: "wi-focus-on-energy-hpwh", name: "Focus on Energy Heat Pump Water Heater Discount", category: "heat-pump", description: "Instant discount of at least $300 on a qualifying heat-pump water heater (UEF 3.3+) at participating distributors. Participating Wisconsin utilities.", maxAmount: 300, type: "rebate" }, // SOURCE: https://focusonenergy.com/residential/heating-and-cooling
  ],
  WY: [
    { id: "wy-net-metering", name: "Wyoming Net Metering", category: "solar", description: "Utilities must offer net metering for systems up to 25 kW; monthly excess is credited and any year-end net excess is purchased at the avoided-cost rate (WY Stat. Title 37, Ch. 16).", maxAmount: 0, type: "exemption" }, // SOURCE: https://law.justia.com/codes/wyoming/title-37/chapter-16/article-1/
    { id: "wy-rmp-wattsmart-heat-pump", name: "Rocky Mountain Power Wattsmart Heat Pump Rebate", category: "heat-pump", description: "Up to $1,700 cash back for a qualifying air-source heat pump (up to $2,000 for dual-fuel) in an existing home. Rocky Mountain Power Wyoming customers.", maxAmount: 1700, type: "rebate" }, // SOURCE: https://wattsmarthomes.com/rebate-categories/heating-and-cooling/
  ],
};
