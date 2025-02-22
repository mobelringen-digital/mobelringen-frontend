import { notFound } from "next/navigation";

import { getSelectedStore } from "@/components/store-selector/actions";
import { getCmsStoreInfo, getStoreInfo } from "@/modules/store/actions";
import { StorePage } from "@/modules/store/StorePage";

type Props = {
  params: Promise<{ url: Array<string> }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Store(props: Props) {
  const params = await props.params;
  const storeId = params.url[0];
  const cmsData = await getCmsStoreInfo(storeId);
  const storeData = await getStoreInfo(storeId);
  const selectedStore = await getSelectedStore();

  if (!cmsData) {
    return notFound();
  }

  if (!storeData) {
    return notFound();
  }

  return (
    <StorePage
      selectedStore={selectedStore}
      store={storeData}
      storeCmsData={cmsData}
    />
  );
}
