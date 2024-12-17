import React from "react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import cx from "classnames";

import { Favorite } from "@/components/_ui/icons/figma/Favorite";
import { FavoriteFilled } from "@/components/_ui/icons/figma/FavoriteFilled";
import { openToast } from "@/components/_ui/toast-provider";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/components/product/add-to-wishlist/actions";
import { useCustomerQuery } from "@/modules/account/useCustomerQuery";

interface Props {
  productId?: string | null;
  productSku?: string | null;
  className?: string;
}

export const AddToWishList: React.FC<Props> = ({
  className,
  productSku,
  productId,
}) => {
  const { data: customer, isLoading, isFetching } = useCustomerQuery();
  const queryClient = useQueryClient();
  const isSingleWishlist = customer?.wishlists?.length === 1;

  const isProductInWishlist = React.useMemo(
    () =>
      customer?.wishlists.some((wishlist) =>
        wishlist?.items_v2?.items.find(
          (item) => item?.product?.sku === productSku,
        ),
      ),
    [customer?.wishlists, productSku],
  );

  const addProductToWishlist = async (wishlistId: string, sku: string) => {
    await addToWishlist(wishlistId, sku).then(() => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      return openToast({
        content: "Produktet ble lagt til i ønskelisten",
      });
    });
  };

  const removeProductFromWishlist = async (wishlistId: string) => {
    const itemWishlist = customer?.wishlists.find((wishlist) =>
      wishlist?.items_v2?.items.find(
        (item) => item?.product?.sku === productSku,
      ),
    );

    const itemIdInWishlist = itemWishlist?.items_v2?.items.find(
      (item) => item?.product?.sku === productSku,
    )?.id;

    if (!itemIdInWishlist) return;

    await removeFromWishlist(wishlistId, [itemIdInWishlist]).then(() => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      return openToast({
        content: "Produktet ble fjernet fra ønskelisten",
      });
    });
  };

  const onDropdownSelect = async (keys: Selection) => {
    const key = Array.from(keys).join(", ").replaceAll("_", " ");
    if (!productSku) return;

    if (isProductInWishlist) {
      return removeProductFromWishlist(key);
    }

    return addProductToWishlist(key, productSku);
  };

  const handleWishlistButtonClick = async (wishlistId: string) => {
    if (!productSku) return;
    if (!productId) return;

    if (isProductInWishlist) {
      return removeProductFromWishlist(wishlistId);
    }

    return addProductToWishlist(wishlistId, productSku);
  };

  if (!customer?.wishlists) return null;

  if (isSingleWishlist) {
    return (
      <>
        <button
          disabled={isLoading || isFetching}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            return handleWishlistButtonClick(
              customer?.wishlists[0]?.id as string,
            );
          }}
          className={cx("p-4 transition-all outline-0", className)}
        >
          {isProductInWishlist ? (
            <FavoriteFilled />
          ) : (
            <Favorite width={24} height={24} />
          )}
        </button>
      </>
    );
  }

  return (
    <>
      <Dropdown className="z-20" isDisabled={isLoading || isFetching}>
        <DropdownTrigger
          disabled={isLoading || isFetching}
          onClick={(e: Event) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <button className={cx("p-4 transition-all outline-0", className)}>
            {isProductInWishlist ? (
              <FavoriteFilled />
            ) : (
              <Favorite width={24} height={24} />
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          onSelectionChange={onDropdownSelect}
          aria-label="Add to wishlist"
          selectionMode="single"
        >
          {customer?.wishlists.map((wishlist, idx) => (
            <DropdownItem key={wishlist?.id ?? idx}>
              {wishlist?.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
