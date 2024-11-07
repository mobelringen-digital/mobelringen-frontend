import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { CustomerOrderFragment } from "@/types";

interface Props {
  data?: CustomerOrderFragment | null;
}

export const InfoRow: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex gap-8 lg:gap-16 border-b border-dark-grey border-opacity-30 pb-8">
      {data?.shipping_method ? (
        <div className="flex flex-col">
          <span className="font-semibold">Leveringsmetode</span>
          <span>{data?.shipping_method}</span>
        </div>
      ) : null}
      {data?.order_date ? (
        <div className="flex flex-col">
          <span className="font-semibold">Kjøpsdato</span>
          <span>{data?.order_date}</span>
        </div>
      ) : null}
      {data?.total?.discounts?.map((discount) => (
        <div className="flex flex-col" key={discount?.label}>
          <span className="font-semibold">{discount?.label}</span>
          <span className="text-red">
            <FormatNumber
              value={discount?.amount?.value}
              format="currency"
              suffix=" kr"
            />
          </span>
        </div>
      ))}
      {data?.total?.grand_total?.value ? (
        <div className="flex flex-col">
          <span className="font-semibold">Totalpris</span>
          <span>
            <FormatNumber
              value={data?.total?.grand_total.value}
              format="currency"
              suffix=" kr"
            />
          </span>
        </div>
      ) : null}
    </div>
  );
};
