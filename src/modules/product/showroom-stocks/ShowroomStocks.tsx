import React from "react";

import Link from "next/link";

import { LinkArrow } from "@/components/_ui/icons/figma/LinkArrow";
import { Showroom } from "@/components/_ui/icons/figma/Showroom";
import { StatusCircle } from "@/components/_ui/status-circle/StatusCircle";
import { useProductData } from "@/modules/product/context/useProductData";
import { stringToUrl } from "@/utils/helpers";

const INITIAL_SHOW = 3;

export const ShowroomStocks: React.FC = () => {
  const [showAll, setShowAll] = React.useState(false);
  const { showroomStocks } = useProductData();

  const items = showroomStocks?.items;

  const handleLoad = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAll((prev) => !prev);
  };

  if (!items) return null;

  return (
    <div className="bg-warm-grey rounded-2xl p-4 lg:p-8 flex flex-col gap-4">
      <div className="flex">
        <div className="flex flex-col w-[80%]">
          <span className="text-lg font-medium">
            Ønsker du å prøve før du kjøper?
          </span>
          <div>
            Denne varen finnes i utstillingen til butikkene under. Opplev varen
            i butikk - vi hjelper deg å finne det rette møbelet for deg.
          </div>
        </div>
        <div className="w-[20%] flex justify-end">
          <Showroom />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div>
          Utstilt i{" "}
          <span className="font-semibold">
            {showroomStocks?.items?.length} butikker
          </span>
          :
        </div>

        <table className="mt-2">
          {items
            ?.slice(0, showAll ? items?.length : INITIAL_SHOW)
            .map((item, idx) => (
              <tr key={idx}>
                <td className="flex gap-2 items-center text-md break-keep">
                  <StatusCircle
                    variant={item?.qty && item.qty > 0 ? "green" : "red"}
                  />
                  <span>{item?.store?.name}</span>
                </td>
                <td className="text-sm">{item?.qty} stk utstilt</td>
                <td className="text-right flex justify-end">
                  <Link
                    className="flex gap-1 items-center text-sm underline break-keep"
                    href={`/store/${item?.store?.external_id}/${stringToUrl(item?.store?.name)}`}
                  >
                    Vis butikkinfo <LinkArrow />
                  </Link>
                </td>
              </tr>
            ))}
        </table>

        {items.length > INITIAL_SHOW ? (
          <button
            className="text-xs text-left underline mt-1 mb-2"
            onClick={handleLoad}
          >
            {showAll ? (
              <>Vis færre</>
            ) : (
              <>Vis flere ({items?.length - INITIAL_SHOW})</>
            )}
          </button>
        ) : null}

        <div className="text-sm mt-2">
          Merk: Produktet kan ha noen andre spesifikasjoner enn vist her.
        </div>
      </div>
    </div>
  );
};
