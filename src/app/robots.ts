export default function robots() {
  return {
    rules: {
      userAgent: "Baiduspider",
      disallow: "/",
      "User-agent": "*",
      "Crawl-delay": 10,
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    sitemap_south: `${process.env.NEXT_PUBLIC_BACKEND_URL}/sitemap_south.xml`,
  };
}
