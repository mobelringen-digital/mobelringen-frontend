"use server";

import { revalidateTag } from "next/cache";

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

export async function setAddressesOnCart(
  cartId: string,
  shippingAddress: InputMaybe<ShippingAddressInput>,
  billingAddress: SetBillingAddressOnCartInput["billing_address"],
) {
  const token = await getToken();
  const data = await authorizedMagentoClient(token, "POST").request(
    SetShippingAddressOnCart,
    {
      cartId,
      shipping_addresses: [shippingAddress],
    },
  );

  await authorizedMagentoClient(token, "POST").request(
    SetBillingAddressOnCart,
    {
      cartId,
      billing_address: billingAddress,
    },
  );

  revalidateTag("cart");

  return data;
}

export async function setGuestEmailOnCart(cartId: string, email: string) {
  return await baseMagentoClient("POST").request(SetGuestEmailOnCart, {
    cartId: cartId,
    email: email,
  });
}
