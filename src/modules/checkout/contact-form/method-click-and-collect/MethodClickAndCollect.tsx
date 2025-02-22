"use client";

import React from "react";

import { Control } from "react-hook-form";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { CheckoutFormData } from "@/modules/checkout/factories";
import { EMAIL_REGEX, LETTERS_REGEX, NO_PHONE_REGEX } from "@/utils/helpers";
import { useSession } from "@/utils/hooks/useSession";

interface Props {
  control: Control<CheckoutFormData>;
  formDisabled?: boolean;
}

export const MethodClickAndCollect: React.FC<Props> = ({
  control,
  formDisabled,
}) => {
  const { token } = useSession();

  return (
    <div className="col-span-12 relative grid grid-cols-12 gap-4">
      {formDisabled ? (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white bg-opacity-50 z-50" />
      ) : null}
      {!token ? (
        <div className="col-span-12">
          <FieldWrapper
            disabled={formDisabled}
            rules={{
              required: !token ? "Dette er et påkrevd felt" : false,
              pattern: {
                value: EMAIL_REGEX,
                message: "E-postadressen er ugyldig.",
              },
            }}
            control={control}
            label="E-post *"
            name="email"
          >
            <Input variant="bordered" />
          </FieldWrapper>
        </div>
      ) : null}
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
            pattern: {
              value: LETTERS_REGEX,
              message: "Fornavn må kun inneholde bokstaver.",
            },
          }}
          control={control}
          label="Fornavn *"
          name="shipping.address.firstname"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
            pattern: {
              value: LETTERS_REGEX,
              message: "Etternavn må kun inneholde bokstaver.",
            },
          }}
          control={control}
          label="Etternavn *"
          name="shipping.address.lastname"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
            pattern: {
              value: NO_PHONE_REGEX,
              message:
                "Vennligst oppgi et gyldig norsk mobilnummer. Nummeret skal være 8 sifre, eller begynne med +47 etterfulgt av 8 sifre.",
            },
          }}
          control={control}
          label="Mobilnummer *"
          name="shipping.address.telephone"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
    </div>
  );
};
