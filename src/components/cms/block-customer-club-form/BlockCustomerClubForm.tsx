import React from "react";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsBlockCustomerClubFormFragment } from "@/types";

interface Props {
  data: CmsBlockCustomerClubFormFragment;
}

export const BlockCustomerClubForm: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <ContainerLayout>
        <iframe
          src="https://voyado.oculos.no/mobelringen/registrer/"
          width="100%"
          height="820"
        />
      </ContainerLayout>
    </CmsBlockWrapper>
  );
};
