import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SpeakableSchema } from "@/components/seo/speakable-schema";
import { AdUnit } from "@/components/ads/ad-unit";
import {
  getStateBySlug,
  getStateData,
  calculatorInfo,
  type CalculatorSlug,
} from "@/lib/state-pages";
import { getStateEditorial } from "@/lib/state-editorial";
import { states } from "@/data/states";
import { stateIncentives, federalIncentives } from "@/data/incentives";

interface Props {
  calculator: CalculatorSlug;
  stateSlug: string;
}

export function StateCalculatorPage({ calculator, stateSlug }: Props) {
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const info = calculatorInfo[calculator];
  const data = getStateData(state.code);
  const localIncentives = stateIncentives[state.code] ?? [];
  const categoryMap: Record<string, string> = {
    "ev-vs-gas-cost": "ev",
    "solar-payback": "solar",
    "ev-charging-cost": "ev",
    "heat-pump": "heat-pump",
    "ev-tax-credit": "ev",
    "battery-storage": "battery-storage",
  };
  const relevantCategory = categoryMap[calculator];
  const relevantFederal = federalIncentives.filter(
    (i) => i.category === relevantCategory || (i.category === "used-ev" && relevantCategory === "ev")
  );
  const relevantStateIncentives = localIncentives.filter(
    (i) => i.category === relevantCategory
  );
  const editorial = getStateEditorial(
    calculator,
    state.name,
    data,
    localIncentives
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: info.name, href: `/calculators/${calculator}` },
          { name: state.name, href: `/calculators/${calculator}/${state.slug}` },
        ]}
      />
      <SpeakableSchema
        url={`/calculators/${calculator}/${state.slug}`}
        cssSelectors={["h1", "h1 + p", "h2", "table"]}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {info.name} in {state.name}
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          {info.description(state.name)}
        </p>

        {/* Editorial content — unique per state + calculator */}
        {editorial.length > 0 && (
          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold">
              What {state.name} Residents Should Know
            </h2>
            {editorial.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>
        )}

        {/* Key data highlights */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.electricity && (
            <DataCard
              label="Avg. Electricity Rate"
              value={`$${data.electricity.rate.toFixed(3)}/kWh`}
              detail={`Avg. monthly bill: $${data.electricity.avgMonthlyBill}`}
            />
          )}
          {data.fuel && info.relevantDataKeys.includes("fuel") && (
            <DataCard
              label="Regular Gas Price"
              value={`$${data.fuel.gasRegular.toFixed(2)}/gal`}
              detail={`Natural gas: $${data.fuel.naturalGasTherm.toFixed(2)}/therm`}
            />
          )}
          {data.solar && info.relevantDataKeys.includes("solar") && (
            <DataCard
              label="Peak Sun Hours"
              value={`${data.solar.avgSunHours} hrs/day`}
              detail={`Solar cost: $${data.solar.costPerWatt.toFixed(2)}/watt`}
            />
          )}
          {data.climate && info.relevantDataKeys.includes("climate") && (
            <DataCard
              label="Heating Degree Days"
              value={data.climate.heatingDegreeDays.toLocaleString()}
              detail={`Cooling: ${data.climate.coolingDegreeDays.toLocaleString()} CDD`}
            />
          )}
          {data.electricity?.touOnPeak && (
            <DataCard
              label="TOU Peak Rate"
              value={`$${data.electricity.touOnPeak.toFixed(3)}/kWh`}
              detail={`Off-peak: $${data.electricity.touOffPeak?.toFixed(3)}/kWh`}
            />
          )}
          {data.solar?.netMetering !== undefined && info.relevantDataKeys.includes("solar") && (
            <DataCard
              label="Net Metering"
              value={data.solar.netMetering ? "Available" : "Not Available"}
              detail={
                data.solar.srecValue
                  ? `SREC value: $${data.solar.srecValue}/MWh`
                  : undefined
              }
            />
          )}
        </div>

        {/* Incentives */}
        {(relevantFederal.length > 0 || relevantStateIncentives.length > 0) && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              Available Incentives in {state.name}
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="pb-2 pr-4 font-medium">Incentive</th>
                    <th className="pb-2 pr-4 font-medium">Type</th>
                    <th className="pb-2 pr-4 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {relevantFederal.map((inc) => (
                    <tr key={inc.id}>
                      <td className="py-2 pr-4 font-medium">{inc.name}</td>
                      <td className="py-2 pr-4 capitalize">{inc.type.replace("-", " ")}</td>
                      <td className="py-2 pr-4">
                        {inc.percentageCovered
                          ? `${inc.percentageCovered}%`
                          : `$${inc.maxAmount.toLocaleString()}`}
                      </td>
                      <td className="py-2 text-muted-foreground">{inc.description}</td>
                    </tr>
                  ))}
                  {relevantStateIncentives.map((inc) => (
                    <tr key={inc.id}>
                      <td className="py-2 pr-4 font-medium">{inc.name}</td>
                      <td className="py-2 pr-4 capitalize">{inc.type.replace("-", " ")}</td>
                      <td className="py-2 pr-4">${inc.maxAmount.toLocaleString()}</td>
                      <td className="py-2 text-muted-foreground">{inc.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Ad: after incentives */}
        <AdUnit slot="STATE_MID_SLOT" className="mt-8" />

        {/* CTA */}
        <section className="mt-12 rounded-lg border bg-muted/30 p-6 text-center">
          <h2 className="text-xl font-semibold">
            Run the {info.shortName} Calculator
          </h2>
          <p className="mt-2 text-muted-foreground">
            Use our free calculator pre-filled with {state.name} data to see
            your personalized results.
          </p>
          <Link
            href={`/calculators/${calculator}`}
            className="mt-4 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Open Calculator
          </Link>
        </section>

        {/* Ad: before state links */}
        <AdUnit slot="STATE_BOTTOM_SLOT" className="mt-8" />

        {/* Other states */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            {info.shortName} by State
          </h2>
          <div className="mt-4 columns-2 gap-4 sm:columns-3 lg:columns-4">
            {states.map((s) => (
              <Link
                key={s.code}
                href={`/calculators/${calculator}/${s.slug}`}
                className={`block py-0.5 text-sm hover:underline ${
                  s.slug === stateSlug
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function DataCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      {detail && (
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      )}
    </div>
  );
}
