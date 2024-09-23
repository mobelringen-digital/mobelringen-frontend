"use server";

import { CmsStoreDocument, StoreDocument } from "@/types";
import { baseHygraphClient, baseMagentoClient } from "@/utils/lib/graphql";

export async function getCmsStoreInfo(storeId: string) {
  const data = await baseHygraphClient("GET").request(CmsStoreDocument, {
    where: {
      externalId: storeId,
    },
  });

  return data.stores[0];
}

export async function getStoreInfo(storeId: string) {
  const data = await baseMagentoClient("GET").request(StoreDocument, {
    id: storeId,
  });

  return data.getStore?.[0];
}
