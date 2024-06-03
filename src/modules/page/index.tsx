import React from "react";

import { CmsContentLoader } from "@/components/cms/cms-content-loader";
import { PagesQuery } from "@/types";

interface Props {
  data: PagesQuery;
}

export const Page: React.FC<Props> = ({ data }) => {
  return (
    <main className="flex mb-8 flex-col items-center justify-between">
      {data.pages[0]?.content.map((content) => {
        return <CmsContentLoader key={content.__typename} data={content} />;
      })}
    </main>
  );
};
