import React from "react";

import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { LogoutButton } from "@/modules/account/LogoutButton";
import { CustomerDataFragment } from "@/types";

interface Props {
  data: CustomerDataFragment;
}

export const DetailsPage: React.FC<Props> = ({ data }) => {
  return (
    <ContainerLayout className="mt-16">
      <h1>Customer details</h1>
      <LogoutButton />
      <Debugger data={data} />
    </ContainerLayout>
  );
};
