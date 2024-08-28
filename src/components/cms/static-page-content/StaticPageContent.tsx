import React from "react";

import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { getPage } from "@/components/cms/static-page-content/actions";
import { MetaDescription, MetaTitle } from "@/components/meta";

interface Props {
  url: string;
}

export async function StaticPageContent({ url }: Props) {
  const data = await getPage(url);
  const metaDescription = data.pages[0]?.metaDescription;
  const title = data.pages[0]?.metaTitle;

  if (!data.pages[0]) {
    return null;
  }

  return (
    <>
      {title ? <MetaTitle title={title} /> : null}
      {metaDescription ? (
        <MetaDescription description={metaDescription} />
      ) : null}

      {data.pages[0]?.content.map((content) => {
        return <CmsContentLoader key={content.__typename} data={content} />;
      })}
    </>
  );
}
