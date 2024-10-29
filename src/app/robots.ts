export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/*?*", "/search", "/account", "/cart", "/auth"],
        allow: "/",
      },
    ],
    sitemap: [
      `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sitemap_south.xml`,
    ],
  };
}
