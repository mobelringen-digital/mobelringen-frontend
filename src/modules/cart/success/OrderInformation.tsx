import React from "react";

import { MaskedOrderFragment } from "@/types";

interface Props {
  order?: MaskedOrderFragment | null;
}

export const OrderInformation: React.FC<Props> = ({ order }) => {
  return (
    <>
      <div className="text-xl font-semibold mb-2">Ordredetaljer</div>
      <div className="text-base flex gap-1">
        <span>Status:</span>
        <span className="font-semibold">{order?.status_label}</span>
      </div>
      <div className="text-base flex gap-1">
        <span>Ordrenummer:</span>
        <span className="font-semibold">{order?.number}</span>
      </div>
      <div className="text-base flex gap-1">
        <span>Dato:</span>
        <span className="font-semibold">{order?.order_date}</span>
      </div>
      {order?.payment_methods?.map((paymentMethod) => (
        <div key={paymentMethod?.type} className="text-base flex gap-1">
          <span>Betalingsmetode:</span>
          <span className="font-semibold">{paymentMethod?.name}</span>
        </div>
      ))}
    </>
  );
};
