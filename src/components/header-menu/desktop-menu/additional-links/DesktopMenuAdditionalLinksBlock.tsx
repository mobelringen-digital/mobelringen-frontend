import React from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { CmsLinkBlockFragment } from "@/types";
import { isTypename } from "@/types/graphql-helpers";

interface Props {
  block: CmsLinkBlockFragment;
}

export const DesktopMenuAdditionalLinksBlock: React.FC<Props> = ({ block }) => {
  return (
    <ul className="list-none flex gap-6 items-center">
      {block.links.map((link, idx) => {
        if (isTypename(link, ["Link"])) {
          return (
            <li key={idx}>
              <CmsLink
                className="flex justify-between w-full text-xs"
                link={link}
                iconHeight={20}
                iconWidth={20}
              />
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};
