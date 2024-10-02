"use client";

import React from "react";

import { useCookies } from "react-cookie";

import { Logout } from "@/modules/account/components/icons/Logout";

import { navigate } from "../../app/actions";

export const LogoutButton = () => {
  const [_cookie, setCookie] = useCookies();

  const handleSignOut = async () => {
    setCookie("token", "", { path: "/", expires: new Date() });

    return navigate("/auth/login");
  };

  return (
    <button
      className="p-4 rounded-2xl hover:bg-warm-grey group text-left flex gap-2"
      onClick={handleSignOut}
    >
      <Logout />
      <span>Logg ut</span>
    </button>
  );
};
