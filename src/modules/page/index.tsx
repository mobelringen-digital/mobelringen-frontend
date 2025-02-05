import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { MetaData } from "@/components/meta/MetaData";
import { CmsPageDetailsFragment, Entity } from "@/types";

interface Props {
  data: CmsPageDetailsFragment & { content: Entity[] };
}

export const Page: React.FC<Props> = ({ data }) => {
  return (
    <Suspense fallback={<PageTopLoader />}>
      <MetaData data={data?.seo} />

      {data?.content.map((content, index: number) => {
        return <CmsContentLoader key={index} data={content} />;
      })}
    </Suspense>
  );
};
