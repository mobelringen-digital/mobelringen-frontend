"use server";

import { cookies } from "next/headers";

import { getSelectedStore } from "@/components/store-selector/actions";
import { getCustomerDetails } from "@/modules/account/account/actions";
import { getToken } from "@/modules/auth/actions";
import { CustomerCartDocument, CartDocument } from "@/queries/cart.queries";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export const getGuestCart = async () => {
  const cookiesStore = await cookies();
  const cartCookie = cookiesStore.get("cart");
  const store = await getSelectedStore();

  if (cartCookie?.value) {
    const guestCart = await authorizedMagentoClient(undefined, "GET", {
      tags: ["cart", store?.external_id ?? ""],
      cache: "no-store",
      revalidate: undefined,
    })
      .request(CartDocument, {
        cart_id: String(cartCookie.value),
      })
      .catch(() => {
        return null;
      });

    return guestCart?.cart;
  }
  return null;
};

export default async function getCart() {
  const store = await getSelectedStore();
  const token = await getToken();
  const customer = await getCustomerDetails();

  if (!!customer) {
    try {
      const customerQuery = await authorizedMagentoClient(token, "GET", {
        tags: ["cart", store?.external_id ?? ""],
        revalidate: 60,
      }).request(CustomerCartDocument);

      if (customerQuery?.customerCart) {
        return customerQuery.customerCart;
      }
    } catch (e) {
      return await getGuestCart();
    }
  }

  return await getGuestCart();
}
