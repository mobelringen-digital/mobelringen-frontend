"use client";

import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

import { ToastProvider } from "@/components/_ui/toast-provider";
import { GuestCartMergeProvider } from "@/components/cart/GuestCartMergeProvider";
import { ConfirmationModalContextProvider } from "@/components/confirm/context/ConfirmContextProvider";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>
        <NextUIProvider>
          <ConfirmationModalContextProvider>
            <ToastProvider />
            <GuestCartMergeProvider />
            {children}
          </ConfirmationModalContextProvider>
        </NextUIProvider>
      </ReactQueryClientProvider>
    </SessionProvider>
  );
};
