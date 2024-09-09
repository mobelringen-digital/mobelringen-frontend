"use server";

import { getToken } from "@/modules/auth/actions";
import { WishlistDocument } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function getWishlist() {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "GET").request(
    WishlistDocument,
  );

  return data.wishlist;
}
