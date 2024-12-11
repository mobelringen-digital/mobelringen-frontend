import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { MetaData } from "@/components/meta/MetaData";
import { CmsPagesQuery } from "@/types";

interface Props {
  data: CmsPagesQuery;
}

export const Page: React.FC<Props> = ({ data }) => {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <MetaData data={data.pages[0].seo} />

      {data.pages[0]?.content.map((content) => {
        return <CmsContentLoader key={content.__typename} data={content} />;
      })}
    </Suspense>
  );
};
