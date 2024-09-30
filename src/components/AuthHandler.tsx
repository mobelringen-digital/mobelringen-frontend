"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { CustomerDataFragment } from "@/types";

interface Props {
  customer?: CustomerDataFragment | null;
}

export const AuthHandler: React.FC<Props> = ({ customer }) => {
  const [cookies, setCookie] = useCookies<"token", { token: string }>([
    "token",
  ]);

  React.useEffect(() => {
    if (cookies.token && !customer) {
      setCookie("token", "", { path: "/", expires: new Date() });
    }
  }, [customer, cookies.token, setCookie]);

  return null;
};
