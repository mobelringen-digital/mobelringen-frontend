import React from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";

interface Props {
  block: {
    __typename: "LinkBlock";
    id: string;
    label: string;
    links: Array<{
      __typename: "Link";
      label: string;
      url: string;
      icon?:
        | { __typename?: "Asset" | undefined; url: string }
        | null
        | undefined;
    }>;
  };
}

export const BlockLinks: React.FC<Props> = ({ block }) => {
  return (
    <div
      className="col-span-6 lg:col-span-2 flex flex-col gap-4"
      key={block.id}
    >
      <span className="text-sm font-bold">{block.label}</span>
      <div>
        {block.links?.map((link) => {
          if (link.__typename === "Link") {
            return (
              <CmsLink
                className="text-sm py-1 hover:underline"
                data={link}
                key={link.url}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};
