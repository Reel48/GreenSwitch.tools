export function ArticleSchema({
  title,
  description,
  datePublished,
  url,
}: {
  title: string;
  description: string;
  datePublished: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: "GoGreenCalc",
      url: "https://gogreencalc.tools",
    },
    publisher: {
      "@type": "Organization",
      name: "GoGreenCalc",
      url: "https://gogreencalc.tools",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gogreencalc.tools${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
