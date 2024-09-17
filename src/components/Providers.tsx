"use client";

import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastProvider } from "@/components/_ui/toast-provider";
import { ConfirmationModalContextProvider } from "@/components/confirm/context/ConfirmContextProvider";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextUIProvider>
        <ConfirmationModalContextProvider>
          <ToastProvider />
          {children}
        </ConfirmationModalContextProvider>
      </NextUIProvider>
    </ReactQueryClientProvider>
  );
};
