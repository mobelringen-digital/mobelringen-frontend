import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { AccountLinks } from "@/modules/account/AccountLinks";
import { getToken } from "@/modules/auth/actions";

import { navigate } from "../actions";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();

  if (!token) {
    return navigate("/auth/logout");
  }

  return (
    <ContainerLayout>
      <div className="grid grid-cols-10 my-12 gap-8 lg:gap-16">
        <div className="col-span-12 lg:col-span-3">
          <AccountLinks />
        </div>
        <div className="col-span-12 lg:col-span-7">{children}</div>
      </div>
    </ContainerLayout>
  );
}
