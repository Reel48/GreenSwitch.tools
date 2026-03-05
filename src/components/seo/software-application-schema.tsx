interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `https://gogreencalc.tools${url}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@id": "https://gogreencalc.tools/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
