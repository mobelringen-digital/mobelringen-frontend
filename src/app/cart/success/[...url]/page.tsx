import React, { Suspense } from "react";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";
import { CartSuccessPage } from "@/modules/cart/success/CartSuccessPage";
import { NextServerComponentProps } from "@/utils/ts-utils";

import { getMaskedOrder } from "./actions";
import { navigate } from "../../../actions";

export default async function CartSuccess(props: NextServerComponentProps) {
  const searchParams = await props.searchParams;
  const order = await getMaskedOrder(String(searchParams.masked_id)).catch(() =>
    navigate(`/cart/error/unknown?mask=${searchParams.masked_id}`),
  );

  if (!order?.id) {
    return navigate("/cart/error/unknown");
  }

  return (
    <Suspense fallback={<PageTopLoader />}>
      <CartSuccessPage order={order} />
      <StaticPageContent url="/cart/success" />
    </Suspense>
  );
}
