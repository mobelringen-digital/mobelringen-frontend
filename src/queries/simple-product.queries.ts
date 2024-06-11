import { graphql } from "@/types/schema";

export const SimpleProductFragment = graphql(`
  fragment SimpleProduct on SimpleProduct {
    ...BaseProduct
  }
`);
