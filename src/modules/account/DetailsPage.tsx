"use client";

import React from "react";

import { signOut } from "next-auth/react";

import { Button } from "@/components/_ui/button/Button";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CustomerDataFragment } from "@/types";

interface Props {
  data: CustomerDataFragment;
}

export const DetailsPage: React.FC<Props> = ({ data }) => {
  return (
    <ContainerLayout className="mt-16">
      <h1>Customer details</h1>
      <Button color="primary" onClick={() => signOut()}>
        Logout
      </Button>
      <Debugger data={data} />
    </ContainerLayout>
  );
};
