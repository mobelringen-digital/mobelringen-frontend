"use server";

import { cookies } from "next/headers";

import { getSelectedStore } from "@/components/store-selector/actions";
import { getToken } from "@/modules/auth/actions";
import { CustomerCartDocument, CartDocument } from "@/queries/cart.queries";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const getGuestCart = async () => {
  const cookiesStore = cookies();
  const cartCookie = cookiesStore.get("cart");

  if (cartCookie?.value) {
    const guestCart = await authorizedMagentoClient(undefined, "GET", {
      tags: ["cart"],
      cache: "no-store",
      revalidate: undefined,
    }).request(CartDocument, {
      cart_id: String(cartCookie.value),
    });

    return guestCart?.cart;
  }
};

export default async function getCart() {
  const store = await getSelectedStore();
  const token = await getToken();

  if (!!token) {
    const customerQuery = await authorizedMagentoClient(token, "GET", {
      tags: ["cart", token, store?.external_id ?? ""],
      cache: "no-store",
      revalidate: undefined,
    }).request(CustomerCartDocument);

    if (customerQuery?.customerCart) {
      return customerQuery.customerCart;
    }

    return await getGuestCart();
  }

  return await getGuestCart();
}
