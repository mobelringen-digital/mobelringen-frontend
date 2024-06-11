import { ProductsQuery } from "@/types";

export type ProductEntity = NonNullable<
  NonNullable<ProductsQuery["products"]>["items"]
>[0];
