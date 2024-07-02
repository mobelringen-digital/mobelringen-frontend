"use client";

import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

import { ConfirmationModalContextProvider } from "@/components/confirm/context/ConfirmContextProvider";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>
        <NextUIProvider>
          <ConfirmationModalContextProvider>
            {children}
          </ConfirmationModalContextProvider>
        </NextUIProvider>
      </ReactQueryClientProvider>
    </SessionProvider>
  );
};
