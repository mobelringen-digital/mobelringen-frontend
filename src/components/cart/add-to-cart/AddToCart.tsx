import React from "react";

import { sendGTMEvent } from "@next/third-parties/google";

import { openToast } from "@/components/_ui/toast-provider";
import { addItemToCartHandler } from "@/components/cart/add-to-cart/actions";
import { AddToCartController } from "@/components/cart/add-to-cart/AddToCartController";
import {
  Availability,
  BaseCartFragment,
  BaseProductFragment,
  BaseStoreFragment,
  DeliveryType,
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

export const addToCartGTMEvent = (
  preferredMethod: DeliveryType,
  product: BaseProductFragment,
  quantity: number,
  selectedStore?: BaseStoreFragment | null,
) => {
  return sendGTMEvent({
    event: "add_to_cart",
    ecommerce: {
      currency: "NOK",
      value: product?.price_range?.maximum_price?.final_price?.value,
      selected_store: selectedStore?.name,
      delivery_method: preferredMethod,
      items: [
        {
          item_id: product.sku,
          addable_to_cart: product.addable_to_cart,
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
    },
  });
};

export const AddToCart: React.FC<Props> = ({
  product,
  quantity,
  stock,
  selectedStore,
}) => {
  const handleAddItemToCart = async (preferredMethod: DeliveryType) => {
    if (
      preferredMethod === DeliveryType.Online &&
      stock?.getProductStock.online?.availability === Availability.OutOfStock
    ) {
      return;
    }

    if (
      preferredMethod === DeliveryType.Cac &&
      stock?.getProductStock.cac?.availability === Availability.OutOfStock
    ) {
      return;
    }

    return addItemToCartHandler(product, preferredMethod, quantity).then(
      (data) => {
        if (data?.addProductsToCart?.user_errors) {
          data.addProductsToCart.user_errors.forEach((error) => {
            return openToast({ content: error?.message });
          });
        }

        addToCartGTMEvent(preferredMethod, product, quantity);
      },
    );
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
