import React from "react";

import { Metadata } from "next";

import { notFound } from "next/navigation";

import { Page } from "@/modules/page";
import { isTypename } from "@/types/graphql-helpers";
import { formatMetaTitle, generatePrettyUrl } from "@/utils/helpers";

import { getCategory, getPage, getProduct, getRoute } from "./actions";
import Category from "./category";
import Product from "./product";

type Props = {
  params: { url: Array<string> };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const url = generatePrettyUrl(params.url, {
    removeTrailSlash: true,
  });

  const routeData = await getRoute(url);

  if (routeData.route?.type === "CATEGORY") {
    const category = await getCategory(url);
    const currentCategory = category.categories?.items?.[0];

    return {
      title: formatMetaTitle(
        currentCategory?.meta_title ?? currentCategory?.name,
      ),
      description: currentCategory?.meta_description ?? "",
    };
  }

  if (routeData.route?.type === "PRODUCT") {
    if (isTypename(routeData.route, ["ConfigurableProduct", "SimpleProduct"])) {
      if (routeData.route.sku) {
        const product = await getProduct(routeData.route.sku);
        const products = product.products?.items;
        const productData = products?.[0];

        if (productData && isTypename(productData, ["SimpleProduct"])) {
          return {
            title: formatMetaTitle(
              productData?.meta_title ?? productData?.name,
            ),
          };
        }
        if (productData && isTypename(productData, ["ConfigurableProduct"])) {
          return {
            title: formatMetaTitle(
              productData?.meta_title ?? productData?.name,
            ),
          };
        }
      }
    }
  }

  const data = await getPage(`/${url}`);
  const page = data.pages[0];

  if (page) {
    return {
      title: formatMetaTitle(page?.seo?.metaTitle),
      description: page.seo?.metaDescription,
    };
  }

  return {
    title: "Møbelringen",
  };
}

export default async function Home({ params, searchParams }: Props) {
  const url = generatePrettyUrl(params.url, {
    removeTrailSlash: true,
  });
  const isPreview = searchParams.preview === "true";

  const routeData = await getRoute(url);

  if (routeData.route?.type === "PRODUCT") {
    if (isTypename(routeData.route, ["ConfigurableProduct", "SimpleProduct"])) {
      if (!routeData.route.sku) {
        return notFound();
      }

      return <Product url={url} sku={routeData.route.sku} />;
    }
  }

  if (routeData.route?.type === "CATEGORY") {
    return <Category url={url} />;
  }

  const data = await getPage(`/${url}`, isPreview);

  if (!data.pages[0]) {
    return notFound();
  }

  return (
    <>
      {isPreview ? <meta name="robots" content="noindex" /> : null}
      <Page data={data} />
    </>
  );
}
