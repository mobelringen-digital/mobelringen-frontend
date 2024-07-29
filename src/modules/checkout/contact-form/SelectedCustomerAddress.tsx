import React from "react";

import { CustomerAddressFragment } from "@/types";

interface Props {
  address: CustomerAddressFragment;
  onReset: () => void;
}

export const SelectedCustomerAddress: React.FC<Props> = ({
  address,
  onReset,
}) => {
  return (
    <div className="col-span-12">
      <div className="rounded-2xl py-2 px-4 text-sm bg-black text-white">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="mr-2">Adresse valgt:</span>
            <span>
              {address.firstname} {address.lastname}, {address.city},{" "}
              {address.street}, {address.postcode}
            </span>
          </div>
          <button className="underline" onClick={onReset}>
            Rediger
          </button>
        </div>
      </div>
    </div>
  );
};
