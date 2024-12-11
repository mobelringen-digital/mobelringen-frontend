"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import Link from "next/link";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PageTitle } from "@/components/typography/PageTitle";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";
import { InvoiceTable } from "@/modules/cart/success/InvoiceTable";
import { ItemsTable } from "@/modules/cart/success/ItemsTable";
import { OrderInformation } from "@/modules/cart/success/OrderInformation";
import { MaskedOrderFragment } from "@/types";

interface Props {
  order?: MaskedOrderFragment | null;
}

const addPurchaseGTMEvent = async (order?: MaskedOrderFragment | null) => {
  if (!order?.id) {
    return;
  }

  sendGTMEvent({ ecommerce: null });
  return sendGTMEvent({
    event: "purchase",
    payment_type: order.payment_methods
      ?.map((method) => method?.name)
      .join(","),
    currency: "NOK",
    value: order.total?.grand_total?.value,
    cart_type: order.delivery_type,
    items: order.items.map((item, idx) => ({
      item_id: item?.sku,
      item_name: item?.name,
      index: idx,
      price: item?.price,
      quantity: item?.quantity,
    })),
  });
};

export const CartSuccessPage: React.FC<Props> = ({ order }) => {
  const [eventSent, setEventSent] = React.useState(false);
  const fullShippingAddress = [
    order?.shipping_address?.street,
    order?.shipping_address?.postcode,
    order?.shipping_address?.city,
  ]
    .filter(Boolean)
    .join(", ");

  const isClickAndCollect = order?.delivery_type === "CAC";

  React.useEffect(() => {
    if (!eventSent) {
      addPurchaseGTMEvent(order).finally(() => {
        setEventSent(true);
      });
    }
  }, [eventSent, order]);

  return (
    <ContainerLayout className="pb-12">
      <CartBreadcrumbs />
      <PageTitle>Takk!</PageTitle>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-2">
            <div className="text-xl font-semibold mb-2">Adresse</div>
            {isClickAndCollect ? (
              <span className="text-base">{order.selected_store}</span>
            ) : null}
            <span className="text-base">{fullShippingAddress}</span>
            <span className="text-base">{order?.carrier}</span>
            {/* <DeliveryMap order={order} /> */}
          </div>
          <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-2">
            <div className="text-xl font-semibold mb-2">Spørsmål?</div>
            <span className="text-base">
              Har du spørsmål om denne ordren, vennligst{" "}
              <Link
                aria-label="kontakt kundeservice"
                href="/kundeservice"
                className="underline"
              >
                kontakt kundeservice
              </Link>
            </span>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-2">
            <OrderInformation order={order} />
            <ItemsTable showDelivery={!isClickAndCollect} order={order} />

            {!isClickAndCollect ? <InvoiceTable order={order} /> : null}
          </div>
        </div>
      </div>
      <Debugger data={order} />
    </ContainerLayout>
  );
};
