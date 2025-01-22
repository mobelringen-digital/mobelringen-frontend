"use client";

import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import Image from "next/image";
import Link from "next/link";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { QuantityInput } from "@/components/_ui/quantity-input/QuantityInput";
import { useConfirm } from "@/components/confirm/hooks/useConfirm";
import { updateCartItems } from "@/modules/cart/cart-item/actions";
import { CartItemDeliveryInfo } from "@/modules/cart/cart-item/CartItemDeliveryInfo";
import { CartItemPrice } from "@/modules/cart/cart-item/CartItemPrice";
import {
  BaseCartFragment,
  CartItemFragment, DeliveryType,
  RemoveProductFromCartMutation,
} from "@/types";
import { formatGTMCategories } from "@/utils/gtm";
import { useRequestCallback } from "@/utils/hooks/useRequestCallback";

interface Props {
  item: CartItemFragment | null;
  cart?: BaseCartFragment | null;
  onRemoveProduct: (
    itemId: number,
  ) => Promise<RemoveProductFromCartMutation | undefined>;
}

export const CartItem: React.FC<Props> = ({ item, cart, ...restProps }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { showConfirmation } = useConfirm();
  const { handlePossibleErrors } = useRequestCallback();

  if (!item) return null;
  const isClickAndCollect = cart?.delivery_type === DeliveryType.Cac;

  const removeFromCartGTMEvent = () => {
    if (!item?.id) {
      return;
    }

    sendGTMEvent({ ecommerce: null });
    return sendGTMEvent({
      event: "remove_from_cart",
      ecommerce: {
        currency: "NOK",
        value: item.prices?.price.value,
        items: [
          {
            item_id: item?.product.sku,
            item_name: item?.product.name,
            item_brand: item?.product.brand,
            price: item?.prices?.price.value,
            discount: item?.prices?.total_item_discount?.value,
            quantity: item?.quantity,
            ...formatGTMCategories(
              item?.product.categories?.map((category) => ({
                name: category?.name,
              })),
            ),
          },
        ],
      },
    });
  };

  const handleUpdateQuantity = async (quantity: number) => {
    if (quantity > 0) {
      setIsLoading(true);

      const data = await updateCartItems([
        {
          cart_item_id: parseInt(item.id, 10),
          quantity,
        },
      ]);
      setIsLoading(false);

      handlePossibleErrors(data);

      return data;
    }
  };

  const onQuantityIncrement = () => {
    return handleUpdateQuantity(
      item.quantity + (item.availability?.online?.step ?? 1),
    );
  };

  const onQuantityDecrement = () => {
    return handleUpdateQuantity(
      item.quantity - (item.availability?.online?.step ?? 1),
    );
  };

  const handleRemoveProduct = async () => {
    setIsLoading(true);
    const confirmed = await showConfirmation({
      title: "Er du sikker på at du vil fjerne dette produktet?",
      message: "Denne handlingen kan ikke angres.",
    });

    if (confirmed) {
      return restProps.onRemoveProduct(parseInt(item.id, 10)).finally(() => {
        removeFromCartGTMEvent();
        setIsLoading(false);
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? <PageTopLoader /> : null}
      <div className="relative">
        {isLoading ? (
          <div className="absolute pointer-events-none top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50" />
        ) : null}
        <div
          className="flex relative gap-4 border-b border-b-cold-grey-dark border-opacity-80 pb-6"
          key={item?.product.sku}
        >
          <Link
            href={item.product.canonical_url ?? ""}
            className="relative p-2 lg:p-6 w-[70px] lg:w-[160px] h-[70px] lg:h-[160px] bg-warm-grey rounded-xl lg:rounded-3xl !flex justify-center items-center"
          >
            {item?.product.image?.url && (
              <Image
                className="object-contain h-[50px] lg:h-[120px] w-[120px]"
                width={200}
                height={200}
                src={item?.product.image?.url}
                alt={item?.product.image.label ?? ""}
              />
            )}
          </Link>
          <div className="flex flex-col w-full justify-between gap-4">
            <div className="flex justify-between gap-8 w-full">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <Link
                    href={item.product.canonical_url ?? ""}
                    className="text-sm lg:text-lg font-semibold"
                  >
                    {item?.product.name}
                  </Link>
                  <div
                    className="text-xs lg:text-sm font-normal text-dark-grey"
                    dangerouslySetInnerHTML={{
                      __html: item?.product.short_description?.html ?? "",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end min-w-[80px] lg:min-w-[120px] text-xs lg:text-sm font-semibold whitespace-nowrap">
                <CartItemPrice item={item} />
              </div>
            </div>
            <CartItemDeliveryInfo cart={cart} item={item} />
            <div className="w-full lg:text-base flex items-center gap-4">
              <QuantityInput
                onQuantityIncrement={onQuantityIncrement}
                onQuantityDecrement={onQuantityDecrement}
                value={String(item?.quantity ?? 1)}
              />
              <button
                aria-label="Fjern produkt"
                onClick={handleRemoveProduct}
                className="underline text-black text-xs lg:text-base"
              >
                Fjern produkt
              </button>
            </div>
            {isClickAndCollect && !item.is_in_store ? (
              <div className="block">
                <span className="bg-error-light text-error py-1 px-2 rounded-2xl mt-2 text-xs">
                  Ikke tilgjengelig i valgt butikk
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
