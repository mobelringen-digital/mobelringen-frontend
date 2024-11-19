import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { CustomerAddressFragment } from "@/types";

interface Props {
  shippingAddress: CustomerAddressFragment;
  billingAddress?: CustomerAddressFragment | null;
  onReset: () => void;
}

export const SelectedCustomerAddress: React.FC<Props> = ({
  shippingAddress,
  billingAddress,
  onReset,
}) => {
  return (
    <div className="col-span-12">
      <div className="flex gap-4 lg:gap-8">
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-base">Sendingsadresse</span>
          <span>
            {shippingAddress.firstname} {shippingAddress.lastname}
          </span>
          <span>{shippingAddress.street}</span>
          <span>{shippingAddress.city}</span>
          <span>{shippingAddress.postcode}</span>
          <span>T: {shippingAddress.telephone}</span>
          <Button
            aria-labelledby="Endre adresse"
            color="secondary"
            className="mt-4 p-2 text-sm"
            onClick={onReset}
          >
            <span className="text-sm">Endre adresse</span>
          </Button>
        </div>
        {billingAddress ? (
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-base">Faktureringsadresse</span>
            <span>
              {billingAddress.firstname} {billingAddress.lastname}
            </span>
            <span>{billingAddress.street}</span>
            <span>{billingAddress.city}</span>
            <span>{billingAddress.postcode}</span>
            <span>T: {billingAddress.telephone}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
