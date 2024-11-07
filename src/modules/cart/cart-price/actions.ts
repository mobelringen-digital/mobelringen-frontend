"use server";

import { revalidateTag } from "next/cache";

import { getToken } from "@/modules/auth/actions";
import {
  ApplyCouponToCartDocument,
  RemoveCouponFromCartDocument,
  ValidateCartDocument,
} from "@/types";
import {
  authorizedMagentoClient,
  baseMagentoClient,
} from "@/utils/lib/graphql";

import { handleError } from "../../../app/actions";

export async function validateCart(cartId: string) {
  const data = await baseMagentoClient("POST").request(ValidateCartDocument, {
    cart_id: cartId,
  });

  revalidateTag("cart");

  return data.validateCart;
}

export async function applyCouponToCart(cartId: string, couponCode: string) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST")
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

export async function removeCouponFromCart(cartId: string) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST")
    .request(RemoveCouponFromCartDocument, {
      cart_id: cartId,
    })
    .catch((error) => {
      return handleError(error);
    });

  revalidateTag("cart");

  return data;
}
