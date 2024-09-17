"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { BaseCartFragment } from "@/types";
import { formatGTMCartItems } from "@/utils/gtm";

interface Props {
  data?: BaseCartFragment | null;
  children: React.ReactNode;
}

export const CartEvents: React.FC<Props> = ({ children, data }) => {
  const viewCartGTMEvent = React.useCallback(() => {
    if (!data?.id) {
      return;
    }

    return sendGTMEvent({
      event: "view_cart",
      currency: "NOK",
      value: data?.prices?.grand_total?.value,
      ...formatGTMCartItems(data),
    });
  }, [data]);

  viewCartGTMEvent();

  return <>{children}</>;
};
