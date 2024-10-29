export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/*?*",
      },
      {
        userAgent: "*",
        disallow: "/search",
      },
      {
        userAgent: "*",
        disallow: "/account",
      },
      {
        userAgent: "*",
        disallow: "/cart",
      },
      {
        userAgent: "*",
        disallow: "/auth",
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    sitemap_south: `${process.env.NEXT_PUBLIC_BACKEND_URL}/sitemap_south.xml`,
  };
}
