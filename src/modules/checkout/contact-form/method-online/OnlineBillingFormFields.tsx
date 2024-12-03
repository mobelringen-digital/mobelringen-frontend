import React from "react";

import { Control, FieldErrors } from "react-hook-form";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { CheckoutFormData } from "@/modules/checkout/factories";
import {
  LETTERS_REGEX,
  NO_PHONE_REGEX,
  NO_POSTCODE_REGEX,
} from "@/utils/helpers";

interface Props {
  control: Control<CheckoutFormData>;
  isDifferentBillingAddress: boolean;
  errors?: FieldErrors<CheckoutFormData>;
}

export const OnlineBillingFormFields: React.FC<Props> = ({
  control,
  isDifferentBillingAddress,
  errors,
}) => {
  return (
    <>
      {/*<div className="col-span-12">*/}
      {/*  <FieldWrapper control={control} name="different_billing_address">*/}
      {/*    <Checkbox isSelected={isDifferentBillingAddress}>*/}
      {/*      Jeg ønsker å bruke en annen fakturaadresse*/}
      {/*    </Checkbox>*/}
      {/*  </FieldWrapper>*/}
      {/*</div>*/}

      {isDifferentBillingAddress ? (
        <>
          <div className="col-span-12 lg:col-span-6">
            <FieldWrapper
              rules={{
                required: isDifferentBillingAddress
                  ? "Dette er et påkrevd felt"
                  : false,
                pattern: {
                  value: LETTERS_REGEX,
                  message: "Fornavn må kun inneholde bokstaver.",
                },
              }}
              error={errors?.billing?.address?.firstname}
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
                pattern: {
                  value: LETTERS_REGEX,
                  message: "Etternavn må kun inneholde bokstaver.",
                },
              }}
              error={errors?.billing?.address?.lastname}
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
                pattern: {
                  value: NO_PHONE_REGEX,
                  message:
                    "Vennligst oppgi et gyldig norsk mobilnummer. Nummeret skal være 8 sifre, eller begynne med +47 etterfulgt av 8 sifre.",
                },
              }}
              error={errors?.billing?.address?.telephone}
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
                pattern: {
                  value: NO_POSTCODE_REGEX,
                  message:
                    "Vi sender dessverre ikke varer til dette postnummeret. Ta kontakt med kundeservice dersom du ønsker mer informasjon.",
                },
                minLength: {
                  value: 4,
                  message: "Postnummeret må være numerisk og 4 sifre.",
                },
                maxLength: {
                  value: 4,
                  message: "Postnummeret må være numerisk og 4 sifre.",
                },
              }}
              error={errors?.billing?.address?.postcode}
              control={control}
              label="Postnummer *"
              name="billing.address.postcode"
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
                pattern: {
                  value: LETTERS_REGEX,
                  message: "Poststed må kun inneholde bokstaver.",
                },
              }}
              error={errors?.billing?.address?.city}
              control={control}
              label="Poststed *"
              name="billing.address.city"
            >
              <Input variant="bordered" />
            </FieldWrapper>
          </div>
        </>
      ) : null}
    </>
  );
};
