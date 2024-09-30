"use client";

import React from "react";

import cx from "classnames";

import Link from "next/link";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { MetaTitle } from "@/components/meta";
import { Articles } from "@/modules/search/Articles";
import { Products } from "@/modules/search/Products";
import { CmsPagesQuery, ProductsQuery } from "@/types";

interface Props {
  query: string;
  products: ProductsQuery["products"];
  articles: CmsPagesQuery["pages"];
}

export const SearchPage: React.FC<Props> = ({ query, products, articles }) => {
  const LINKS = React.useMemo(
    () => [
      {
        label: "Produkter",
        type: "products",
        count: products?.total_count,
      },
      {
        label: "Artikler",
        type: "articles",
        count: articles?.length,
      },
    ],
    [products, articles],
  );

  return (
    <>
      <MetaTitle title={`Søkeresultater for “${query ?? ""}”`} />

      <div className="bg-cream py-[40px] border-b border-b-beige w-full">
        <ContainerLayout>
          <h1 className="text-5xl font-medium font-feature">
            {`Søkeresultater for “${query ?? ""}”`}
          </h1>
          <div className="flex gap-4 mt-12">
            {LINKS.map((link) => (
              <Link
                key={link.type}
                href={`#${link.type}`}
                className={cx(
                  "rounded-full py-2 lg:py-3 px-4 lg:px-6 transition text-sm lg:text-base font-suisse font-medium text-nowrap bg-powder text-brown hover:bg-brown hover:text-white",
                )}
              >
                {link.label} {link.count ? `${link.count}` : 0}
              </Link>
            ))}
          </div>
        </ContainerLayout>
      </div>
      <ContainerLayout className="py-12">
        <div id="products">
          <Products query={query} />
        </div>
        <div id="articles">
          <Articles articles={articles} />
        </div>
      </ContainerLayout>
    </>
  );
};
