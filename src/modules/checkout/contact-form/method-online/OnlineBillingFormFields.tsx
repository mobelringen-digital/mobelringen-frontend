import React from "react";

import { Checkbox } from "@nextui-org/react";
import { Control } from "react-hook-form";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { CheckoutFormData } from "@/modules/checkout/factories";

interface Props {
  control: Control<CheckoutFormData>;
  isDifferentBillingAddress: boolean;
}

export const OnlineBillingFormFields: React.FC<Props> = ({
  control,
  isDifferentBillingAddress,
}) => {
  return (
    <>
      <div className="col-span-12">
        <FieldWrapper control={control} name="different_billing_address">
          <Checkbox isSelected={isDifferentBillingAddress}>
            Jeg ønsker å bruke en annen fakturaadresse
          </Checkbox>
        </FieldWrapper>
      </div>

      {isDifferentBillingAddress ? (
        <>
          <div className="col-span-12 lg:col-span-6">
            <FieldWrapper
              rules={{
                required: isDifferentBillingAddress
                  ? "Dette er et påkrevd felt"
                  : false,
              }}
              control={control}
              label="Fornavn *"
              name="billing.address.firstname"
            >
              <Input variant="bordered" />
            </FieldWrapper>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <FieldWrapper
              rules={{
                required: isDifferentBillingAddress
                  ? "Dette er et påkrevd felt"
                  : false,
              }}
              control={control}
              label="Etternavn *"
              name="billing.address.lastname"
            >
              <Input variant="bordered" />
            </FieldWrapper>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <FieldWrapper
              rules={{
                required: isDifferentBillingAddress
                  ? "Dette er et påkrevd felt"
                  : false,
              }}
              control={control}
              label="Mobilnummer *"
              name="billing.address.telephone"
            >
              <Input variant="bordered" />
            </FieldWrapper>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <FieldWrapper
              rules={{
                required: isDifferentBillingAddress
                  ? "Dette er et påkrevd felt"
                  : false,
              }}
              control={control}
              label="By *"
              name="billing.address.city"
            >
              <Input variant="bordered" />
            </FieldWrapper>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <FieldWrapper
              rules={{
                required: isDifferentBillingAddress
                  ? "Dette er et påkrevd felt"
                  : false,
              }}
              control={control}
              label="Gateadresse *"
              name="billing.address.street"
            >
              <Input variant="bordered" />
            </FieldWrapper>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <FieldWrapper
              rules={{
                required: isDifferentBillingAddress
                  ? "Dette er et påkrevd felt"
                  : false,
              }}
              control={control}
              label="Postnumer *"
              name="billing.address.postcode"
            >
              <Input variant="bordered" />
            </FieldWrapper>
          </div>
        </>
      ) : null}
    </>
  );
};
