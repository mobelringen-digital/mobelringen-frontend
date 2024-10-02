"use server";

import { revalidateTag } from "next/cache";

import { getToken } from "@/modules/auth/actions";
import { SetShippingMethodsOnCart } from "@/queries/cart.queries";
import { ShippingMethodInput } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function setShippingMethods(
  cartId: string,
  shippingMethods: ShippingMethodInput,
) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    SetShippingMethodsOnCart,
    {
      cartId: cartId,
      shipping_methods: [shippingMethods],
    },
  );

  revalidateTag("cart");

  return data;
}
