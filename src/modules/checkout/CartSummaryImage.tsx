"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CartItemFragment } from "@/types";

interface Props {
  item: CartItemFragment | null;
}

export const CartSummaryImage: React.FC<Props> = ({ item }) => {
  if (!item?.product) return null;

  return (
    <Link
      key={item?.id}
      href={`/${item?.product.canonical_url}`}
      className="relative p-2 w-[70px] h-[70px] bg-warm-grey rounded-xl lg:rounded-2xl !flex justify-center items-center"
    >
      {item?.product.image?.url && (
        <Image
          className="object-contain h-[50px]"
          width={100}
          height={100}
          src={item?.product.image?.url}
          alt={item?.product.image.label ?? ""}
        />
      )}
    </Link>
  );
};
