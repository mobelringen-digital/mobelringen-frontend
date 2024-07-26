import {
  AvailableShippingMethodFragment,
  BaseCartFragment,
  CustomerQuery,
} from "@/types";

export type CheckoutAddressFields = {
  city: string;
  company: string;
  country_code: string;
  firstname: string;
  lastname: string;
  postcode: string;
  region: string;
  region_id: string;
  street: string;
  telephone: string;
  vat_id: string;
  save_in_address_book: boolean;
};

export type CheckoutFormData = {
  email?: string | null;
  different_billing_address: boolean;
  customer_address_id: number | null;
  shipping: CheckoutAddressFields;
  billing: CheckoutAddressFields;
};

export type ShippingFormData = {
  shipping_methods: AvailableShippingMethodFragment;
};

export const mapFormAddressValues = (
  values: CheckoutFormData,
  type: "billing" | "shipping",
) => {
  if (values.customer_address_id) {
    return {
      customer_address_id: values.customer_address_id
        ? values.customer_address_id
        : null,
    };
  }

  return {
    address: {
      firstname: values[type].firstname,
      lastname: values[type].lastname,
      city: values[type].city,
      street: values[type].street.split(","),
      postcode: values[type].postcode,
      telephone: values[type].telephone,
      country_code: "NO",
    },
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
    customer_address_id: !cartShippingAddress
      ? defaultShippingAddress?.id ?? null
      : null,
    shipping: {
      city: cartShippingAddress?.city ?? defaultShippingAddress?.city ?? "",
      firstname:
        cartShippingAddress?.firstname ??
        defaultShippingAddress?.firstname ??
        "",
      lastname:
        cartShippingAddress?.lastname ?? defaultShippingAddress?.lastname ?? "",
      postcode:
        cartShippingAddress?.postcode ?? defaultShippingAddress?.postcode ?? "",
      street:
        cartShippingAddress?.street.toString() ??
        defaultShippingAddress?.street?.toString() ??
        "",
      telephone:
        cartShippingAddress?.telephone ??
        defaultShippingAddress?.telephone ??
        "",
      save_in_address_book: false,
    },
    billing: {
      city: cartBillingAddress?.city ?? defaultBillingAddress?.city ?? "",
      firstname:
        cartBillingAddress?.firstname ?? defaultBillingAddress?.firstname ?? "",
      lastname:
        cartBillingAddress?.lastname ?? defaultBillingAddress?.lastname ?? "",
      postcode:
        cartBillingAddress?.postcode ?? defaultBillingAddress?.postcode ?? "",
      street:
        cartBillingAddress?.street.toString() ??
        defaultBillingAddress?.street?.toString() ??
        "",
      telephone:
        cartBillingAddress?.telephone ?? defaultBillingAddress?.telephone ?? "",
      save_in_address_book: false,
    },
  };
};
