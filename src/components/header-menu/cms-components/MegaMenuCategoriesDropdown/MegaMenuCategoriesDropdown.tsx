import Image from "next/image";
import Link from "next/link";

import { CategoryQueryDocument } from "@/queries/category.queries";
import { CategoryQuery } from "@/types";
import { baseMagentoClient } from "@/utils/lib/graphql";

async function getCategories() {
  return await baseMagentoClient("GET").request<CategoryQuery>(
    CategoryQueryDocument,
  );
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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 my-2">
      {clearedCategories()?.map((category, idx) => (
        <div className="flex flex-col" key={idx}>
          <Image
            className="w-6 h-6"
            width={24}
            height={24}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category?.thumbnail}`}
            alt={category?.name ?? ""}
          />
          <Link
            href={category?.url_path ? `/${category?.url_path}` : "#"}
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
                    href={
                      subCategory?.url_path ? `/${subCategory.url_path}` : "#"
                    }
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
