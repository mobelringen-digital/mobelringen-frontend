"use client";

import React from "react";

import { Checkbox } from "@nextui-org/react";

import Image from "next/image";

import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ImageLink } from "@/components/cms/__components/image-link/ImageLink";
import { MultipleTextBlock } from "@/components/cms/__components/multiple-text-block/MultipleTextBlock";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { MetaDescription, MetaTitle } from "@/components/meta";
import { setFavoriteStoreId } from "@/components/store-selector/actions";
import { StoreBlock } from "@/modules/store/StoreBlock";
import { StoreWorkingDays } from "@/modules/store/StoreWorkingDays";
import { BaseStoreFragment, CmsStoreFragment } from "@/types";

interface Props {
  storeCmsData: CmsStoreFragment;
  store: BaseStoreFragment;
  selectedStore?: BaseStoreFragment | null;
}

export const StorePage: React.FC<Props> = ({
  storeCmsData,
  store,
  selectedStore,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const formattedAddress = [
    store.postcode,
    store.city,
    store.street,
    store.region,
  ]
    .filter(Boolean)
    .join(", ");

  const submitStore = async () => {
    if (!store.external_id) return;

    setIsLoading(true);
    return setFavoriteStoreId(store.external_id).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <ContainerLayout className="pb-12">
      {isLoading ? <PageTopLoader /> : null}
      {storeCmsData.seo?.metaTitle ? (
        <MetaTitle title={storeCmsData.seo.metaTitle} />
      ) : null}
      {storeCmsData.seo?.metaDescription ? (
        <MetaDescription description={storeCmsData.seo.metaDescription} />
      ) : null}

      <Breadcrumbs
        data={[
          {
            label: storeCmsData.storeName ?? store.name ?? "",
            url: `/store/${store.external_id}`,
          },
        ]}
      />

      {storeCmsData.topBanner?.url ? (
        <Image
          src={storeCmsData.topBanner.url}
          width={storeCmsData.topBanner.width ?? 1448}
          height={storeCmsData.topBanner.height ?? 480}
          className="rounded-2xl my-8"
          alt={storeCmsData.storeName ?? store.name ?? ""}
        />
      ) : null}

      <div className="flex justify-center mb-24">
        <h1 className="text-3xl lg:text-5xl font-feature">
          {storeCmsData.storeName}
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-8 lg:gap-16">
        <div className="col-span-5 lg:col-span-3">
          {storeCmsData.content ? (
            <MultipleTextBlock data={storeCmsData.content} />
          ) : null}
          <div className="flex mt-8">
            {storeCmsData.bottomImage?.url ? (
              <ImageLink data={storeCmsData.bottomImage} />
            ) : null}
          </div>
        </div>
        <div className="col-span-5 lg:col-span-2 lg:sticky top-[150px]">
          <div className="bg-white rounded-2xl p-8 flex flex-col">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="bg-powder flex rounded-2xl px-4 py-2 items-center gap-2">
                <Checkbox
                  className="font-medium text-xs lg:text-bas"
                  title="Min butikk"
                  onValueChange={submitStore}
                  isSelected={selectedStore?.external_id === store.external_id}
                >
                  Min butikk
                </Checkbox>
              </div>
              {selectedStore?.external_id === store.external_id ? (
                <span className="bg-powder py-1 px-3 rounded-2xl mt-4 text-sm">
                  Du vil nå se lagerstatus for produkter i denne butikken
                </span>
              ) : null}
            </div>
            <StoreBlock
              title="Adresse"
              content={formattedAddress}
              borderTop={true}
            />
            <StoreBlock
              title="Åpningstider butikk"
              borderTop={true}
              content={<StoreWorkingDays store={store} />}
            />
            <StoreBlock
              title="Kontaktinformasjon"
              borderTop={true}
              content={
                <div className="flex flex-col">
                  <div className="flex justify-between items-center gap-1">
                    {store.phone && (
                      <>
                        <span>Telefon</span>
                        <a href={`tel:${store.phone}`} className="text-brown">
                          {store.phone}
                        </a>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    {store.email && (
                      <>
                        <span>E-post</span>
                        <a
                          href={`mailto:${store.email}`}
                          className="text-brown"
                        >
                          {store.email}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};
