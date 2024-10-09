import React from "react";

interface Props {
  title: React.ReactNode;
  rightContent?: React.ReactNode;
  hide?: boolean;
}

export const CmsBlockHeader: React.FC<Props> = ({ title, rightContent, hide }) => {
  if (hide) return null;

  return (
    <div className="flex justify-between items-center mb-8 lg:mb-12">
      <h2 className="text-xl lg:text-3xl font-medium font-feature">{title}</h2>
      {rightContent}
    </div>
  );
};
