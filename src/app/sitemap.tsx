import { CmsPagesQueryDocument } from "@/queries/page.queries";
import { CmsPagesQuery, CmsPagesQueryVariables } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

export default async function sitemap() {
  const pages = await baseHygraphClient("GET").request<
    CmsPagesQuery,
    CmsPagesQueryVariables
  >(CmsPagesQueryDocument, {
    where: {},
  });

  return pages.pages.map((page) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));
}
