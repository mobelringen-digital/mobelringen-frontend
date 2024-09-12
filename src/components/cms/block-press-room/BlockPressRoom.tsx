import React from "react";

import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CmsBlockPressRoomFragment } from "@/types";

interface Props {
  data: CmsBlockPressRoomFragment;
}

export const BlockPressRoom: React.FC<Props> = ({ data }) => {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <ContainerLayout>
        <iframe
          src="https://kommunikasjon.ntb.no/embedded/pressroom/17848290"
          id="embedded-pressroom-iframe"
          title="Pressrummet"
          style={{
            width: "1px",
            minWidth: "100%",
            overflow: "hidden",
            height: "2200px",
          }}
        />
      </ContainerLayout>
    </CmsBlockWrapper>
  );
};
