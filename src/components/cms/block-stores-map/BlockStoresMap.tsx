import React from "react";

import { Stores } from "@/components/cms/block-stores-map/Stores";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockStoresMapFragment } from "@/types";

interface Props {
  data: CmsBlockStoresMapFragment;
}

export async function BlockStoresMap({ data }: Props) {
  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <Stores title={data.title} />
    </CmsBlockWrapper>
  );
}
