import React from "react";

import { Metadata } from "next";

import { Page } from "@/modules/page";
import { formatMetaTitle } from "@/utils/helpers";

import { getPage } from "./[...url]/actions";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPage(`/`);
  const page = data.pages[0];

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
  const data = await getPage("/");

  return <Page data={data} />;
}
