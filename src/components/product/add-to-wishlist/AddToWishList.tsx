import React from "react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import cx from "classnames";

import { Favorite } from "@/components/_ui/icons/figma/Favorite";
import { addToWishlist } from "@/components/product/add-to-wishlist/actions";
import { useCustomerQuery } from "@/modules/account/useCustomerQuery";

interface Props {
  productSku?: string | null;
  className?: string;
}

export const AddToWishList: React.FC<Props> = ({ className, productSku }) => {
  const { data: customer } = useCustomerQuery();

  const onSelect = async () => {
    if (!productSku) return;

    await addToWishlist("46169", productSku);
  };

  if (!customer?.wishlists) return null;

  return (
    <Dropdown className="z-20">
      <DropdownTrigger
        onClick={(e: Event) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <button className={cx("p-4 transition-all", className)}>
          <Favorite width={24} height={24} />
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
