import React from "react";

import { StaticPageContent } from "@/components/cms/static-page-content/StaticPageContent";

interface Props {
  url: string;
}

export async function ParentCategoryPage({ url }: Props) {
  return (
    <>
      <StaticPageContent url={`/${url}`} />
    </>
  );
}
