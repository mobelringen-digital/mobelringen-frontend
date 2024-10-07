"use server";

import {revalidateTag} from "next/cache";

import { ValidateCartDocument } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

export async function validateCart(cartId: string) {
  const data = await baseMagentoClient("POST").request(ValidateCartDocument, {
    cart_id: cartId,
  });

  revalidateTag("cart");

  return data.validateCart;
}
