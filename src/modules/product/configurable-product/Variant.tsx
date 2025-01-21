"use client";

import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ConfigurableProductVariantsFragment } from "@/types";

interface Props {
  variant?: ConfigurableProductVariantsFragment | null;
}

export const Variant: React.FC<Props> = ({ variant }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(variant?.product?.canonical_url ?? "");
  const variantProduct = variant?.product;

  if (!variantProduct) return null;

  return (
    <Link
      href={`/${variant?.product?.canonical_url}`}
      aria-label="Product variant"
      className={cx(
        "w-[64px] h-[64px] bg-warm-grey p-2 flex items-center justify-center rounded-2xl",
        {
          "border-1 border-black": isActive,
        },
        {
          "border-1 border-warm-grey": !isActive,
        },
      )}
    >
      <Image
        className="object-contain w-[45px] h-[45px]"
        src={variantProduct.small_image?.url ?? ""}
        alt={variantProduct.sku ?? ""}
        width={45}
        height={45}
      />
    </Link>
  );
};
