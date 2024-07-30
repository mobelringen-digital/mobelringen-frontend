import { CustomerCartDocument } from "@/queries/cart.queries";
import {
  CartDocument,
  CartQuery,
  CartQueryVariables,
  CustomerCartQuery,
  CustomerCartQueryVariables,
} from "@/types";
import {
  authorizedMagentoClient,
  baseMagentoClient,
} from "@/utils/lib/graphql";

export const CART_QUERY_KEY = ["cart"];
export type CartCookie = {
  cart: string;
  preferredMethod: string;
};

export const fetchCartService = async (cartId: string) => {
  const data = await baseMagentoClient("GET").request<
    CartQuery,
    CartQueryVariables
  >(CartDocument, {
    cart_id: cartId,
  });

  return data.cart;
};

export const fetchCustomerCartService = async (token: string) => {
  const data = await authorizedMagentoClient(token, "GET").request<
    CustomerCartQuery,
    CustomerCartQueryVariables
  >(CustomerCartDocument);

  return data.customerCart;
};
