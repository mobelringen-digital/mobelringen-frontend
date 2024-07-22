import React from "react";

import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";

import { useSearchParams } from "next/navigation";

import { CartCookie } from "@/components/cart/fetchCartService";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { ProductStockStatus } from "@/types";

export const useCart = () => {
  const { data: cart } = useCartQuery();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);
  const { data: user } = useSession();
  const searchParams = useSearchParams();
  const isClickAndCollect = searchParams.get("method") === "collect";

  const prices = cart?.prices;

  const pricingLines = React.useMemo(() => {
    return {
      subtotal: {
        label: "Produkter",
        value: prices?.items_grand_total_base_price?.value,
        currency: prices?.items_grand_total_base_price?.currency,
      },
      taxes: prices?.applied_taxes?.map((tax) => ({
        label: tax?.label,
        value: tax?.amount.value,
        currency: tax?.amount.currency,
      })),
      total: {
        label: "Total",
        value: prices?.grand_total?.value,
        currency: prices?.grand_total?.currency,
      },
      totalDiscount: {
        label: "Rabatter",
        value: prices?.grand_total_special_price_diff.value,
        currency: prices?.grand_total_special_price_diff.currency,
      },
    };
  }, [prices]);

  const isCheckoutEnabled = React.useMemo(() => {
    if (isClickAndCollect) {
      return cart?.items?.every((item) => item?.is_in_store);
    }

    return cart?.items?.every(
      (item) => item?.product.stock_status === ProductStockStatus.InStock,
    );
  }, [cart, isClickAndCollect]);

  const cartId = React.useMemo(() => {
    if (!!user?.token && cart?.id) {
      return cart.id;
    }

    return cookies.cart ?? "";
  }, [cart?.id, cookies.cart, user?.token]);

  const isShippingAddressSet = React.useMemo(() => {
    return !!cart?.shipping_addresses?.length;
  }, [cart?.shipping_addresses]);

  const isShippingMethodSet = React.useMemo(() => {
    return !!cart?.shipping_addresses?.[0]?.selected_shipping_method;
  }, [cart?.shipping_addresses]);

  const isPaymentMethodSet = React.useMemo(() => {
    return !!cart?.selected_payment_method;
  }, [cart?.selected_payment_method]);

  return {
    isCheckoutEnabled,
    cartId,
    user,
    pricingLines,
    isShippingAddressSet,
    isShippingMethodSet,
    isPaymentMethodSet,
  };
};
