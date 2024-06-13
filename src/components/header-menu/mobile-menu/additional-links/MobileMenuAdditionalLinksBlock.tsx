import React from "react";

import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { CmsLink } from "@/components/cms/link/CmsLink";
import { CmsLinkBlockFragment } from "@/types";

interface Props {
  block: CmsLinkBlockFragment;
}

export const MobileMenuAdditionalLinksBlock: React.FC<Props> = ({ block }) => {
  return (
    <ul className="flex flex-col gap-5 py-8 border-t border-t-cold-grey-dark">
      {block.links.map((link, idx) => {
        if (link.__typename === "Link") {
          return (
            <li key={idx}>
              <CmsLink
                className="flex justify-between w-full"
                link={link}
                afterIcon={<ChevronRight />}
              />
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};
