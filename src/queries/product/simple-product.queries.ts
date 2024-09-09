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
