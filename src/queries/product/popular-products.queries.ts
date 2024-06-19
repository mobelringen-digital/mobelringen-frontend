import { graphql } from "@/types/schema";

export const BestSellingProductsByCategory = graphql(`
  query BestSellingProductsByCategory($categoryId: Int!) {
    bestSellingProductsByCategory(categoryId: $categoryId) {
      ...BaseProduct
    }
  }
`);
