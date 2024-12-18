import React from "react";

interface Props {
  title?: string;
  goBack?: React.ReactNode;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}

export const AccountPageLayout: React.FC<Props> = ({
  title,
  children,
  goBack,
  rightContent,
}) => {
  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      <div className="flex w-full justify-between">
        {title ? (
          <div className="flex flex-col gap-4">
            {goBack ? goBack : null}
            <h1 className="font-feature text-3xl lg:text-5xl">{title}</h1>
          </div>
        ) : null}
        <div>{rightContent}</div>
      </div>

      {children}
    </div>
  );
};
