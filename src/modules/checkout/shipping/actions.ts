"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth/auth";
import { SetShippingMethodsOnCart } from "@/queries/cart.queries";
import { ShippingMethodInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function setShippingMethods(
  cartId: string,
  shippingMethods: ShippingMethodInput,
) {
  const session = await auth();

  const data = await authorizedMagentoClient(
    String(session?.token),
    "POST",
  ).request(SetShippingMethodsOnCart, {
    cartId: cartId,
    shipping_methods: [shippingMethods],
  });

  revalidatePath("/cart");

  return data;
}
