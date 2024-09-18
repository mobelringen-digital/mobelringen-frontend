"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";
import { useCookies } from "react-cookie";

import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const viewCartGTMEvent = React.useCallback(() => {
    if (!data?.id || cookies.eventSentForCart === data?.id) {
      return;
    }

    return sendGTMEvent({
      event: "view_cart",
      currency: "NOK",
      value: data?.prices?.grand_total?.value,
      ...formatGTMCartItems(data),
    });
  }, [cookies.eventSentForCart, data]);

  React.useEffect(() => {
    if (
      pathname === "/cart" &&
      (!cookies.eventSentForCart || cookies.eventSentForCart !== data?.id)
    ) {
      const today = new Date();
      const oneWeekFromNow = new Date(
        today.getTime() + 7 * 24 * 60 * 60 * 1000,
      );
      setCookie("eventSentForCart", data?.id, {
        path: pathname,
        expires: oneWeekFromNow,
      });
      viewCartGTMEvent();
    }
  }, [cookies.eventSentForCart, data, pathname, setCookie, viewCartGTMEvent]);

  return <>{children}</>;
};
