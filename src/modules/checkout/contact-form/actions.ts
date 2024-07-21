"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth/auth";
import {
  SetBillingAddressOnCart,
  SetGuestEmailOnCart,
  SetShippingAddressOnCart,
} from "@/queries/cart.queries";
import {
  InputMaybe,
  SetBillingAddressOnCartInput,
  ShippingAddressInput,
} from "@/types";
import {
  authorizedMagentoClient,
  baseMagentoClient,
} from "@/utils/lib/graphql";

export async function setBillingAddressOnCart(
  cartId: string,
  address: SetBillingAddressOnCartInput["billing_address"],
) {
  const session = await auth();
  const data = await authorizedMagentoClient(
    String(session?.token),
    "POST",
  ).request(SetBillingAddressOnCart, {
    cartId: cartId,
    billing_address: address,
  });

  revalidatePath("/cart");

  return data;
}

export async function setShippingAddressOnCart(
  cartId: string,
  address: InputMaybe<ShippingAddressInput>,
) {
  const session = await auth();
  const data = await authorizedMagentoClient(
    String(session?.token),
    "POST",
  ).request(SetShippingAddressOnCart, {
    cartId: cartId,
    shipping_addresses: [address],
  });

  revalidatePath("/cart");

  return data;
}

export async function setGuestEmailOnCart(cartId: string, email: string) {
  const data = await baseMagentoClient("POST").request(SetGuestEmailOnCart, {
    cartId: cartId,
    email: email,
  });

  revalidatePath("/cart");

  return data;
}
