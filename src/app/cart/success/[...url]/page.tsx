import { revalidateTag } from "next/cache";

import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { CartSuccessPage } from "@/modules/cart/success/CartSuccessPage";
import { MaskedOrderDocument } from "@/queries/order.queries";
import { baseMagentoClient } from "@/utils/lib/graphql";
import { NextServerComponentProps } from "@/utils/ts-utils";

async function getMaskedOrder(maskId: string) {
  const data = await baseMagentoClient().request(MaskedOrderDocument, {
    mask: maskId,
  });

  return data.getOrderByMask;
}

export default async function CartSuccess({
  searchParams,
}: NextServerComponentProps) {
  const order = await getMaskedOrder(String(searchParams.masked_id));
  revalidateTag("cart");

  return (
    <>
      <CartSuccessPage order={order} />
      <StaticPageContent url="/cart/success" />
    </>
  );
}
