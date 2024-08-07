import React from "react";

interface Props {
  children: React.ReactNode;
  title?: string | null;
}

export const FilterWrapper: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="pb-4 border-b border-cold-grey-dark flex flex-col">
      {title ? <span className="py-4 font-semibold">{title}</span> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
};
