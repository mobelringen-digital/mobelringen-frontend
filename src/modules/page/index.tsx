import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { MetaData } from "@/components/meta/MetaData";

interface Props {
  data: any;
}

export const Page: React.FC<Props> = ({ data }) => {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <MetaData data={data?.seo} />

      {data?.content.map((content: any, index: number) => {
        return (
          <CmsContentLoader
            key={`${content.__typename}=${index}`}
            data={content}
          />
        );
      })}
    </Suspense>
  );
};
