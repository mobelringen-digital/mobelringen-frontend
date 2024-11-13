import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { CustomerOrderFragment } from "@/types";

interface Props {
  data?: CustomerOrderFragment | null;
}

export const OrderItemTotal: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="col-span-2 lg:col-span-1">
        <span className="text-xl font-semibold">Total</span>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-dark-grey">Delsum</span>
            <span>
              <FormatNumber
                value={data?.total?.subtotal?.value ?? "-"}
                format="currency"
                suffix=" kr"
              />
            </span>
          </div>
          {data?.total?.discounts?.map((discount) => (
            <div className="flex justify-between" key={discount?.label}>
              <span className="text-dark-grey">{discount?.label}</span>
              <span className="text-red">
                <FormatNumber
                  value={discount?.amount?.value}
                  format="currency"
                  suffix=" kr"
                />
              </span>
            </div>
          ))}
          <div className="flex justify-between">
            <span className="text-dark-grey">Frakt</span>
            <span>
              <FormatNumber
                value={data?.total?.total_shipping?.value ?? "-"}
                format="currency"
                suffix=" kr"
              />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Totalsum</span>
            <span>
              <FormatNumber
                value={data?.total?.grand_total?.value ?? "-"}
                format="currency"
                suffix=" kr"
              />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-grey">Herav mva</span>
            <span>
              <FormatNumber
                value={data?.total?.total_tax?.value ?? "-"}
                format="currency"
                suffix=" kr"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
