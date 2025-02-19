import React from "react";

import cx from "classnames";
import { useDebounce } from "use-debounce";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ArrowLeftAlt } from "@/components/_ui/icons/ArrowLeftAlt";
import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { LocationIcon } from "@/components/cms/block-store-element/LocationIcon";
import { Store } from "@/components/cms/block-stores-map/Store";
import { SearchInput } from "@/components/search/SearchInput";
import { BaseStoreFragment } from "@/types";

interface Props {
  groupedByRegions?: { region: string; stores: any[] }[];
  isLoading: boolean;
  selectedStore: BaseStoreFragment | null;
  setSelectedStore: (store: BaseStoreFragment | null) => void;
  onLocationClick?: () => void;
}

export const RegionList: React.FC<Props> = ({
  groupedByRegions,
  selectedStore,
  setSelectedStore,
  isLoading,
  onLocationClick,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = React.useState(
    searchParams.get("searchInput") || "",
  );
  const [value] = useDebounce(search, 1000);
  const [activeRegion, setActiveRegion] = React.useState<string | null>(null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleLocationButtonClick = () => {
    setSearch("");
    return onLocationClick?.();
  };

  React.useEffect(() => {
    if (value) {
      router.push(`${pathname}?searchInput=${value}`);
    }
  }, [pathname, router, value]);

  const activeRegionStores = React.useMemo(() => {
    if (!activeRegion) {
      return null;
    }

    return groupedByRegions?.find((data) => data.region === activeRegion)
      ?.stores;
  }, [activeRegion, groupedByRegions]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 w-full">
        <div className="flex gap-4">
          <SearchInput
            onChange={onSearchChange}
            value={search}
            variant="bordered"
            placeholder="Postnummer eller butikknavn"
          />
          <button
            onClick={handleLocationButtonClick}
            className="bg-red p-4 rounded-xl w-[58px] flex-shrink-0 flex items-center justify-center"
            type="button"
          >
            <LocationIcon />
          </button>
        </div>
        <div className="flex w-full justify-end">
          {searchParams.get("searchInput") ? (
            <button
              aria-label="Nullstill søk"
              onClick={() => {
                setSearch("");
                router.push(pathname);
              }}
              className="text-sm underline text-dark-grey"
            >
              Nullstill søk
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col max-h-[520px] overflow-y-auto">
        {activeRegion ? (
          <div className="block w-full">
            <div className="flex flex-col items-start">
              <button
                aria-label="Tilbake til butikkoversikten"
                className="mb-4 text-left flex items-center gap-1"
                onClick={() => setActiveRegion("")}
              >
                <ArrowLeftAlt id="stores-back-arrow" />
                <span>Tilbake til butikkoversikten</span>
              </button>
              <div className="flex items-center gap-2 text-xl py-2">
                <span>Fylke</span>
                <ChevronRight />
                <span>{activeRegion}</span>
              </div>
            </div>

            <div className="flex flex-col">
              {activeRegionStores
                ?.filter(
                  (s) => s?.latitude && s?.longitude && s.is_visible_on_map,
                )
                .map((store, idx) => (
                  <button
                    aria-label="Select store button"
                    onClick={() => setSelectedStore(store)}
                    className={cx(
                      "text-left py-4 border-b border-dark-grey border-opacity-30 hover:bg-warm-grey",
                      {
                        "bg-warm-grey":
                          selectedStore?.external_id === store?.external_id,
                      },
                    )}
                    key={idx}
                  >
                    <Store store={store} />
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <div className="block w-full">
            <span className="text-xl py-2">Alle fylker</span>
            {!isLoading && groupedByRegions?.length === 0 ? (
              <div className="text-center text-lg">Ingen resultater</div>
            ) : null}
            {groupedByRegions?.map((data, idx) => (
              <button
                aria-label="Region button"
                onClick={() =>
                  setActiveRegion(
                    activeRegion === data.region ? null : data.region,
                  )
                }
                className={cx(
                  "text-left w-full py-4 h-16 border-b border-dark-grey border-opacity-30 hover:bg-warm-grey flex justify-between items-center px-2",
                  {
                    "bg-warm-grey": activeRegion === data.region,
                  },
                )}
                key={idx}
              >
                <span className="font-normal">{data.region}</span>
                <span className="flex gap-2">
                  <span className="font-light text-dark-grey">
                    {data.stores.length}
                  </span>
                  <ChevronRight />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
