"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";
import { useCookies } from "react-cookie";

import { BaseCartFragment } from "@/types";
import { formatGTMCartItems } from "@/utils/gtm";

interface Props {
  data?: BaseCartFragment | null;
  children: React.ReactNode;
}

export const CartEvents: React.FC<Props> = ({ children, data }) => {
  const [cookies, setCookie] = useCookies<
    "eventSentForCart",
    { eventSentForCart?: string }
  >(["eventSentForCart"]);

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

  React.useEffect(() => {
    if (!cookies.eventSentForCart || cookies.eventSentForCart !== data?.id) {
      setCookie("eventSentForCart", data?.id, { path: "/" });
      viewCartGTMEvent();
    }
  }, [cookies.eventSentForCart, data, setCookie, viewCartGTMEvent]);

  return <>{children}</>;
};
