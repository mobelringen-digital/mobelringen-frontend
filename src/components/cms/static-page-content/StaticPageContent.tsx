import React from "react";

import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { getPage } from "@/components/cms/static-page-content/actions";
import { MetaDescription, MetaTitle } from "@/components/meta";
import { OgImage } from "@/components/meta/OgImage";
import { MetaRobots } from "@/components/meta/Robots";

interface Props {
  url: string;
}

export async function StaticPageContent({ url }: Props) {
  const data = await getPage(url);
  const metaDescription = data.pages[0]?.seo?.metaTitle;
  const title = data.pages[0]?.seo?.metaDescription;
  const ogImage = data.pages[0]?.seo?.ogImage?.url;
  const robots = data.pages[0]?.seo?.robots;

  if (!data.pages[0]) {
    return null;
  }

  return (
    <>
      {title ? <MetaTitle title={title} /> : null}
      {metaDescription ? (
        <MetaDescription description={metaDescription} />
      ) : null}
      {ogImage ? <OgImage image={ogImage} /> : null}
      {robots ? <MetaRobots robots={robots} /> : null}

      {data.pages[0]?.content.map((content) => {
        return <CmsContentLoader key={content.__typename} data={content} />;
      })}
    </>
  );
}
