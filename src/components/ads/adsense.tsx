import Script from "next/script";

export function AdSense() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8588626535470507"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
