import React from "react";

import { Metadata } from "next";

import { Page } from "@/modules/page";
import { formatMetaTitle } from "@/utils/helpers";

import { getPage } from "./[...url]/actions";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage({ where: { url: "/" } });

  if (page) {
    return {
      title: formatMetaTitle(page?.seo?.metaTitle),
      description: page.seo?.metaDescription,
    };
  }

  return {
    title: "Møbelringen",
  };
}

export default async function Home() {
  const data = await getPage({ where: { url: "/" } });

  return <Page data={data} />;
}
