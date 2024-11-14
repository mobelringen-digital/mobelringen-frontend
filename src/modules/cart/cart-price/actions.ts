"use server";

import { revalidateTag } from "next/cache";

import { getToken } from "@/modules/auth/actions";
import {
  ApplyCouponsStrategy,
  ApplyCouponsToCartDocument,
  RemoveCouponsFromCartDocument,
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
    .request(ApplyCouponsToCartDocument, {
      cart_id: cartId,
      coupon_codes: [couponCode],
      type: ApplyCouponsStrategy.Append,
    })
    .catch((error) => {
      return handleError(error);
    });

  revalidateTag("cart");

  return data;
}

export async function removeCouponFromCart(cartId: string, couponCode: string) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST")
    .request(RemoveCouponsFromCartDocument, {
      cart_id: cartId,
      coupon_codes: [couponCode],
    })
    .catch((error) => {
      return handleError(error);
    });

  revalidateTag("cart");

  return data;
}
