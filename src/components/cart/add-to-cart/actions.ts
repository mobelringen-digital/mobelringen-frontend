"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import getCart from "@/components/cart/actions";
import { updateCartItemsInStore } from "@/components/store-selector/actions";
import { getToken } from "@/modules/auth/actions";
import { setDeliveryType } from "@/modules/cart/cart-methods/actions";
import { CreateEmptyCartDocument } from "@/queries/cart.queries";
import {
  AddProductToCartDocument,
  BaseProductFragment,
  CartItemInput,
  DeliveryType,
} from "@/types";
import {
  authorizedMagentoClient,
  baseMagentoClient,
} from "@/utils/lib/graphql";

export async function addToCart(
  cartId: string,
  cartItems: Array<CartItemInput> | CartItemInput,
  preferredMethod?: DeliveryType,
) {
  const cookieStore = cookies();
  const token = await getToken();

  const data = await authorizedMagentoClient(token, "POST", {
    cache: "no-store",
  }).request(AddProductToCartDocument, {
    cartId,
    cartItems,
  });

  await updateCartItemsInStore();
  await setDeliveryType({
    cartId,
    type: preferredMethod ?? DeliveryType.Online,
  });

  if (preferredMethod) {
    cookieStore.set("preferredMethod", preferredMethod, {
      path: "/",
    });
  }

  return data;
}

export async function createEmptyCart() {
  const cookieStore = cookies();
  const data = await baseMagentoClient("POST", {
    cache: "no-store",
  }).request(CreateEmptyCartDocument, {});

  if (data.createEmptyCart) {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    cookieStore.set("cart", data.createEmptyCart, {
      expires: oneWeekFromNow,
    });
  }

  return data;
}

export async function createCartAndAddProduct(
  cartItems: Array<CartItemInput> | CartItemInput,
  preferredMethod?: DeliveryType,
) {
  const data = await createEmptyCart();
  const cartId = data.createEmptyCart;

  if (!cartId) return;

  return await addToCart(cartId, cartItems, preferredMethod);
}

export const addItemToCartHandler = async (
  product: BaseProductFragment,
  preferredMethod: DeliveryType,
  quantity: number,
) => {
  const cart = await getCart();

  if (cart?.id && product.sku && quantity) {
    return await addToCart(
      cart?.id,
      [
        {
          sku: product.sku,
          quantity,
        },
      ],
      preferredMethod,
    );
  }

  if (!cart?.id && product.sku && quantity) {
    return await createCartAndAddProduct(
      [
        {
          sku: product.sku,
          quantity,
        },
      ],
      preferredMethod,
    );
  }
};

export const revalidateCart = async () => {
  revalidateTag("cart");
  revalidateTag("cart-items");
};
