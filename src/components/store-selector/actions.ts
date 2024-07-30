"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import getCart from "@/components/cart/actions";
import { UpdateCartItemsIsInStore } from "@/queries/stores.queries";
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

export async function getSelectedStore() {
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

export async function updateCartItemsInStore() {
  const cart = await getCart();
  const store = await getSelectedStore();

  if (!cart?.id || !store?.id) {
    return;
  }

  const data = await baseMagentoClient("POST", {
    cache: "no-store",
  }).request(UpdateCartItemsIsInStore, {
    cartId: cart.id,
    storeId: store?.id,
  });

  revalidatePath("/cart");

  return data.updateCartItemsIsInStore;
}

export async function setGuestStoreId(storeId: string) {
  const cookiesStore = cookies();

  cookiesStore.set("storeId", storeId, {
    maxAge: 60 * 60 * 24 * 365,
  });

  revalidateTag("store");
  revalidatePath("/cart");

  return null;
}
