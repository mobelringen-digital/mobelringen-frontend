import React from "react";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
import { PageThumbnail } from "@/components/page-thumbnail/PageThumbnail";
import { CmsSimilarPagesRowFragment } from "@/types";

interface Props {
  data: CmsSimilarPagesRowFragment;
}

export const CmsSimilarPagesRow: React.FC<Props> = ({ data }) => {
  if (!data.page) {
    return null;
  }

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <CmsBlockHeader
        title={data.title}
        hide={data.blockConfig?.hideBlockTitle ?? false}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {data?.page.map((page) => <PageThumbnail key={page.id} page={page} />)}
      </div>
    </CmsBlockWrapper>
  );
};
