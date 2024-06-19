import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

export const ProductSliderSkeleton = () => {
  return (
    <div className="my-28 product-slider relative">
      <h2 className="text-2xl font-medium font-feature mb-4 lg:mb-8">
        <span className="animate-pulse bg-warm-grey h-8 w-1/3 block" />
      </h2>
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {[1, 2, 3, 4].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
      <div className="lg:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {[1, 2].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
