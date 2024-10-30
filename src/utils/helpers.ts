import {
  CmsPromotionBubbleFragment,
  CmsSalesBubbleFragment,
  DeliveryType,
  MrColor,
} from "@/types";

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
    return newUrl.replace(/^\/|\/$/g, "").replace(/^\/+/, "");
  }

  return newUrl;
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

export const stringToUrl = (str?: string | null) => {
  if (!str) {
    return "";
  }

  return str
    ?.toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .replaceAll(" ", "-");
};

export const DELIVERY_TYPE_MAP = {
  online: DeliveryType.Online,
  collect: DeliveryType.Cac,
};

export const dateToNOFormat = (date: string) => {
  return new Date(date).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

export const CAMPAIGN_COLORS: Record<MrColor, string> = {
  MR_red: "#FF3E3E",
  MR_black: "#000101",
  MR_orange: "#FF9179",
  MR_powder: "#FFD8D2",
  MR_gray: "#F0EBE5",
  MR_white: "#F9F9F4",
  MR_S01: "#FEF0E5",
  MR_S02: "#FCDFD4",
  MR_S03: "#FAD0C5",
  MR_S04: "#F7B7AE",
  MR_S05: "#F5A597",
  MR_S06: "#F5CCE2",
  MR_S07: "#FBDEEC",
  MR_S08: "#E17D54",
  MR_S09: "#C55E47",
  MR_S10: "#7F2828",
  MR_S11: "#53110D",
  MR_S12: "#AC1917",
  MR_S13: "#AC1917",
  MR_S14: "#EFDDD3",
  MR_S15: "#F1EBE1",
};

export const getSalesBubbleSpacing = (
  salesBubble?: CmsSalesBubbleFragment | null,
) => {
  let spacing = 0;

  if (salesBubble?.topLine) {
    spacing += 1;
  }

  if (salesBubble?.bottomLine) {
    spacing += 1;
  }

  if (salesBubble?.middleLine) {
    spacing += 1;
  }

  return spacing;
};

export const getPromotionBubbleSpacing = (
  promotionBubble?: CmsPromotionBubbleFragment | null,
) => {
  let spacing = 0;

  if (promotionBubble?.topLine) {
    spacing += 1;
  }

  if (promotionBubble?.middleLine) {
    spacing += 1;
  }

  return spacing;
};

export const buildPathArray = (url: string) => {
  const segments = url.split("/").filter((segment) => segment !== "");
  const result: Array<{ value: string; label: string }> = [];
  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    result.push({
      value: currentPath,
      label: segment.replace(/[^\w\s]/g, " "),
    });
  });

  return result;
};

export const formatMetaTitle = (title?: string | null) => {
  if (title) {
    return `${title} | Møbelringen`;
  }

  return "Møbelringen";
};
