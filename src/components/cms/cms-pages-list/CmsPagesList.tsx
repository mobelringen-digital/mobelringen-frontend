"use client";

import React from "react";

import cx from "classnames";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/_ui/button/Button";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { useCmsPagesQuery } from "@/components/cms/cms-pages-list/usePagesQuery";
import { CmsPagesListFragment } from "@/types";

interface Props {
  data: CmsPagesListFragment;
}

export const CmsPagesList: React.FC<Props> = ({ data }) => {
  const {
    data: queryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCmsPagesQuery({ pageType: data.pageType });

  const formatStringToReadableDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const totalLoaded = queryData?.pages.reduce((acc, page) => {
    return acc + page.edges.length;
  }, 0);
  const totalCount = queryData?.pages[0]?.aggregate.count;

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <h2 className="text-5xl font-medium font-feature mb-8 lg:mb-16">
        {data.title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {queryData?.pages.map((pageData, idx) => (
          <React.Fragment key={idx}>
            {pageData.edges.map((page) => (
              <div className="flex flex-col gap-2 lg:gap-4" key={page.node.id}>
                <Link href={page.node.url} className="relative group">
                  <div
                    className={cx(
                      "absolute left-0 right-0 top-0 bottom-0",
                      "transition-all rounded-3xl bg-black opacity-0 group-hover:opacity-10 pointer-events-none",
                    )}
                  />
                  {page.node.pageThumbnail?.url ? (
                    <Image
                      className="rounded-3xl h-[250px] lg:h-[350px] object-cover"
                      src={page.node.pageThumbnail?.url}
                      alt={page.node.metaTitle}
                      width={page.node.pageThumbnail.width ?? 420}
                      height={page.node.pageThumbnail.height ?? 350}
                    />
                  ) : (
                    <div className="h-[250px] lg:h-[350px] bg-white rounded-3xl flex justify-center items-center">
                      <span className="text-black text-2xl font-bold">
                        No Image
                      </span>
                    </div>
                  )}
                </Link>
                <div className="flex gap-4 text-sm lg:text-base text-dark-grey">
                  {page.node.pageCategory[0]?.name}
                  {page.node.pageCategory[0]?.name ? <span>|</span> : ""}
                  {formatStringToReadableDate(page.node.createdAt)}
                </div>
                <h3 className="font-feature text-xl lg:text-3xl font-light">
                  {page.node.metaTitle}
                </h3>
              </div>
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
