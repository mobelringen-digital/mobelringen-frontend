import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { ConfigurableProductVariantsFragment } from "@/types";

interface Props {
  variant?: ConfigurableProductVariantsFragment | null;
}

export const Variant: React.FC<Props> = ({ variant }) => {
  if (!variant?.product) return null;

  return (
    <Link
      className={cx(
        "w-[64px] h-[64px] bg-warm-grey p-2 flex items-center justify-center rounded-2xl",
      )}
      href={`/${variant.product.url_key}`}
    >
      <Image
        src={variant.product.image?.url ?? ""}
        alt={variant.product.sku ?? ""}
        width={48}
        height={48}
      />
    </Link>
  );
};
