import React from "react";

import cx from "classnames";

import Link from "next/link";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CategoryBreadcrumbs } from "@/modules/category/CategoryBreadcrumbs";
import { CategoryItemEntity } from "@/modules/category/types";

interface Props {
  title?: string | null;
  category: CategoryItemEntity;
  url: string;
}

export const SubCategoriesSelect: React.FC<Props> = ({
  category,
  url,
  title,
}) => {
  const isCategoryActive = (c: CategoryItemEntity) => {
    return c?.url_path === url;
  };

  const hasChildren = (c: CategoryItemEntity) => {
    return !!(c?.children && c.children.length > 0);
  };

  return (
    <div className="bg-cream py-[40px] border-b border-b-beige w-full">
      <ContainerLayout>
        <CategoryBreadcrumbs />
        <h1 className="text-5xl font-medium font-feature">{title ?? category?.name}</h1>
        {hasChildren(category) ? (
          <div className="flex gap-2 lg:gap-3 mt-8 flex-wrap">
            {category?.children
              ?.filter((c) => !!c?.products?.total_count)
              .map((child) => (
                <Link
                  href={
                    isCategoryActive(child)
                      ? `/${category?.url_path}`
                      : `/${child?.url_path}`
                  }
                  key={child?.uid}
                  className={cx(
                    "rounded-full py-2 lg:py-3 px-4 lg:px-6 transition text-sm lg:text-base font-suisse font-medium text-nowrap",
                    {
                      "bg-brown text-white": isCategoryActive(child),
                      "bg-powder text-brown hover:bg-brown hover:text-white":
                        !isCategoryActive(child),
                    },
                  )}
                >
                  {child?.name}
                  {!hasChildren(child) ? (
                    <span className="ml-3">{child?.products?.total_count}</span>
                  ) : null}
                </Link>
              ))}
          </div>
        ) : null}
      </ContainerLayout>
    </div>
  );
};
