import React from "react";

import { Page } from "@/modules/page";
import { CmsPagesQueryDocument } from "@/queries/page.queries";
import { CmsPagesQuery, CmsPagesQueryVariables } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

async function getPage() {
  return await baseHygraphClient("GET").request<
    CmsPagesQuery,
    CmsPagesQueryVariables
  >(CmsPagesQueryDocument, {
    where: { url: "/" },
  });
}

export default async function Home() {
  const data = await getPage();

  return <Page data={data} />;
}
