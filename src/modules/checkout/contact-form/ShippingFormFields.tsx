import React from "react";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { Input } from "@/components/_ui/input/Input";

interface Props {
  control: any;
}

export const ShippingFormFields: React.FC<Props> = ({ control }) => {
  return (
    <>
      <div className="col-span-12 lg:col-span-6">
        <FieldWrapper
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
    </>
  );
};
