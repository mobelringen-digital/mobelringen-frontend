import React from "react";

import { MetaTitle } from "@/components/meta/MetaTitle";
import { OgImage } from "@/components/meta/OgImage";
import { MetaRobots } from "@/components/meta/Robots";
import { SeoFragment } from "@/types";

interface Props {
  data?: SeoFragment | null;
}

export const MetaData: React.FC<Props> = ({ data }) => {
  const title = data?.metaTitle;
  const ogImage = data?.ogImage?.url;
  const robots = data?.robots;
  const canonicalUrl = data?.canonicalUrl;

  return (
    <>
      {title ? <MetaTitle title={title} /> : null}
      {ogImage ? <OgImage image={ogImage} /> : null}
      {robots ? <MetaRobots robots={robots} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
    </>
  );
};
