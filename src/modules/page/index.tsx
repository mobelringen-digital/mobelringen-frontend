import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { MetaData } from "@/components/meta/MetaData";

import { CmsPageContent, CmsPageType } from "../../app/[...url]/actions";

interface Props {
  data: CmsPageType | null;
}

export const Page: React.FC<Props> = ({ data }) => {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <MetaData data={data?.seo} />

      {data?.content.map((content, index) => {
        return (
          <CmsContentLoader
            key={`${content.__typename}=${index}`}
            data={content as CmsPageContent}
          />
        );
      })}
    </Suspense>
  );
};
