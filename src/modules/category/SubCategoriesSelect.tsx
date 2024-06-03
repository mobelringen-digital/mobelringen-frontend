import React from "react";

import cx from "classnames";

import Link from "next/link";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { CategoryItemEntity } from "@/modules/category/types";

interface Props {
  category: CategoryItemEntity;
  url: string;
}

export const SubCategoriesSelect: React.FC<Props> = ({ category, url }) => {
  const isCategoryActive = (c: CategoryItemEntity) => {
    return c?.url_path === url;
  };

  const hasChildren = (c: CategoryItemEntity) => {
    return !!(c?.children && c.children.length > 0);
  };

  return (
    <div className="bg-cream py-[40px] border-b border-b-beige mb-12">
      <ContainerLayout>
        <Link
          href={`/c/${category?.url_path}`}
          className="text-5xl font-medium font-feature hover:underline"
        >
          {category?.name}
        </Link>
        {hasChildren(category) ? (
          <div className="flex gap-3 mt-8 flex-wrap">
            {category?.children
              ?.filter((c) => !!c?.product_count)
              .map((child) => (
                <Link
                  href={
                    isCategoryActive(child)
                      ? `/c/${category?.url_path}`
                      : `/c/${child?.url_path}`
                  }
                  key={child?.uid}
                  className={cx(
                    "rounded-full py-3 px-6 transition text-base font-suisse font-medium text-nowrap",
                    {
                      "bg-brown text-white": isCategoryActive(child),
                      "bg-powder text-brown hover:bg-brown hover:text-white":
                        !isCategoryActive(child),
                    },
                  )}
                >
                  {child?.name}
                  {!hasChildren(child) ? (
                    <span className="ml-3">{child?.product_count}</span>
                  ) : null}
                </Link>
              ))}
          </div>
        ) : null}
      </ContainerLayout>
    </div>
  );
};
