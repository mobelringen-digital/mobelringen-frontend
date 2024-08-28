import React from "react";

import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { getStaticPageConfiguration } from "@/modules/page/actions";
import { StaticPageType } from "@/types";

export async function ParentCategoryPage() {
  const data = await getStaticPageConfiguration(StaticPageType.CategoryPage);

  return (
    <>
      {data?.content?.map((content) => {
        return <CmsContentLoader key={content.__typename} data={content} />;
      })}
    </>
  );
}
