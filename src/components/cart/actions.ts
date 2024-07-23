"use server";

import { cookies } from "next/headers";

import { getToken } from "@/modules/auth/actions";
import { CustomerCartDocument, CartDocument } from "@/queries/cart.queries";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export default async function getCart() {
  const cookiesStore = cookies();
  const token = await getToken();
  const cartCookie = cookiesStore.get("cart");

  if (!!token) {
    const customerQuery = await authorizedMagentoClient(token, "GET", {
      tags: ["cart"],
      revalidate: 0,
    }).request(CustomerCartDocument);

    return customerQuery?.customerCart;
  }

  if (cartCookie?.value) {
    const guestCart = await authorizedMagentoClient(undefined, "GET", {
      tags: ["cart"],
      revalidate: 0,
    }).request(CartDocument, {
      cart_id: String(cartCookie.value),
    });

    return guestCart?.cart;
  }
}
