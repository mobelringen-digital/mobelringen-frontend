"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import {
  StoreDocument,
  StoreQuery,
  StoresListDocument,
  StoresListQuery,
} from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function getStores() {
  const data = await baseMagentoClient("GET", {
    revalidate: 3600,
  }).request<StoresListQuery>(StoresListDocument);

  return data.getStores;
}

export async function getStore() {
  const cookiesStore = cookies();
  const storeId = cookiesStore.get("storeId");

  if (!storeId?.value) return null;

  const data = await baseMagentoClient("GET", {
    tags: ["store"],
    revalidate: 3600,
  }).request<StoreQuery>(StoreDocument, {
    id: storeId.value,
  });

  return data.getStore?.[0];
}

export async function setGuestStoreId(storeId: string) {
  const cookiesStore = cookies();

  cookiesStore.set("storeId", storeId, {
    maxAge: 60 * 60 * 24 * 365,
  });

  revalidateTag("store");

  return null;
}
