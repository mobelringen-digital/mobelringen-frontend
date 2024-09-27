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
            <td>{item?.name}</td>
            <td>{item?.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
