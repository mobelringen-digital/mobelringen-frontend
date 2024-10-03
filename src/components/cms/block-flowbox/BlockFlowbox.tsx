import React from "react";

import Flowbox from "@/components/cms/block-flowbox/Flowbox";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import {
  CmsBlockFlowboxFragment,
} from "@/types";

interface Props {
  data: CmsBlockFlowboxFragment;
}

export const BlockFlowbox: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <Flowbox flowKey="nvcQQ8cST2SgT8amaA36UQ" />
    </CmsBlockWrapper>
  );
};
