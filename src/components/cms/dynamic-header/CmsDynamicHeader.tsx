"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Banner } from "@/components/cms/banner";
import { CmsDynamicHeaderFragment, DynamicContentType } from "@/types";

interface Props {
  data?: CmsDynamicHeaderFragment | null;
  children?: React.ReactNode;
}

export const CmsDynamicHeader: React.FC<Props> = ({ data, children }) => {
  const pathname = usePathname();

  const isBannerVisible = React.useMemo(() => {
    if (!data?.rules) return false;

    const urlRule = data.rules.find(
      (rule) => rule.contentType === DynamicContentType.Url,
    );

    if (urlRule) {
      return urlRule.value.some((url) => pathname.includes(url));
    }
  }, [data?.rules, pathname]);

  if (!data?.banner) {
    return null;
  }

  if (!isBannerVisible) {
    return null;
  }

  return <Banner data={data.banner}>{children}</Banner>;
};
