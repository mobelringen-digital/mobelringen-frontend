import {
  CmsPromotionBubbleFragment,
  CmsSalesBubbleFragment,
  DeliveryType,
  MrColor,
  TypographyStyle,
} from "@/types";

export const FILTERS_INITIAL_COUNT = 3;

export const NUMBERS_REGEX = /^[0-9]*$/;
export const NUMBERS_AND_LETTERS_REGEX = /^[a-zA-ZÀ-ÿ0-9_.\- /]*$/;
export const LETTERS_REGEX = /^[a-zA-ZÀ-ÿ_.\- /]*$/;
export const EMAIL_REGEX =
  /^[A-Za-zÀ-ÿ0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
export const NO_PHONE_REGEX = /^(0047|\+47|47)?[2-9]\d{7}$/;
export const NO_POSTCODE_REGEX = /^(?!917[0-9])(?!8099).*$/;

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
    .replaceAll(/ø/g, "o")
    .replaceAll(/å/g, "a")
    .replaceAll(/æ/g, "ae")
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

export const PARAGRAPH_STYLE: Record<TypographyStyle, string> = {
  xxl: "text-2xl lg:text-4xl",
  xl: "text-xl lg:text-2xl",
  lg: "text-lg lg:text-xl",
  md: "text-sm lg:text-base",
  sm: "text-xs lg:text-sm",
  xs: "text-xs lg:text-xs",
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
