"use client";

import React from "react";

import { Logout } from "@/modules/account/components/icons/Logout";
import { logout } from "@/modules/auth/actions";

import { navigate } from "../../app/actions";

export const LogoutButton = () => {
  const handleSignOut = async () => {
    const res = await logout();

    if (res) {
      return navigate("/auth/login");
    }
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
