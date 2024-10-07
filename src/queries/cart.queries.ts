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
    brand
    productBrand {
      name
    }
    categories {
      name
    }
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
    availability {
      cac {
        ...ProductAvailability
      }
      online {
        ...ProductAvailability
      }
    }
    prices {
      ...CartItemPrice
    }
    is_in_store
    product {
      ...BaseProductDataForCart
      delivery_promise
      stock_status
      addable_to_cart
    }
    quantity
  }
`);

export const BillingCartAddressFragment = graphql(`
  fragment BillingCartAddress on BillingCartAddress {
    city
    country {
      code
      label
    }
    firstname
    lastname
    postcode
    region {
      code
      label
    }
    street
    telephone
  }
`);

export const AvailableShippingMethodFragment = graphql(`
  fragment AvailableShippingMethod on AvailableShippingMethod {
    amount {
      currency
      value
    }
    available
    carrier_code
    carrier_title
    error_message
    method_code
    method_title
    price_excl_tax {
      currency
      value
    }
    price_incl_tax {
      currency
      value
    }
  }
`);

export const ShippingCartAddressFragment = graphql(`
  fragment ShippingCartAddress on ShippingCartAddress {
    available_shipping_methods {
      ...AvailableShippingMethod
    }
    city
    company
    country {
      code
      label
    }
    customer_notes
    firstname
    lastname
    postcode
    region {
      code
      label
      region_id
    }
    selected_shipping_method {
      amount {
        currency
        value
      }
      carrier_code
      carrier_title
      method_code
      method_title
      price_excl_tax {
        currency
        value
      }
      price_incl_tax {
        currency
        value
      }
    }
    street
    telephone
    uid
    vat_id
  }
`);

export const AvailablePaymentMethodFragment = graphql(`
  fragment AvailablePaymentMethod on AvailablePaymentMethod {
    code
    is_deferred
    title
  }
`);

export const SelectedPaymentMethodFragment = graphql(`
  fragment SelectedPaymentMethod on SelectedPaymentMethod {
    purchase_order_number
    code
    title
  }
`);

export const BaseCartFragment = graphql(`
  fragment BaseCart on Cart {
    id
    email
    billing_address {
      ...BillingCartAddress
    }
    shipping_addresses {
      ...ShippingCartAddress
    }
    available_payment_methods {
      ...AvailablePaymentMethod
    }
    selected_payment_method {
      ...SelectedPaymentMethod
    }
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

export const CustomerCartDocument = graphql(`
  query CustomerCart {
    customerCart {
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
      user_errors {
        message
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

export const PlaceOrderDocument = graphql(`
  mutation PlaceOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      order {
        order_id
        order_number
      }
    }
  }
`);

export const AssignCustomerToGuestCart = graphql(`
  mutation AssignCustomerToGuestCart($cartId: String!) {
    assignCustomerToGuestCart(cart_id: $cartId) {
      id
      ...BaseCart
    }
  }
`);

export const SetShippingAddressOnCart = graphql(`
  mutation SetShippingAddressOnCart(
    $cartId: String!
    $shipping_addresses: [ShippingAddressInput]!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: $shipping_addresses }
    ) {
      cart {
        ...BaseCart
      }
    }
  }
`);

export const SetBillingAddressOnCart = graphql(`
  mutation SetBillingAddressOnCart(
    $cartId: String!
    $billing_address: BillingAddressInput!
  ) {
    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: $billing_address }
    ) {
      cart {
        ...BaseCart
      }
    }
  }
`);

export const SetShippingMethodsOnCart = graphql(`
  mutation SetShippingMethodsOnCart(
    $cartId: String!
    $shipping_methods: [ShippingMethodInput!]!
  ) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: $shipping_methods }
    ) {
      cart {
        ...BaseCart
      }
    }
  }
`);

export const SetPaymentMethodOnCart = graphql(`
  mutation SetPaymentMethodOnCart(
    $cartId: String!
    $payment_method: PaymentMethodInput!
  ) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: $payment_method }
    ) {
      cart {
        ...BaseCart
      }
    }
  }
`);

export const VippsInitPayment = graphql(`
  mutation VippsInitPayment($input: vippsInitPaymentInput) {
    vippsInitPayment(input: $input) {
      url
    }
  }
`);

export const InitKlarnaHppPayment = graphql(`
  mutation initKlarnaHppPayment(
    $cart_id: String!
    $frontend_url: String!
    $payment_method: String!
  ) {
    initKlarnaHpp(
      input: {
        cart_id: $cart_id
        frontend_url: $frontend_url
        payment_method: $payment_method
      }
    ) {
      redirect_url
      payment_session_id
    }
  }
`);

export const SetGuestEmailOnCart = graphql(`
  mutation SetGuestEmailOnCart($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        ...BaseCart
      }
    }
  }
`);

export const ReserveOrder = graphql(`
  mutation ReserveOrder(
    $cartId: String!
    $email: String!
    $firstname: String!
    $lastname: String!
    $telephone: String!
  ) {
    reserveOrder(
      cartId: $cartId
      email: $email
      firstname: $firstname
      lastname: $lastname
      telephone: $telephone
    ) {
      order_id
      masked_id
    }
  }
`);

export const setDeliveryTypeDocument = graphql(`
  mutation setDeliveryType($input: SetDeliveryTypeInput) {
    setDeliveryType(input: $input) {
      message
    }
  }
`);

export const validateCartDocument = graphql(`
  query ValidateCart($cart_id: String!) {
    validateCart(cartId: $cart_id) {
      message
      success
    }
  }
`);
