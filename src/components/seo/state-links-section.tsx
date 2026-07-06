import Link from "next/link";
import { states } from "@/data/states";
import { calculatorInfo, type CalculatorSlug } from "@/lib/state-pages";

/**
 * "Browse by state" grid of links from a base calculator page to all 51
 * state-specific pages. Concentrates internal link equity on the state pages
 * that already rank. Pure/static — safe to render inside client pages.
 */
export function StateLinksSection({
  calculator,
}: {
  calculator: CalculatorSlug;
}) {
  const info = calculatorInfo[calculator];
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">
        {info.shortName} by State
      </h2>
      <p className="text-sm text-muted-foreground">
        Get {info.name.toLowerCase()} estimates with local rates and incentives
        for your state.
      </p>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {states.map((s) => (
          <Link
            key={s.code}
            href={`/calculators/${calculator}/${s.slug}`}
            className="block py-0.5 text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            {s.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
