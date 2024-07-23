"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { getToken } from "@/modules/auth/actions";
import { CreateEmptyCartDocument } from "@/queries/cart.queries";
import { AddProductToCartDocument, CartItemInput } from "@/types";
import {
  authorizedMagentoClient,
  baseMagentoClient,
} from "@/utils/lib/graphql";

export async function addToCart(
  cartId: string,
  cartItems: Array<CartItemInput> | CartItemInput,
) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    AddProductToCartDocument,
    {
      cartId,
      cartItems,
    },
  );

  revalidateTag("cart");

  return data;
}

export async function createEmptyCart() {
  const cookieStore = cookies();
  const data = await baseMagentoClient("POST").request(
    CreateEmptyCartDocument,
    {},
  );

  if (data.createEmptyCart) {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    cookieStore.set("cart", data.createEmptyCart, {
      expires: oneWeekFromNow,
    });
  }

  return data;
}
