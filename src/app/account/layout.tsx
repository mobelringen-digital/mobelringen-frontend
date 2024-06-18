import React from "react";

import { redirect } from "next/navigation";

import { auth } from "@/auth/auth";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return redirect("/auth/login");
  }

  return <>{children}</>;
}
