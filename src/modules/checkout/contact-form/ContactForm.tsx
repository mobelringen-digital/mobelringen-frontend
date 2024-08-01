"use client";

import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { AddressSelectModal } from "@/modules/checkout/contact-form/AddressSelectModal";
import { BillingFormFields } from "@/modules/checkout/contact-form/BillingFormFields";
import { SelectedCustomerAddress } from "@/modules/checkout/contact-form/SelectedCustomerAddress";
import { ShippingFormFields } from "@/modules/checkout/contact-form/ShippingFormFields";
import {
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
      different_billing_address: isDifferentBillingAddress,
      ...formValues,
    },
  });

  const watchDifferentBillingAddress = watch("different_billing_address");
  const watchCustomerAddressId = watch("customer_address_id");

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

  const selectedCustomerAddress = React.useMemo(() => {
    return customer?.customer?.addresses?.find(
      (a) => a?.id === watchCustomerAddressId,
    );
  }, [customer, watchCustomerAddressId]);

  const onAddressSelect = (customerAddressId: number) => {
    if (customerAddressId) {
      setValue("customer_address_id", customerAddressId);
    }
    const addressValues = customer?.customer?.addresses?.find(
      (a) => a?.id === customerAddressId,
    );

    if (addressValues) {
      setValue("shipping.firstname", addressValues.firstname ?? "");
      setValue("shipping.lastname", addressValues.lastname ?? "");
      setValue("shipping.city", addressValues.city ?? "");
      setValue("shipping.street", addressValues?.street?.toString() ?? "");
      setValue("shipping.postcode", addressValues.postcode ?? "");
      setValue("shipping.telephone", addressValues.telephone ?? "");
      setValue("shipping.company", addressValues.company ?? "");

      if (!watchDifferentBillingAddress) {
        setValue("billing.firstname", addressValues.firstname ?? "");
        setValue("billing.lastname", addressValues.lastname ?? "");
        setValue("billing.city", addressValues.city ?? "");
        setValue("billing.street", addressValues.street?.toString() ?? "");
        setValue("billing.postcode", addressValues.postcode ?? "");
        setValue("billing.telephone", addressValues.telephone ?? "");
        setValue("billing.company", addressValues.company ?? "");
      }
    }
  };

  const navigateToLogin = async () => {
    setIsLoading(true);
    return navigate("/auth/login").finally(() => setIsLoading(false));
  };

  const resetCustomerAddressId = () => {
    setValue("customer_address_id", null);
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
              type="button"
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
        {selectedCustomerAddress ? (
          <SelectedCustomerAddress
            address={selectedCustomerAddress}
            onReset={resetCustomerAddressId}
          />
        ) : null}
        <ShippingFormFields
          formDisabled={!!watchCustomerAddressId}
          control={control}
        />

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
