import React from "react";

import { Page } from "@/modules/page";
import { PageQueryDocument } from "@/queries/page.queries";
import { PagesQuery, PagesQueryVariables } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";


async function getPage() {
  return await baseHygraphClient.request<PagesQuery, PagesQueryVariables>(
    PageQueryDocument,
    {
      url: "/",
    },
  );
}

export default async function Home() {
  const data = await getPage();

  return <Page data={data} />;
}
