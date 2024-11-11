import React from "react";

import { OgImage } from "@/components/meta/OgImage";
import { MetaRobots } from "@/components/meta/Robots";
import { SeoFragment } from "@/types";

interface Props {
  data?: SeoFragment | null;
}

export const MetaData: React.FC<Props> = ({ data }) => {
  const ogImage = data?.ogImage?.url;
  const robots = data?.robots;
  const canonicalUrl = data?.canonicalUrl;

  return (
    <>
      {ogImage ? <OgImage image={ogImage} /> : null}
      {robots ? <MetaRobots robots={robots} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
    </>
  );
};
