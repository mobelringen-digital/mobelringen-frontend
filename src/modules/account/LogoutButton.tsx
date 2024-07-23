"use client";

import React from "react";

import { Button } from "@/components/_ui/button/Button";
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
    <Button color="primary" onClick={handleSignOut}>
      Logout
    </Button>
  );
};
