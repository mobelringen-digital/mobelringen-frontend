import { graphql } from "@/types/schema";

export const CartPriceFragment = graphql(`
  fragment CartPrice on CartPrices {
    grand_total {
      currency
      value
    }
    discounts {
      label
      amount {
        currency
        value
      }
    }
    applied_taxes {
      amount {
        currency
        value
      }
      label
    }
    subtotal_excluding_tax {
      currency
      value
    }
    subtotal_including_tax {
      currency
      value
    }
    subtotal_with_discount_excluding_tax {
      currency
      value
    }
  }
`);

export const CartItemPriceFragment = graphql(`
  fragment CartItemPrice on CartItemPrices {
    fixed_product_taxes {
      amount {
        currency
        value
      }
      label
    }
    discounts {
      amount {
        currency
        value
      }
      label
    }
    price {
      currency
      value
    }
    price_including_tax {
      currency
      value
    }
    row_total {
      currency
      value
    }
    row_total_including_tax {
      currency
      value
    }
    total_item_discount {
      currency
      value
    }
  }
`);

export const BaseCartFragment = graphql(`
  fragment BaseCart on Cart {
    prices {
      ...CartPrice
    }
    items {
      prices {
        ...CartItemPrice
      }
      is_in_store
      product {
        id
        name
        sku
        url_key
        image {
          url
        }
      }
      quantity
    }
  }
`);

export const CartDocument = graphql(`
  query Cart($cart_id: String!) {
    cart(cart_id: $cart_id) {
      ...BaseCart
    }
  }
`);

export const CreateEmptyCartDocument = graphql(`
  mutation CreateEmptyCart {
    createEmptyCart
  }
`);

export const AddProductToCart = graphql(`
  mutation AddProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
      cart {
        ...BaseCart
      }
    }
  }
`);
