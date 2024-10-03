import React from "react";

import { InfoRow } from "@/modules/account/orders/cart-item/InfoRow";
import { OrderItems } from "@/modules/account/orders/cart-item/OrderItems";
import { CustomerOrderFragment } from "@/types";

interface Props {
  data?: CustomerOrderFragment | null;
}

export const OrderItem: React.FC<Props> = ({ data }) => {
  return (
    <div
      className="bg-white p-8 rounded-2xl flex flex-col gap-4"
      key={data?.id}
    >
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold">Order: #{data?.id}</span>
        <span className="text-sm text-dark-grey">({data?.status_label})</span>
      </div>
      <InfoRow data={data} />
      <OrderItems data={data} />
    </div>
  );
};
