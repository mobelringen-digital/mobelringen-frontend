import React from "react";

import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { MetaDescription, MetaTitle } from "@/components/meta";
import { OgImage } from "@/components/meta/OgImage";
import { CmsPagesQuery } from "@/types";

interface Props {
  data: CmsPagesQuery;
}

export const Page: React.FC<Props> = ({ data }) => {
  const metaDescription = data.pages[0]?.seo?.metaDescription;
  const title = data.pages[0]?.seo?.metaTitle;
  const ogImage = data.pages[0]?.seo?.ogImage?.url;

  return (
    <>
      {title ? <MetaTitle title={title} /> : null}
      {metaDescription ? (
        <MetaDescription description={metaDescription} />
      ) : null}
      {ogImage ? <OgImage image={ogImage} /> : null}

      {data.pages[0]?.content.map((content) => {
        return <CmsContentLoader key={content.__typename} data={content} />;
      })}
    </>
  );
};
