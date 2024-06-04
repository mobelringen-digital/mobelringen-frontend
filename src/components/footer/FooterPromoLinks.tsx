import React from "react";

import Image from "next/image";

import { CreditCardIcon } from "@/components/icons/CreditCardIcon";
import { LabelIcon } from "@/components/icons/LabelIcon";
import { LocalShippingIcon } from "@/components/icons/LocalShippingIcon";
import { StorefrontIcon } from "@/components/icons/StorefrontIcon";

const PROMO_ICONS = [
  {
    icon: <LabelIcon />,
    title: "Prismatch",
  },
  {
    icon: <StorefrontIcon />,
    title: "Klikk og hen",
  },
  {
    icon: <LocalShippingIcon />,
    title: "Levering og montering",
  },
  {
    icon: <CreditCardIcon />,
    title: "Finansiering",
  },
];

export const FooterPromoLinks = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center my-4 lg:my-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 order-2 lg:order-1">
        {PROMO_ICONS.map((promo, index) => (
          <div
            key={index}
            className="flex flex-col justify-center text-center items-center gap-2 font-light"
          >
            {promo.icon}
            <span>{promo.title}</span>
          </div>
        ))}
      </div>
      <div className="flex mb-8 lg:mb-0 justify-center lg:justify-end items-center order-1 lg:order-2">
        <Image src="/logo.svg" alt="logo" width={112} height={56} />
      </div>
    </div>
  );
};
