"use client";

import React from "react";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";
import { useSession } from "@/utils/hooks/useSession";

interface Props {
  control: any;
  formDisabled?: boolean;
}

export const ShippingFormFields: React.FC<Props> = ({
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
          }}
          control={control}
          label="Fornavn *"
          name="shipping.firstname"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
          }}
          control={control}
          label="Etternavn *"
          name="shipping.lastname"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
          }}
          control={control}
          label="Mobilnummer *"
          name="shipping.telephone"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
          }}
          control={control}
          label="By *"
          name="shipping.city"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
          }}
          control={control}
          label="Gateadresse *"
          name="shipping.street"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
          disabled={formDisabled}
          rules={{
            required: "Dette er et påkrevd felt",
          }}
          control={control}
          label="Postnumer *"
          name="shipping.postcode"
        >
          <Input variant="bordered" />
        </FieldWrapper>
      </div>
    </div>
  );
};
