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
    if (!data?.rule) return false;

    switch (data.rule.contentType) {
      case DynamicContentType.Url:
        return data.rule.value.some((url) => pathname.includes(url));

      default:
        return false;
    }
  }, [data, pathname]);

  if (!data?.banner) {
    return null;
  }

  if (!isBannerVisible) {
    return null;
  }

  return <Banner data={data.banner}>{children}</Banner>;
};
