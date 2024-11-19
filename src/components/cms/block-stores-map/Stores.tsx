"use client";

import React from "react";

import cx from "classnames";
import { useDebounce } from "use-debounce";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ArrowLeftAlt } from "@/components/_ui/icons/ArrowLeftAlt";
import { ChevronRight } from "@/components/_ui/icons/ChevronRight";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { Store } from "@/components/cms/block-stores-map/Store";
import { useStoresList } from "@/components/cms/block-stores-map/useStoresList";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { SearchInput } from "@/components/search/SearchInput";
import { PageTitle } from "@/components/typography/PageTitle";
import { BaseStoreFragment } from "@/types";

const Map = dynamic(() => import("./Map"), { ssr: false });

interface Props {
  title?: string;
}

export const Stores: React.FC<Props> = ({ title }) => {
  const searchParams = useSearchParams();
  const {
    data: stores,
    isLoading,
    isFetching,
  } = useStoresList({
    searchInput: searchParams.get("searchInput") || undefined,
  });
  const router = useRouter();
  const pathname = usePathname();
  const [activeRegion, setActiveRegion] = React.useState<string | null>(null);
  const [selectedStore, setSelectedStore] =
    React.useState<BaseStoreFragment | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [search, setSearch] = React.useState(
    searchParams.get("searchInput") || "",
  );
  const [value] = useDebounce(search, 1000);

  const groupedByRegions = stores
    ?.reduce(
      (acc, rec) => {
        const { region, ...store } = rec as BaseStoreFragment;
        const regionIndex = acc.findIndex((item) => item.region === region);

        if (regionIndex > -1) {
          acc[regionIndex].stores.push(store);
        } else {
          if (region) {
            acc.push({ region, stores: [store] });
          } else {
            acc.push({ region: "Ukjent", stores: [store] });
          }
        }

        return acc;
      },
      [] as { region: string; stores: BaseStoreFragment[] }[],
    )
    .sort((a, b) => a.region.localeCompare(b.region));

  const activeRegionStores = React.useMemo(() => {
    if (!activeRegion) {
      return null;
    }

    return groupedByRegions?.find((data) => data.region === activeRegion)
      ?.stores;
  }, [activeRegion, groupedByRegions]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  React.useEffect(() => {
    if (value) {
      router.push(`${pathname}?searchInput=${value}`);
    }
  }, [pathname, router, value]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ContainerLayout className="mb-16">
      {isLoading || isFetching ? <PageTopLoader /> : null}
      {title ? <PageTitle>{title}</PageTitle> : null}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <div className="mb-8 flex flex-col gap-2">
            <SearchInput
              onChange={onSearchChange}
              value={search}
              variant="bordered"
              placeholder="Postnummer eller butikknavn"
            />
            <div className="flex w-full justify-end">
              {searchParams.get("searchInput") ? (
                <button
                  aria-labelledby="Nullstill søk"
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
                    aria-labelledby="Tilbake til butikkoversikten"
                    className="mb-4 text-left flex items-center gap-1"
                    onClick={() => setActiveRegion("")}
                  >
                    <ArrowLeftAlt />
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
                        aria-labelledby="Select store button"
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
                {!isLoading && stores?.length === 0 ? (
                  <div className="text-center text-lg">Ingen resultater</div>
                ) : null}
                {groupedByRegions?.map((data, idx) => (
                  <button
                    aria-labelledby="Region button"
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
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Map selectedStore={selectedStore} stores={stores} />
        </div>
      </div>
    </ContainerLayout>
  );
};
