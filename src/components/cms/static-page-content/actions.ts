"use server";

import { CmsPagesQueryDocument } from "@/queries/page.queries";
import { CmsPagesQuery, CmsPagesQueryVariables } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

export async function getPage(url: string) {
  return await baseHygraphClient("GET").request<
    CmsPagesQuery,
    CmsPagesQueryVariables
  >(CmsPagesQueryDocument, {
    where: {
      url,
    },
  });
}
