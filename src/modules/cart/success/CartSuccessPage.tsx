import React from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PageTitle } from "@/components/typography/PageTitle";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";
import { InvoiceTable } from "@/modules/cart/success/InvoiceTable";
import { ItemsTable } from "@/modules/cart/success/ItemsTable";
import { OrderInformation } from "@/modules/cart/success/OrderInformation";
import { MaskedOrderFragment } from "@/types";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), { ssr: false });

interface Props {
  order?: MaskedOrderFragment | null;
}

export const CartSuccessPage: React.FC<Props> = ({ order }) => {
  const fullShippingAddress = [
    order?.shipping_address?.city,
    order?.shipping_address?.street,
    order?.shipping_address?.postcode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <ContainerLayout className="pb-12">
      <CartBreadcrumbs />
      <PageTitle>Takk for kjøpet!</PageTitle>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-2">
            <div className="text-xl font-semibold mb-2">Leveringadresse</div>
            <span className="text-base">{fullShippingAddress}</span>
            <span className="text-base">{order?.carrier}</span>
            <DeliveryMap order={order} />
          </div>
          <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-2">
            <div className="text-xl font-semibold mb-2">Spørsmål?</div>
            <span className="text-base">
              Har du spørsmål om denne ordren, vennligst{" "}
              <Link href="/kundeservice" className="underline">
                kontakt kundeservice
              </Link>
            </span>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-white p-4 lg:p-8 rounded-2xl flex flex-col gap-2">
            <OrderInformation order={order} />
            <ItemsTable order={order} />
            <InvoiceTable order={order} />
          </div>
        </div>
      </div>
      <Debugger data={order} />
    </ContainerLayout>
  );
};
