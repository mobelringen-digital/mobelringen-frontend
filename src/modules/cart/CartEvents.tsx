"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";
import { useCookies } from "react-cookie";

import { usePathname } from "next/navigation";

import { BaseCartFragment, DeliveryType } from "@/types";
import { formatGTMCartItems } from "@/utils/gtm";

interface Props {
  data?: BaseCartFragment | null;
  children: React.ReactNode;
}

const viewCartGTMEvent = (
  cookies: {
    eventSentForCart?: string | undefined;
    preferredMethod?: string | undefined;
  },
  data?: BaseCartFragment | null,
  isClickAndCollect?: boolean,
) => {
  if (!data?.id || cookies.eventSentForCart === data?.id) {
    return;
  }

  sendGTMEvent({ ecommerce: null });
  return sendGTMEvent({
    event: "view_cart",
    ecommerce: {
      currency: "NOK",
      value: data?.prices?.grand_total?.value,
      cart_type: isClickAndCollect ? DeliveryType.Cac : DeliveryType.Online,
      ...formatGTMCartItems(data),
    },
  });
};

export const CartEvents: React.FC<Props> = ({ children, data }) => {
  const [cookies, setCookie] = useCookies<
    "eventSentForCart" | "preferredMethod",
    { eventSentForCart?: string; preferredMethod?: string }
  >(["eventSentForCart"]);
  const isClickAndCollect = cookies.preferredMethod === DeliveryType.Cac;
  const pathname = usePathname();

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
      viewCartGTMEvent(cookies, data, isClickAndCollect);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, cookies.eventSentForCart, data?.id]);

  return <>{children}</>;
};
