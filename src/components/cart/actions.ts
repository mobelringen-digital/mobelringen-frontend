"use server";

import { cookies } from "next/headers";

import { auth } from "@/auth/auth";
import { CustomerCartDocument, CartDocument } from "@/queries/cart.queries";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export default async function getCart() {
  const cookiesStore = cookies();
  const session = await auth();
  const cartCookie = cookiesStore.get("cart");

  if (!!session?.token) {
    const customerQuery = await authorizedMagentoClient(session?.token, "GET", {
      tags: ["cart"],
      cache: "no-store",
    }).request(CustomerCartDocument);

    return customerQuery?.customerCart;
  }

  if (cartCookie?.value) {
    const guestCart = await authorizedMagentoClient(undefined, "GET", {
      tags: ["cart"],
      cache: "no-store",
    }).request(CartDocument, {
      cart_id: String(cartCookie.value),
    });

    return guestCart?.cart;
  }
}
