"use client";

import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { openToast } from "@/components/_ui/toast-provider";
import { CART_QUERY_KEY } from "@/components/cart/fetchCartService";
import { AddressSelectModal } from "@/modules/checkout/contact-form/AddressSelectModal";
import { BillingFormFields } from "@/modules/checkout/contact-form/BillingFormFields";
import { ShippingFormFields } from "@/modules/checkout/contact-form/ShippingFormFields";
import { useSetBillingAddressOnCartMutation } from "@/modules/checkout/contact-form/useSetBillingAddressOnCart";
import { useSetShippingAddressOnCartMutation } from "@/modules/checkout/contact-form/useSetShippingAddressOnCart";
import {
  CheckoutAddressFields,
  CheckoutFormData,
  mapFormAddressValues,
} from "@/modules/checkout/factories";
import { BaseCartFragment } from "@/types";

interface Props {
  cart: BaseCartFragment;
  onSuccessfulSubmit: () => void;
}

export const ContactForm: React.FC<Props> = ({ onSuccessfulSubmit, cart }) => {
  const [showAddressModal, setShowAddressModal] = React.useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: setShippingAddressOnCart } =
    useSetShippingAddressOnCartMutation();
  const { mutateAsync: setBillingAddressOnCart } =
    useSetBillingAddressOnCartMutation();

  const isDifferentBillingAddress = React.useMemo(() => {
    return (
      cart?.shipping_addresses[0]?.postcode !== cart?.billing_address?.postcode
    );
  }, [cart]);

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      customer_address_id: null,
      different_billing_address: isDifferentBillingAddress,
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

  const watchDifferentBillingAddress = watch("different_billing_address");

  const onSubmit: SubmitHandler<CheckoutFormData> = async (values) => {
    const shippingFields: any = mapFormAddressValues(values, "shipping");
    let billingFields: any = mapFormAddressValues(values, "billing");

    if (!watchDifferentBillingAddress) {
      billingFields = mapFormAddressValues(values, "shipping");
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
      openToast({
        content: "Forsendelses- og faktureringsadresser er oppdatert",
      });
      onSuccessfulSubmit();
    });
  };

  const onAddressSelect = (data: Partial<CheckoutAddressFields>) => {
    setValue("shipping.firstname", data.firstname ?? "");
    setValue("shipping.lastname", data.lastname ?? "");
    setValue("shipping.city", data.city ?? "");
    setValue("shipping.street", data.street ?? "");
    setValue("shipping.postcode", data.postcode ?? "");
    setValue("shipping.telephone", data.telephone ?? "");
    setValue("shipping.company", data.company ?? "");

    if (!watchDifferentBillingAddress) {
      setValue("billing.firstname", data.firstname ?? "");
      setValue("billing.lastname", data.lastname ?? "");
      setValue("billing.city", data.city ?? "");
      setValue("billing.street", data.street ?? "");
      setValue("billing.postcode", data.postcode ?? "");
      setValue("billing.telephone", data.telephone ?? "");
      setValue("billing.company", data.company ?? "");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <span className="font-semibold mb-2">Leveringsadresse</span>
        <button
          className="text-sm"
          onClick={() => setShowAddressModal((prev) => !prev)}
        >
          Legg til adresse
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-4"
      >
        <AddressSelectModal
          isOpen={showAddressModal}
          onOpenChange={() => setShowAddressModal((prev) => !prev)}
          onSelect={onAddressSelect}
        />
        <ShippingFormFields control={control} />

        <BillingFormFields
          isDifferentBillingAddress={watchDifferentBillingAddress}
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
