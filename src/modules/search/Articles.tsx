import React from "react";

import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
import { PageThumbnail } from "@/components/page-thumbnail/PageThumbnail";
import { CmsPagesQuery } from "@/types";

interface Props {
  articles: CmsPagesQuery["pages"];
}

export const Articles: React.FC<Props> = ({ articles }) => {
  return (
    <>
      <CmsBlockHeader title="Artikler" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {articles?.map((page, idx) => <PageThumbnail page={page} key={idx} />)}
      </div>
    </>
  );
};
