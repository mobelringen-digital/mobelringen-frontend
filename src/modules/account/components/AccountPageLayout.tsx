import React from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const AccountPageLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {title ? (
        <h1 className="font-feature text-3xl lg:text-5xl">{title}</h1>
      ) : null}
      {children}
    </div>
  );
};
