interface HowToStep {
  name: string;
  text: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  url: string;
  steps: HowToStep[];
  totalTime?: string;
}

export function HowToSchema({
  name,
  description,
  url,
  steps,
  totalTime = "PT5M",
}: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: `https://gogreencalc.com${url}`,
    totalTime,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    tool: {
      "@type": "HowToTool",
      name: "GoGreenCalc online calculator",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
