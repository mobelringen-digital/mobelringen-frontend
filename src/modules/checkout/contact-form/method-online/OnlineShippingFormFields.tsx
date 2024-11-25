"use client";

import React from "react";

import { Control, FieldErrors } from "react-hook-form";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { CheckoutFormData } from "@/modules/checkout/factories";
import { useSession } from "@/utils/hooks/useSession";

interface Props {
  control: Control<CheckoutFormData>;
  formDisabled?: boolean;
  errors?: FieldErrors<CheckoutFormData>;
}

export const OnlineShippingFormFields: React.FC<Props> = ({
  control,
  formDisabled,
  errors,
}) => {
  const { token } = useSession();

  return (
    <div className="col-span-12 relative grid grid-cols-12 gap-4">
      {formDisabled ? (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white bg-opacity-50 z-50" />
      ) : null}
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
            pattern: {
              value: /(?![×÷])[A-Za-zÀ-ÿ]/,
              message: "Fornavn må kun inneholde bokstaver.",
            },
          }}
          error={errors?.shipping?.address?.firstname}
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
              value: /(?![×÷])[A-Za-zÀ-ÿ]/,
              message: "Etternavn må kun inneholde bokstaver.",
            },
          }}
          error={errors?.shipping?.address?.lastname}
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
              value: /^(?:\+47)?[ ]?(\d{3})[ ]?(\d{3})[ ]?(\d{2,4})$/,
              message:
                "Vennligst oppgi et gyldig norsk mobilnummer. Nummeret skal være 8 sifre, eller begynne med +47 etterfulgt av 8 sifre.",
            },
          }}
          error={errors?.shipping?.address?.telephone}
          control={control}
          label="Mobilnummer *"
          name="shipping.address.telephone"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      {!token ? (
        <div className="col-span-12 lg:col-span-6">
          <FieldWrapper
            disabled={formDisabled}
            rules={{
              required: !token ? "Dette er et påkrevd felt" : false,
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "E-postadressen er ugyldig.",
              },
            }}
            error={errors?.email}
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
          }}
          control={control}
          label="Gateadresse *"
          name="shipping.address.street"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
            minLength: {
              value: 4,
              message: "Postnummeret må være numerisk og 4 sifre.",
            },
          }}
          error={errors?.shipping?.address?.postcode}
          control={control}
          label="Postnummer *"
          name="shipping.address.postcode"
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
              value: /(?![×÷])[A-Za-zÀ-ÿ]/,
              message: "Poststed må kun inneholde bokstaver",
            },
          }}
          error={errors?.shipping?.address?.city}
          control={control}
          label="Poststed *"
          name="shipping.address.city"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
    </div>
  );
};
