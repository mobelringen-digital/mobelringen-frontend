export default function robots() {
  const allowance =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "Production"
      ? { allow: "/" }
      : { disallow: "/" };

  return {
    rules: [
      {
        userAgent: "Googlebot",
        ...allowance,
      },
      {
        userAgent: "googlebot-image",
        ...allowance,
      },
      {
        userAgent: "DuckDuckBot",
        ...allowance,
      },
      {
        userAgent: "googlebot-mobile",
        ...allowance,
      },
      {
        userAgent: "Bingbot",
        ...allowance,
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
        ...allowance,
      },
    ],
    sitemap: [`${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`],
  };
}
