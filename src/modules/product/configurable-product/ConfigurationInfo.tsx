"use client";

import { useProductData } from "@/modules/product/product-data-provider/useProductData";

export const ConfigurationInfo = () => {
  const { productData } = useProductData();

  return (
    <div className="flex flex-col">
      {productData.variant?.attributes?.map((attr, idx) => (
        <div key={idx} className="flex gap-2">
          <span className="text-base font-semibold capitalize">
            {attr?.code}
          </span>
          <span className="text-base text-dark-grey">{attr?.label}</span>
        </div>
      ))}
    </div>
  );
};
