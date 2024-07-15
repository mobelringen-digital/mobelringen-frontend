"use client";

import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";

import { CART_QUERY_KEY, CartCookie } from "@/components/cart/fetchCartService";
import { useCartQuery } from "@/components/cart/useCartQuery";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CartItem } from "@/modules/cart/cart-item/CartItem";
import { CartPrice } from "@/modules/cart/cart-price/CartPrice";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";
import { CartMethodLinks } from "@/modules/cart/CartMethodLinks";
import { CartTitle } from "@/modules/cart/CartTitle";
import { CartWarning } from "@/modules/cart/CartWarning";
import { useAssignCustomerToGuestCart } from "@/modules/cart/hooks/useAssignCustomerToGuestCart";
import { useCart } from "@/modules/cart/hooks/useCart";

export const CartPage: React.FC = () => {
  const { data } = useCartQuery();
  const queryClient = useQueryClient();
  const { isCheckoutEnabled } = useCart();
  const [cookies] = useCookies<"cart", CartCookie>(["cart"]);
  const { data: user } = useSession();
  const { mutate: assignCustomerToGuestCart } = useAssignCustomerToGuestCart();

  React.useEffect(() => {
    if (!!user?.token && cookies.cart) {
      assignCustomerToGuestCart(undefined, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
      });
    }
  }, [assignCustomerToGuestCart, cookies.cart, queryClient, user?.token]);

  return (
    <ContainerLayout>
      <CartBreadcrumbs />
      <CartTitle />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white flex flex-col gap-6 rounded-2xl p-4 lg:p-8">
            <div className="flex flex-col gap-4">
              <CartMethodLinks />
              {!isCheckoutEnabled ? (
                <CartWarning
                  message="Noen av produktene under er dessverre ikke lengre tilgjengelig
                på nett."
                />
              ) : null}
            </div>
            <div className="border-t border-t-cold-grey-dark border-opacity-80" />
            {data?.items?.map((item, idx) => (
              <CartItem key={idx} item={item} />
            ))}
          </div>
        </div>
        <CartPrice
          checkoutDisabled={!isCheckoutEnabled}
          prices={data?.prices}
        />
      </div>
      <Debugger data={data} />
    </ContainerLayout>
  );
};
