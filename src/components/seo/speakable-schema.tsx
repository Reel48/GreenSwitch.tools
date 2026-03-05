/**
 * SpeakableSpecification schema for Answer Engine Optimization (AEO).
 *
 * Tells AI assistants and voice search which parts of the page contain
 * the key extractable answers. Uses CSS selectors to target content.
 */
export function SpeakableSchema({
  url,
  cssSelectors,
}: {
  url: string;
  cssSelectors: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://gogreencalc.com${url}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
