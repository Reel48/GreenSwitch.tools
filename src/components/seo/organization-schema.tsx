export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://gogreencalc.com/#organization",
        name: "GoGreenCalc",
        url: "https://gogreencalc.com",
        description:
          "Free calculators to help you make smarter clean energy decisions with real data.",
      },
      {
        "@type": "WebSite",
        "@id": "https://gogreencalc.com/#website",
        url: "https://gogreencalc.com",
        name: "GoGreenCalc",
        publisher: {
          "@id": "https://gogreencalc.com/#organization",
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
