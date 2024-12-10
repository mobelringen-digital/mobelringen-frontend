import React from "react";

import cx from "classnames";

interface Props {
  title?: string;
  content: React.ReactNode;
  borderTop?: boolean;
}

export const StoreBlock: React.FC<Props> = ({ title, content, borderTop }) => {
  return (
    <div
      className={cx("flex flex-col py-4", {
        "border-t border-dark-grey border-opacity-30": borderTop,
      })}
    >
      {title ? (
        <span
          className="text-base font-semibold"
          dangerouslySetInnerHTML={{
            __html: title ?? "",
          }}
        />
      ) : null}
      <div className="mt-2 font-light">{content}</div>
    </div>
  );
};
