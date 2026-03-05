import { StateCalculatorPage } from "@/components/seo/state-calculator-page";
import { stateStaticParams, generateStatePageMetadata } from "@/lib/state-pages";

export function generateStaticParams() {
  return stateStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  return generateStatePageMetadata(await params, "solar-payback");
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  return <StateCalculatorPage calculator="solar-payback" stateSlug={state} />;
}
