import { AvailableShippingMethodFragment } from "@/types";

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
};

export type CheckoutFormData = {
  email: string;
  different_billing_address: boolean;
  customer_address_id: string | null;
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
