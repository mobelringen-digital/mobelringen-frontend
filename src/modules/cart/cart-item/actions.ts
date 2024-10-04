"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import getCart from "@/components/cart/actions";
import { getToken } from "@/modules/auth/actions";
import { RemoveProductFromCart, UpdateCartItems } from "@/queries/cart.queries";
import { CartItemUpdateInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

import { handleError } from "../../../app/actions";

export async function updateCartItems(cartItems: Array<CartItemUpdateInput>) {
  const cart = await getCart();
  const token = await getToken();

  if (!cart) {
    return;
  }

  const data = await authorizedMagentoClient(token, "POST")
    .request(UpdateCartItems, {
      cartId: cart.id,
      cartItems,
    })
    .catch((error) => {
      return handleError(error);
    });

  revalidatePath("/cart");
  revalidateTag("cart");

  return data;
}

export async function removeProductFromCart(cartItemId: number) {
  const cart = await getCart();
  const token = await getToken();

  if (!cart) {
    return;
  }

  const data = await authorizedMagentoClient(token, "POST").request(
    RemoveProductFromCart,
    {
      cartId: cart.id,
      cartItemId,
    },
  );

  revalidatePath("/cart");
  revalidateTag("cart");

  return data;
}
