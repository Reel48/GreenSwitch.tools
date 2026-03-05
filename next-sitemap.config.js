/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://gogreencalc.tools",
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
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
