import React from "react";

import { TextBlock } from "@/components/cms/__components/text-block/TextBlock";
import { StoresAutocomplete } from "@/components/cms/block-store-element/StoresAutocomplete";
import { CmsBlockWrapper } from "@/components/cms/cms-block-wrapper";
import { ContainerLayout } from "@/components/layouts/ContainerLayout";
import { getStores } from "@/components/store-selector/actions";
import { CmsStoreElementFragment } from "@/types";

interface Props {
  data: CmsStoreElementFragment;
}

export async function BlockStoreElement({ data }: Props) {
  const stores = await getStores();

  return (
    <CmsBlockWrapper
      config={data.blockConfig}
      isFullWidth={true}
      className="flex items-center justify-center"
      style={{
        backgroundImage: `url(${data.backgroundImage?.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 900,
        width: "100%",
        position: "relative",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <ContainerLayout className="text-white relative z-20">
        <div className="flex gap-16">
          <div className="w-1/2">
            {data.content?.paragraphs.map((paragraph, index) => (
              <TextBlock data={paragraph} key={index} />
            ))}
          </div>
          <div className="bg-white w-1/2 rounded-2xl p-8 text-black">
            <div className="flex flex-col gap-4">
              <div className="font-feature text-3xl">Velg butikk</div>
              <p>
                Skriv inn ditt postnummer for å få oppdatert informasjon om
                tilgjengelige produkter for ditt område.
              </p>
              <StoresAutocomplete stores={stores} />
            </div>
          </div>
        </div>
      </ContainerLayout>
    </CmsBlockWrapper>
  );
}
