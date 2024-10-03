import React from "react";

import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PageTitle } from "@/components/typography/PageTitle";
import { CartBreadcrumbs } from "@/modules/cart/CartBreadcrumbs";

export const CartErrorPage = () => {
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
