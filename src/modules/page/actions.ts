"use server";

import { CmsStaticPageConfigurationDocument, StaticPageType } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

export async function getStaticPageConfiguration(pageType: StaticPageType) {
  const data = await baseHygraphClient("GET").request(
    CmsStaticPageConfigurationDocument,
    {
      where: {
        pageType,
      },
    },
  );

  return data.staticPageConfiguration;
}
