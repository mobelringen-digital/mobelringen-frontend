/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

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
  "\n  query Category($filters: CategoryFilterInput) {\n    categories(filters: $filters) {\n      items {\n        name\n        description\n        id\n        uid\n        url_path\n        product_count\n        meta_title\n        meta_keywords\n        meta_description\n        include_in_menu\n        children {\n          name\n          uid\n          url_path\n          product_count\n          include_in_menu\n          children {\n            name\n            uid\n            url_path\n            product_count\n            include_in_menu\n          }\n        }\n      }\n    }\n  }\n":
    types.CategoryDocument,
  "\n  fragment CmsSalesBubble on SaleBubble {\n    url\n    middleLine\n    position\n    topLine\n    bottomLine\n  }\n":
    types.CmsSalesBubbleFragmentDoc,
  "\n  fragment CmsBanner on Banner {\n    ... on Banner {\n      __typename\n      alt\n      identify\n      variant\n      centerText\n      bannerImage {\n        mimeType\n        url\n        width\n      }\n      salesBubble {\n        ...CmsSalesBubble\n      }\n    }\n  }\n":
    types.CmsBannerFragmentDoc,
  "\n  fragment CmsPopularProducts on PopularProduct {\n    ... on PopularProduct {\n      __typename\n      id\n      categoryId\n    }\n  }\n":
    types.CmsPopularProductsFragmentDoc,
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
  "\n  fragment CustomerData on Customer {\n    orders {\n      total_count\n    }\n    firstname\n    lastname\n    is_subscribed\n    addresses {\n      city\n      company\n      country_code\n      vat_id\n      telephone\n      suffix\n      street\n      region_id\n      prefix\n      postcode\n      middlename\n      lastname\n      id\n      firstname\n      fax\n      default_shipping\n      default_billing\n    }\n  }\n":
    types.CustomerDataFragmentDoc,
  "\n  query Customer {\n    customer {\n      ...CustomerData\n    }\n  }\n":
    types.CustomerDocument,
  "\n  query CmsPages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      title\n      url\n      content {\n        ...CmsBanner\n        ...CmsPopularProducts\n      }\n    }\n  }\n":
    types.CmsPagesDocument,
  "\n  fragment CmsStaticPageConfiguration on StaticPageConfiguration {\n    translations\n  }\n":
    types.CmsStaticPageConfigurationFragmentDoc,
  "\n  query CmsStaticPageConfiguration(\n    $where: StaticPageConfigurationWhereUniqueInput!\n  ) {\n    staticPageConfiguration(where: $where) {\n      ...CmsStaticPageConfiguration\n    }\n  }\n":
    types.CmsStaticPageConfigurationDocument,
  "\n  fragment CmsDynamicHeader on DynamicHeader {\n    id\n    rule {\n      ... on RuleBlock {\n        id\n        value\n        contentType\n      }\n    }\n    banner {\n      ...CmsBanner\n    }\n  }\n":
    types.CmsDynamicHeaderFragmentDoc,
  "\n  query CmsDynamicHeaders($where: DynamicHeaderWhereInput) {\n    dynamicHeaders(where: $where) {\n      ...CmsDynamicHeader\n    }\n  }\n":
    types.CmsDynamicHeadersDocument,
  "\n  fragment ConfigurableProductOptions on ConfigurableProductOptions {\n    __typename\n    values {\n      default_label\n      label\n      store_label\n      uid\n      use_default_value\n      value_index\n    }\n    attribute_code\n    attribute_uid\n    label\n    position\n    uid\n    use_default\n  }\n":
    types.ConfigurableProductOptionsFragmentDoc,
  "\n  fragment ConfigurableProductVariants on ConfigurableVariant {\n    __typename\n    attributes {\n      code\n      label\n      uid\n      value_index\n    }\n    product {\n      ...BaseProduct\n    }\n  }\n":
    types.ConfigurableProductVariantsFragmentDoc,
  "\n  fragment ConfigurableProduct on ConfigurableProduct {\n    __typename\n    ...BaseProduct\n    configurable_options {\n      ...ConfigurableProductOptions\n    }\n    variants {\n      ...ConfigurableProductVariants\n    }\n  }\n":
    types.ConfigurableProductFragmentDoc,
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
  "\n  fragment BaseProduct on ProductInterface {\n    __typename\n    url_key\n    url_suffix\n    canonical_url\n    description {\n      html\n    }\n    gift_message_available\n    image {\n      ...ProductImageFragment\n    }\n    is_returnable\n    media_gallery {\n      ...ProductMediaGallery\n    }\n    meta_description\n    meta_keyword\n    meta_title\n    name\n    new_from_date\n    new_to_date\n    only_x_left_in_stock\n    price_range {\n      ...ProductPriceRange\n    }\n    productBrand {\n      brand_image_url\n      name\n    }\n    rating_summary\n    uid\n    stock_status\n    special_to_date\n    special_price\n    small_image {\n      disabled\n      label\n      position\n      url\n    }\n    sku\n    short_description {\n      html\n    }\n    review_count\n    addable_to_cart\n    categories {\n      url_path\n      name\n    }\n    productLabel {\n      ...ProductLabel\n    }\n    delivery_promise\n  }\n":
    types.BaseProductFragmentDoc,
  "\n  query Products($pageSize: Int = 12, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        ... on SimpleProduct {\n          ...SimpleProduct\n        }\n        ... on ConfigurableProduct {\n          ...ConfigurableProduct\n        }\n      }\n    }\n  }\n":
    types.ProductsDocument,
  "\n  fragment SimpleProduct on SimpleProduct {\n    ...BaseProduct\n  }\n":
    types.SimpleProductFragmentDoc,
  "\n  fragment ProductSeriesSliderData on ProductInterface {\n    __typename\n    series {\n      ...BaseProduct\n    }\n  }\n":
    types.ProductSeriesSliderDataFragmentDoc,
  "\n  fragment RelatedProductsSliderData on ProductInterface {\n    __typename\n    related_products {\n      ...BaseProduct\n    }\n  }\n":
    types.RelatedProductsSliderDataFragmentDoc,
  "\n  fragment UpsellProductsSliderData on ProductInterface {\n    __typename\n    upsell_products {\n      ...BaseProduct\n    }\n  }\n":
    types.UpsellProductsSliderDataFragmentDoc,
  "\n  fragment BaseProductSliderData on ProductInterface {\n    ...RelatedProductsSliderData\n    ...ProductSeriesSliderData\n    ...UpsellProductsSliderData\n  }\n":
    types.BaseProductSliderDataFragmentDoc,
  "\n  query ProductSliderData(\n    $pageSize: Int = 1\n    $filter: ProductAttributeFilterInput\n  ) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        __typename\n        ...BaseProductSliderData\n      }\n    }\n  }\n":
    types.ProductSliderDataDocument,
  "\n  query Route($url: String!) {\n    route(url: $url) {\n      redirect_code\n      relative_url\n      type\n      ... on SimpleProduct {\n        __typename\n        name\n        sku\n      }\n      ... on ConfigurableProduct {\n        __typename\n        name\n        sku\n      }\n    }\n  }\n":
    types.RouteDocument,
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
  source: "\n  fragment CmsPopularProducts on PopularProduct {\n    ... on PopularProduct {\n      __typename\n      id\n      categoryId\n    }\n  }\n",
): (typeof documents)["\n  fragment CmsPopularProducts on PopularProduct {\n    ... on PopularProduct {\n      __typename\n      id\n      categoryId\n    }\n  }\n"];
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
  source: "\n  fragment CustomerData on Customer {\n    orders {\n      total_count\n    }\n    firstname\n    lastname\n    is_subscribed\n    addresses {\n      city\n      company\n      country_code\n      vat_id\n      telephone\n      suffix\n      street\n      region_id\n      prefix\n      postcode\n      middlename\n      lastname\n      id\n      firstname\n      fax\n      default_shipping\n      default_billing\n    }\n  }\n",
): (typeof documents)["\n  fragment CustomerData on Customer {\n    orders {\n      total_count\n    }\n    firstname\n    lastname\n    is_subscribed\n    addresses {\n      city\n      company\n      country_code\n      vat_id\n      telephone\n      suffix\n      street\n      region_id\n      prefix\n      postcode\n      middlename\n      lastname\n      id\n      firstname\n      fax\n      default_shipping\n      default_billing\n    }\n  }\n"];
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
  source: "\n  query CmsPages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      title\n      url\n      content {\n        ...CmsBanner\n        ...CmsPopularProducts\n      }\n    }\n  }\n",
): (typeof documents)["\n  query CmsPages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      title\n      url\n      content {\n        ...CmsBanner\n        ...CmsPopularProducts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CmsStaticPageConfiguration on StaticPageConfiguration {\n    translations\n  }\n",
): (typeof documents)["\n  fragment CmsStaticPageConfiguration on StaticPageConfiguration {\n    translations\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CmsStaticPageConfiguration(\n    $where: StaticPageConfigurationWhereUniqueInput!\n  ) {\n    staticPageConfiguration(where: $where) {\n      ...CmsStaticPageConfiguration\n    }\n  }\n",
): (typeof documents)["\n  query CmsStaticPageConfiguration(\n    $where: StaticPageConfigurationWhereUniqueInput!\n  ) {\n    staticPageConfiguration(where: $where) {\n      ...CmsStaticPageConfiguration\n    }\n  }\n"];
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
  source: "\n  fragment BaseProduct on ProductInterface {\n    __typename\n    url_key\n    url_suffix\n    canonical_url\n    description {\n      html\n    }\n    gift_message_available\n    image {\n      ...ProductImageFragment\n    }\n    is_returnable\n    media_gallery {\n      ...ProductMediaGallery\n    }\n    meta_description\n    meta_keyword\n    meta_title\n    name\n    new_from_date\n    new_to_date\n    only_x_left_in_stock\n    price_range {\n      ...ProductPriceRange\n    }\n    productBrand {\n      brand_image_url\n      name\n    }\n    rating_summary\n    uid\n    stock_status\n    special_to_date\n    special_price\n    small_image {\n      disabled\n      label\n      position\n      url\n    }\n    sku\n    short_description {\n      html\n    }\n    review_count\n    addable_to_cart\n    categories {\n      url_path\n      name\n    }\n    productLabel {\n      ...ProductLabel\n    }\n    delivery_promise\n  }\n",
): (typeof documents)["\n  fragment BaseProduct on ProductInterface {\n    __typename\n    url_key\n    url_suffix\n    canonical_url\n    description {\n      html\n    }\n    gift_message_available\n    image {\n      ...ProductImageFragment\n    }\n    is_returnable\n    media_gallery {\n      ...ProductMediaGallery\n    }\n    meta_description\n    meta_keyword\n    meta_title\n    name\n    new_from_date\n    new_to_date\n    only_x_left_in_stock\n    price_range {\n      ...ProductPriceRange\n    }\n    productBrand {\n      brand_image_url\n      name\n    }\n    rating_summary\n    uid\n    stock_status\n    special_to_date\n    special_price\n    small_image {\n      disabled\n      label\n      position\n      url\n    }\n    sku\n    short_description {\n      html\n    }\n    review_count\n    addable_to_cart\n    categories {\n      url_path\n      name\n    }\n    productLabel {\n      ...ProductLabel\n    }\n    delivery_promise\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Products($pageSize: Int = 12, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        ... on SimpleProduct {\n          ...SimpleProduct\n        }\n        ... on ConfigurableProduct {\n          ...ConfigurableProduct\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Products($pageSize: Int = 12, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        ... on SimpleProduct {\n          ...SimpleProduct\n        }\n        ... on ConfigurableProduct {\n          ...ConfigurableProduct\n        }\n      }\n    }\n  }\n"];
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
  source: "\n  fragment ProductSeriesSliderData on ProductInterface {\n    __typename\n    series {\n      ...BaseProduct\n    }\n  }\n",
): (typeof documents)["\n  fragment ProductSeriesSliderData on ProductInterface {\n    __typename\n    series {\n      ...BaseProduct\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment RelatedProductsSliderData on ProductInterface {\n    __typename\n    related_products {\n      ...BaseProduct\n    }\n  }\n",
): (typeof documents)["\n  fragment RelatedProductsSliderData on ProductInterface {\n    __typename\n    related_products {\n      ...BaseProduct\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpsellProductsSliderData on ProductInterface {\n    __typename\n    upsell_products {\n      ...BaseProduct\n    }\n  }\n",
): (typeof documents)["\n  fragment UpsellProductsSliderData on ProductInterface {\n    __typename\n    upsell_products {\n      ...BaseProduct\n    }\n  }\n"];
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

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
