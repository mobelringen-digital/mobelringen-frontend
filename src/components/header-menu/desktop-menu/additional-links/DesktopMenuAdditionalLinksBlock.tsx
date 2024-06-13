import React from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { CmsLinkBlockFragment } from "@/queries/menu.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  blockData: FragmentType<typeof CmsLinkBlockFragment>;
}

export const DesktopMenuAdditionalLinksBlock: React.FC<Props> = ({
  blockData,
}) => {
  const block = useFragment(CmsLinkBlockFragment, blockData);

  return (
    <ul className="list-none flex gap-6 items-center">
      {block.links.map((link, idx) => {
        if (link.__typename === "Link") {
          return (
            <li key={idx}>
              <CmsLink
                className="flex justify-between w-full text-xs"
                data={link}
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
