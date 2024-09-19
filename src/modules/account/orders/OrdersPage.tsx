"use client";

import React from "react";

import cx from "classnames";

import { Debugger } from "@/components/Debugger";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { OrderItem } from "@/modules/account/orders/cart-item/OrderItem";
import { CustomerOrderFragment } from "@/types";

interface Props {
  orders?: Array<CustomerOrderFragment | null>;
}

const CATEGORIES = [
  {
    type: "ONLINE",
    title: "På nett",
  },
  {
    type: "CAC",
    title: "Klikk og hent",
  },
  {
    type: "OIP",
    title: "I butikk",
  },
];

export const OrdersPage: React.FC<Props> = ({ orders }) => {
  const [activeCategory, setActiveCategory] = React.useState("ONLINE");

  const getCount = (type: string) => {
    return orders?.filter((order) => order?.delivery_type === type).length;
  };

  const ORDERS = orders?.filter((o) => o?.delivery_type === activeCategory);

  return (
    <AccountPageLayout title="Mine bestillinger">
      <div className="flex gap-6">
        {CATEGORIES.map((category) => {
          return (
            <button
              onClick={() => setActiveCategory(category.type)}
              key={category.type}
              className={cx("font-feature text-2xl", {
                underline: activeCategory === category.type,
              })}
            >
              {category.title} ({getCount(category.type)})
            </button>
          );
        })}
      </div>

      {ORDERS && ORDERS.length === 0 ? (
        <div className="flex flex-col text-left text-xl gap-2">
          <span>Du har ingen bestillinger.</span>
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {ORDERS?.map((order) => {
          return <OrderItem data={order} key={order?.id} />;
        })}
      </div>
      <Debugger data={orders} />
    </AccountPageLayout>
  );
};
