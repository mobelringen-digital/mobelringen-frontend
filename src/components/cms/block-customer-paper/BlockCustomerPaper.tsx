import React from "react";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsBlockCustomerPaperFragment } from "@/types";

interface Props {
  data: CmsBlockCustomerPaperFragment;
}

export const BlockCustomerPaper: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <ContainerLayout>
        <iframe
          src="https://viewer.ipaper.io/moebelringen/kampanjeaviser/2024/kampanje-33-2024/-/embedded/flat/singlepage/1/"
          style={{
            display: "block",
            width: "250px",
            height: "300px",
          }}
          allow="fullscreen"
        />
      </ContainerLayout>
    </CmsBlockWrapper>
  );
};
