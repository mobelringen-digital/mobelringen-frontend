import getCart from "@/components/cart/actions";
import { getToken } from "@/modules/auth/actions";
import { CheckoutPage } from "@/modules/checkout/CheckoutPage";
import { NextSearchParams } from "@/utils/ts-utils";

import { navigate } from "../../actions";

export default async function Checkout({
  searchParams,
}: {
  searchParams?: NextSearchParams;
}) {
  const cart = await getCart();
  const token = await getToken();

  if (token && !cart) {
    return navigate("/auth/login?callback=TOKEN_EXPIRED");
  }

  const isShippingAddressSet = !!cart?.shipping_addresses?.length;
  const isShippingMethodSet =
    !!cart?.shipping_addresses[0]?.selected_shipping_method;

  if (searchParams?.step === "shipping" && !isShippingAddressSet) {
    return navigate("/cart/checkout?step=contact");
  }

  if (searchParams?.step === "payment" && !isShippingMethodSet) {
    return navigate("/cart/checkout?step=shipping");
  }

  return (
    <CheckoutPage
      isShippingMethodSet={isShippingMethodSet}
      isShippingAddressSet={isShippingAddressSet}
      searchParams={searchParams}
      cart={cart}
    />
  );
}
