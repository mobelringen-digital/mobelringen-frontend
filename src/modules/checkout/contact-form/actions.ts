"use server";

import { revalidatePath } from "next/cache";

import { getToken } from "@/modules/auth/actions";
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
  const token = await getToken();
  const data = await authorizedMagentoClient(token, "POST").request(
    SetBillingAddressOnCart,
    {
      cartId: cartId,
      billing_address: address,
    },
  );

  revalidatePath("/cart");

  return data;
}

export async function setShippingAddressOnCart(
  cartId: string,
  address: InputMaybe<ShippingAddressInput>,
) {
  const token = await getToken();
  const data = await authorizedMagentoClient(token, "POST").request(
    SetShippingAddressOnCart,
    {
      cartId: cartId,
      shipping_addresses: [address],
    },
  );

  revalidatePath("/cart");

  return data;
}

export async function setGuestEmailOnCart(cartId: string, email: string) {
  return await baseMagentoClient("POST").request(SetGuestEmailOnCart, {
    cartId: cartId,
    email: email,
  });
}
