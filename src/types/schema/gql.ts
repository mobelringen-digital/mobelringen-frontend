/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment CartPrice on CartPrices {\n    is_special_price\n    grand_total_special_price_diff {\n      currency\n      value\n    }\n    items_grand_total_base_price {\n      currency\n      value\n    }\n    grand_total {\n      currency\n      value\n    }\n    discounts {\n      label\n      amount {\n        currency\n        value\n      }\n    }\n    applied_taxes {\n      amount {\n        currency\n        value\n      }\n      label\n    }\n    subtotal_excluding_tax {\n      currency\n      value\n    }\n    subtotal_including_tax {\n      currency\n      value\n    }\n    subtotal_with_discount_excluding_tax {\n      currency\n      value\n    }\n  }\n":
    types.CartPriceFragmentDoc,
  "\n  fragment CartItemPrice on CartItemPrices {\n    is_special_price\n    base_price {\n      currency\n      value\n    }\n    discounts {\n      label\n      amount {\n        currency\n        value\n      }\n    }\n    fixed_product_taxes {\n      amount {\n        currency\n        value\n      }\n      label\n    }\n    price {\n      currency\n      value\n    }\n    price_including_tax {\n      currency\n      value\n    }\n    row_total {\n      currency\n      value\n    }\n    row_total_including_tax {\n      currency\n      value\n    }\n    total_item_discount {\n      currency\n      value\n    }\n  }\n":
    types.CartItemPriceFragmentDoc,
  "\n  fragment BaseProductDataForCart on ProductInterface {\n    __typename\n    name\n    sku\n    canonical_url\n    special_price\n    short_description {\n      html\n    }\n    image {\n      ...ProductImageFragment\n    }\n  }\n":
    types.BaseProductDataForCartFragmentDoc,
  "\n  fragment CartItem on CartItemInterface {\n    id\n    prices {\n      ...CartItemPrice\n    }\n    is_in_store\n    product {\n      ...BaseProductDataForCart\n      delivery_promise\n      stock_status\n    }\n    quantity\n  }\n":
    types.CartItemFragmentDoc,
  "\n  fragment BillingCartAddress on BillingCartAddress {\n    city\n    country {\n      code\n      label\n    }\n    firstname\n    lastname\n    postcode\n    region {\n      code\n      label\n    }\n    street\n    telephone\n  }\n":
    types.BillingCartAddressFragmentDoc,
  "\n  fragment AvailableShippingMethod on AvailableShippingMethod {\n    amount {\n      currency\n      value\n    }\n    available\n    carrier_code\n    carrier_title\n    error_message\n    method_code\n    method_title\n    price_excl_tax {\n      currency\n      value\n    }\n    price_incl_tax {\n      currency\n      value\n    }\n  }\n":
    types.AvailableShippingMethodFragmentDoc,
  "\n  fragment ShippingCartAddress on ShippingCartAddress {\n    available_shipping_methods {\n      ...AvailableShippingMethod\n    }\n    city\n    company\n    country {\n      code\n      label\n    }\n    customer_notes\n    firstname\n    lastname\n    pickup_location_code\n    postcode\n    region {\n      code\n      label\n      region_id\n    }\n    selected_shipping_method {\n      amount {\n        currency\n        value\n      }\n      carrier_code\n      carrier_title\n      method_code\n      method_title\n      price_excl_tax {\n        currency\n        value\n      }\n      price_incl_tax {\n        currency\n        value\n      }\n    }\n    street\n    telephone\n    uid\n    vat_id\n  }\n":
    types.ShippingCartAddressFragmentDoc,
  "\n  fragment AvailablePaymentMethod on AvailablePaymentMethod {\n    code\n    is_deferred\n    title\n  }\n":
    types.AvailablePaymentMethodFragmentDoc,
  "\n  fragment SelectedPaymentMethod on SelectedPaymentMethod {\n    purchase_order_number\n    code\n    title\n  }\n":
    types.SelectedPaymentMethodFragmentDoc,
  "\n  fragment BaseCart on Cart {\n    id\n    email\n    billing_address {\n      ...BillingCartAddress\n    }\n    shipping_addresses {\n      ...ShippingCartAddress\n    }\n    available_payment_methods {\n      ...AvailablePaymentMethod\n    }\n    selected_payment_method {\n      ...SelectedPaymentMethod\n    }\n    prices {\n      ...CartPrice\n    }\n    items {\n      ...CartItem\n    }\n  }\n":
    types.BaseCartFragmentDoc,
  "\n  query Cart($cart_id: String!) {\n    cart(cart_id: $cart_id) {\n      ...BaseCart\n    }\n  }\n":
    types.CartDocument,
  "\n  query CustomerCart {\n    customerCart {\n      ...BaseCart\n    }\n  }\n":
    types.CustomerCartDocument,
  "\n  mutation CreateEmptyCart {\n    createEmptyCart\n  }\n":
    types.CreateEmptyCartDocument,
  "\n  mutation AddProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) {\n    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n":
    types.AddProductToCartDocument,
  "\n  mutation RemoveProductFromCart($cartId: String!, $cartItemId: Int!) {\n    removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $cartItemId }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n":
    types.RemoveProductFromCartDocument,
  "\n  mutation UpdateCartItems(\n    $cartId: String!\n    $cartItems: [CartItemUpdateInput]!\n  ) {\n    updateCartItems(input: { cart_id: $cartId, cart_items: $cartItems }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n":
    types.UpdateCartItemsDocument,
  "\n  mutation PlaceOrder($cartId: String!) {\n    placeOrder(input: { cart_id: $cartId }) {\n      order {\n        order_id\n        order_number\n      }\n    }\n  }\n":
    types.PlaceOrderDocument,
  "\n  mutation AssignCustomerToGuestCart($cartId: String!) {\n    assignCustomerToGuestCart(cart_id: $cartId) {\n      id\n      ...BaseCart\n    }\n  }\n":
    types.AssignCustomerToGuestCartDocument,
  "\n  mutation SetShippingAddressOnCart(\n    $cartId: String!\n    $shipping_addresses: [ShippingAddressInput]!\n  ) {\n    setShippingAddressesOnCart(\n      input: { cart_id: $cartId, shipping_addresses: $shipping_addresses }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n":
    types.SetShippingAddressOnCartDocument,
  "\n  mutation SetBillingAddressOnCart(\n    $cartId: String!\n    $billing_address: BillingAddressInput!\n  ) {\n    setBillingAddressOnCart(\n      input: { cart_id: $cartId, billing_address: $billing_address }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n":
    types.SetBillingAddressOnCartDocument,
  "\n  mutation SetShippingMethodsOnCart(\n    $cartId: String!\n    $shipping_methods: [ShippingMethodInput!]!\n  ) {\n    setShippingMethodsOnCart(\n      input: { cart_id: $cartId, shipping_methods: $shipping_methods }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n":
    types.SetShippingMethodsOnCartDocument,
  "\n  mutation SetPaymentMethodOnCart(\n    $cartId: String!\n    $payment_method: PaymentMethodInput!\n  ) {\n    setPaymentMethodOnCart(\n      input: { cart_id: $cartId, payment_method: $payment_method }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n":
    types.SetPaymentMethodOnCartDocument,
  "\n  mutation VippsInitPayment($input: vippsInitPaymentInput) {\n    vippsInitPayment(input: $input) {\n      url\n    }\n  }\n":
    types.VippsInitPaymentDocument,
  "\n  mutation SetGuestEmailOnCart($cartId: String!, $email: String!) {\n    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n":
    types.SetGuestEmailOnCartDocument,
  "\n  mutation ReserveOrder(\n    $cartId: String!\n    $email: String!\n    $firstname: String!\n    $lastname: String!\n    $telephone: String!\n  ) {\n    reserveOrder(\n      cartId: $cartId\n      email: $email\n      firstname: $firstname\n      lastname: $lastname\n      telephone: $telephone\n    ) {\n      order_id\n    }\n  }\n":
    types.ReserveOrderDocument,
  "\n  fragment BaseCategoryData on CategoryTree {\n    name\n    description\n    id\n    uid\n    url_path\n    product_count\n    meta_title\n    meta_keywords\n    meta_description\n    include_in_menu\n    children {\n      name\n      uid\n      url_path\n      product_count\n      include_in_menu\n      children {\n        name\n        uid\n        url_path\n        product_count\n        include_in_menu\n      }\n    }\n  }\n":
    types.BaseCategoryDataFragmentDoc,
  "\n  query Category($filters: CategoryFilterInput) {\n    categories(filters: $filters) {\n      items {\n        name\n        description\n        id\n        uid\n        url_path\n        product_count\n        meta_title\n        meta_keywords\n        meta_description\n        include_in_menu\n        children {\n          name\n          uid\n          url_path\n          product_count\n          include_in_menu\n          children {\n            name\n            uid\n            url_path\n            product_count\n            include_in_menu\n          }\n        }\n      }\n    }\n  }\n":
    types.CategoryDocument,
  "\n  fragment CmsSalesBubble on SaleBubble {\n    url\n    middleLine\n    position\n    topLine\n    bottomLine\n  }\n":
    types.CmsSalesBubbleFragmentDoc,
  "\n  fragment CmsBanner on Banner {\n    ... on Banner {\n      __typename\n      alt\n      identify\n      variant\n      centerText\n      bannerImage {\n        mimeType\n        url\n        width\n      }\n      salesBubble {\n        ...CmsSalesBubble\n      }\n    }\n  }\n":
    types.CmsBannerFragmentDoc,
  "\n  fragment CmsProductSlider on ProductSlider {\n    ... on ProductSlider {\n      __typename\n      categoryId\n      type\n      title\n    }\n  }\n":
    types.CmsProductSliderFragmentDoc,
  "\n  fragment CmsLink on Link {\n    __typename\n    label\n    url\n    icon {\n      url\n    }\n  }\n":
    types.CmsLinkFragmentDoc,
  "\n  fragment CmsMegamenuDropdown on MegaMenuDropdown {\n    __typename\n    label\n    items {\n      ... on Link {\n        ...CmsLink\n      }\n      ... on ImageLink {\n        __typename\n        label\n        url\n        image {\n          url\n        }\n      }\n    }\n  }\n":
    types.CmsMegamenuDropdownFragmentDoc,
  "\n  fragment CmsMegaMenuCategoriesDropdown on MegaMenuCategoriesDropdown {\n    __typename\n    label\n  }\n":
    types.CmsMegaMenuCategoriesDropdownFragmentDoc,
  "\n  fragment CmsLinkBlock on LinkBlock {\n    __typename\n    id\n    label\n    links {\n      ... on Link {\n        ...CmsLink\n      }\n    }\n  }\n":
    types.CmsLinkBlockFragmentDoc,
  "\n  query Menu($where: MenuWhereInput) {\n    menus(where: $where) {\n      menuLocation\n      links {\n        ... on LinkBlock {\n          ...CmsLinkBlock\n        }\n        ... on Link {\n          ...CmsLink\n        }\n        ... on MegaMenuCategoriesDropdown {\n          ...CmsMegaMenuCategoriesDropdown\n        }\n        ... on MegaMenuDropdown {\n          ...CmsMegamenuDropdown\n        }\n      }\n    }\n  }\n":
    types.MenuDocument,
  "\n  mutation GenerateCustomerToken($email: String!, $password: String!) {\n    generateCustomerToken(email: $email, password: $password) {\n      token\n    }\n  }\n":
    types.GenerateCustomerTokenDocument,
  "\n  fragment CustomerAddress on CustomerAddress {\n    city\n    company\n    country_code\n    vat_id\n    telephone\n    suffix\n    street\n    region_id\n    prefix\n    postcode\n    middlename\n    lastname\n    id\n    firstname\n    fax\n    default_shipping\n    default_billing\n  }\n":
    types.CustomerAddressFragmentDoc,
  "\n  fragment CustomerData on Customer {\n    orders {\n      total_count\n    }\n    firstname\n    lastname\n    is_subscribed\n    favorite_store\n    addresses {\n      ...CustomerAddress\n    }\n  }\n":
    types.CustomerDataFragmentDoc,
  "\n  query Customer {\n    customer {\n      ...CustomerData\n    }\n  }\n":
    types.CustomerDocument,
  "\n  mutation UpdateCustomer($input: CustomerUpdateInput!) {\n    updateCustomerV2(input: $input) {\n      customer {\n        ...CustomerData\n      }\n    }\n  }\n":
    types.UpdateCustomerDocument,
  "\n  query CmsPages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      url\n      content {\n        ...CmsBanner\n        ...CmsProductSlider\n        ...CmsBlockRow\n      }\n    }\n  }\n":
    types.CmsPagesDocument,
  "\n  query CmsStaticPageConfiguration(\n    $where: StaticPageConfigurationWhereUniqueInput!\n  ) {\n    staticPageConfiguration(where: $where) {\n      content {\n        ...CmsBlockRow\n        ...CmsBanner\n        ...CmsProductSlider\n      }\n    }\n  }\n":
    types.CmsStaticPageConfigurationDocument,
  "\n  fragment CmsDynamicHeader on DynamicHeader {\n    id\n    rule {\n      ... on RuleBlock {\n        id\n        value\n        contentType\n      }\n    }\n    banner {\n      ...CmsBanner\n    }\n  }\n":
    types.CmsDynamicHeaderFragmentDoc,
  "\n  query CmsDynamicHeaders($where: DynamicHeaderWhereInput) {\n    dynamicHeaders(where: $where) {\n      ...CmsDynamicHeader\n    }\n  }\n":
    types.CmsDynamicHeadersDocument,
  "\n  fragment CmsImageLink on ImageLink {\n    ... on ImageLink {\n      __typename\n      id\n      label\n      url\n      caption\n      image {\n        url\n        width\n        height\n      }\n    }\n  }\n":
    types.CmsImageLinkFragmentDoc,
  "\n  fragment CmsTextBlock on TextBlock {\n    ... on TextBlock {\n      __typename\n      id\n      title\n      textAlign\n      content {\n        html\n      }\n      links {\n        ... on Link {\n          id\n          label\n          url\n        }\n      }\n    }\n  }\n":
    types.CmsTextBlockFragmentDoc,
  "\n  fragment CmsColumn on Column {\n    ... on Column {\n      __typename\n      id\n      content {\n        ...CmsTextBlock\n        ...CmsImageLink\n      }\n      desktopPosition\n      mobilePosition\n    }\n  }\n":
    types.CmsColumnFragmentDoc,
  "\n  fragment CmsBlockRow on BlockRow {\n    ... on BlockRow {\n      __typename\n      id\n      backgroundColor\n      useFullPageWidth\n      columns {\n        ...CmsColumn\n      }\n    }\n  }\n":
    types.CmsBlockRowFragmentDoc,
  "\n  fragment ConfigurableProductOptions on ConfigurableProductOptions {\n    __typename\n    values {\n      default_label\n      label\n      store_label\n      uid\n      use_default_value\n      value_index\n    }\n    attribute_code\n    attribute_uid\n    label\n    position\n    uid\n    use_default\n  }\n":
    types.ConfigurableProductOptionsFragmentDoc,
  "\n  fragment ConfigurableProductVariants on ConfigurableVariant {\n    __typename\n    attributes {\n      code\n      label\n      uid\n      value_index\n    }\n    product {\n      ...BaseProduct\n    }\n  }\n":
    types.ConfigurableProductVariantsFragmentDoc,
  "\n  fragment ConfigurableProduct on ConfigurableProduct {\n    __typename\n    ...BaseProduct\n    configurable_options {\n      ...ConfigurableProductOptions\n    }\n    variants {\n      ...ConfigurableProductVariants\n    }\n  }\n":
    types.ConfigurableProductFragmentDoc,
  "\n  query BestSellingProductsByCategory($categoryId: Int!) {\n    bestSellingProductsByCategory(categoryId: $categoryId) {\n      ...BaseProduct\n    }\n  }\n":
    types.BestSellingProductsByCategoryDocument,
  "\n  fragment ProductImageFragment on ProductImage {\n    __typename\n    url\n    position\n    label\n    disabled\n  }\n":
    types.ProductImageFragmentFragmentDoc,
  "\n  fragment ProductVideoFragment on ProductVideo {\n    __typename\n    disabled\n    label\n    position\n    url\n    video_content {\n      media_type\n      video_description\n      video_metadata\n      video_provider\n      video_title\n      video_url\n    }\n  }\n":
    types.ProductVideoFragmentFragmentDoc,
  "\n  fragment ProductMediaGallery on MediaGalleryInterface {\n    __typename\n    disabled\n    label\n    position\n    url\n    ... on ProductImage {\n      ...ProductImageFragment\n    }\n    ... on ProductVideo {\n      ...ProductVideoFragment\n    }\n  }\n":
    types.ProductMediaGalleryFragmentDoc,
  "\n  fragment ProductLabel on Label {\n    custom\n    discount\n    new\n  }\n":
    types.ProductLabelFragmentDoc,
  "\n  fragment ProductPriceRange on PriceRange {\n    maximum_price {\n      discount {\n        amount_off\n        percent_off\n      }\n      final_price {\n        currency\n        value\n      }\n      fixed_product_taxes {\n        amount {\n          currency\n          value\n        }\n        label\n      }\n      regular_price {\n        currency\n        value\n      }\n    }\n    minimum_price {\n      discount {\n        amount_off\n        percent_off\n      }\n      final_price {\n        currency\n        value\n      }\n      fixed_product_taxes {\n        amount {\n          currency\n          value\n        }\n        label\n      }\n      regular_price {\n        currency\n        value\n      }\n    }\n  }\n":
    types.ProductPriceRangeFragmentDoc,
  "\n  fragment BaseProduct on ProductInterface {\n    __typename\n    url_key\n    canonical_url\n    description {\n      html\n    }\n    gift_message_available\n    review_count\n    image {\n      ...ProductImageFragment\n    }\n    media_gallery {\n      ...ProductMediaGallery\n    }\n    meta_description\n    meta_keyword\n    meta_title\n    name\n    new_from_date\n    new_to_date\n    price_range {\n      ...ProductPriceRange\n    }\n    productBrand {\n      brand_image_url\n      name\n    }\n    uid\n    special_to_date\n    special_price\n    small_image {\n      disabled\n      label\n      position\n      url\n    }\n    sku\n    short_description {\n      html\n    }\n    addable_to_cart\n    categories {\n      url_path\n      name\n    }\n    productLabel {\n      ...ProductLabel\n    }\n    delivery_promise\n    maintenance_description\n    stock_status\n  }\n":
    types.BaseProductFragmentDoc,
  "\n  fragment ProductAggregations on Aggregation {\n    attribute_code\n    count\n    frontend_input\n    has_more\n    label\n    options {\n      count\n      label\n      value\n    }\n    position\n    rel_nofollow\n  }\n":
    types.ProductAggregationsFragmentDoc,
  "\n  query Products(\n    $pageSize: Int = 12\n    $filter: ProductAttributeFilterInput\n    $sort: ProductAttributeSortInput\n    $currentPage: Int\n  ) {\n    products(\n      pageSize: $pageSize\n      filter: $filter\n      sort: $sort\n      currentPage: $currentPage\n    ) {\n      total_count\n      page_info {\n        current_page\n        page_size\n        total_pages\n      }\n      aggregations {\n        ...ProductAggregations\n      }\n      items {\n        ... on SimpleProduct {\n          ...SimpleProduct\n        }\n        ... on ConfigurableProduct {\n          ...ConfigurableProduct\n        }\n      }\n    }\n  }\n":
    types.ProductsDocument,
  "\n  query ProductReviews(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        rating_summary\n        review_count\n        reviews {\n          items {\n            average_rating\n            nickname\n            summary\n            text\n          }\n        }\n      }\n    }\n  }\n":
    types.ProductReviewsDocument,
  "\n  query ProductStock($pageSize: Int = 1, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        is_returnable\n        only_x_left_in_stock\n        stock_status\n      }\n    }\n  }\n":
    types.ProductStockDocument,
  "\n  query ProductMeasurements(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        measurement_depth\n        measurement_diameter\n        measurement_gross_weight\n        measurement_height\n        measurement_length\n        measurement_seat_height\n        measurement_thickness\n        measurement_volume\n        measurement_width\n      }\n    }\n  }\n":
    types.ProductMeasurementsDocument,
  "\n  fragment SimpleProduct on SimpleProduct {\n    ...BaseProduct\n  }\n":
    types.SimpleProductFragmentDoc,
  "\n  fragment BaseProductDataForCard on ProductInterface {\n    __typename\n    name\n    sku\n    canonical_url\n    short_description {\n      html\n    }\n    price_range {\n      ...ProductPriceRange\n    }\n    image {\n      ...ProductImageFragment\n    }\n    productLabel {\n      ...ProductLabel\n    }\n  }\n":
    types.BaseProductDataForCardFragmentDoc,
  "\n  fragment ProductSeriesSliderData on ProductInterface {\n    __typename\n    series {\n      ...BaseProductDataForCard\n    }\n  }\n":
    types.ProductSeriesSliderDataFragmentDoc,
  "\n  fragment RelatedProductsSliderData on ProductInterface {\n    __typename\n    related_products {\n      ...BaseProductDataForCard\n    }\n  }\n":
    types.RelatedProductsSliderDataFragmentDoc,
  "\n  fragment UpsellProductsSliderData on ProductInterface {\n    __typename\n    upsell_products {\n      ...BaseProductDataForCard\n    }\n  }\n":
    types.UpsellProductsSliderDataFragmentDoc,
  "\n  fragment BaseProductSliderData on ProductInterface {\n    ...RelatedProductsSliderData\n    ...ProductSeriesSliderData\n    ...UpsellProductsSliderData\n  }\n":
    types.BaseProductSliderDataFragmentDoc,
  "\n  query ProductSliderData(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        __typename\n        ...BaseProductSliderData\n      }\n    }\n  }\n":
    types.ProductSliderDataDocument,
  "\n  query Route($url: String!) {\n    route(url: $url) {\n      redirect_code\n      relative_url\n      type\n      ... on SimpleProduct {\n        __typename\n        name\n        sku\n      }\n      ... on ConfigurableProduct {\n        __typename\n        name\n        sku\n      }\n    }\n  }\n":
    types.RouteDocument,
  "\n  fragment StoreConsent on ConfigConsent {\n    code\n    is_required\n    label\n  }\n":
    types.StoreConsentFragmentDoc,
  "\n  query StoreConfig {\n    storeConfig {\n      brands_category\n      category_url_suffix\n      consents {\n        ...StoreConsent\n      }\n      copyright\n      returns_enabled\n      absolute_footer\n      allow_gift_receipt\n      allow_gift_wrapping_on_order\n      allow_gift_wrapping_on_order_items\n      allow_guests_to_write_product_reviews\n      allow_items\n      allow_order\n      allow_printed_card\n      autocomplete_on_storefront\n      base_currency_code\n      base_link_url\n      base_media_url\n      base_static_url\n      base_url\n      braintree_cc_vault_active\n      cart_gift_wrapping\n      cart_printed_card\n      catalog_default_sort_by\n      category_fixed_product_tax_display_setting\n      check_money_order_enable_for_specific_countries\n      check_money_order_enabled\n      check_money_order_make_check_payable_to\n      check_money_order_max_order_total\n      check_money_order_min_order_total\n      check_money_order_new_order_status\n      check_money_order_payment_from_specific_countries\n      check_money_order_send_check_to\n      check_money_order_sort_order\n      check_money_order_title\n      cms_home_page\n      cms_no_cookies\n      cms_no_route\n      code\n      configurable_thumbnail_source\n      default_description\n      default_display_currency_code\n      default_title\n      default_keywords\n      demonotice\n      enable_multiple_wishlists\n      front\n      grid_per_page\n      grid_per_page_values\n      head_includes\n      head_shortcut_icon\n      header_logo_src\n      id\n      is_default_store\n      is_default_store_group\n      list_mode\n      list_per_page\n      list_per_page_values\n      locale\n      logo_alt\n      logo_height\n      logo_width\n      magento_reward_general_is_enabled\n      magento_reward_general_is_enabled_on_front\n      magento_reward_general_min_points_balance\n      magento_reward_general_publish_history\n      magento_reward_points_invitation_customer\n      magento_reward_points_invitation_customer_limit\n      magento_reward_points_invitation_order\n      magento_reward_points_invitation_order_limit\n      magento_reward_points_newsletter\n      magento_reward_points_order\n      magento_reward_points_register\n      magento_reward_points_review\n      magento_reward_points_review_limit\n      magento_wishlist_general_is_enabled\n      maximum_number_of_wishlists\n      minimum_password_length\n      no_route\n      payment_payflowpro_cc_vault_active\n      printed_card_price\n      product_fixed_product_tax_display_setting\n      product_reviews_enabled\n      product_url_suffix\n      required_character_classes_number\n      root_category_id\n      root_category_uid\n      sales_fixed_product_tax_display_setting\n      sales_gift_wrapping\n      sales_printed_card\n      secure_base_link_url\n      secure_base_media_url\n      secure_base_static_url\n      secure_base_url\n      send_friend {\n        enabled_for_customers\n        enabled_for_guests\n      }\n      show_cms_breadcrumbs\n      store_code\n      store_group_code\n      store_group_name\n      store_name\n      store_sort_order\n      timezone\n      title_prefix\n      title_separator\n      title_suffix\n      use_store_in_url\n      website_code\n      website_id\n      website_name\n      weight_unit\n      welcome\n      zero_subtotal_enable_for_specific_countries\n      zero_subtotal_enabled\n      zero_subtotal_new_order_status\n      zero_subtotal_payment_action\n      zero_subtotal_payment_from_specific_countries\n      zero_subtotal_sort_order\n      zero_subtotal_title\n    }\n  }\n":
    types.StoreConfigDocument,
  "\n  fragment BaseStore on Store {\n    __typename\n    city\n    country\n    email\n    externalUrl\n    external_id\n    id\n    is_visible_on_map\n    latitude\n    longitude\n    name\n    opening_hours {\n      additionalInformation\n      friday\n      monday\n      saturday\n      sunday\n      thursday\n      tuesday\n      wednesday\n    }\n    organization_number\n    phone\n    postcode\n    region\n    street\n  }\n":
    types.BaseStoreFragmentDoc,
  "\n  query StoresList {\n    getStores {\n      ...BaseStore\n    }\n  }\n":
    types.StoresListDocument,
  "\n  query Store($id: String!) {\n    getStore(storeId: $id) {\n      ...BaseStore\n    }\n  }\n":
    types.StoreDocument,
  "\n  mutation UpdateCartItemsIsInStore($cartId: String!, $storeId: String!) {\n    updateCartItemsIsInStore(cartId: $cartId, storeId: $storeId) {\n      success\n      message\n    }\n  }\n":
    types.UpdateCartItemsIsInStoreDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CartPrice on CartPrices {\n    is_special_price\n    grand_total_special_price_diff {\n      currency\n      value\n    }\n    items_grand_total_base_price {\n      currency\n      value\n    }\n    grand_total {\n      currency\n      value\n    }\n    discounts {\n      label\n      amount {\n        currency\n        value\n      }\n    }\n    applied_taxes {\n      amount {\n        currency\n        value\n      }\n      label\n    }\n    subtotal_excluding_tax {\n      currency\n      value\n    }\n    subtotal_including_tax {\n      currency\n      value\n    }\n    subtotal_with_discount_excluding_tax {\n      currency\n      value\n    }\n  }\n",
): (typeof documents)["\n  fragment CartPrice on CartPrices {\n    is_special_price\n    grand_total_special_price_diff {\n      currency\n      value\n    }\n    items_grand_total_base_price {\n      currency\n      value\n    }\n    grand_total {\n      currency\n      value\n    }\n    discounts {\n      label\n      amount {\n        currency\n        value\n      }\n    }\n    applied_taxes {\n      amount {\n        currency\n        value\n      }\n      label\n    }\n    subtotal_excluding_tax {\n      currency\n      value\n    }\n    subtotal_including_tax {\n      currency\n      value\n    }\n    subtotal_with_discount_excluding_tax {\n      currency\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CartItemPrice on CartItemPrices {\n    is_special_price\n    base_price {\n      currency\n      value\n    }\n    discounts {\n      label\n      amount {\n        currency\n        value\n      }\n    }\n    fixed_product_taxes {\n      amount {\n        currency\n        value\n      }\n      label\n    }\n    price {\n      currency\n      value\n    }\n    price_including_tax {\n      currency\n      value\n    }\n    row_total {\n      currency\n      value\n    }\n    row_total_including_tax {\n      currency\n      value\n    }\n    total_item_discount {\n      currency\n      value\n    }\n  }\n",
): (typeof documents)["\n  fragment CartItemPrice on CartItemPrices {\n    is_special_price\n    base_price {\n      currency\n      value\n    }\n    discounts {\n      label\n      amount {\n        currency\n        value\n      }\n    }\n    fixed_product_taxes {\n      amount {\n        currency\n        value\n      }\n      label\n    }\n    price {\n      currency\n      value\n    }\n    price_including_tax {\n      currency\n      value\n    }\n    row_total {\n      currency\n      value\n    }\n    row_total_including_tax {\n      currency\n      value\n    }\n    total_item_discount {\n      currency\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BaseProductDataForCart on ProductInterface {\n    __typename\n    name\n    sku\n    canonical_url\n    special_price\n    short_description {\n      html\n    }\n    image {\n      ...ProductImageFragment\n    }\n  }\n",
): (typeof documents)["\n  fragment BaseProductDataForCart on ProductInterface {\n    __typename\n    name\n    sku\n    canonical_url\n    special_price\n    short_description {\n      html\n    }\n    image {\n      ...ProductImageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CartItem on CartItemInterface {\n    id\n    prices {\n      ...CartItemPrice\n    }\n    is_in_store\n    product {\n      ...BaseProductDataForCart\n      delivery_promise\n      stock_status\n    }\n    quantity\n  }\n",
): (typeof documents)["\n  fragment CartItem on CartItemInterface {\n    id\n    prices {\n      ...CartItemPrice\n    }\n    is_in_store\n    product {\n      ...BaseProductDataForCart\n      delivery_promise\n      stock_status\n    }\n    quantity\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BillingCartAddress on BillingCartAddress {\n    city\n    country {\n      code\n      label\n    }\n    firstname\n    lastname\n    postcode\n    region {\n      code\n      label\n    }\n    street\n    telephone\n  }\n",
): (typeof documents)["\n  fragment BillingCartAddress on BillingCartAddress {\n    city\n    country {\n      code\n      label\n    }\n    firstname\n    lastname\n    postcode\n    region {\n      code\n      label\n    }\n    street\n    telephone\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AvailableShippingMethod on AvailableShippingMethod {\n    amount {\n      currency\n      value\n    }\n    available\n    carrier_code\n    carrier_title\n    error_message\n    method_code\n    method_title\n    price_excl_tax {\n      currency\n      value\n    }\n    price_incl_tax {\n      currency\n      value\n    }\n  }\n",
): (typeof documents)["\n  fragment AvailableShippingMethod on AvailableShippingMethod {\n    amount {\n      currency\n      value\n    }\n    available\n    carrier_code\n    carrier_title\n    error_message\n    method_code\n    method_title\n    price_excl_tax {\n      currency\n      value\n    }\n    price_incl_tax {\n      currency\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ShippingCartAddress on ShippingCartAddress {\n    available_shipping_methods {\n      ...AvailableShippingMethod\n    }\n    city\n    company\n    country {\n      code\n      label\n    }\n    customer_notes\n    firstname\n    lastname\n    pickup_location_code\n    postcode\n    region {\n      code\n      label\n      region_id\n    }\n    selected_shipping_method {\n      amount {\n        currency\n        value\n      }\n      carrier_code\n      carrier_title\n      method_code\n      method_title\n      price_excl_tax {\n        currency\n        value\n      }\n      price_incl_tax {\n        currency\n        value\n      }\n    }\n    street\n    telephone\n    uid\n    vat_id\n  }\n",
): (typeof documents)["\n  fragment ShippingCartAddress on ShippingCartAddress {\n    available_shipping_methods {\n      ...AvailableShippingMethod\n    }\n    city\n    company\n    country {\n      code\n      label\n    }\n    customer_notes\n    firstname\n    lastname\n    pickup_location_code\n    postcode\n    region {\n      code\n      label\n      region_id\n    }\n    selected_shipping_method {\n      amount {\n        currency\n        value\n      }\n      carrier_code\n      carrier_title\n      method_code\n      method_title\n      price_excl_tax {\n        currency\n        value\n      }\n      price_incl_tax {\n        currency\n        value\n      }\n    }\n    street\n    telephone\n    uid\n    vat_id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AvailablePaymentMethod on AvailablePaymentMethod {\n    code\n    is_deferred\n    title\n  }\n",
): (typeof documents)["\n  fragment AvailablePaymentMethod on AvailablePaymentMethod {\n    code\n    is_deferred\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment SelectedPaymentMethod on SelectedPaymentMethod {\n    purchase_order_number\n    code\n    title\n  }\n",
): (typeof documents)["\n  fragment SelectedPaymentMethod on SelectedPaymentMethod {\n    purchase_order_number\n    code\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BaseCart on Cart {\n    id\n    email\n    billing_address {\n      ...BillingCartAddress\n    }\n    shipping_addresses {\n      ...ShippingCartAddress\n    }\n    available_payment_methods {\n      ...AvailablePaymentMethod\n    }\n    selected_payment_method {\n      ...SelectedPaymentMethod\n    }\n    prices {\n      ...CartPrice\n    }\n    items {\n      ...CartItem\n    }\n  }\n",
): (typeof documents)["\n  fragment BaseCart on Cart {\n    id\n    email\n    billing_address {\n      ...BillingCartAddress\n    }\n    shipping_addresses {\n      ...ShippingCartAddress\n    }\n    available_payment_methods {\n      ...AvailablePaymentMethod\n    }\n    selected_payment_method {\n      ...SelectedPaymentMethod\n    }\n    prices {\n      ...CartPrice\n    }\n    items {\n      ...CartItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Cart($cart_id: String!) {\n    cart(cart_id: $cart_id) {\n      ...BaseCart\n    }\n  }\n",
): (typeof documents)["\n  query Cart($cart_id: String!) {\n    cart(cart_id: $cart_id) {\n      ...BaseCart\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CustomerCart {\n    customerCart {\n      ...BaseCart\n    }\n  }\n",
): (typeof documents)["\n  query CustomerCart {\n    customerCart {\n      ...BaseCart\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateEmptyCart {\n    createEmptyCart\n  }\n",
): (typeof documents)["\n  mutation CreateEmptyCart {\n    createEmptyCart\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) {\n    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation AddProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) {\n    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveProductFromCart($cartId: String!, $cartItemId: Int!) {\n    removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $cartItemId }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation RemoveProductFromCart($cartId: String!, $cartItemId: Int!) {\n    removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $cartItemId }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateCartItems(\n    $cartId: String!\n    $cartItems: [CartItemUpdateInput]!\n  ) {\n    updateCartItems(input: { cart_id: $cartId, cart_items: $cartItems }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateCartItems(\n    $cartId: String!\n    $cartItems: [CartItemUpdateInput]!\n  ) {\n    updateCartItems(input: { cart_id: $cartId, cart_items: $cartItems }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation PlaceOrder($cartId: String!) {\n    placeOrder(input: { cart_id: $cartId }) {\n      order {\n        order_id\n        order_number\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation PlaceOrder($cartId: String!) {\n    placeOrder(input: { cart_id: $cartId }) {\n      order {\n        order_id\n        order_number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AssignCustomerToGuestCart($cartId: String!) {\n    assignCustomerToGuestCart(cart_id: $cartId) {\n      id\n      ...BaseCart\n    }\n  }\n",
): (typeof documents)["\n  mutation AssignCustomerToGuestCart($cartId: String!) {\n    assignCustomerToGuestCart(cart_id: $cartId) {\n      id\n      ...BaseCart\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetShippingAddressOnCart(\n    $cartId: String!\n    $shipping_addresses: [ShippingAddressInput]!\n  ) {\n    setShippingAddressesOnCart(\n      input: { cart_id: $cartId, shipping_addresses: $shipping_addresses }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SetShippingAddressOnCart(\n    $cartId: String!\n    $shipping_addresses: [ShippingAddressInput]!\n  ) {\n    setShippingAddressesOnCart(\n      input: { cart_id: $cartId, shipping_addresses: $shipping_addresses }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetBillingAddressOnCart(\n    $cartId: String!\n    $billing_address: BillingAddressInput!\n  ) {\n    setBillingAddressOnCart(\n      input: { cart_id: $cartId, billing_address: $billing_address }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SetBillingAddressOnCart(\n    $cartId: String!\n    $billing_address: BillingAddressInput!\n  ) {\n    setBillingAddressOnCart(\n      input: { cart_id: $cartId, billing_address: $billing_address }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetShippingMethodsOnCart(\n    $cartId: String!\n    $shipping_methods: [ShippingMethodInput!]!\n  ) {\n    setShippingMethodsOnCart(\n      input: { cart_id: $cartId, shipping_methods: $shipping_methods }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SetShippingMethodsOnCart(\n    $cartId: String!\n    $shipping_methods: [ShippingMethodInput!]!\n  ) {\n    setShippingMethodsOnCart(\n      input: { cart_id: $cartId, shipping_methods: $shipping_methods }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetPaymentMethodOnCart(\n    $cartId: String!\n    $payment_method: PaymentMethodInput!\n  ) {\n    setPaymentMethodOnCart(\n      input: { cart_id: $cartId, payment_method: $payment_method }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SetPaymentMethodOnCart(\n    $cartId: String!\n    $payment_method: PaymentMethodInput!\n  ) {\n    setPaymentMethodOnCart(\n      input: { cart_id: $cartId, payment_method: $payment_method }\n    ) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation VippsInitPayment($input: vippsInitPaymentInput) {\n    vippsInitPayment(input: $input) {\n      url\n    }\n  }\n",
): (typeof documents)["\n  mutation VippsInitPayment($input: vippsInitPaymentInput) {\n    vippsInitPayment(input: $input) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetGuestEmailOnCart($cartId: String!, $email: String!) {\n    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SetGuestEmailOnCart($cartId: String!, $email: String!) {\n    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {\n      cart {\n        ...BaseCart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ReserveOrder(\n    $cartId: String!\n    $email: String!\n    $firstname: String!\n    $lastname: String!\n    $telephone: String!\n  ) {\n    reserveOrder(\n      cartId: $cartId\n      email: $email\n      firstname: $firstname\n      lastname: $lastname\n      telephone: $telephone\n    ) {\n      order_id\n    }\n  }\n",
): (typeof documents)["\n  mutation ReserveOrder(\n    $cartId: String!\n    $email: String!\n    $firstname: String!\n    $lastname: String!\n    $telephone: String!\n  ) {\n    reserveOrder(\n      cartId: $cartId\n      email: $email\n      firstname: $firstname\n      lastname: $lastname\n      telephone: $telephone\n    ) {\n      order_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BaseCategoryData on CategoryTree {\n    name\n    description\n    id\n    uid\n    url_path\n    product_count\n    meta_title\n    meta_keywords\n    meta_description\n    include_in_menu\n    children {\n      name\n      uid\n      url_path\n      product_count\n      include_in_menu\n      children {\n        name\n        uid\n        url_path\n        product_count\n        include_in_menu\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment BaseCategoryData on CategoryTree {\n    name\n    description\n    id\n    uid\n    url_path\n    product_count\n    meta_title\n    meta_keywords\n    meta_description\n    include_in_menu\n    children {\n      name\n      uid\n      url_path\n      product_count\n      include_in_menu\n      children {\n        name\n        uid\n        url_path\n        product_count\n        include_in_menu\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Category($filters: CategoryFilterInput) {\n    categories(filters: $filters) {\n      items {\n        name\n        description\n        id\n        uid\n        url_path\n        product_count\n        meta_title\n        meta_keywords\n        meta_description\n        include_in_menu\n        children {\n          name\n          uid\n          url_path\n          product_count\n          include_in_menu\n          children {\n            name\n            uid\n            url_path\n            product_count\n            include_in_menu\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Category($filters: CategoryFilterInput) {\n    categories(filters: $filters) {\n      items {\n        name\n        description\n        id\n        uid\n        url_path\n        product_count\n        meta_title\n        meta_keywords\n        meta_description\n        include_in_menu\n        children {\n          name\n          uid\n          url_path\n          product_count\n          include_in_menu\n          children {\n            name\n            uid\n            url_path\n            product_count\n            include_in_menu\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsSalesBubble on SaleBubble {\n    url\n    middleLine\n    position\n    topLine\n    bottomLine\n  }\n",
): (typeof documents)["\n  fragment CmsSalesBubble on SaleBubble {\n    url\n    middleLine\n    position\n    topLine\n    bottomLine\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsBanner on Banner {\n    ... on Banner {\n      __typename\n      alt\n      identify\n      variant\n      centerText\n      bannerImage {\n        mimeType\n        url\n        width\n      }\n      salesBubble {\n        ...CmsSalesBubble\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsBanner on Banner {\n    ... on Banner {\n      __typename\n      alt\n      identify\n      variant\n      centerText\n      bannerImage {\n        mimeType\n        url\n        width\n      }\n      salesBubble {\n        ...CmsSalesBubble\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsProductSlider on ProductSlider {\n    ... on ProductSlider {\n      __typename\n      categoryId\n      type\n      title\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsProductSlider on ProductSlider {\n    ... on ProductSlider {\n      __typename\n      categoryId\n      type\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsLink on Link {\n    __typename\n    label\n    url\n    icon {\n      url\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsLink on Link {\n    __typename\n    label\n    url\n    icon {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsMegamenuDropdown on MegaMenuDropdown {\n    __typename\n    label\n    items {\n      ... on Link {\n        ...CmsLink\n      }\n      ... on ImageLink {\n        __typename\n        label\n        url\n        image {\n          url\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsMegamenuDropdown on MegaMenuDropdown {\n    __typename\n    label\n    items {\n      ... on Link {\n        ...CmsLink\n      }\n      ... on ImageLink {\n        __typename\n        label\n        url\n        image {\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsMegaMenuCategoriesDropdown on MegaMenuCategoriesDropdown {\n    __typename\n    label\n  }\n",
): (typeof documents)["\n  fragment CmsMegaMenuCategoriesDropdown on MegaMenuCategoriesDropdown {\n    __typename\n    label\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsLinkBlock on LinkBlock {\n    __typename\n    id\n    label\n    links {\n      ... on Link {\n        ...CmsLink\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsLinkBlock on LinkBlock {\n    __typename\n    id\n    label\n    links {\n      ... on Link {\n        ...CmsLink\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Menu($where: MenuWhereInput) {\n    menus(where: $where) {\n      menuLocation\n      links {\n        ... on LinkBlock {\n          ...CmsLinkBlock\n        }\n        ... on Link {\n          ...CmsLink\n        }\n        ... on MegaMenuCategoriesDropdown {\n          ...CmsMegaMenuCategoriesDropdown\n        }\n        ... on MegaMenuDropdown {\n          ...CmsMegamenuDropdown\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Menu($where: MenuWhereInput) {\n    menus(where: $where) {\n      menuLocation\n      links {\n        ... on LinkBlock {\n          ...CmsLinkBlock\n        }\n        ... on Link {\n          ...CmsLink\n        }\n        ... on MegaMenuCategoriesDropdown {\n          ...CmsMegaMenuCategoriesDropdown\n        }\n        ... on MegaMenuDropdown {\n          ...CmsMegamenuDropdown\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation GenerateCustomerToken($email: String!, $password: String!) {\n    generateCustomerToken(email: $email, password: $password) {\n      token\n    }\n  }\n",
): (typeof documents)["\n  mutation GenerateCustomerToken($email: String!, $password: String!) {\n    generateCustomerToken(email: $email, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CustomerAddress on CustomerAddress {\n    city\n    company\n    country_code\n    vat_id\n    telephone\n    suffix\n    street\n    region_id\n    prefix\n    postcode\n    middlename\n    lastname\n    id\n    firstname\n    fax\n    default_shipping\n    default_billing\n  }\n",
): (typeof documents)["\n  fragment CustomerAddress on CustomerAddress {\n    city\n    company\n    country_code\n    vat_id\n    telephone\n    suffix\n    street\n    region_id\n    prefix\n    postcode\n    middlename\n    lastname\n    id\n    firstname\n    fax\n    default_shipping\n    default_billing\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CustomerData on Customer {\n    orders {\n      total_count\n    }\n    firstname\n    lastname\n    is_subscribed\n    favorite_store\n    addresses {\n      ...CustomerAddress\n    }\n  }\n",
): (typeof documents)["\n  fragment CustomerData on Customer {\n    orders {\n      total_count\n    }\n    firstname\n    lastname\n    is_subscribed\n    favorite_store\n    addresses {\n      ...CustomerAddress\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Customer {\n    customer {\n      ...CustomerData\n    }\n  }\n",
): (typeof documents)["\n  query Customer {\n    customer {\n      ...CustomerData\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateCustomer($input: CustomerUpdateInput!) {\n    updateCustomerV2(input: $input) {\n      customer {\n        ...CustomerData\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateCustomer($input: CustomerUpdateInput!) {\n    updateCustomerV2(input: $input) {\n      customer {\n        ...CustomerData\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CmsPages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      url\n      content {\n        ...CmsBanner\n        ...CmsProductSlider\n        ...CmsBlockRow\n      }\n    }\n  }\n",
): (typeof documents)["\n  query CmsPages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      url\n      content {\n        ...CmsBanner\n        ...CmsProductSlider\n        ...CmsBlockRow\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CmsStaticPageConfiguration(\n    $where: StaticPageConfigurationWhereUniqueInput!\n  ) {\n    staticPageConfiguration(where: $where) {\n      content {\n        ...CmsBlockRow\n        ...CmsBanner\n        ...CmsProductSlider\n      }\n    }\n  }\n",
): (typeof documents)["\n  query CmsStaticPageConfiguration(\n    $where: StaticPageConfigurationWhereUniqueInput!\n  ) {\n    staticPageConfiguration(where: $where) {\n      content {\n        ...CmsBlockRow\n        ...CmsBanner\n        ...CmsProductSlider\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsDynamicHeader on DynamicHeader {\n    id\n    rule {\n      ... on RuleBlock {\n        id\n        value\n        contentType\n      }\n    }\n    banner {\n      ...CmsBanner\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsDynamicHeader on DynamicHeader {\n    id\n    rule {\n      ... on RuleBlock {\n        id\n        value\n        contentType\n      }\n    }\n    banner {\n      ...CmsBanner\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CmsDynamicHeaders($where: DynamicHeaderWhereInput) {\n    dynamicHeaders(where: $where) {\n      ...CmsDynamicHeader\n    }\n  }\n",
): (typeof documents)["\n  query CmsDynamicHeaders($where: DynamicHeaderWhereInput) {\n    dynamicHeaders(where: $where) {\n      ...CmsDynamicHeader\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsImageLink on ImageLink {\n    ... on ImageLink {\n      __typename\n      id\n      label\n      url\n      caption\n      image {\n        url\n        width\n        height\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsImageLink on ImageLink {\n    ... on ImageLink {\n      __typename\n      id\n      label\n      url\n      caption\n      image {\n        url\n        width\n        height\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsTextBlock on TextBlock {\n    ... on TextBlock {\n      __typename\n      id\n      title\n      textAlign\n      content {\n        html\n      }\n      links {\n        ... on Link {\n          id\n          label\n          url\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsTextBlock on TextBlock {\n    ... on TextBlock {\n      __typename\n      id\n      title\n      textAlign\n      content {\n        html\n      }\n      links {\n        ... on Link {\n          id\n          label\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsColumn on Column {\n    ... on Column {\n      __typename\n      id\n      content {\n        ...CmsTextBlock\n        ...CmsImageLink\n      }\n      desktopPosition\n      mobilePosition\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsColumn on Column {\n    ... on Column {\n      __typename\n      id\n      content {\n        ...CmsTextBlock\n        ...CmsImageLink\n      }\n      desktopPosition\n      mobilePosition\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsBlockRow on BlockRow {\n    ... on BlockRow {\n      __typename\n      id\n      backgroundColor\n      useFullPageWidth\n      columns {\n        ...CmsColumn\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsBlockRow on BlockRow {\n    ... on BlockRow {\n      __typename\n      id\n      backgroundColor\n      useFullPageWidth\n      columns {\n        ...CmsColumn\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ConfigurableProductOptions on ConfigurableProductOptions {\n    __typename\n    values {\n      default_label\n      label\n      store_label\n      uid\n      use_default_value\n      value_index\n    }\n    attribute_code\n    attribute_uid\n    label\n    position\n    uid\n    use_default\n  }\n",
): (typeof documents)["\n  fragment ConfigurableProductOptions on ConfigurableProductOptions {\n    __typename\n    values {\n      default_label\n      label\n      store_label\n      uid\n      use_default_value\n      value_index\n    }\n    attribute_code\n    attribute_uid\n    label\n    position\n    uid\n    use_default\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ConfigurableProductVariants on ConfigurableVariant {\n    __typename\n    attributes {\n      code\n      label\n      uid\n      value_index\n    }\n    product {\n      ...BaseProduct\n    }\n  }\n",
): (typeof documents)["\n  fragment ConfigurableProductVariants on ConfigurableVariant {\n    __typename\n    attributes {\n      code\n      label\n      uid\n      value_index\n    }\n    product {\n      ...BaseProduct\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ConfigurableProduct on ConfigurableProduct {\n    __typename\n    ...BaseProduct\n    configurable_options {\n      ...ConfigurableProductOptions\n    }\n    variants {\n      ...ConfigurableProductVariants\n    }\n  }\n",
): (typeof documents)["\n  fragment ConfigurableProduct on ConfigurableProduct {\n    __typename\n    ...BaseProduct\n    configurable_options {\n      ...ConfigurableProductOptions\n    }\n    variants {\n      ...ConfigurableProductVariants\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query BestSellingProductsByCategory($categoryId: Int!) {\n    bestSellingProductsByCategory(categoryId: $categoryId) {\n      ...BaseProduct\n    }\n  }\n",
): (typeof documents)["\n  query BestSellingProductsByCategory($categoryId: Int!) {\n    bestSellingProductsByCategory(categoryId: $categoryId) {\n      ...BaseProduct\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductImageFragment on ProductImage {\n    __typename\n    url\n    position\n    label\n    disabled\n  }\n",
): (typeof documents)["\n  fragment ProductImageFragment on ProductImage {\n    __typename\n    url\n    position\n    label\n    disabled\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductVideoFragment on ProductVideo {\n    __typename\n    disabled\n    label\n    position\n    url\n    video_content {\n      media_type\n      video_description\n      video_metadata\n      video_provider\n      video_title\n      video_url\n    }\n  }\n",
): (typeof documents)["\n  fragment ProductVideoFragment on ProductVideo {\n    __typename\n    disabled\n    label\n    position\n    url\n    video_content {\n      media_type\n      video_description\n      video_metadata\n      video_provider\n      video_title\n      video_url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductMediaGallery on MediaGalleryInterface {\n    __typename\n    disabled\n    label\n    position\n    url\n    ... on ProductImage {\n      ...ProductImageFragment\n    }\n    ... on ProductVideo {\n      ...ProductVideoFragment\n    }\n  }\n",
): (typeof documents)["\n  fragment ProductMediaGallery on MediaGalleryInterface {\n    __typename\n    disabled\n    label\n    position\n    url\n    ... on ProductImage {\n      ...ProductImageFragment\n    }\n    ... on ProductVideo {\n      ...ProductVideoFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductLabel on Label {\n    custom\n    discount\n    new\n  }\n",
): (typeof documents)["\n  fragment ProductLabel on Label {\n    custom\n    discount\n    new\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductPriceRange on PriceRange {\n    maximum_price {\n      discount {\n        amount_off\n        percent_off\n      }\n      final_price {\n        currency\n        value\n      }\n      fixed_product_taxes {\n        amount {\n          currency\n          value\n        }\n        label\n      }\n      regular_price {\n        currency\n        value\n      }\n    }\n    minimum_price {\n      discount {\n        amount_off\n        percent_off\n      }\n      final_price {\n        currency\n        value\n      }\n      fixed_product_taxes {\n        amount {\n          currency\n          value\n        }\n        label\n      }\n      regular_price {\n        currency\n        value\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment ProductPriceRange on PriceRange {\n    maximum_price {\n      discount {\n        amount_off\n        percent_off\n      }\n      final_price {\n        currency\n        value\n      }\n      fixed_product_taxes {\n        amount {\n          currency\n          value\n        }\n        label\n      }\n      regular_price {\n        currency\n        value\n      }\n    }\n    minimum_price {\n      discount {\n        amount_off\n        percent_off\n      }\n      final_price {\n        currency\n        value\n      }\n      fixed_product_taxes {\n        amount {\n          currency\n          value\n        }\n        label\n      }\n      regular_price {\n        currency\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BaseProduct on ProductInterface {\n    __typename\n    url_key\n    canonical_url\n    description {\n      html\n    }\n    gift_message_available\n    review_count\n    image {\n      ...ProductImageFragment\n    }\n    media_gallery {\n      ...ProductMediaGallery\n    }\n    meta_description\n    meta_keyword\n    meta_title\n    name\n    new_from_date\n    new_to_date\n    price_range {\n      ...ProductPriceRange\n    }\n    productBrand {\n      brand_image_url\n      name\n    }\n    uid\n    special_to_date\n    special_price\n    small_image {\n      disabled\n      label\n      position\n      url\n    }\n    sku\n    short_description {\n      html\n    }\n    addable_to_cart\n    categories {\n      url_path\n      name\n    }\n    productLabel {\n      ...ProductLabel\n    }\n    delivery_promise\n    maintenance_description\n    stock_status\n  }\n",
): (typeof documents)["\n  fragment BaseProduct on ProductInterface {\n    __typename\n    url_key\n    canonical_url\n    description {\n      html\n    }\n    gift_message_available\n    review_count\n    image {\n      ...ProductImageFragment\n    }\n    media_gallery {\n      ...ProductMediaGallery\n    }\n    meta_description\n    meta_keyword\n    meta_title\n    name\n    new_from_date\n    new_to_date\n    price_range {\n      ...ProductPriceRange\n    }\n    productBrand {\n      brand_image_url\n      name\n    }\n    uid\n    special_to_date\n    special_price\n    small_image {\n      disabled\n      label\n      position\n      url\n    }\n    sku\n    short_description {\n      html\n    }\n    addable_to_cart\n    categories {\n      url_path\n      name\n    }\n    productLabel {\n      ...ProductLabel\n    }\n    delivery_promise\n    maintenance_description\n    stock_status\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductAggregations on Aggregation {\n    attribute_code\n    count\n    frontend_input\n    has_more\n    label\n    options {\n      count\n      label\n      value\n    }\n    position\n    rel_nofollow\n  }\n",
): (typeof documents)["\n  fragment ProductAggregations on Aggregation {\n    attribute_code\n    count\n    frontend_input\n    has_more\n    label\n    options {\n      count\n      label\n      value\n    }\n    position\n    rel_nofollow\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Products(\n    $pageSize: Int = 12\n    $filter: ProductAttributeFilterInput\n    $sort: ProductAttributeSortInput\n    $currentPage: Int\n  ) {\n    products(\n      pageSize: $pageSize\n      filter: $filter\n      sort: $sort\n      currentPage: $currentPage\n    ) {\n      total_count\n      page_info {\n        current_page\n        page_size\n        total_pages\n      }\n      aggregations {\n        ...ProductAggregations\n      }\n      items {\n        ... on SimpleProduct {\n          ...SimpleProduct\n        }\n        ... on ConfigurableProduct {\n          ...ConfigurableProduct\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Products(\n    $pageSize: Int = 12\n    $filter: ProductAttributeFilterInput\n    $sort: ProductAttributeSortInput\n    $currentPage: Int\n  ) {\n    products(\n      pageSize: $pageSize\n      filter: $filter\n      sort: $sort\n      currentPage: $currentPage\n    ) {\n      total_count\n      page_info {\n        current_page\n        page_size\n        total_pages\n      }\n      aggregations {\n        ...ProductAggregations\n      }\n      items {\n        ... on SimpleProduct {\n          ...SimpleProduct\n        }\n        ... on ConfigurableProduct {\n          ...ConfigurableProduct\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ProductReviews(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        rating_summary\n        review_count\n        reviews {\n          items {\n            average_rating\n            nickname\n            summary\n            text\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query ProductReviews(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        rating_summary\n        review_count\n        reviews {\n          items {\n            average_rating\n            nickname\n            summary\n            text\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ProductStock($pageSize: Int = 1, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        is_returnable\n        only_x_left_in_stock\n        stock_status\n      }\n    }\n  }\n",
): (typeof documents)["\n  query ProductStock($pageSize: Int = 1, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        is_returnable\n        only_x_left_in_stock\n        stock_status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ProductMeasurements(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        measurement_depth\n        measurement_diameter\n        measurement_gross_weight\n        measurement_height\n        measurement_length\n        measurement_seat_height\n        measurement_thickness\n        measurement_volume\n        measurement_width\n      }\n    }\n  }\n",
): (typeof documents)["\n  query ProductMeasurements(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        measurement_depth\n        measurement_diameter\n        measurement_gross_weight\n        measurement_height\n        measurement_length\n        measurement_seat_height\n        measurement_thickness\n        measurement_volume\n        measurement_width\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment SimpleProduct on SimpleProduct {\n    ...BaseProduct\n  }\n",
): (typeof documents)["\n  fragment SimpleProduct on SimpleProduct {\n    ...BaseProduct\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BaseProductDataForCard on ProductInterface {\n    __typename\n    name\n    sku\n    canonical_url\n    short_description {\n      html\n    }\n    price_range {\n      ...ProductPriceRange\n    }\n    image {\n      ...ProductImageFragment\n    }\n    productLabel {\n      ...ProductLabel\n    }\n  }\n",
): (typeof documents)["\n  fragment BaseProductDataForCard on ProductInterface {\n    __typename\n    name\n    sku\n    canonical_url\n    short_description {\n      html\n    }\n    price_range {\n      ...ProductPriceRange\n    }\n    image {\n      ...ProductImageFragment\n    }\n    productLabel {\n      ...ProductLabel\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductSeriesSliderData on ProductInterface {\n    __typename\n    series {\n      ...BaseProductDataForCard\n    }\n  }\n",
): (typeof documents)["\n  fragment ProductSeriesSliderData on ProductInterface {\n    __typename\n    series {\n      ...BaseProductDataForCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment RelatedProductsSliderData on ProductInterface {\n    __typename\n    related_products {\n      ...BaseProductDataForCard\n    }\n  }\n",
): (typeof documents)["\n  fragment RelatedProductsSliderData on ProductInterface {\n    __typename\n    related_products {\n      ...BaseProductDataForCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpsellProductsSliderData on ProductInterface {\n    __typename\n    upsell_products {\n      ...BaseProductDataForCard\n    }\n  }\n",
): (typeof documents)["\n  fragment UpsellProductsSliderData on ProductInterface {\n    __typename\n    upsell_products {\n      ...BaseProductDataForCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BaseProductSliderData on ProductInterface {\n    ...RelatedProductsSliderData\n    ...ProductSeriesSliderData\n    ...UpsellProductsSliderData\n  }\n",
): (typeof documents)["\n  fragment BaseProductSliderData on ProductInterface {\n    ...RelatedProductsSliderData\n    ...ProductSeriesSliderData\n    ...UpsellProductsSliderData\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ProductSliderData(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        __typename\n        ...BaseProductSliderData\n      }\n    }\n  }\n",
): (typeof documents)["\n  query ProductSliderData(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        __typename\n        ...BaseProductSliderData\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Route($url: String!) {\n    route(url: $url) {\n      redirect_code\n      relative_url\n      type\n      ... on SimpleProduct {\n        __typename\n        name\n        sku\n      }\n      ... on ConfigurableProduct {\n        __typename\n        name\n        sku\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Route($url: String!) {\n    route(url: $url) {\n      redirect_code\n      relative_url\n      type\n      ... on SimpleProduct {\n        __typename\n        name\n        sku\n      }\n      ... on ConfigurableProduct {\n        __typename\n        name\n        sku\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment StoreConsent on ConfigConsent {\n    code\n    is_required\n    label\n  }\n",
): (typeof documents)["\n  fragment StoreConsent on ConfigConsent {\n    code\n    is_required\n    label\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query StoreConfig {\n    storeConfig {\n      brands_category\n      category_url_suffix\n      consents {\n        ...StoreConsent\n      }\n      copyright\n      returns_enabled\n      absolute_footer\n      allow_gift_receipt\n      allow_gift_wrapping_on_order\n      allow_gift_wrapping_on_order_items\n      allow_guests_to_write_product_reviews\n      allow_items\n      allow_order\n      allow_printed_card\n      autocomplete_on_storefront\n      base_currency_code\n      base_link_url\n      base_media_url\n      base_static_url\n      base_url\n      braintree_cc_vault_active\n      cart_gift_wrapping\n      cart_printed_card\n      catalog_default_sort_by\n      category_fixed_product_tax_display_setting\n      check_money_order_enable_for_specific_countries\n      check_money_order_enabled\n      check_money_order_make_check_payable_to\n      check_money_order_max_order_total\n      check_money_order_min_order_total\n      check_money_order_new_order_status\n      check_money_order_payment_from_specific_countries\n      check_money_order_send_check_to\n      check_money_order_sort_order\n      check_money_order_title\n      cms_home_page\n      cms_no_cookies\n      cms_no_route\n      code\n      configurable_thumbnail_source\n      default_description\n      default_display_currency_code\n      default_title\n      default_keywords\n      demonotice\n      enable_multiple_wishlists\n      front\n      grid_per_page\n      grid_per_page_values\n      head_includes\n      head_shortcut_icon\n      header_logo_src\n      id\n      is_default_store\n      is_default_store_group\n      list_mode\n      list_per_page\n      list_per_page_values\n      locale\n      logo_alt\n      logo_height\n      logo_width\n      magento_reward_general_is_enabled\n      magento_reward_general_is_enabled_on_front\n      magento_reward_general_min_points_balance\n      magento_reward_general_publish_history\n      magento_reward_points_invitation_customer\n      magento_reward_points_invitation_customer_limit\n      magento_reward_points_invitation_order\n      magento_reward_points_invitation_order_limit\n      magento_reward_points_newsletter\n      magento_reward_points_order\n      magento_reward_points_register\n      magento_reward_points_review\n      magento_reward_points_review_limit\n      magento_wishlist_general_is_enabled\n      maximum_number_of_wishlists\n      minimum_password_length\n      no_route\n      payment_payflowpro_cc_vault_active\n      printed_card_price\n      product_fixed_product_tax_display_setting\n      product_reviews_enabled\n      product_url_suffix\n      required_character_classes_number\n      root_category_id\n      root_category_uid\n      sales_fixed_product_tax_display_setting\n      sales_gift_wrapping\n      sales_printed_card\n      secure_base_link_url\n      secure_base_media_url\n      secure_base_static_url\n      secure_base_url\n      send_friend {\n        enabled_for_customers\n        enabled_for_guests\n      }\n      show_cms_breadcrumbs\n      store_code\n      store_group_code\n      store_group_name\n      store_name\n      store_sort_order\n      timezone\n      title_prefix\n      title_separator\n      title_suffix\n      use_store_in_url\n      website_code\n      website_id\n      website_name\n      weight_unit\n      welcome\n      zero_subtotal_enable_for_specific_countries\n      zero_subtotal_enabled\n      zero_subtotal_new_order_status\n      zero_subtotal_payment_action\n      zero_subtotal_payment_from_specific_countries\n      zero_subtotal_sort_order\n      zero_subtotal_title\n    }\n  }\n",
): (typeof documents)["\n  query StoreConfig {\n    storeConfig {\n      brands_category\n      category_url_suffix\n      consents {\n        ...StoreConsent\n      }\n      copyright\n      returns_enabled\n      absolute_footer\n      allow_gift_receipt\n      allow_gift_wrapping_on_order\n      allow_gift_wrapping_on_order_items\n      allow_guests_to_write_product_reviews\n      allow_items\n      allow_order\n      allow_printed_card\n      autocomplete_on_storefront\n      base_currency_code\n      base_link_url\n      base_media_url\n      base_static_url\n      base_url\n      braintree_cc_vault_active\n      cart_gift_wrapping\n      cart_printed_card\n      catalog_default_sort_by\n      category_fixed_product_tax_display_setting\n      check_money_order_enable_for_specific_countries\n      check_money_order_enabled\n      check_money_order_make_check_payable_to\n      check_money_order_max_order_total\n      check_money_order_min_order_total\n      check_money_order_new_order_status\n      check_money_order_payment_from_specific_countries\n      check_money_order_send_check_to\n      check_money_order_sort_order\n      check_money_order_title\n      cms_home_page\n      cms_no_cookies\n      cms_no_route\n      code\n      configurable_thumbnail_source\n      default_description\n      default_display_currency_code\n      default_title\n      default_keywords\n      demonotice\n      enable_multiple_wishlists\n      front\n      grid_per_page\n      grid_per_page_values\n      head_includes\n      head_shortcut_icon\n      header_logo_src\n      id\n      is_default_store\n      is_default_store_group\n      list_mode\n      list_per_page\n      list_per_page_values\n      locale\n      logo_alt\n      logo_height\n      logo_width\n      magento_reward_general_is_enabled\n      magento_reward_general_is_enabled_on_front\n      magento_reward_general_min_points_balance\n      magento_reward_general_publish_history\n      magento_reward_points_invitation_customer\n      magento_reward_points_invitation_customer_limit\n      magento_reward_points_invitation_order\n      magento_reward_points_invitation_order_limit\n      magento_reward_points_newsletter\n      magento_reward_points_order\n      magento_reward_points_register\n      magento_reward_points_review\n      magento_reward_points_review_limit\n      magento_wishlist_general_is_enabled\n      maximum_number_of_wishlists\n      minimum_password_length\n      no_route\n      payment_payflowpro_cc_vault_active\n      printed_card_price\n      product_fixed_product_tax_display_setting\n      product_reviews_enabled\n      product_url_suffix\n      required_character_classes_number\n      root_category_id\n      root_category_uid\n      sales_fixed_product_tax_display_setting\n      sales_gift_wrapping\n      sales_printed_card\n      secure_base_link_url\n      secure_base_media_url\n      secure_base_static_url\n      secure_base_url\n      send_friend {\n        enabled_for_customers\n        enabled_for_guests\n      }\n      show_cms_breadcrumbs\n      store_code\n      store_group_code\n      store_group_name\n      store_name\n      store_sort_order\n      timezone\n      title_prefix\n      title_separator\n      title_suffix\n      use_store_in_url\n      website_code\n      website_id\n      website_name\n      weight_unit\n      welcome\n      zero_subtotal_enable_for_specific_countries\n      zero_subtotal_enabled\n      zero_subtotal_new_order_status\n      zero_subtotal_payment_action\n      zero_subtotal_payment_from_specific_countries\n      zero_subtotal_sort_order\n      zero_subtotal_title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BaseStore on Store {\n    __typename\n    city\n    country\n    email\n    externalUrl\n    external_id\n    id\n    is_visible_on_map\n    latitude\n    longitude\n    name\n    opening_hours {\n      additionalInformation\n      friday\n      monday\n      saturday\n      sunday\n      thursday\n      tuesday\n      wednesday\n    }\n    organization_number\n    phone\n    postcode\n    region\n    street\n  }\n",
): (typeof documents)["\n  fragment BaseStore on Store {\n    __typename\n    city\n    country\n    email\n    externalUrl\n    external_id\n    id\n    is_visible_on_map\n    latitude\n    longitude\n    name\n    opening_hours {\n      additionalInformation\n      friday\n      monday\n      saturday\n      sunday\n      thursday\n      tuesday\n      wednesday\n    }\n    organization_number\n    phone\n    postcode\n    region\n    street\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query StoresList {\n    getStores {\n      ...BaseStore\n    }\n  }\n",
): (typeof documents)["\n  query StoresList {\n    getStores {\n      ...BaseStore\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Store($id: String!) {\n    getStore(storeId: $id) {\n      ...BaseStore\n    }\n  }\n",
): (typeof documents)["\n  query Store($id: String!) {\n    getStore(storeId: $id) {\n      ...BaseStore\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateCartItemsIsInStore($cartId: String!, $storeId: String!) {\n    updateCartItemsIsInStore(cartId: $cartId, storeId: $storeId) {\n      success\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateCartItemsIsInStore($cartId: String!, $storeId: String!) {\n    updateCartItemsIsInStore(cartId: $cartId, storeId: $storeId) {\n      success\n      message\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
