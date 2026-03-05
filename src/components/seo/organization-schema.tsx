export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://gogreencalc.tools/#organization",
        name: "GoGreenCalc",
        url: "https://gogreencalc.tools",
        description:
          "Free calculators to help you make smarter clean energy decisions with real data.",
      },
      {
        "@type": "WebSite",
        "@id": "https://gogreencalc.tools/#website",
        url: "https://gogreencalc.tools",
        name: "GoGreenCalc",
        publisher: {
          "@id": "https://gogreencalc.tools/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
