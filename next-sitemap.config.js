/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rotazap.ru",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  noindex: false,

  // Полный контроль над URL
  transform: async (config, path) => {
    const disallowed = [
      "/admin",
      "/office",
      "/forgot-password",
      "/reset-password",
      "/confirmation"
    ];

    // Игнорируем все маршруты, начинающиеся с запрещённых префиксов
    if (disallowed.some(dis => path.startsWith(dis))) {
      return null;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString()
    };
  },

  robotsTxtOptions: {
    policies: [],
    additionalRobotsTxt: `
User-agent: *

Allow: /auth
Allow: /info/

Disallow: /admin
Disallow: /office
Disallow: /forgot-password
Disallow: /reset-password
Disallow: /confirmation

Host: https://rotazap.ru
Sitemap: https://rotazap.ru/sitemap.xml
    `.trim()
  }
};
