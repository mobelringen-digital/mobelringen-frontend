import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";

export const ProductStock = () => {
  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex items-center gap-2">
        <StatusCircle size="small" variant="green" />
        <span className="text-xs">
          På lager på Lørenskog Tilgjengelig for levering
        </span>
      </div>
      <div className="flex items-center gap-2">
        <StatusCircle size="small" variant="red" />
        <span className="text-xs">Ikke tilgjengelig på nett</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusCircle size="small" variant="yellow" />
        <span className="text-xs">Bestillingsvare på nett</span>
      </div>
    </div>
  );
};
