"use client";

import React, { useEffect } from "react";

import { useCookies } from "react-cookie";

import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { CartCookie } from "@/components/cart/fetchCartService";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PageTitle } from "@/components/typography/PageTitle";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";

export const CartErrorPage = () => {
  const [cookies, setCookie] = useCookies<"cart" | "cart_old", CartCookie>([
    "cart",
    "cart_old",
  ]);

  useEffect(() => {
    if (!cookies.cart && cookies.cart_old) {
      const today = new Date();
      const oneWeekFromNow = new Date(
        today.getTime() + 7 * 24 * 60 * 60 * 1000,
      );
      setCookie("cart", cookies.cart_old, {
        expires: oneWeekFromNow,
        path: "/",
      });
    }
  });

  return (
    <ContainerLayout>
      <CartBreadcrumbs />
      <PageTitle>Noe gikk galt</PageTitle>
      <p className="text-lg flex justify-center">
        Det ser ut til at noe gikk galt. Vennligst prøv igjen senere.
      </p>
      <div className="flex my-12 justify-center">
        <Button as={Link} href="/">
          Til forsiden
        </Button>
      </div>
    </ContainerLayout>
  );
};
