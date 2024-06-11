import React from "react";

import { CmsLink } from "@/components/cms/link/CmsLink";
import { CmsLinkBlockFragment } from "@/queries/menu.queries";
import { FragmentType, useFragment } from "@/types/schema";

interface Props {
  data: FragmentType<typeof CmsLinkBlockFragment>;
}

export const BlockLinks: React.FC<Props> = ({ data }) => {
  const block = useFragment(CmsLinkBlockFragment, data);

  return (
    <div
      className="col-span-6 lg:col-span-2 flex flex-col lg:gap-4"
      key={block.id}
    >
      <span className="text-sm font-bold">{block.label}</span>
      <div>
        {block.links?.map((link, idx) => (
          <React.Fragment key={idx}>
            {link.__typename === "Link" ? (
              <CmsLink
                className="text-sm py-1 hover:underline"
                data={link}
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
