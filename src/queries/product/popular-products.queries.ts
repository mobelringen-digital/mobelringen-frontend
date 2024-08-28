import { graphql } from "@/types/schema";

export const BestSellingProductsByCategory = graphql(`
  query BestSellingProductsByCategory($categoryId: Int!) {
    bestSellingProductsByCategory(categoryId: $categoryId) {
      ...BaseProduct
    }
  }
`);

export const SpecificProductsBySku = graphql(`
  query SpecificProductsBySku($skus: [String!]!) {
    products(filter: { sku: { in: $skus } }) {
      items {
        ...BaseProduct
      }
    }
  }
`);
