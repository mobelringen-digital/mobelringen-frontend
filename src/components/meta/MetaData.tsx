import React from "react";

import { MetaDescription } from "@/components/meta/MetaDescription";
import { MetaTitle } from "@/components/meta/MetaTitle";
import { OgImage } from "@/components/meta/OgImage";
import { MetaRobots } from "@/components/meta/Robots";
import { SeoFragment } from "@/types";

interface Props {
  data?: SeoFragment | null;
}

export const MetaData: React.FC<Props> = ({ data }) => {
  const title = data?.metaTitle;
  const metaDescription = data?.metaDescription;
  const ogImage = data?.ogImage?.url;
  const robots = data?.robots;
  const canonicalUrl = data?.canonicalUrl;

  return (
    <>
      {title ? <MetaTitle title={title} /> : null}
      {metaDescription ? (
        <MetaDescription description={metaDescription} />
      ) : null}
      {ogImage ? <OgImage image={ogImage} /> : null}
      {robots ? <MetaRobots robots={robots} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
    </>
  );
};
