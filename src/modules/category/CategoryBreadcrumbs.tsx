"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";

export const CategoryBreadcrumbs = () => {
  const pathname = usePathname();

  const breadcrumbs = React.useMemo(() => {
    const path = pathname.split("/");
    return path
      .map((p, index) => {
        const u = path.slice(0, index + 1).join("/");
        return {
          url: u,
          label: p,
        };
      })
      .slice(1);
  }, [pathname]);

  return <Breadcrumbs data={breadcrumbs} className="mb-8" />;
};
