export default function robots() {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "googlebot-image",
        allow: "/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      {
        userAgent: "googlebot-mobile",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Yandex",
        disallow: "/",
      },
      {
        userAgent: "*",
        disallow: [
          "/*?*",
          "/search*",
          "/account*",
          "/cart*",
          "/auth*",
          "*?brand=*",
          "*?filters*",
          "*?sort=*",
          "*?srsltid*",
        ],
        allow: "/",
      },
    ],
    sitemap: [
      `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sitemap_products_categories.xml`,
    ],
  };
}
