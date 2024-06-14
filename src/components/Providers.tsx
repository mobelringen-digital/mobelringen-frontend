"use client";

import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ReactQueryClientProvider>
    </SessionProvider>
  );
};
