"use client";

import React from "react";

import { Checkbox } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { CART_QUERY_KEY } from "@/components/cart/fetchCartService";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { useCustomerQuery } from "@/modules/account/hooks/useCustomerQuery";
import { AddressSelect } from "@/modules/checkout/contact-form/AddressSelect";
import { BillingFormFields } from "@/modules/checkout/contact-form/BillingFormFields";
import { ShippingFormFields } from "@/modules/checkout/contact-form/ShippingFormFields";
import { useSetBillingAddressOnCartMutation } from "@/modules/checkout/contact-form/useSetBillingAddressOnCart";
import { useSetShippingAddressOnCartMutation } from "@/modules/checkout/contact-form/useSetShippingAddressOnCart";

type AddressFields = {
  city: string;
  company: string;
  country_code: string;
  firstname: string;
  lastname: string;
  postcode: string;
  region: string;
  region_id: string;
  save_in_address_book: string;
  street: string;
  telephone: string;
  vat_id: string;
};

type FormData = {
  different_billing_address: boolean;
  customer_address_id: string | null;
  shipping: AddressFields;
  billing: AddressFields;
};

interface Props {
  onSuccessfulSubmit: () => void;
}

export const ContactForm: React.FC<Props> = ({ onSuccessfulSubmit }) => {
  const queryClient = useQueryClient();
  const { data: customer } = useCustomerQuery();
  const { data: cart } = useCartQuery();
  const { mutateAsync: setShippingAddressOnCart } =
    useSetShippingAddressOnCartMutation();
  const { mutateAsync: setBillingAddressOnCart } =
    useSetBillingAddressOnCartMutation();

  const selectedCustomerAddressId = React.useMemo(() => {
    if (!customer || !cart) return "null";
    if (!customer.addresses) return "null";

    const shippingAddress = cart.shipping_addresses[0];

    return (
      customer.addresses
        .find((addr) => addr?.postcode === shippingAddress?.postcode)
        ?.id?.toString() ?? null
    );
  }, [cart, customer]);

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      customer_address_id: selectedCustomerAddressId,
      different_billing_address:
        cart?.shipping_addresses[0]?.postcode !==
        cart?.billing_address?.postcode,
      shipping: {
        city: cart?.shipping_addresses[0]?.city,
        firstname: cart?.shipping_addresses[0]?.firstname,
        lastname: cart?.shipping_addresses[0]?.lastname,
        postcode: cart?.shipping_addresses[0]?.postcode ?? "",
        street: cart?.shipping_addresses[0]?.street.toString() ?? "",
        telephone: cart?.shipping_addresses[0]?.telephone ?? "",
      },
      billing: {
        city: cart?.billing_address?.city,
        firstname: cart?.billing_address?.firstname,
        lastname: cart?.billing_address?.lastname,
        postcode: cart?.billing_address?.postcode ?? "",
        street: cart?.billing_address?.street.toString() ?? "",
        telephone: cart?.billing_address?.telephone ?? "",
      },
    },
  });

  const isDifferentBillingAddress = watch("different_billing_address");
  const watchShippingFields = watch(["shipping"]);

  React.useEffect(() => {
    const customerAddress = customer?.addresses?.find(
      (address) =>
        address?.id === parseInt(getValues("customer_address_id") ?? ""),
    );
    if (getValues("shipping.postcode") !== customerAddress?.postcode) {
      setValue("customer_address_id", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchShippingFields]);

  const mapFormAddressValues = (
    values: FormData,
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

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    let shippingFields: any = mapFormAddressValues(values, "shipping");
    let billingFields: any = mapFormAddressValues(values, "billing");

    if (isDifferentBillingAddress) {
      if (values.customer_address_id !== "null") {
        shippingFields = {
          customer_address_id: values.customer_address_id,
        };
      }
    } else {
      if (values.customer_address_id !== "null") {
        shippingFields = {
          customer_address_id: values.customer_address_id,
        };
        billingFields = {
          customer_address_id: values.customer_address_id,
        };
      } else {
        billingFields = mapFormAddressValues(values, "shipping");
      }
    }

    return Promise.all([
      setShippingAddressOnCart([
        {
          ...shippingFields,
        },
      ]),
      setBillingAddressOnCart({
        ...billingFields,
      }),
    ]).then(async () => {
      await queryClient.invalidateQueries({ queryKey: [...CART_QUERY_KEY] });
      onSuccessfulSubmit();
    });
  };

  const onAddressSelect = (customerAddressId?: string) => {
    if (customerAddressId) {
      const customerAddress = customer?.addresses?.find(
        (address) => address?.id === parseInt(customerAddressId),
      );
      if (customerAddress) {
        setValue("shipping.firstname", customerAddress?.firstname ?? "");
        setValue("shipping.lastname", customerAddress?.lastname ?? "");
        setValue("shipping.city", customerAddress?.city ?? "");
        setValue("shipping.street", customerAddress?.street?.toString() ?? "");
        setValue("shipping.postcode", customerAddress?.postcode ?? "");
        setValue("shipping.telephone", customerAddress?.telephone ?? "");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <span className="font-semibold mb-2">Leveringsadresse</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-4"
      >
        <AddressSelect onSelect={onAddressSelect} control={control} />
        <ShippingFormFields control={control} />

        {watch("customer_address_id") === null ? (
          <div className="col-span-12">
            <FieldWrapper
              control={control}
              name="shipping.save_in_address_book"
            >
              <Checkbox>Lagre adresse i adresseboken</Checkbox>
            </FieldWrapper>
          </div>
        ) : null}

        <BillingFormFields
          isDifferentBillingAddress={isDifferentBillingAddress}
          control={control}
        />

        <div className="col-span-12 flex justify-end mt-6">
          <Button
            color="tertiary"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Fortsett
          </Button>
        </div>
      </form>
    </div>
  );
};
