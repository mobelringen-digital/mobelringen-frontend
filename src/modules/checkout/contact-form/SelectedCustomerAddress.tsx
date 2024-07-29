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
      <div className="rounded-full py-2 px-4 text-sm bg-black text-white">
        <div className="flex justify-between items-center">
          <div className="flex">
            <span className="mr-2">Adresse valgt:</span>
            {address.firstname} {address.lastname}, {address.city},{" "}
            {address.street}, {address.postcode}
          </div>
          <button className="underline" onClick={onReset}>
            Rediger
          </button>
        </div>
      </div>
    </div>
  );
};
