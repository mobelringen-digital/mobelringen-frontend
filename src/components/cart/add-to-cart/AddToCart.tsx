import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { openToast } from "@/components/_ui/toast-provider";
import {
  addToCart,
  createCartAndAddProduct,
} from "@/components/cart/add-to-cart/actions";
import { AddToCartController } from "@/components/cart/add-to-cart/AddToCartController";
import {
  Availability,
  BaseCartFragment,
  BaseProductFragment,
  BaseStoreFragment,
  GetProductStockQuery,
} from "@/types";
import { formatGTMCategories } from "@/utils/gtm";

interface Props {
  product: BaseProductFragment;
  quantity: number;
  cart?: BaseCartFragment | null;
  stock?: GetProductStockQuery;
  selectedStore?: BaseStoreFragment | null;
}

export const AddToCart: React.FC<Props> = ({
  product,
  quantity,
  cart,
  stock,
  selectedStore,
}) => {
  const addToCartGTMEvent = () => {
    if (!cart?.id) {
      return;
    }

    return sendGTMEvent({
      event: "add_to_cart",
      currency: "NOK",
      value: product?.price_range?.maximum_price?.final_price?.value,
      items: [
        {
          item_id: product.sku,
          item_name: product.name,
          item_brand: product.productBrand?.name,
          price: product.price_range.maximum_price?.final_price.value,
          discount: product.price_range.maximum_price?.discount?.amount_off,
          quantity: quantity,
          ...formatGTMCategories(
            product.categories?.map((category) => ({
              name: category?.name,
            })),
          ),
        },
      ],
    });
  };

  const handleAddItemToCart = async (preferredMethod: "online" | "collect") => {
    if (
      preferredMethod === "online" &&
      stock?.getProductStock.online?.availability === Availability.OutOfStock
    ) {
      return;
    }

    if (
      preferredMethod === "collect" &&
      stock?.getProductStock.cac?.availability === Availability.OutOfStock
    ) {
      return;
    }

    if (cart?.id && product.sku && quantity) {
      addToCartGTMEvent();
      const data = await addToCart(
        cart?.id,
        [
          {
            sku: product.sku,
            quantity,
          },
        ],
        preferredMethod,
      );

      if (data.addProductsToCart?.user_errors) {
        data.addProductsToCart.user_errors.forEach((error) => {
          return openToast({ content: error?.message });
        });
      }

      return data;
    }

    if (!cart?.id && product.sku && quantity) {
      addToCartGTMEvent();
      const data = await createCartAndAddProduct(
        [
          {
            sku: product.sku,
            quantity,
          },
        ],
        preferredMethod,
      );

      if (data?.addProductsToCart?.user_errors) {
        data.addProductsToCart.user_errors.forEach((error) => {
          return openToast({ content: error?.message });
        });
      }

      return data;
    }
  };

  return (
    <AddToCartController
      selectedStore={selectedStore}
      product={product}
      quantity={quantity}
      onAddToCart={handleAddItemToCart}
      stock={stock}
    />
  );
};
