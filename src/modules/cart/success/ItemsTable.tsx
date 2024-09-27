import React from "react";

import { MaskedOrderFragment } from "@/types";

interface Props {
  order?: MaskedOrderFragment | null;
}

export const ItemsTable: React.FC<Props> = ({ order }) => {
  return (
    <table className="mt-8 border-dark-grey">
      <thead>
        <tr>
          <th className="text-left rounded-tl-2xl p-4 bg-warm-grey">Produkt</th>
          <th className="text-right rounded-tr-2xl p-4 bg-warm-grey">Pris</th>
        </tr>
      </thead>
      <tbody className="border-l border-r border-b border-warm-grey">
        {order?.items?.map((item) => (
          <tr key={item?.sku}>
            <td className="px-4 py-2">{item?.name}</td>
            <td className="px-4 py-2 text-right">{item?.price}</td>
          </tr>
        ))}
        <tr>
          <td className="px-4 py-2 border-t border-warm-grey">
            Levering til fortauskant
          </td>
          <td className="px-4 py-2 border-t border-warm-grey text-right">
            {order?.total?.total_shipping?.value}
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-t border-warm-grey font-semibold">
            Totalt
          </td>
          <td className="px-4 py-2 border-t border-warm-grey text-right">
            {order?.total?.grand_total?.value}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
