"use server";

import { revalidateTag } from "next/cache";

import { getToken } from "@/modules/auth/actions";
import { AddProductsToWishlistDocument, RemoveProductsFromWishlistDocument } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function addToWishlist(wishlistId: string, sku: string) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    AddProductsToWishlistDocument,
    {
      wishlistId,
      sku,
    },
  );

  revalidateTag("customer");

  return data.addProductsToWishlist;
}

export async function removeFromWishlist(
  wishlistId: string,
  wishlistItemsIds: string[],
) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    RemoveProductsFromWishlistDocument,
    {
      wishlistId,
      wishlistItemsIds,
    },
  );

  revalidateTag("customer");

  return data.removeProductsFromWishlist;
}
