"use client";

import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { AddressSelectModal } from "@/modules/checkout/contact-form/AddressSelectModal";
import { BillingFormFields } from "@/modules/checkout/contact-form/BillingFormFields";
import { ShippingFormFields } from "@/modules/checkout/contact-form/ShippingFormFields";
import {
  CheckoutAddressFields,
  CheckoutFormData,
  mapFormAddressValues,
} from "@/modules/checkout/factories";
import {
  BaseCartFragment,
  BillingAddressInput,
  InputMaybe,
  ShippingAddressInput,
} from "@/types";
import { useSession } from "@/utils/hooks/useSession";

interface Props {
  cart: BaseCartFragment;
  onCheckoutFormSubmit: (
    shippingAddress: InputMaybe<ShippingAddressInput>,
    billingAddress: BillingAddressInput,
    email?: string | null,
  ) => Promise<void>;
}

export const ContactForm: React.FC<Props> = ({
  cart,
  onCheckoutFormSubmit,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { token } = useSession();
  const [showAddressModal, setShowAddressModal] = React.useState(false);

  const isDifferentBillingAddress = React.useMemo(() => {
    return (
      !!cart.shipping_addresses[0]?.postcode &&
      cart?.shipping_addresses[0]?.postcode !== cart?.billing_address?.postcode
    );
  }, [cart]);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      email: cart.email,
      customer_address_id: null,
      different_billing_address: isDifferentBillingAddress,
      shipping: {
        city: cart?.shipping_addresses[0]?.city,
        firstname: cart?.shipping_addresses[0]?.firstname,
        lastname: cart?.shipping_addresses[0]?.lastname,
        postcode: cart?.shipping_addresses[0]?.postcode ?? "",
        street: cart?.shipping_addresses[0]?.street.toString() ?? "",
        telephone: cart?.shipping_addresses[0]?.telephone ?? "",
        save_in_address_book: false,
      },
      billing: {
        city: cart?.billing_address?.city,
        firstname: cart?.billing_address?.firstname,
        lastname: cart?.billing_address?.lastname,
        postcode: cart?.billing_address?.postcode ?? "",
        street: cart?.billing_address?.street.toString() ?? "",
        telephone: cart?.billing_address?.telephone ?? "",
        save_in_address_book: false,
      },
    },
  });

  const watchDifferentBillingAddress = watch("different_billing_address");

  const onSubmit: SubmitHandler<CheckoutFormData> = async (values) => {
    setIsLoading(true);
    const shippingFields = mapFormAddressValues(values, "shipping");
    let billingFields = mapFormAddressValues(values, "billing");

    if (!watchDifferentBillingAddress) {
      billingFields = mapFormAddressValues(values, "shipping");
    }

    return onCheckoutFormSubmit(
      shippingFields,
      billingFields,
      values.email,
    ).finally(() => setIsLoading(false));
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
      {isLoading ? <PageTopLoader /> : null}
      <div className="flex justify-between items-center">
        <span className="font-semibold mb-2">Leveringsadresse</span>
        {!!token ? (
          <button
            className="text-sm"
            onClick={() => setShowAddressModal((prev) => !prev)}
          >
            Legg til adresse
          </button>
        ) : null}
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
            disabled={isSubmitting || isLoading}
          >
            Fortsett
          </Button>
        </div>
      </form>
    </div>
  );
};
