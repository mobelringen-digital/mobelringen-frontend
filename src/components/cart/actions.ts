"use server";

import { cookies } from "next/headers";

import { getCustomerDetails } from "@/modules/account/account/actions";
import { getToken } from "@/modules/auth/actions";
import { CustomerCartDocument, CartDocument } from "@/queries/cart.queries";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const getGuestCart = async () => {
  const cookiesStore = cookies();
  const cartCookie = cookiesStore.get("cart");

  if (cartCookie?.value) {
    const guestCart = await authorizedMagentoClient(undefined, "GET", {
      tags: ["cart"],
      revalidate: 60,
    }).request(CartDocument, {
      cart_id: String(cartCookie.value),
    });

    return guestCart?.cart;
  }

  return null;
};

export default async function getCart() {
  const token = await getToken();
  const customer = await getCustomerDetails();

  if (!!customer) {
    const customerQuery = await authorizedMagentoClient(token, "GET", {
      tags: ["cart"],
      revalidate: 60,
    }).request(CustomerCartDocument);

    if (customerQuery?.customerCart) {
      return customerQuery.customerCart;
    }

    return null;
  }

  return await getGuestCart();
}
