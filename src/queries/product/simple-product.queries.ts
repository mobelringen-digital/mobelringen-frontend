import { graphql } from "@/types/schema";

export const SimpleProductFragment = graphql(`
  fragment SimpleProduct on SimpleProduct {
    ...BaseProduct
  }
`);

export const AddProductsToWishlistDocument = graphql(`
  mutation AddProductsToWishlist($wishlistId: ID!, $sku: String!) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: { sku: $sku, quantity: 1 }
    ) {
      wishlist {
        id
        items_count
      }
    }
  }
`);

export const RemoveProductsFromWishlistDocument = graphql(`
  mutation RemoveProductsFromWishlist(
    $wishlistId: ID!
    $wishlistItemsIds: [ID!]!
  ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      user_errors {
        code
        message
      }
      wishlist {
        id
        items_count
      }
    }
  }
`);

export const CreateWishlistDocument = graphql(`
  mutation CreateWishlist(
    $name: String!
    $visibility: WishlistVisibilityEnum!
  ) {
    createWishlist(input: { name: $name, visibility: $visibility }) {
      wishlist {
        name
      }
    }
  }
`);
