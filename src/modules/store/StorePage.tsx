import React from "react";

import Image from "next/image";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ImageLink } from "@/components/cms/__components/image-link/ImageLink";
import { MultipleTextBlock } from "@/components/cms/__components/multiple-text-block/MultipleTextBlock";
import { Debugger } from "@/components/Debugger";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { MetaDescription, MetaTitle } from "@/components/meta";
import { BaseStoreFragment, CmsStoreFragment } from "@/types";

interface Props {
  storeCmsData: CmsStoreFragment;
  store: BaseStoreFragment;
}

export const StorePage: React.FC<Props> = ({ storeCmsData, store }) => {
  return (
    <ContainerLayout>
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

      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 lg:col-span-1">
          {storeCmsData.content ? (
            <MultipleTextBlock data={storeCmsData.content} />
          ) : null}
          <div className="flex mt-8">
            {storeCmsData.bottomImage?.url ? (
              <ImageLink data={storeCmsData.bottomImage} />
            ) : null}
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="bg-white rounded-2xl p-8">
            TODO: Add store information here
          </div>
        </div>
      </div>

      <Debugger data={storeCmsData} />
      <Debugger data={store} />
    </ContainerLayout>
  );
};
