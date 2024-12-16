"use client";

import React from "react";

import Link from "next/link";

import { ArrowLeftAlt } from "@/components/_ui/icons/ArrowLeftAlt";
import { ProductCard } from "@/components/product/ProductCard";
import { AccountPageLayout } from "@/modules/account/components/AccountPageLayout";
import { CustomerWishlistFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  wishlist: CustomerWishlistFragment;
}

export const WishlistList: React.FC<Props> = ({ wishlist }) => {
  return (
    <AccountPageLayout
      goBack={
        <Link
          href="/account/wishlist"
          aria-label="Back to wishlists"
          className="text-left flex items-center gap-1"
        >
          <ArrowLeftAlt id="stores-back-arrow" />
        </Link>
      }
      title={wishlist.name ?? "Ønskelister"}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.items_v2?.items?.map((item, idx) => (
          <React.Fragment key={idx}>
            {item?.product &&
            isTypename(item.product, [
              "SimpleProduct",
              "ConfigurableProduct",
            ]) ? (
                  <ProductCard product={item.product} />
                ) : null}
          </React.Fragment>
        ))}
      </div>
    </AccountPageLayout>
  );
};
