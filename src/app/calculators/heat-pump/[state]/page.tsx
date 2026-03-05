import { StateCalculatorPage } from "@/components/seo/state-calculator-page";
import { stateStaticParams, generateStatePageMetadata } from "@/lib/state-pages";

export function generateStaticParams() {
  return stateStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  return generateStatePageMetadata(await params, "heat-pump");
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  return <StateCalculatorPage calculator="heat-pump" stateSlug={state} />;
}
