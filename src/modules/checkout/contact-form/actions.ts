"use server";

import { revalidateTag } from "next/cache";

import { getToken } from "@/modules/auth/actions";
import { CheckoutFormData } from "@/modules/checkout/factories";
import {
  ReserveOrder,
  SetBillingAddressOnCart,
  SetGuestEmailOnCart,
  SetShippingAddressOnCart,
} from "@/queries/cart.queries";
import {
  authorizedMagentoClient,
  baseMagentoClient,
} from "@/utils/lib/graphql";

import { navigate } from "../../../app/actions";

export async function setAddressesOnCart(
  cartId: string,
  values: CheckoutFormData,
) {
  if (!values.shipping.customer_address_id) {
    delete values.shipping.customer_address_id;
  }

  if (values.shipping.customer_address_id) {
    delete values.shipping.address;
  }

  if (!values.billing.customer_address_id) {
    delete values.billing.customer_address_id;
  }

  if (values.billing.customer_address_id) {
    delete values.billing.address;
  }

  const token = await getToken();
  const data = await authorizedMagentoClient(token, "POST").request(
    SetShippingAddressOnCart,
    {
      cartId,
      shipping_addresses: [values.shipping],
    },
  );

  await authorizedMagentoClient(token, "POST").request(
    SetBillingAddressOnCart,
    {
      cartId,
      billing_address: values.different_billing_address
        ? values.billing
        : values.shipping,
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

export async function reserveOrder(cartId: string, values: CheckoutFormData) {
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST").request(
    ReserveOrder,
    {
      cartId,
      firstname: values.shipping.address?.firstname ?? "",
      lastname: values.shipping.address?.lastname ?? "",
      email: values.email ?? "",
      telephone: values.shipping.address?.telephone ?? "",
    },
  );

  revalidateTag("cart");

  if (data.reserveOrder?.order_id) {
    return navigate(`/cart/success/cac?order_id=${data?.reserveOrder?.order_id}`);
  }

  return data;
}
