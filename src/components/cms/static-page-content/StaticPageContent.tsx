import React from "react";

import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { getPage } from "@/components/cms/static-page-content/actions";

interface Props {
  url: string;
}

export async function StaticPageContent({ url }: Props) {
  const data = await getPage(url);

  if (!data.pages[0]) {
    return null;
  }

  return (
    <>
      {data.pages[0]?.content.map((content) => {
        return <CmsContentLoader key={content.__typename} data={content} />;
      })}
    </>
  );
}
