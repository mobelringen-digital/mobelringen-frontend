"use server";

import {revalidateTag} from "next/cache";

import { getToken } from "@/modules/auth/actions";
import { AddProductsToWishlistDocument } from "@/types";
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
