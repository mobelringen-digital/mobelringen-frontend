"use server";

import { ValidateCartDocument } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function validateCart(cartId: string) {
  const data = await baseMagentoClient("POST").request(ValidateCartDocument, {
    cart_id: cartId,
  });

  return data.validateCart;
}
