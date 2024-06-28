import React from "react";

import Image from "next/image";
import Link from "next/link";

import { FormatNumber } from "@/components/_ui/format-number/FormatNumber";
import { QuantityInput } from "@/components/_ui/quantity-input/QuantityInput";
import { useRemoveProductFromCartMutation } from "@/components/cart/add-to-cart/useRemoveProductFromCartMutation";
import { CartItemFragment } from "@/types";

interface Props {
  item: CartItemFragment | null;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { mutate: removeProduct } = useRemoveProductFromCartMutation();
  if (!item) return null;

  const handleRemoveProduct = async () => {
    return removeProduct({
      cartItemId: parseInt(item.id, 10),
    });
  };

  return (
    <div
      className="flex gap-4 border-b border-b-cold-grey-dark border-opacity-80 pb-6"
      key={item?.product.sku}
    >
      <Link
        href={item.product.canonical_url ?? ""}
        className="relative p-6 w-[160px] h-[160px] bg-warm-grey rounded-3xl !flex justify-center items-center"
      >
        {item?.product.image?.url && (
          <Image
            className="object-contain h-[100px] w-[120px]"
            width={200}
            height={200}
            src={item?.product.image?.url}
            alt={item?.product.image.label ?? ""}
          />
        )}
      </Link>
      <div className="flex justify-between gap-8 w-full">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <Link
              href={item.product.canonical_url ?? ""}
              className="text-lg font-semibold"
            >
              {item?.product.name}
            </Link>
            <p
              className="text-xs lg:text-sm font-normal text-dark-grey"
              dangerouslySetInnerHTML={{
                __html: item?.product.short_description?.html ?? "",
              }}
            />
          </div>
          <div className="w-full flex items-center gap-4">
            <QuantityInput value={String(item?.quantity ?? 1)} />
            <button
              onClick={handleRemoveProduct}
              className="underline text-black"
            >
              Fjern produkt
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end min-w-[120px] text-sm font-semibold whitespace-nowrap">
          <FormatNumber
            value={item?.prices?.row_total_including_tax.value}
            format="currency"
            suffix={item.prices?.row_total_including_tax.currency ?? "NOK"}
          />
        </div>
      </div>
    </div>
  );
};
