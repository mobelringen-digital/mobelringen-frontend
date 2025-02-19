"use client";

import React from "react";

import { Tab, Tabs } from "@nextui-org/tabs";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { RegionList } from "@/components/cms/block-stores-map/parts/RegionList";
import { useStoresList } from "@/components/cms/block-stores-map/useStoresList";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { PageTitle } from "@/components/typography/PageTitle";
import { BaseStoreFragment, CoordinatesInput } from "@/types";

const Map = dynamic(() => import("./Map"), { ssr: false });

interface Props {
  title?: string;
}

export const Stores: React.FC<Props> = ({ title }) => {
  const [isPending, startTransition] = React.useTransition();
  const [coordinates, setCoordinates] = React.useState<CoordinatesInput>();
  const searchParams = useSearchParams();
  const {
    data: stores,
    isLoading,
    isFetching,
  } = useStoresList({
    searchInput: searchParams.get("searchInput") || undefined,
    coordinates,
  });
  const [selectedStore, setSelectedStore] =
    React.useState<BaseStoreFragment | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  const handleLocationClick = () => {
    startTransition(() => {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position) => {
          setCoordinates({
            lat: String(position.coords.latitude),
            lng: String(position.coords.longitude),
          });
        });
      }
    });
  };

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

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ContainerLayout className="mb-16">
      {isLoading || isFetching || isPending ? <PageTopLoader /> : null}
      {title ? <PageTitle>{title}</PageTitle> : null}
      <div className="lg:hidden">
        <Tabs
          size="lg"
          fullWidth={true}
          className="flex"
          aria-label="Alle fylker"
          variant="underlined"
        >
          <Tab key="photos" title="Fylker">
            <RegionList
              groupedByRegions={groupedByRegions}
              isLoading={isLoading}
              selectedStore={selectedStore}
              setSelectedStore={setSelectedStore}
              onLocationClick={handleLocationClick}
            />
          </Tab>
          <Tab key="music" title="Kart">
            <Map selectedStore={selectedStore} stores={stores} />
          </Tab>
        </Tabs>
      </div>
      <div className="grid-cols-12 gap-8 hidden lg:grid">
        <div className="col-span-12 lg:col-span-4">
          <RegionList
            groupedByRegions={groupedByRegions}
            isLoading={isLoading}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            onLocationClick={handleLocationClick}
          />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Map selectedStore={selectedStore} stores={stores} />
        </div>
      </div>
    </ContainerLayout>
  );
};
