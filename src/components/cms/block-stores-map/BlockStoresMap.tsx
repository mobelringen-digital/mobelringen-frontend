import React from "react";

import { Stores } from "@/components/cms/block-stores-map/Stores";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { getStores } from "@/components/store-selector/actions";
import { CmsBlockStoresMapFragment } from "@/types";

interface Props {
  data: CmsBlockStoresMapFragment;
}

export async function BlockStoresMap({ data }: Props) {
  const stores = await getStores();

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <Stores title={data.title} stores={stores} />
    </CmsBlockWrapper>
  );
}
