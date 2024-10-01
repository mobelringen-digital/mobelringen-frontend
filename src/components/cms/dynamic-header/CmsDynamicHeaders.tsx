"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { CmsDynamicHeader } from "@/components/cms/dynamic-header/CmsDynamicHeader";
import { useDynamicHeadersQuery } from "@/components/cms/dynamic-header/useDynamicHeadersQuery";

export const CmsDynamicHeaders = () => {
  const pathname = usePathname();
  const { data } = useDynamicHeadersQuery(pathname);

  //workaround to scroll to top on page change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  if (data && !data.length) {
    return null;
  }

  return (
    <>
      {data?.map((header) => (
        <CmsDynamicHeader key={header.id} data={header} />
      ))}
    </>
  );
};
