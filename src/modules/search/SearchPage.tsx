"use client";

import React from "react";

import { ContainerLayout } from "@/components/layouts/ContainerLayout";
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
        label: "Artiker",
        type: "articles",
        count: articles?.length,
      },
    ],
    [products, articles],
  );

  const [activeLink, setActiveLink] = React.useState(LINKS[0].type);

  return (
    <>
      <div className="bg-cream py-[40px] border-b border-b-beige w-full">
        <ContainerLayout>
          <h1 className="text-5xl font-medium font-feature">
            {`Søkeresultater for “${query ?? ""}”`}
          </h1>
          <div className="flex gap-4 mt-12">
            {LINKS.map((link) => (
              <button
                key={link.type}
                onClick={() => setActiveLink(link.type)}
                className={`rounded-full py-2 lg:py-3 px-4 lg:px-6 transition text-sm lg:text-base font-suisse font-medium text-nowrap ${
                  activeLink === link.type
                    ? "bg-brown text-white"
                    : "bg-powder text-brown hover:bg-brown hover:text-white"
                }`}
              >
                {link.label} {link.count ? `${link.count}` : ""}
              </button>
            ))}
          </div>
        </ContainerLayout>
      </div>
      <ContainerLayout className="py-12">
        {activeLink === "products" ? <Products query={query} /> : null}
        {activeLink === "articles" ? <Articles articles={articles} /> : null}
      </ContainerLayout>
    </>
  );
};
