import React from "react";

import { Debugger } from "@/components/Debugger";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { CustomerOrderFragment } from "@/types";

interface Props {
  orders?: Array<CustomerOrderFragment | null>;
}

export const OrdersPage: React.FC<Props> = ({ orders }) => {
  return (
    <AccountPageLayout title="Mine bestillinger">
      <Debugger data={orders} />
    </AccountPageLayout>
  );
};
