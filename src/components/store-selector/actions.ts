"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import getCart from "@/components/cart/actions";
import { getCustomerDetails } from "@/modules/account/account/actions";
import { updateCustomerDetails } from "@/modules/account/actions";
import { getToken } from "@/modules/auth/actions";
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

export async function getSelectedStoreId() {
  const cookiesStore = cookies();
  const guestStoreId = cookiesStore.get("storeId");

  const data = await getCustomerDetails();

  if (data?.favorite_store) {
    return data.favorite_store;
  }

  return guestStoreId?.value ? String(guestStoreId.value) : null;
}

export async function getSelectedStore() {
  const storeId = await getSelectedStoreId();

  if (!storeId) return null;

  const data = await baseMagentoClient("GET", {
    tags: ["store"],
    revalidate: 3600,
  }).request<StoreQuery>(StoreDocument, {
    id: storeId,
  });

  return data.getStore?.[0];
}

export async function updateCartItemsInStore() {
  const cart = await getCart();
  const store = await getSelectedStore();

  if (!cart?.id || !store?.external_id) {
    return;
  }

  try {
    const data = await baseMagentoClient("POST", {
      cache: "no-store",
      tags: ["cart-items"],
      revalidate: undefined,
    }).request(UpdateCartItemsIsInStore, {
      cartId: cart.id,
      storeId: store?.external_id,
    });

    revalidateTag("cart");
    revalidatePath("/cart");

    return data.updateCartItemsIsInStore;
  } catch (e) {
    // Do nothing
  }
}

export async function setFavoriteStoreId(storeId: string) {
  const token = await getToken();
  const cookiesStore = cookies();
  const customer = await getCustomerDetails();

  if (token && customer) {
    await updateCustomerDetails({
      favorite_store: storeId,
    });
    // Expire the cookie if the user is logged in
    cookiesStore.set("storeId", storeId, {
      maxAge: 0,
    });
  } else {
    cookiesStore.set("storeId", storeId, {
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  await updateCartItemsInStore();

  revalidateTag("store");
  revalidateTag("customer");
  revalidateTag("stock");

  return storeId;
}
