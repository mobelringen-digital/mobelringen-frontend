import React from "react";

import { MaskedOrderFragment } from "@/types";

interface Props {
  order?: MaskedOrderFragment | null;
}

export const InvoiceTable: React.FC<Props> = ({ order }) => {
  return (
    <table className="mt-8">
      <thead>
        <tr>
          <th className="text-left rounded-tl-2xl rounded-tr-2xl p-4 bg-warm-grey">
            Fakturaadresse
          </th>
        </tr>
      </thead>
      <tbody className="border-l border-r border-b border-warm-grey text-sm lg:text-base">
        <tr>
          <td className="px-4 py-2">
            {[
              order?.billing_address?.firstname,
              order?.billing_address?.lastname,
            ].join(" ")}
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2">{order?.billing_address?.street}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">
            {[
              order?.billing_address?.postcode,
              order?.billing_address?.city,
            ].join(" ")}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
