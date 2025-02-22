import React from "react";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { MaskedOrderFragment } from "@/types";

interface Props {
  order?: MaskedOrderFragment | null;
  showDelivery?: boolean;
}

export const ItemsTable: React.FC<Props> = ({ order, showDelivery }) => {
  return (
    <table className="mt-8 border-dark-grey">
      <thead>
        <tr>
          <th className="text-left rounded-tl-2xl p-4 bg-warm-grey">Produkt</th>
          <th className="text-center w-4 p-4 bg-warm-grey">Antall</th>
          <th className="text-right rounded-tr-2xl p-4 bg-warm-grey">Pris</th>
        </tr>
      </thead>
      <tbody className="border-l border-r border-b border-warm-grey text-sm lg:text-base">
        {order?.items?.map((item) => (
          <tr key={item?.sku}>
            <td className="px-4 py-2">{item?.name}</td>
            <td className="px-4 py-2 text-center">{item?.quantity}</td>
            <td className="px-4 py-2 text-right">
              <FormatNumber
                value={
                  item?.price && item?.quantity ? item.price * item.quantity : 0
                }
                format="currency"
                suffix=" kr"
              />
            </td>
          </tr>
        ))}
        {order?.total?.discounts?.map((discount) => (
          <tr key={discount?.label}>
            <td className="px-4 py-2 border-t border-warm-grey">
              {discount?.label}
            </td>
            <td
              colSpan={2}
              className="px-4 py-2 border-t border-warm-grey text-right text-red"
            >
              <FormatNumber
                value={discount?.amount?.value}
                format="currency"
                suffix=" kr"
              />
            </td>
          </tr>
        ))}
        {showDelivery ? (
          <tr>
            <td className="px-4 py-2 border-t border-warm-grey">Frakt</td>
            <td
              colSpan={2}
              className="px-4 py-2 border-t border-warm-grey text-right"
            >
              <FormatNumber
                value={order?.total?.total_shipping?.value}
                format="currency"
                suffix=" kr"
              />
            </td>
          </tr>
        ) : null}
        <tr>
          <td className="px-4 py-2 border-t border-warm-grey font-semibold">
            Totalt
          </td>
          <td
            colSpan={2}
            className="px-4 py-2 border-t border-warm-grey text-right"
          >
            <FormatNumber
              value={order?.total?.grand_total?.value}
              format="currency"
              suffix=" kr"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
