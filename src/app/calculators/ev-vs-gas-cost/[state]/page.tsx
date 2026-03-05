import { StateCalculatorPage } from "@/components/seo/state-calculator-page";
import { stateStaticParams, generateStatePageMetadata } from "@/lib/state-pages";

export function generateStaticParams() {
  return stateStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  return generateStatePageMetadata(await params, "ev-vs-gas-cost");
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  return <StateCalculatorPage calculator="ev-vs-gas-cost" stateSlug={state} />;
}
