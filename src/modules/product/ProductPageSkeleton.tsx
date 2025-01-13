import React from "react";

export const ProductPageSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-16">
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
        <div className="animate-pulse bg-warm-grey rounded-2xl w-full h-[340px] lg:h-[720px] block" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="h-[86px] w-[96px] bg-warm-grey rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="animate-pulse bg-warm-grey w-1/3 h-10 block" />
          <div className="animate-pulse bg-warm-grey w-1/2 h-12 block" />
          <div className="animate-pulse bg-warm-grey h-4 w-full block" />
          <div className="animate-pulse bg-warm-grey w-1/3 h-8 block" />
          <div className="animate-pulse bg-warm-grey w-1/3 h-8 block" />

          <div className="w-full h-[100px] mt-2 bg-warm-grey rounded-2xl" />
          <div className="w-full h-[300px] mt-2 bg-warm-grey rounded-2xl" />
        </div>
      </div>
    </div>
  );
};
