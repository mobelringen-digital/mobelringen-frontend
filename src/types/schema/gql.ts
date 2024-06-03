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
  "\n  fragment BannerFragment on Banner {\n    ... on Banner {\n      __typename\n      alt\n      identify\n      bannerImage {\n        mimeType\n        url\n        width\n      }\n    }\n  }\n":
    types.BannerFragmentFragmentDoc,
  "\n  fragment PopularProductsFragment on PopularProduct {\n    ... on PopularProduct {\n      __typename\n      id\n      categoryId\n    }\n  }\n":
    types.PopularProductsFragmentFragmentDoc,
  "\n  query Menu($where: MenuWhereInput) {\n    menus(where: $where) {\n      links {\n        ... on Link {\n          __typename\n          label\n          url\n        }\n        ... on MegaMenuCategoriesDropdown {\n          __typename\n          label\n        }\n        ... on MegaMenuDropdown {\n          __typename\n          items {\n            ... on Link {\n              __typename\n              label\n              url\n            }\n            ... on ImageLink {\n              __typename\n              label\n              url\n              image {\n                url\n              }\n            }\n          }\n          label\n        }\n      }\n    }\n  }\n":
    types.MenuDocument,
  "\n  query Pages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      title\n      url\n      content {\n        ...BannerFragment\n        ...PopularProductsFragment\n      }\n    }\n  }\n":
    types.PagesDocument,
  "\n  fragment ProductImageFragment on ProductImage {\n    url\n    position\n    label\n    disabled\n  }\n":
    types.ProductImageFragmentFragmentDoc,
  "\n  fragment ProductVideoFragment on ProductVideo {\n    disabled\n    label\n    position\n    url\n    video_content {\n      media_type\n      video_description\n      video_metadata\n      video_provider\n      video_title\n      video_url\n    }\n  }\n":
    types.ProductVideoFragmentFragmentDoc,
  "\n  query Products($pageSize: Int = 12, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        url_path\n        url_key\n        url_suffix\n        canonical_url\n        brand\n        color\n        configuration\n        country_of_manufacture\n        description {\n          html\n        }\n        gift_message_available\n        id\n        image {\n          ...ProductImageFragment\n        }\n        is_returnable\n        manufacturer\n        media_gallery {\n          disabled\n          label\n          position\n          url\n          ... on ProductImage {\n            ...ProductImageFragment\n          }\n          ... on ProductVideo {\n            ...ProductVideoFragment\n          }\n        }\n        media_gallery_entries {\n          content {\n            base64_encoded_data\n            name\n            type\n          }\n          disabled\n          file\n          id\n          label\n          media_type\n          position\n          types\n          uid\n          video_content {\n            media_type\n            video_description\n            video_metadata\n            video_provider\n            video_title\n            video_url\n          }\n        }\n        meta_description\n        meta_keyword\n        meta_title\n        name\n        new_from_date\n        new_to_date\n        only_x_left_in_stock\n        options_container\n        price_range {\n          maximum_price {\n            discount {\n              amount_off\n              percent_off\n            }\n            fixed_product_taxes {\n              amount {\n                currency\n                value\n              }\n              label\n            }\n            regular_price {\n              currency\n              value\n            }\n          }\n          minimum_price {\n            discount {\n              amount_off\n              percent_off\n            }\n            fixed_product_taxes {\n              amount {\n                currency\n                value\n              }\n              label\n            }\n            regular_price {\n              currency\n              value\n            }\n          }\n        }\n        productBrand {\n          brand_image_url\n          name\n        }\n        product_links {\n          link_type\n          linked_product_sku\n          linked_product_type\n          position\n          sku\n          ... on ProductLinks {\n            link_type\n            linked_product_sku\n            linked_product_type\n            position\n            sku\n          }\n        }\n        rating_summary\n        updated_at\n        uid\n        type_id\n        tier_price\n        swatch_image\n        stock_status\n        staged\n        special_to_date\n        special_price\n        special_from_date\n        small_image {\n          disabled\n          label\n          position\n          url\n        }\n        sku\n        size_filter\n        short_description {\n          html\n        }\n        series_group\n        review_count\n        webshopavailable\n        addable_to_cart\n        attribute_set_id\n        created_at\n        delivery_promise\n        ifsite\n        maintenance_description\n        series {\n          url_path\n          name\n        }\n        categories {\n          url_path\n          name\n        }\n      }\n    }\n  }\n":
    types.ProductsDocument,
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
  source: "\n  fragment BannerFragment on Banner {\n    ... on Banner {\n      __typename\n      alt\n      identify\n      bannerImage {\n        mimeType\n        url\n        width\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment BannerFragment on Banner {\n    ... on Banner {\n      __typename\n      alt\n      identify\n      bannerImage {\n        mimeType\n        url\n        width\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment PopularProductsFragment on PopularProduct {\n    ... on PopularProduct {\n      __typename\n      id\n      categoryId\n    }\n  }\n",
): (typeof documents)["\n  fragment PopularProductsFragment on PopularProduct {\n    ... on PopularProduct {\n      __typename\n      id\n      categoryId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Menu($where: MenuWhereInput) {\n    menus(where: $where) {\n      links {\n        ... on Link {\n          __typename\n          label\n          url\n        }\n        ... on MegaMenuCategoriesDropdown {\n          __typename\n          label\n        }\n        ... on MegaMenuDropdown {\n          __typename\n          items {\n            ... on Link {\n              __typename\n              label\n              url\n            }\n            ... on ImageLink {\n              __typename\n              label\n              url\n              image {\n                url\n              }\n            }\n          }\n          label\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Menu($where: MenuWhereInput) {\n    menus(where: $where) {\n      links {\n        ... on Link {\n          __typename\n          label\n          url\n        }\n        ... on MegaMenuCategoriesDropdown {\n          __typename\n          label\n        }\n        ... on MegaMenuDropdown {\n          __typename\n          items {\n            ... on Link {\n              __typename\n              label\n              url\n            }\n            ... on ImageLink {\n              __typename\n              label\n              url\n              image {\n                url\n              }\n            }\n          }\n          label\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Pages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      title\n      url\n      content {\n        ...BannerFragment\n        ...PopularProductsFragment\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Pages($url: String!) {\n    pages(where: { url: $url }) {\n      id\n      identify\n      metaDescription\n      metaTitle\n      title\n      url\n      content {\n        ...BannerFragment\n        ...PopularProductsFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductImageFragment on ProductImage {\n    url\n    position\n    label\n    disabled\n  }\n",
): (typeof documents)["\n  fragment ProductImageFragment on ProductImage {\n    url\n    position\n    label\n    disabled\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProductVideoFragment on ProductVideo {\n    disabled\n    label\n    position\n    url\n    video_content {\n      media_type\n      video_description\n      video_metadata\n      video_provider\n      video_title\n      video_url\n    }\n  }\n",
): (typeof documents)["\n  fragment ProductVideoFragment on ProductVideo {\n    disabled\n    label\n    position\n    url\n    video_content {\n      media_type\n      video_description\n      video_metadata\n      video_provider\n      video_title\n      video_url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Products($pageSize: Int = 12, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        url_path\n        url_key\n        url_suffix\n        canonical_url\n        brand\n        color\n        configuration\n        country_of_manufacture\n        description {\n          html\n        }\n        gift_message_available\n        id\n        image {\n          ...ProductImageFragment\n        }\n        is_returnable\n        manufacturer\n        media_gallery {\n          disabled\n          label\n          position\n          url\n          ... on ProductImage {\n            ...ProductImageFragment\n          }\n          ... on ProductVideo {\n            ...ProductVideoFragment\n          }\n        }\n        media_gallery_entries {\n          content {\n            base64_encoded_data\n            name\n            type\n          }\n          disabled\n          file\n          id\n          label\n          media_type\n          position\n          types\n          uid\n          video_content {\n            media_type\n            video_description\n            video_metadata\n            video_provider\n            video_title\n            video_url\n          }\n        }\n        meta_description\n        meta_keyword\n        meta_title\n        name\n        new_from_date\n        new_to_date\n        only_x_left_in_stock\n        options_container\n        price_range {\n          maximum_price {\n            discount {\n              amount_off\n              percent_off\n            }\n            fixed_product_taxes {\n              amount {\n                currency\n                value\n              }\n              label\n            }\n            regular_price {\n              currency\n              value\n            }\n          }\n          minimum_price {\n            discount {\n              amount_off\n              percent_off\n            }\n            fixed_product_taxes {\n              amount {\n                currency\n                value\n              }\n              label\n            }\n            regular_price {\n              currency\n              value\n            }\n          }\n        }\n        productBrand {\n          brand_image_url\n          name\n        }\n        product_links {\n          link_type\n          linked_product_sku\n          linked_product_type\n          position\n          sku\n          ... on ProductLinks {\n            link_type\n            linked_product_sku\n            linked_product_type\n            position\n            sku\n          }\n        }\n        rating_summary\n        updated_at\n        uid\n        type_id\n        tier_price\n        swatch_image\n        stock_status\n        staged\n        special_to_date\n        special_price\n        special_from_date\n        small_image {\n          disabled\n          label\n          position\n          url\n        }\n        sku\n        size_filter\n        short_description {\n          html\n        }\n        series_group\n        review_count\n        webshopavailable\n        addable_to_cart\n        attribute_set_id\n        created_at\n        delivery_promise\n        ifsite\n        maintenance_description\n        series {\n          url_path\n          name\n        }\n        categories {\n          url_path\n          name\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Products($pageSize: Int = 12, $filter: ProductAttributeFilterInput) {\n    products(pageSize: $pageSize, filter: $filter) {\n      items {\n        url_path\n        url_key\n        url_suffix\n        canonical_url\n        brand\n        color\n        configuration\n        country_of_manufacture\n        description {\n          html\n        }\n        gift_message_available\n        id\n        image {\n          ...ProductImageFragment\n        }\n        is_returnable\n        manufacturer\n        media_gallery {\n          disabled\n          label\n          position\n          url\n          ... on ProductImage {\n            ...ProductImageFragment\n          }\n          ... on ProductVideo {\n            ...ProductVideoFragment\n          }\n        }\n        media_gallery_entries {\n          content {\n            base64_encoded_data\n            name\n            type\n          }\n          disabled\n          file\n          id\n          label\n          media_type\n          position\n          types\n          uid\n          video_content {\n            media_type\n            video_description\n            video_metadata\n            video_provider\n            video_title\n            video_url\n          }\n        }\n        meta_description\n        meta_keyword\n        meta_title\n        name\n        new_from_date\n        new_to_date\n        only_x_left_in_stock\n        options_container\n        price_range {\n          maximum_price {\n            discount {\n              amount_off\n              percent_off\n            }\n            fixed_product_taxes {\n              amount {\n                currency\n                value\n              }\n              label\n            }\n            regular_price {\n              currency\n              value\n            }\n          }\n          minimum_price {\n            discount {\n              amount_off\n              percent_off\n            }\n            fixed_product_taxes {\n              amount {\n                currency\n                value\n              }\n              label\n            }\n            regular_price {\n              currency\n              value\n            }\n          }\n        }\n        productBrand {\n          brand_image_url\n          name\n        }\n        product_links {\n          link_type\n          linked_product_sku\n          linked_product_type\n          position\n          sku\n          ... on ProductLinks {\n            link_type\n            linked_product_sku\n            linked_product_type\n            position\n            sku\n          }\n        }\n        rating_summary\n        updated_at\n        uid\n        type_id\n        tier_price\n        swatch_image\n        stock_status\n        staged\n        special_to_date\n        special_price\n        special_from_date\n        small_image {\n          disabled\n          label\n          position\n          url\n        }\n        sku\n        size_filter\n        short_description {\n          html\n        }\n        series_group\n        review_count\n        webshopavailable\n        addable_to_cart\n        attribute_set_id\n        created_at\n        delivery_promise\n        ifsite\n        maintenance_description\n        series {\n          url_path\n          name\n        }\n        categories {\n          url_path\n          name\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
