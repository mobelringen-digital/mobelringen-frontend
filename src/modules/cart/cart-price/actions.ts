"use server";

import { revalidateTag } from "next/cache";

import { ApplyCouponToCartDocument, ValidateCartDocument } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

import { handleError } from "../../../app/actions";

export async function validateCart(cartId: string) {
  const data = await baseMagentoClient("POST").request(ValidateCartDocument, {
    cart_id: cartId,
  });

  revalidateTag("cart");

  return data.validateCart;
}

export async function applyCouponToCart(cartId: string, couponCode: string) {
  const data = await baseMagentoClient("POST")
    .request(ApplyCouponToCartDocument, {
      cart_id: cartId,
      coupon_code: couponCode,
    })
    .catch((error) => {
      return handleError(error);
    });

  revalidateTag("cart");

  return data;
}
