export default function robots() {
  return {
    rules: {
      userAgent: "Baiduspider",
      disallow: "/",
      "User-agent": "*",
      "Crawl-delay": 10,
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
