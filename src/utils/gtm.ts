import { BaseCartFragment, CartItemFragment } from "@/types";

export const formatGTMCategories = (
  data: { name: string | null | undefined }[] | undefined,
) => {
  if (!data) {
    return {
      item_category: null,
      item_category2: null,
      item_category3: null,
      item_category4: null,
      item_category5: null,
    };
  }

  return {
    item_category: data[0]?.name || null,
    item_category2: data[1]?.name || null,
    item_category3: data[2]?.name || null,
    item_category4: data[3]?.name || null,
    item_category5: data[4]?.name || null,
  };
};

export const formatGTMCartItems = (cart: BaseCartFragment) => {
  return {
    items: cart?.items?.map((item, idx) => ({
      item_id: item?.product.sku,
      item_name: item?.product.name,
      item_brand: item?.product.brand,
      index: idx,
      price: item?.prices?.price.value,
      discount: item?.prices?.total_item_discount?.value,
      quantity: item?.quantity,
      ...formatGTMCategories(
        item?.product.categories?.map((category) => ({
          name: category?.name,
        })),
      ),
    })),
  };
};
