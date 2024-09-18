import React from "react";

import { Debugger } from "@/components/Debugger";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { OrderItem } from "@/modules/account/orders/cart-item/OrderItem";
import { CustomerOrderFragment } from "@/types";

interface Props {
  orders?: Array<CustomerOrderFragment | null>;
}

export const OrdersPage: React.FC<Props> = ({ orders }) => {
  return (
    <AccountPageLayout title="Mine bestillinger">
      <div className="flex flex-col gap-4">
        {orders?.map((order) => {
          return <OrderItem data={order} key={order?.id} />;
        })}
      </div>
      <Debugger data={orders} />
    </AccountPageLayout>
  );
};
