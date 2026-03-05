export function ArticleSchema({
  title,
  description,
  datePublished,
  url,
  keywords,
  wordCount,
}: {
  title: string;
  description: string;
  datePublished: string;
  url: string;
  keywords?: string[];
  wordCount?: number;
}) {
  const fullUrl = `https://gogreencalc.com${url}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
    ...(wordCount && { wordCount }),
    author: {
      "@type": "Organization",
      name: "GoGreenCalc",
      url: "https://gogreencalc.com",
    },
    publisher: {
      "@type": "Organization",
      name: "GoGreenCalc",
      url: "https://gogreencalc.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        "article h1",
        "article header p",
        "article .prose h2",
        "article .prose p:first-of-type",
      ],
    },
    about: {
      "@type": "Thing",
      name: "Clean energy cost savings",
      description:
        "Helping consumers calculate and compare costs for EVs, solar panels, heat pumps, and other clean energy technologies.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
