import React from "react";

import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { MetaDescription, MetaTitle } from "@/components/meta";
import { CmsPagesQuery } from "@/types";

interface Props {
  data: CmsPagesQuery;
}

export const Page: React.FC<Props> = ({ data }) => {
  const metaDescription = data.pages[0]?.metaDescription;
  const title = data.pages[0]?.metaTitle;

  return (
    <>
      {title ? <MetaTitle title={title} /> : null}
      {metaDescription ? (
        <MetaDescription description={metaDescription} />
      ) : null}

      <main className="flex mb-8 flex-col items-center justify-between">
        {data.pages[0]?.content.map((content) => {
          return <CmsContentLoader key={content.__typename} data={content} />;
        })}
      </main>
    </>
  );
};
