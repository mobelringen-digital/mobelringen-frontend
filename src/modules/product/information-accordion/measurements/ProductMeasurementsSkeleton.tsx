export const ProductMeasurementsSkeleton = () => {
  return (
    <ul className="flex flex-col gap-4 mx-4">
      <li className="flex items-center justify-between">
        <div className="w-1/2 bg-warm-grey h-8 animate-pulse" />
        <div className="w-1/2 bg-warm-grey h-8 animate-pulse" />
      </li>
      <li className="flex items-center justify-between">
        <div className="w-1/2 bg-warm-grey h-8 animate-pulse" />
        <div className="w-1/2 bg-warm-grey h-8 animate-pulse" />
      </li>
      <li className="flex items-center justify-between">
        <div className="w-1/2 bg-warm-grey h-8 animate-pulse" />
        <div className="w-1/2 bg-warm-grey h-8 animate-pulse" />
      </li>
    </ul>
  );
};
