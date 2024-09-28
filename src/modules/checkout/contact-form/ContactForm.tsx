"use client";

import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { MethodClickAndCollect } from "@/modules/checkout/contact-form/method-click-and-collect/MethodClickAndCollect";
import { MethodOnline } from "@/modules/checkout/contact-form/method-online/MethodOnline";
import {
  CheckoutFormData,
  setDefaultFormValues,
} from "@/modules/checkout/factories";
import { BaseCartFragment, CustomerQuery } from "@/types";

import { navigate } from "../../../app/actions";

interface Props {
  cart: BaseCartFragment;
  onCheckoutFormSubmit: (values: CheckoutFormData) => Promise<unknown>;
  isAuthorized?: boolean;
  customer?: CustomerQuery;
  isClickAndCollect?: boolean;
}

export const ContactForm: React.FC<Props> = ({
  cart,
  onCheckoutFormSubmit,
  isAuthorized,
  customer,
  isClickAndCollect,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
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
  const watchShippingAddressId = watch("shipping.customer_address_id");
  const watchBillingAddressId = watch("billing.customer_address_id");

  const onSubmit: SubmitHandler<CheckoutFormData> = async (values) => {
    setIsLoading(true);

    return onCheckoutFormSubmit(values).finally(() => setIsLoading(false));
  };

  const onAddressSelect = (customerAddressId: number) => {
    const addressValues = customer?.customer?.addresses?.find(
      (a) => a?.id === customerAddressId,
    );

    if (addressValues) {
      setValue("shipping.customer_address_id", addressValues.id as number);
      setValue("billing.customer_address_id", addressValues.id as number);
    }
  };

  const navigateToLogin = async () => {
    setIsLoading(true);
    return navigate("/auth/login").finally(() => setIsLoading(false));
  };

  const resetCustomerAddressId = () => {
    setValue("shipping.customer_address_id", null);
    setValue("billing.customer_address_id", null);
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

        {isClickAndCollect ? (
          <MethodClickAndCollect control={control} />
        ) : (
          <MethodOnline
            onAddressSelect={onAddressSelect}
            watchShippingAddressId={watchShippingAddressId}
            watchBillingAddressId={watchBillingAddressId}
            resetCustomerAddressId={resetCustomerAddressId}
            control={control}
            isDifferentBillingAddress={watchDifferentBillingAddress}
            isAuthorized={isAuthorized}
            customer={customer}
          />
        )}

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
