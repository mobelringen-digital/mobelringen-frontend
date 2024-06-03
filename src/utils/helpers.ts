import { Maybe, ProductInterface } from "@/types";

export const generatePrettyUrl = (
  nextPropsUrl: Array<string>,
  options?: {
    removeTrailSlash?: boolean;
  },
) => {
  const newUrl = nextPropsUrl.reduce((curr, url) => {
    return `${curr}/${url}`;
  }, "");

  if (options?.removeTrailSlash) {
    return newUrl.replace(/^\/|\/$/g, "");
  }

  return newUrl;
};

export const generateProductUrl = (product: Maybe<ProductInterface>) => {
  if (!product) {
    return "";
  }

  return `/p/${product.name
    ?.toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .replaceAll(" ", "-")}-${product.sku}`;
};

export const extractProductSkuFromUrl = (
  url: string | Array<string>,
): string => {
  if (Array.isArray(url)) {
    return url.pop() ?? "";
  }

  return url.split("-").pop() ?? "";
};
