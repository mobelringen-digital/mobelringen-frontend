import { revalidateTag } from "next/cache";

import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { CartSuccessPage } from "@/modules/cart/success/CartSuccessPage";
import { MaskedOrderDocument } from "@/queries/order.queries";
import { baseMagentoClient } from "@/utils/lib/graphql";
import { NextServerComponentProps } from "@/utils/ts-utils";

import { navigate } from "../../../actions";

async function getMaskedOrder(maskId: string) {
  const data = await baseMagentoClient().request(MaskedOrderDocument, {
    mask: maskId,
  });

  revalidateTag("cart");

  return data.getOrderByMask;
}

export default async function CartSuccess({
  searchParams,
}: NextServerComponentProps) {
  const order = await getMaskedOrder(String(searchParams.masked_id)).catch(() =>
    navigate(`/cart/error/unknown?mask=${searchParams.masked_id}`),
  );
  revalidateTag("cart");
  revalidateTag("customer");
  revalidateTag("customer-orders");

  if (!order?.id) {
    return navigate("/cart/error/unknown");
  }

  return (
    <>
      <CartSuccessPage order={order} />
      <StaticPageContent url="/cart/success" />
    </>
  );
}
