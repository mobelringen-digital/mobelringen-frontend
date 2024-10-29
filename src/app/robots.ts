export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/*?*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/search",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/account",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/cart",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/auth",
        allow: "/",
      },
    ],
    sitemap: [
      `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sitemap_south.xml`,
    ],
  };
}
