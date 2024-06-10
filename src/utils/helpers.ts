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
  if (!product?.name) {
    return "";
  }

  return `/p/${generateUrl(product.name)}-${product.sku}`;
};

export const generateUrl = (name: string) => {
  if (!name) {
    return "";
  }

  return name
    ?.toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .replaceAll(" ", "-");
};

export const extractProductSkuFromUrl = (
  url: string | Array<string>,
): string => {
  if (Array.isArray(url)) {
    return url.pop() ?? "";
  }

  return url.split("-").pop() ?? "";
};
