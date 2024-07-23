import React from "react";

import { redirect } from "next/navigation";

import { getToken } from "@/modules/auth/actions";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();

  if (!token) {
    return redirect("/auth/login");
  }

  return <>{children}</>;
}
