"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth/auth";
import {
  SetPaymentMethodOnCart,
  VippsInitPayment,
} from "@/queries/cart.queries";
import { PaymentMethodInput, PlaceOrderDocument } from "@/types";
import { authorizedMagentoClient } from "@/utils/lib/graphql";

import { vippsInitPaymentInput } from "../../../../.mesh";

export async function setPaymentMethodOnCart(
  cartId: string,
  paymentMethod: PaymentMethodInput,
) {
  const session = await auth();

  const data = await authorizedMagentoClient(
    String(session?.token),
    "POST",
  ).request(SetPaymentMethodOnCart, {
    cartId: cartId,
    payment_method: paymentMethod,
  });

  revalidatePath("/cart");

  return data;
}

export async function placeOrder(cartId: string) {
  const session = await auth();

  const data = await authorizedMagentoClient(
    String(session?.token),
    "POST",
  ).request(PlaceOrderDocument, {
    cartId: cartId,
  });

  revalidatePath("/cart");

  return data;
}

export async function vippsInitPayment(input: vippsInitPaymentInput) {
  const session = await auth();

  const data = await authorizedMagentoClient(
    String(session?.token),
    "POST",
  ).request(VippsInitPayment, { input });

  revalidatePath("/cart");

  return data;
}
