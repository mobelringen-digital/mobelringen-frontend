"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { getToken } from "@/modules/auth/actions";
import {
  SetPaymentMethodOnCart,
  VippsInitPayment,
} from "@/queries/cart.queries";
import {
  PaymentMethodInput,
  PlaceOrderDocument,
  VippsInitPaymentInput,
} from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

export async function setPaymentMethodOnCart(
  cartId: string,
  paymentMethod: PaymentMethodInput,
) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    SetPaymentMethodOnCart,
    {
      cartId: cartId,
      payment_method: paymentMethod,
    },
  );

  revalidatePath("/cart");
  revalidateTag("cart");

  return data;
}

export async function placeOrder(cartId: string) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    PlaceOrderDocument,
    {
      cartId: cartId,
    },
  );

  revalidatePath("/cart");
  revalidateTag("cart");

  return data;
}

export async function vippsInitPayment(input: VippsInitPaymentInput) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    VippsInitPayment,
    { input },
  );

  revalidatePath("/cart");

  return data;
}
