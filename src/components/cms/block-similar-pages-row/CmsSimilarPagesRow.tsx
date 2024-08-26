import React from "react";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { PageThumbnail } from "@/components/page-thumbnail/PageThumbnail";
import { CmsSimilarPagesRowFragment } from "@/types";

interface Props {
  data: CmsSimilarPagesRowFragment;
}

export const CmsSimilarPagesRow: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <h2 className="text-4xl font-medium font-feature mb-8 lg:mb-16">
        {data.title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {data?.page.map((page) => <PageThumbnail key={page.id} page={page} />)}
      </div>
    </CmsBlockWrapper>
  );
};
