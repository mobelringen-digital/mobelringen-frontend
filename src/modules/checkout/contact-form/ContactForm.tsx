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
  setDefaultFormValues,
} from "@/modules/checkout/factories";
import {
  BaseCartFragment,
  BillingAddressInput,
  CustomerQuery,
  InputMaybe,
  ShippingAddressInput,
} from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  cart: BaseCartFragment;
  onCheckoutFormSubmit: (
    shippingAddress: InputMaybe<ShippingAddressInput>,
    billingAddress: BillingAddressInput,
    email?: string | null,
  ) => Promise<void>;
  isAuthorized?: boolean;
  customer?: CustomerQuery;
}

export const ContactForm: React.FC<Props> = ({
  cart,
  onCheckoutFormSubmit,
  isAuthorized,
  customer,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAddressModal, setShowAddressModal] = React.useState(false);

  const isDifferentBillingAddress = React.useMemo(() => {
    return (
      !!cart.shipping_addresses[0]?.postcode &&
      cart?.shipping_addresses[0]?.postcode !== cart?.billing_address?.postcode
    );
  }, [cart]);

  const formValues = setDefaultFormValues(customer, cart);

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
      ...formValues,
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

  const navigateToLogin = async () => {
    setIsLoading(true);
    return navigate("/auth/login").finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col">
      {isLoading ? <PageTopLoader /> : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-4"
      >
        {!isAuthorized ? (
          <div className="col-span-12 flex items-center gap-4 mb-4">
            <span>Allerede kunde?</span>
            <Button color="secondary" onClick={navigateToLogin}>
              Logg inn
            </Button>
          </div>
        ) : null}

        <div className="col-span-12 flex justify-between items-center">
          <span className="font-semibold mb-2">Leveringsadresse</span>
          {isAuthorized ? (
            <button
              className="text-sm"
              onClick={() => setShowAddressModal((prev) => !prev)}
            >
              Legg til adresse
            </button>
          ) : null}
        </div>

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
