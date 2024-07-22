"use server";

import { revalidateTag } from "next/cache";

import { auth } from "@/auth/auth";
import getCart from "@/components/cart/actions";
import { RemoveProductFromCart, UpdateCartItems } from "@/queries/cart.queries";
import { CartItemUpdateInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function updateCartItems(cartItems: Array<CartItemUpdateInput>) {
  const cart = await getCart();
  const session = await auth();

  if (!cart) {
    return;
  }

  const data = await authorizedMagentoClient(
    String(session?.token),
    "POST",
  ).request(UpdateCartItems, {
    cartId: cart.id,
    cartItems,
  });

  revalidateTag("cart");

  return data;
}

export async function removeProductFromCart(cartItemId: number) {
  const cart = await getCart();
  const session = await auth();

  if (!cart) {
    return;
  }

  const data = await authorizedMagentoClient(
    String(session?.token),
    "POST",
  ).request(RemoveProductFromCart, {
    cartId: cart.id,
    cartItemId,
  });

  revalidateTag("cart");

  return data;
}
