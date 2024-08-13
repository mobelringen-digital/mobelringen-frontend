import React from "react";

import cx from "classnames";

import { CmsLink } from "@/components/cms/__components/link/CmsLink";
import { CmsTextBlockFragment } from "@/types";

interface Props {
  data: CmsTextBlockFragment;
}

const TEXT_ALIGN: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const BUTTON_JUSTIFY: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const TextBlock: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col justify-center gap-8">
      {data.title ? (
        <h2 className="text-4xl font-medium font-feature">{data.title}</h2>
      ) : null}
      {data.content?.html ? (
        <div
          className={cx("prose text-xl", TEXT_ALIGN[data.textAlign ?? "left"])}
          dangerouslySetInnerHTML={{ __html: data.content.html }}
        />
      ) : null}
      {data.links ? (
        <div
          className={cx("flex gap-4", BUTTON_JUSTIFY[data.textAlign ?? "left"])}
        >
          {data.links.map((link, idx) => (
            <CmsLink
              className={cx(
                "bg-powder text-black hover:bg-blend-darken hover:bg-powder-dark",
                "rounded-full py-4 px-6 lg:px-8 text-sm lg:text-base",
              )}
              link={link}
              key={idx}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
