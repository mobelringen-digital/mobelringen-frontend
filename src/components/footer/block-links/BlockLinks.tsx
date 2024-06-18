import React from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { CmsLinkBlockFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  block: CmsLinkBlockFragment;
}

export const BlockLinks: React.FC<Props> = ({ block }) => {
  return (
    <div
      className="col-span-6 lg:col-span-2 flex flex-col lg:gap-4"
      key={block.id}
    >
      <span className="text-sm font-bold">{block.label}</span>
      <div>
        {block.links?.map((link, idx) => (
          <React.Fragment key={idx}>
            {isTypename(link, ["Link"]) ? (
              <CmsLink
                className="text-sm py-1 hover:underline"
                link={link}
                iconWidth={18}
                iconHeight={18}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
