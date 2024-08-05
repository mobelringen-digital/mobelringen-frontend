import {
  BaseCartFragment,
  BillingAddressInput,
  CustomerQuery,
  ShippingAddressInput,
} from "@/types";

export type CheckoutFormData = {
  email?: string | null;
  different_billing_address: boolean;
  shipping: {
    customer_address_id?: ShippingAddressInput["customer_address_id"] | null;
    address: ShippingAddressInput["address"];
  };
  billing: {
    customer_address_id?: BillingAddressInput["customer_address_id"] | null;
    address: BillingAddressInput["address"];
  };
};

export const setDefaultFormValues = (
  customer?: CustomerQuery,
  cart?: BaseCartFragment,
) => {
  const defaultShippingAddress = customer?.customer?.addresses?.find(
    (a) => a?.default_shipping,
  );
  const defaultBillingAddress = customer?.customer?.addresses?.find(
    (a) => a?.default_billing,
  );
  const cartShippingAddress = cart?.shipping_addresses[0];
  const cartBillingAddress = cart?.billing_address;

  return {
    shipping: {
      customer_address_id: !cartShippingAddress
        ? defaultShippingAddress?.id ?? null
        : null,
      address: {
        city: cartShippingAddress?.city ?? defaultShippingAddress?.city ?? "",
        firstname:
          cartShippingAddress?.firstname ??
          defaultShippingAddress?.firstname ??
          "",
        lastname:
          cartShippingAddress?.lastname ??
          defaultShippingAddress?.lastname ??
          "",
        postcode:
          cartShippingAddress?.postcode ??
          defaultShippingAddress?.postcode ??
          "",
        street: cartShippingAddress?.street ??
          defaultShippingAddress?.street ?? [""],
        telephone:
          cartShippingAddress?.telephone ??
          defaultShippingAddress?.telephone ??
          "",
        country_code: "NO",
        save_in_address_book: false,
      },
    },
    billing: {
      customer_address_id: !cartBillingAddress
        ? defaultBillingAddress?.id ?? null
        : null,
      address: {
        city: cartBillingAddress?.city ?? defaultBillingAddress?.city ?? "",
        firstname:
          cartBillingAddress?.firstname ??
          defaultBillingAddress?.firstname ??
          "",
        lastname:
          cartBillingAddress?.lastname ?? defaultBillingAddress?.lastname ?? "",
        postcode:
          cartBillingAddress?.postcode ?? defaultBillingAddress?.postcode ?? "",
        street: cartBillingAddress?.street ??
          defaultBillingAddress?.street ?? [""],
        telephone:
          cartBillingAddress?.telephone ??
          defaultBillingAddress?.telephone ??
          "",
        country_code: "NO",
        save_in_address_book: false,
      },
    },
  };
};
