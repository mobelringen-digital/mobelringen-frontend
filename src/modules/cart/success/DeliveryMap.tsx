"use client";

import React from "react";

import { MaskedOrderFragment } from "@/types";

interface Props {
  order?: MaskedOrderFragment | null;
}

export const DeliveryMap: React.FC<Props> = ({ order }) => {
  const fullShippingAddress = [
    order?.shipping_address?.city,
    order?.shipping_address?.street,
    order?.shipping_address?.postcode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <iframe
        width="100%"
        height="600"
        src={`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${fullShippingAddress}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}
      >
        <a href="https://www.gps.ie/">gps devices</a>
      </iframe>
    </div>
  );
};
