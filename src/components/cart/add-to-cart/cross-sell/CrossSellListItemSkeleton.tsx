import React from "react";

export const CrossSellListItemSkeleton: React.FC = () => {
  return (
    <>
      <div className="animate-pulse bg-warm-grey h-12 w-2/4 mt-2 block" />
      <div className="flex gap-4 lg:gap-6 border-b pb-4 border-dark-grey border-opacity-30">
        <div className="w-[150px] h-[120px] lg:w-[200px] lg:h-[200px] bg-warm-grey rounded-2xl" />
        <div className="flex flex-col w-full">
          <div className="animate-pulse bg-warm-grey h-4 w-3/4 mt-2 block" />
          <div className="animate-pulse bg-warm-grey h-4 w-1/2 mt-2 block" />
          <div className="animate-pulse bg-warm-grey h-6 mt-4 w-1/4 block" />
        </div>
      </div>
    </>
  );
};
