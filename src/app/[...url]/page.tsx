import React from "react";

import { Metadata } from "next";

import { notFound } from "next/navigation";

import { PageStageSwitch } from "@/components/page-stage-switch/PageStageSwitch";
import { Page } from "@/modules/page";
import { Stage } from "@/types";
import { isTypename } from "@/types/graphql-helpers";
import { formatMetaTitle, generatePrettyUrl } from "@/utils/helpers";

import { getCategory, getPage, getProduct, getRoute } from "./actions";
import Category from "./category";
import Product from "./product";

type Props = {
  params: Promise<{ url: Array<string> }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const paramsData = await params;
  const searchParamsData = await searchParams;
  const url = generatePrettyUrl(paramsData.url, {
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

  const page = await getPage({
    where: { url: `/${url}` },
    stage: (searchParamsData.stage as Stage) ?? Stage.Published,
  });

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

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const paramsData = await props.params;
  const url = generatePrettyUrl(paramsData.url, {
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

  const data = await getPage({
    where: { url: `/${url}` },
    stage: (searchParams.stage as Stage) ?? Stage.Published,
  });

  if (!data || !data.content) {
    return notFound();
  }

  return (
    <>
      {isPreview ? <meta name="robots" content="noindex" /> : null}
      {isPreview ? <PageStageSwitch /> : null}
      <Page data={data} />
    </>
  );
}
