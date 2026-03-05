/** @type {import('next-sitemap').IConfig} */
// Always use production URL for sitemap/robots generation.
// NEXT_PUBLIC_SITE_URL may be localhost during local dev, but
// robots.txt and sitemap must always reference the production domain.
const siteUrl = "https://gogreencalc.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow AI crawlers for answer engine optimization
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    additionalSitemaps: [],
  },
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === "/") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Calculator pages get high priority
    if (path.startsWith("/calculators/") && path !== "/calculators") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Calculators index
    if (path === "/calculators") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Default
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
