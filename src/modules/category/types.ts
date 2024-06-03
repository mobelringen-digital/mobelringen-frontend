import { CategoryQuery } from "@/types";
import { ArrayElement } from "@/utils/ts-utils";

export type CategoryItemEntity = ArrayElement<
  NonNullable<CategoryQuery["categories"]>["items"]
>;
