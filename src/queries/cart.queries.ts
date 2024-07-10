import { graphql } from "@/types/schema";

export const CartPriceFragment = graphql(`
  fragment CartPrice on CartPrices {
    is_special_price
    grand_total_special_price_diff {
      currency
      value
    }
    items_grand_total_base_price {
      currency
      value
    }
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
    is_special_price
    base_price {
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
    fixed_product_taxes {
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

export const BaseProductDataForCartFragment = graphql(`
  fragment BaseProductDataForCart on ProductInterface {
    __typename
    name
    sku
    canonical_url
    special_price
    short_description {
      html
    }
    image {
      ...ProductImageFragment
    }
  }
`);

export const CartItemFragment = graphql(`
  fragment CartItem on CartItemInterface {
    id
    prices {
      ...CartItemPrice
    }
    is_in_store
    product {
      ...BaseProductDataForCart
      delivery_promise
      stock_status
    }
    quantity
  }
`);

export const BaseCartFragment = graphql(`
  fragment BaseCart on Cart {
    prices {
      ...CartPrice
    }
    items {
      ...CartItem
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

export const RemoveProductFromCart = graphql(`
  mutation RemoveProductFromCart($cartId: String!, $cartItemId: Int!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $cartItemId }) {
      cart {
        ...BaseCart
      }
    }
  }
`);

export const UpdateCartItems = graphql(`
  mutation UpdateCartItems(
    $cartId: String!
    $cartItems: [CartItemUpdateInput]!
  ) {
    updateCartItems(input: { cart_id: $cartId, cart_items: $cartItems }) {
      cart {
        ...BaseCart
      }
    }
  }
`);
