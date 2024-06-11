"use client";

import React from "react";

import { NextUIProvider } from "@nextui-org/react";

import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ReactQueryClientProvider>
  );
};
