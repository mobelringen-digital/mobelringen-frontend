"use client";

import React from "react";

import cx from "classnames";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/_ui/button/Button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useCategoriesQuery } from "@/components/cms/block-pages-list/useCategoriesQuery";
import { useCmsPagesQuery } from "@/components/cms/block-pages-list/usePagesQuery";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { CmsBlockHeader } from "@/components/cms/cms-block-wrapper/CmsBlockHeader";
import { PageThumbnail } from "@/components/page-thumbnail/PageThumbnail";
import { CmsPagesListFragment } from "@/types";

interface Props {
  data: CmsPagesListFragment;
}

export const CmsPagesList: React.FC<Props> = ({ data }) => {
  const pathname = usePathname();
  const {
    data: queryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCmsPagesQuery({
    pageType: data.pageType,
    pageCategory_some: data.pageCategory?.id
      ? {
          id: data.pageCategory.id,
        }
      : undefined,
  });
  const { data: categories } = useCategoriesQuery({
    pageType: data.pageType,
  });

  const totalLoaded = queryData?.pages.reduce((acc, page) => {
    return acc + page.edges.length;
  }, 0);
  const totalCount = queryData?.pages[0]?.aggregate.count;

  const buildPathArray = (url: string) => {
    const segments = url.split("/").filter((segment) => segment !== "");
    const result: Array<{ value: string; label: string }> = [];
    let currentPath = "";

    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      result.push({ value: currentPath, label: segment });
    });

    return result;
  };

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      {data.displayCategories ? (
        <Breadcrumbs
          className="mt-0 mb-6 lg:mb-12"
          data={buildPathArray(pathname).map((item) => ({
            url: item.value,
            label: item.label,
          }))}
        />
      ) : null}
      <CmsBlockHeader title={data.title} />

      {data.displayCategories && categories && categories.length > 0 ? (
        <div className="flex gap-2 lg:gap-3 border-b border-dark-grey border-opacity-30 pb-8 my-8 lg:pb-12 lg:mb-12 flex-wrap">
          {categories?.map((category, idx) => (
            <Link
              href={category.categoryUrl ?? ""}
              key={idx}
              className={cx(
                "rounded-full py-2 lg:py-3 px-4 lg:px-6 transition text-sm lg:text-base font-suisse font-medium text-nowrap",
                {
                  "bg-brown text-white": pathname === category.categoryUrl,
                  "bg-powder text-brown hover:bg-brown hover:text-white":
                    pathname !== category.categoryUrl,
                },
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {queryData?.pages.map((pageData, idx) => (
          <React.Fragment key={idx}>
            {pageData.edges.map((page) => (
              <PageThumbnail page={page.node} key={page.node.id} />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="flex w-full items-center justify-center mt-8 pt-8 border-t border-cold-grey-dark">
        <div className="flex flex-col gap-3">
          <span className="text-black text-base">
            Viser {totalLoaded} av {totalCount} artikler
          </span>
          {hasNextPage ? (
            <Button
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              Last inn flere
            </Button>
          ) : null}
        </div>
      </div>
    </CmsBlockWrapper>
  );
};
