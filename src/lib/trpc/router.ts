import { z } from "zod";
import { router, publicProcedure } from "./init";

// Import static fallback data via dynamic imports
// These will resolve once the corresponding data files are created in src/data/
// Currently only src/data/states.ts exists; others will be added as the project grows

export const appRouter = router({
  rates: router({
    getByState: publicProcedure
      .input(z.object({ stateCode: z.string().length(2) }))
      .query(async ({ input }) => {
        const { electricityRates } = await import("@/data/electricity-rates");
        return electricityRates[input.stateCode] ?? null;
      }),
    getAll: publicProcedure.query(async () => {
      const { electricityRates } = await import("@/data/electricity-rates");
      return electricityRates;
    }),
  }),

  fuel: router({
    getByState: publicProcedure
      .input(z.object({ stateCode: z.string().length(2) }))
      .query(async ({ input }) => {
        const { fuelPrices } = await import("@/data/fuel-prices");
        return fuelPrices[input.stateCode] ?? null;
      }),
    getAll: publicProcedure.query(async () => {
      const { fuelPrices } = await import("@/data/fuel-prices");
      return fuelPrices;
    }),
  }),

  vehicles: router({
    getAll: publicProcedure
      .input(
        z
          .object({
            type: z.enum(["ev", "phev", "gas", "hybrid"]).optional(),
          })
          .optional(),
      )
      .query(async ({ input }) => {
        const { vehicles } = await import("@/data/vehicles");
        if (input?.type) {
          return vehicles.filter(
            (v: { type: string }) => v.type === input.type,
          );
        }
        return vehicles;
      }),
    getByMakeModel: publicProcedure
      .input(z.object({ make: z.string(), model: z.string() }))
      .query(async ({ input }) => {
        const { vehicles } = await import("@/data/vehicles");
        return (
          vehicles.find(
            (v: { make: string; model: string }) =>
              v.make.toLowerCase() === input.make.toLowerCase() &&
              v.model.toLowerCase() === input.model.toLowerCase(),
          ) ?? null
        );
      }),
  }),

  solar: router({
    getByState: publicProcedure
      .input(z.object({ stateCode: z.string().length(2) }))
      .query(async ({ input }) => {
        const { solarData } = await import("@/data/solar-data");
        return solarData[input.stateCode] ?? null;
      }),
  }),

  climate: router({
    getByState: publicProcedure
      .input(z.object({ stateCode: z.string().length(2) }))
      .query(async ({ input }) => {
        const { climateZones } = await import("@/data/climate-zones");
        return climateZones[input.stateCode] ?? null;
      }),
  }),

  incentives: router({
    getFederal: publicProcedure
      .input(
        z
          .object({
            category: z
              .enum(["ev", "solar", "heat_pump", "battery_storage"])
              .optional(),
          })
          .optional(),
      )
      .query(async ({ input }) => {
        const { federalIncentives } = await import("@/data/incentives");
        if (input?.category) {
          return federalIncentives.filter(
            (i: { category: string }) => i.category === input.category,
          );
        }
        return federalIncentives;
      }),
    getByState: publicProcedure
      .input(
        z.object({
          stateCode: z.string().length(2),
          category: z
            .enum(["ev", "solar", "heat_pump", "battery_storage"])
            .optional(),
        }),
      )
      .query(async ({ input }) => {
        const { stateIncentives } = await import("@/data/incentives");
        const stateData = stateIncentives[input.stateCode] ?? [];
        if (input.category) {
          return stateData.filter(
            (i: { category: string }) => i.category === input.category,
          );
        }
        return stateData;
      }),
  }),

  states: router({
    getAll: publicProcedure.query(async () => {
      const { states } = await import("@/data/states");
      return states;
    }),
  }),
});

export type AppRouter = typeof appRouter;
