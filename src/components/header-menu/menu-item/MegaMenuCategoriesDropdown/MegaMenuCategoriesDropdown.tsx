import Link from "next/link";

import { TempCategoryIcon } from "@/components/header-menu/menu-item/MegaMenuCategoriesDropdown/TempCategoryIcon";
import { CategoryQueryDocument } from "@/queries/category.queries";
import { CategoryQuery } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

async function getCategories() {
  return await baseMagentoClient.request<CategoryQuery>(CategoryQueryDocument);
}

export async function MegaMenuCategoriesDropdown() {
  const categoriesData = await getCategories();

  if (!categoriesData.categories?.items) {
    return null;
  }

  const clearedCategories = () => {
    if (!categoriesData.categories?.items) {
      return [];
    }

    const categories = categoriesData.categories.items[0]?.children; // @FIXME: Fix this on Magento

    return categories?.filter(
      (category) =>
        category?.include_in_menu &&
        category?.children &&
        category.children.length > 0,
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 my-2 mx-4 lg:mx-0">
      {clearedCategories()?.map((category, idx) => (
        <div className="flex flex-col" key={idx}>
          <TempCategoryIcon />
          <Link
            href={`/c/${category?.url_path}` ?? "#"}
            className="text-xl font-medium my-2 hover:underline"
          >
            {category?.name}
          </Link>
          {category?.children && category?.children?.length > 0 ? (
            <ul className="list-none flex flex-col gap-1">
              {category?.children?.map((subCategory, index) => (
                <li key={index} className="text-sm">
                  <Link
                    className="hover:underline"
                    href={`/c/${subCategory?.url_path}` ?? "#"}
                  >
                    {subCategory?.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
