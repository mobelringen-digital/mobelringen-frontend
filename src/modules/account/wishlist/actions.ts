"use server";

import { revalidateTag } from "next/cache";

import { getToken } from "@/modules/auth/actions";
import {
  WishlistDocument,
  WishlistVisibilityEnum,
  CreateWishlistDocument,
} from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function getWishlist() {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "GET").request(
    WishlistDocument,
  );

  return data.wishlist;
}

export async function createWishlist(
  name: string,
  visibility: WishlistVisibilityEnum = WishlistVisibilityEnum.Private,
) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    CreateWishlistDocument,
    {
      name,
      visibility,
    },
  );

  revalidateTag("customer");

  return data.createWishlist;
}
