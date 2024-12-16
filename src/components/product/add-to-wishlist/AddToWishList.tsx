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
import { addToWishlist } from "@/components/product/add-to-wishlist/actions";
import { useCustomerQuery } from "@/modules/account/useCustomerQuery";

interface Props {
  productSku?: string | null;
  className?: string;
}

export const AddToWishList: React.FC<Props> = ({ className, productSku }) => {
  const { data: customer } = useCustomerQuery();
  const queryClient = useQueryClient();

  const onSelect = async (keys: Selection) => {
    const key = Array.from(keys).join(", ").replaceAll("_", " ");
    if (!productSku) return;

    await addToWishlist(key, productSku).then(() => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      return openToast({
        content: "Produktet ble lagt til i ønskelisten",
      });
    });
  };

  const isProductInWishlist = React.useMemo(
    () =>
      customer?.wishlists.some((wishlist) =>
        wishlist?.items_v2?.items.some(
          (item) => item?.product?.sku === productSku,
        ),
      ),
    [customer?.wishlists, productSku],
  );

  if (!customer?.wishlists) return null;

  return (
    <Dropdown className="z-20">
      <DropdownTrigger
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
        onSelectionChange={onSelect}
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
  );
};
