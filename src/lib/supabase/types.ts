export type ElectricityRate = {
  id: string;
  state_code: string;
  state_name: string;
  avg_rate_kwh: number;
  residential_rate_kwh: number;
  tou_off_peak_kwh: number | null;
  tou_on_peak_kwh: number | null;
  avg_monthly_bill: number;
  updated_at: string;
};

export type VehicleSpec = {
  id: string;
  make: string;
  model: string;
  year: number;
  type: "ev" | "phev" | "gas" | "hybrid";
  msrp: number;
  ev_range_miles: number | null;
  kwh_per_100_miles: number | null;
  mpg_combined: number | null;
  annual_maintenance: number;
  battery_kwh: number | null;
  federal_tax_credit: number;
  eligible_for_credit: boolean;
  msrp_cap: number | null;
  updated_at: string;
};

export type Incentive = {
  id: string;
  state_code: string;
  category: "ev" | "solar" | "heat_pump" | "battery_storage";
  name: string;
  type: "tax_credit" | "rebate" | "exemption" | "grant";
  amount: number;
  is_percentage: boolean;
  max_amount: number | null;
  income_limit_single: number | null;
  income_limit_joint: number | null;
  msrp_cap: number | null;
  description: string;
  source_url: string | null;
  expires_at: string | null;
  updated_at: string;
};

export type SolarData = {
  id: string;
  state_code: string;
  state_name: string;
  avg_sun_hours: number;
  cost_per_watt: number;
  avg_system_size_kw: number;
  net_metering: boolean;
  srec_value: number | null;
  avg_annual_production_kwh_per_kw: number;
  updated_at: string;
};

export type FuelPrice = {
  id: string;
  state_code: string;
  state_name: string;
  gas_regular: number;
  gas_premium: number;
  diesel: number;
  natural_gas_therm: number;
  propane_gallon: number;
  heating_oil_gallon: number | null;
  updated_at: string;
};

export type ClimateZone = {
  id: string;
  state_code: string;
  state_name: string;
  iecc_zone: string;
  heating_degree_days: number;
  cooling_degree_days: number;
  heat_pump_cop_heating: number;
  heat_pump_cop_cooling: number;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      electricity_rates: {
        Row: ElectricityRate;
        Insert: Omit<ElectricityRate, "id" | "updated_at">;
        Update: Partial<Omit<ElectricityRate, "id">>;
      };
      vehicle_specs: {
        Row: VehicleSpec;
        Insert: Omit<VehicleSpec, "id" | "updated_at">;
        Update: Partial<Omit<VehicleSpec, "id">>;
      };
      incentives: {
        Row: Incentive;
        Insert: Omit<Incentive, "id" | "updated_at">;
        Update: Partial<Omit<Incentive, "id">>;
      };
      solar_data: {
        Row: SolarData;
        Insert: Omit<SolarData, "id" | "updated_at">;
        Update: Partial<Omit<SolarData, "id">>;
      };
      fuel_prices: {
        Row: FuelPrice;
        Insert: Omit<FuelPrice, "id" | "updated_at">;
        Update: Partial<Omit<FuelPrice, "id">>;
      };
      climate_zones: {
        Row: ClimateZone;
        Insert: Omit<ClimateZone, "id" | "updated_at">;
        Update: Partial<Omit<ClimateZone, "id">>;
      };
    };
  };
};
