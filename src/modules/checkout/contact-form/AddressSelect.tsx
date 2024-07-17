import React from "react";

import { RadioGroup } from "@nextui-org/radio";

import { FieldWrapper } from "@/components/_ui/form/FieldWrapper";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { useCustomerQuery } from "@/modules/account/hooks/useCustomerQuery";

interface Props {
  control: any;
}

export const AddressSelect: React.FC<Props> = ({ control }) => {
  const { data: customer } = useCustomerQuery();

  return (
    <div className="col-span-12">
      <FieldWrapper
        rules={{ required: "Dette er et påkrevd felt" }}
        control={control}
        label="Velg adresse"
        name="customer_address_id"
      >
        <RadioGroup color="primary">
          {customer?.addresses?.map((address) => (
            <RadioBlock key={address?.id} value={String(address?.id)}>
              <b>
                {customer?.firstname} {customer?.lastname}
              </b>
              <br />
              {address?.city}, {address?.street} {address?.postcode}
            </RadioBlock>
          ))}
        </RadioGroup>
      </FieldWrapper>
    </div>
  );
};
