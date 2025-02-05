import React from "react";

import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { MetaData } from "@/components/meta/MetaData";

import { CmsPageContent, getPage } from "../../../app/[...url]/actions";

interface Props {
  url: string;
}

export async function StaticPageContent({ url }: Props) {
  const data = await getPage({ where: { url } });

  if (!data.content) {
    return null;
  }

  return (
    <>
      <MetaData data={data.seo} />

      {data.content.map((content) => {
        return (
          <CmsContentLoader
            key={content.__typename}
            data={content as CmsPageContent}
          />
        );
      })}
    </>
  );
}
