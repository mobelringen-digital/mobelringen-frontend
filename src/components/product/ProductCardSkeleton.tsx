export const ProductCardSkeleton = () => {
  return (
    <div className="w-[320px]">
      <div className="animate-pulse bg-warm-grey rounded-2xl h-[420px] w-full block" />
      <div className="animate-pulse bg-warm-grey h-4 w-3/4 mt-2 block" />
      <div className="animate-pulse bg-warm-grey h-4 w-1/2 mt-2 block" />
      <div className="animate-pulse bg-warm-grey h-6 mt-4 w-1/4 block" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
