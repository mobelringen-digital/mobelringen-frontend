import React from "react";

import { Control, FieldErrors } from "react-hook-form";

import { AddressSelectModal } from "@/modules/checkout/contact-form/method-online/AddressSelectModal";
import { OnlineBillingFormFields } from "@/modules/checkout/contact-form/method-online/OnlineBillingFormFields";
import { OnlineShippingFormFields } from "@/modules/checkout/contact-form/method-online/OnlineShippingFormFields";
import { SelectedCustomerAddress } from "@/modules/checkout/contact-form/method-online/SelectedCustomerAddress";
import { CheckoutFormData } from "@/modules/checkout/factories";
import { CustomerDataFragment, InputMaybe } from "@/types";

interface Props {
  isAuthorized?: boolean;
  customer?: CustomerDataFragment | null;
  onAddressSelect: (customerAddressId: number) => void;
  watchShippingAddressId: InputMaybe<number> | undefined;
  watchBillingAddressId: InputMaybe<number> | undefined;
  resetCustomerAddressId: () => void;
  control: Control<CheckoutFormData>;
  isDifferentBillingAddress: boolean;
  errors?: FieldErrors<CheckoutFormData>;
}

export const MethodOnline: React.FC<Props> = ({
  isAuthorized,
  customer,
  onAddressSelect,
  watchShippingAddressId,
  watchBillingAddressId,
  resetCustomerAddressId,
  control,
  isDifferentBillingAddress,
  errors,
}) => {
  const [showAddressModal, setShowAddressModal] = React.useState(false);

  const selectedShippingCustomerAddress = React.useMemo(() => {
    return customer?.addresses?.find((a) => a?.id === watchShippingAddressId);
  }, [customer, watchShippingAddressId]);

  const selectedBillingCustomerAddress = React.useMemo(() => {
    return customer?.addresses?.find((a) => a?.id === watchBillingAddressId);
  }, [customer, watchBillingAddressId]);

  return (
    <>
      <AddressSelectModal
        customer={customer}
        isOpen={showAddressModal}
        onOpenChange={() => setShowAddressModal((prev) => !prev)}
        onSelect={onAddressSelect}
      />

      <div className="col-span-12 flex justify-between items-center">
        <span className="font-semibold mb-2">Leveringsadresse</span>
        {isAuthorized ? (
          <button
            aria-labelledby="Legg til adresse"
            type="button"
            className="text-sm"
            onClick={() => setShowAddressModal((prev) => !prev)}
          >
            Legg til adresse
          </button>
        ) : null}
      </div>

      {selectedShippingCustomerAddress ? (
        <SelectedCustomerAddress
          shippingAddress={selectedShippingCustomerAddress}
          billingAddress={selectedBillingCustomerAddress}
          onReset={resetCustomerAddressId}
        />
      ) : (
        <>
          <OnlineShippingFormFields
            errors={errors}
            formDisabled={!!watchShippingAddressId}
            control={control}
          />
          <OnlineBillingFormFields
            errors={errors}
            isDifferentBillingAddress={isDifferentBillingAddress}
            control={control}
          />
        </>
      )}
    </>
  );
};
