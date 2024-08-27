"use client";

import React from "react";

import { Button } from "@/components/_ui/button/Button";
import { useCmsPagesQuery } from "@/components/cms/block-pages-list/usePagesQuery";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { PageThumbnail } from "@/components/page-thumbnail/PageThumbnail";
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
  } = useCmsPagesQuery({
    pageType: data.pageType,
    pageCategory_some: data.pageCategory?.id
      ? {
          id: data.pageCategory.id,
        }
      : undefined,
  });

  const totalLoaded = queryData?.pages.reduce((acc, page) => {
    return acc + page.edges.length;
  }, 0);
  const totalCount = queryData?.pages[0]?.aggregate.count;

  return (
    <CmsBlockWrapper config={data.blockConfig}>
      <h2 className="text-5xl font-medium font-feature mb-8 lg:mb-16">
        {data.title}
      </h2>
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
