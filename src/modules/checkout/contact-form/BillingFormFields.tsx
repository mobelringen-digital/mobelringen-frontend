import React from "react";

import { Checkbox } from "@nextui-org/react";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";

interface Props {
  control: any;
  isDifferentBillingAddress: boolean;
}

export const BillingFormFields: React.FC<Props> = ({
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
              name="billing.firstname"
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
              name="billing.lastname"
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
              name="billing.telephone"
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
              name="billing.city"
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
              name="billing.street"
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
              name="billing.postcode"
            >
              <Input variant="bordered" />
            </FieldWrapper>
          </div>
        </>
      ) : null}
    </>
  );
};
